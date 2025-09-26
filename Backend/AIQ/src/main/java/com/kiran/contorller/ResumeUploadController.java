package com.kiran.contorller;


import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/resume")
public class ResumeUpload {

    @PostMapping("/upload")
    public String uploadResume(@RequestParam("file") MultipartFile file) throws IOException {
        // Extract text from PDF
        String resumeText = extractTextFromPDF(file);

        // Extract skills
        List<String> skills = extractSkills(resumeText);

        // Pass skills to another method (e.g., save to database)
        processSkills(skills);

        return "Resume uploaded and skills extracted";
    }

    private String extractTextFromPDF(MultipartFile file) throws IOException {
        PDDocument document = PDDocument.load(file.getInputStream());
        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(document);
        document.close();
        return text;
    }
    private List<String> extractSkills(String resumeText) {
        List<String> skills = new ArrayList<>();
        String[] predefinedSkills = {
            "java", "python", "c++", "javascript", "ruby", "go", "rust", "php", "swift", "typescript", "kotlin", "sql", 
            "html", "css", "scala", "haskell", "perl", "lua", "r", "spring boot", "django", "react", "angular", "vue.js", 
            "flask", "rails", "node.js", "express", "laravel", "asp.net", "flutter", "ionic", "jquery", "mysql", 
            "postgresql", "mongodb", "oracle", "sql server", "redis", "cassandra", "sqlite", "firebase", "neo4j", 
            "elasticsearch", "git", "github", "gitlab", "bitbucket", "svn", "aws", "azure", "google cloud", "docker", 
            "kubernetes", "terraform", "ansible", "heroku", "jenkins", "circleci", "travis ci", "nginx", "apache", "junit", 
            "mocha", "jest", "pytest", "selenium", "cucumber", "chai", "jasmine", "agile", "scrum", "kanban", "waterfall", 
            "pair programming", "tdd", "bdd", "requirements gathering", "use cases", "process mapping", "user stories", 
            "gap analysis", "business modeling", "workflow optimization", "data visualization", "business intelligence", 
            "excel", "sql", "data mining", "tableau", "power bi", "google analytics", "python for data analysis", 
            "tensorflow", "pytorch", "scikit-learn", "keras", "neural networks", "nlp", "image processing", "deep learning", 
            "reinforcement learning", "statistics", "probability", "regression analysis", "hypothesis testing", 
            "time series analysis", "bayesian analysis", "data cleaning", "clean code", "code reviews", "refactoring", 
            "design patterns", "responsive design", "wireframing", "prototyping", "usability testing", "user personas", 
            "user flows", "mockups", "figma", "adobe xd", "sketch", "routers", "switches", "firewalls", "ip addressing", 
            "tcp/ip", "dns", "http", "https", "vpn", "subnetting", "wi-fi", "network topology", "load balancing", 
            "network protocols", "linux", "windows", "macos", "unix", "ubuntu", "centos", "redhat", "fedora", "debian", 
            "raspberry pi", "vmware", "hyper-v", "virtualbox", "kvm", "arduino", "microcontrollers", "circuit design", 
            "iot", "embedded c", "firmware development", "firewalls", "encryption", "ssl/tls", "network security", 
            "cybersecurity", "penetration testing", "kali linux", "ethical hacking", "rsa", "vpn", "communication", "teamwork", 
            "problem-solving", "time management", "leadership", "adaptability", "conflict resolution", "decision making", 
            "critical thinking", "negotiation", "microsoft office", "excel", "powerpoint", "word", "outlook", "google docs", 
            "trello", "slack", "zoom", "microsoft teams", "confluence", "notion", "digital marketing", "seo", "social media marketing", 
            "email marketing", "content creation", "adwords", "facebook ads", "google ads", "market research"
        };

        // Convert the resume text to lowercase for case-insensitive comparison
        resumeText = resumeText.toLowerCase();

        for (String skill : predefinedSkills) {
            // Check if the resume contains the skill (case-insensitive)
            if (resumeText.contains(skill)) {
                skills.add(skill);
            }
        }
        return skills;
    }




    private void processSkills(List<String> skills) {
        // Logic to pass skills to another method, like saving to DB
        System.out.println("Extracted Skills: " + skills);
    }
}
