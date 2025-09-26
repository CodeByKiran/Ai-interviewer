package com.kiran.service;

import java.io.InputStream;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TextExtractionService {

	public String extractText(MultipartFile file) throws Exception {
		String fileName = file.getOriginalFilename().toLowerCase();

		if (fileName.endsWith(".pdf")) {
			try (PDDocument document = PDDocument.load(file.getInputStream())) {
				PDFTextStripper stripper = new PDFTextStripper();
				return stripper.getText(document);
			}
		} else if (fileName.endsWith(".docx")) {
			try (InputStream is = file.getInputStream(); XWPFDocument doc = new XWPFDocument(is)) {
				XWPFWordExtractor extractor = new XWPFWordExtractor(doc);
				return extractor.getText();
			}
		} else {
			throw new IllegalArgumentException("Unsupported file type");
		}
	}
}
