/*package com.kiran.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GeminiService {

    private final WebClient webClient;

    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.fake.com/vertex-ai")
                                        .build();
    }

    public String askQuestion(String subject, int questionIndex) {
        // Simulated response for testing
        if (subject != null && questionIndex >= 0) {
            return "Dummy question for subject " + subject + " at index " + questionIndex;
        }
        return "Error: No valid subject or question index.";
    }
}*/
