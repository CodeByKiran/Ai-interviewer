package com.kiran.contorller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.kiran.DTO.ResumeData;

import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.*;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.*;

@RestController
@RequestMapping("/resume")
public class ResumeUploadController {

    @PostMapping("/upload")
    public ResumeData uploadResume(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResumeData(); // return empty DTO if no file
        }

        try {
            // Save the file temporarily
            Path tempDir = Files.createTempDirectory("");
            Path tempFile = tempDir.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);

            // Extract text from resume
            String text = extractTextFromResume(tempFile);
            System.out.println(text);

            // Build ResumeData DTO
            ResumeData data = new ResumeData();
            data.setName(extractName(text));
            data.setEmail(extractEmail(text));
            data.setPhone(extractPhone(text));
            data.setLinkedIn(extractLinkedIn(text));
            data.setGithub(extractGithub(text));
            data.setEducation(extractSection(text, "Education"));
            data.setProjects(extractSection(text, "Projects"));
            data.setExperience(extractSection(text, "Experience"));
            data.setSkills(extractSection(text, "Skills"));
            data.setCertifications(extractSection(text, "Certifications"));
            data.setTechnologies(extractSection(text, "Technologies"));

            return data;

        } catch (Exception e) {
            e.printStackTrace();
            return new ResumeData(); // return empty DTO on error
        }
    }

    // Extract text from PDF or DOCX
    private String extractTextFromResume(Path filePath) throws Exception {
        String fileName = filePath.getFileName().toString().toLowerCase();
        if (fileName.endsWith(".pdf")) {
            try (PDDocument document = PDDocument.load(Files.newInputStream(filePath))) {
                PDFTextStripper stripper = new PDFTextStripper();
                return stripper.getText(document);
            }
        } else if (fileName.endsWith(".docx")) {
            try (FileInputStream fis = new FileInputStream(filePath.toFile())) {
                XWPFDocument document = new XWPFDocument(fis);
                StringBuilder text = new StringBuilder();
                for (XWPFParagraph p : document.getParagraphs()) {
                    text.append(p.getText()).append("\n");
                }
                return text.toString();
            }
        } else {
            throw new IllegalArgumentException("Unsupported file format");
        }
    }

    // --- Basic Info Extraction ---
    private String extractName(String text) {
        String[] lines = text.split("\\r?\\n");
        for (String line : lines) {
            if (line.trim().length() > 2 && line.matches(".*[a-zA-Z]+.*")) {
                return line.trim();
            }
        }
        return "Name not found";
    }

    private String extractEmail(String text) {
        Pattern emailPattern = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}");
        Matcher matcher = emailPattern.matcher(text);
        return matcher.find() ? matcher.group() : "Email not found";
    }

    private String extractPhone(String text) {
        Pattern phonePattern = Pattern.compile("\\+?\\d[\\d\\s.-]{7,}\\d");
        Matcher matcher = phonePattern.matcher(text);
        return matcher.find() ? matcher.group() : "Phone not found";
    }

    private String extractLinkedIn(String text) {
        Pattern pattern = Pattern.compile("(https?:\\/\\/)?(www\\.)?linkedin\\.com\\/[^\\s]+", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group() : "LinkedIn not found";
    }

    private String extractGithub(String text) {
        Pattern pattern = Pattern.compile("(https?:\\/\\/)?(www\\.)?github\\.com\\/[^\\s]+", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group() : "GitHub not found";
    }

    // --- Section Extraction (Education, Projects, Experience, Skills, Certifications, Technologies) ---
    private List<String> extractSection(String text, String sectionName) {
        List<String> items = new ArrayList<>();
        Pattern pattern = Pattern.compile(
            sectionName + "\\s*[:\\-]?\\s*(.*?)(\\n\\n|\\r\\n\\r\\n|$)",
            Pattern.CASE_INSENSITIVE | Pattern.DOTALL
        );
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            String sectionText = matcher.group(1);
            String[] lines = sectionText.split("[\\n,;]");
            for (String line : lines) {
                if (!line.trim().isEmpty()) items.add(line.trim());
            }
        }
        return items;
    }
}
