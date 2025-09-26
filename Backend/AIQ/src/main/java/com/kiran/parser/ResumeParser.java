package com.kiran.parser;

import opennlp.tools.namefind.NameFinderME;
import opennlp.tools.namefind.TokenNameFinderModel;
import opennlp.tools.tokenize.SimpleTokenizer;
import opennlp.tools.util.Span;

import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ResumeParser {

    private TokenNameFinderModel nameModel;

    public ResumeParser() {
        // Try loading OpenNLP model
        try (InputStream modelIn = getClass().getClassLoader().getResourceAsStream("models/en-ner-person.bin")) {
            if (modelIn != null) {
                nameModel = new TokenNameFinderModel(modelIn);
            } else {
                System.out.println("OpenNLP name model not found. Will use fallback extraction.");
            }
        } catch (Exception e) {
            System.out.println("Error loading OpenNLP model: " + e.getMessage());
        }
    }

    public String extractName(String text) {
        // If model is available, use OpenNLP
        if (nameModel != null) {
            NameFinderME nameFinder = new NameFinderME(nameModel);
            String[] tokens = SimpleTokenizer.INSTANCE.tokenize(text);
            Span[] nameSpans = nameFinder.find(tokens);
            if (nameSpans.length > 0) {
                StringBuilder name = new StringBuilder();
                for (Span span : nameSpans) {
                    for (int i = span.getStart(); i < span.getEnd(); i++) {
                        name.append(tokens[i]).append(" ");
                    }
                }
                return name.toString().trim();
            }
        }

        // Fallback: simple regex-based extraction (looks for capitalized words at start)
        Pattern pattern = Pattern.compile("\\b([A-Z][a-z]+\\s[A-Z][a-z]+)\\b");
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group(1);
        }

        return "Name not found";
    }

    public String extractEmail(String text) {
        Pattern emailPattern = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,6}");
        Matcher matcher = emailPattern.matcher(text);
        return matcher.find() ? matcher.group() : "Email not found";
    }

    public String extractPhone(String text) {
        Pattern phonePattern = Pattern.compile("\\+?\\d[\\d\\s.-]{7,}\\d");
        Matcher matcher = phonePattern.matcher(text);
        return matcher.find() ? matcher.group() : "Phone not found";
    }

    // Add more extractors (skills, education) later if needed
}
