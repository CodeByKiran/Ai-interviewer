/*package com.kiran.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.Value;
import reactor.core.publisher.Mono;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kiran.model.InterviewQuestionResponse;

@Service
public class OpenAiService {

    private final WebClient webClient;

    @Value("${spring.ai.openai.api.key}")
    private String apiKey;

    public OpenAiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1")
                                         .build();
    }

    public Mono<InterviewQuestionResponse> askQuestion(String subject) {
        String prompt = "Generate an interview question for the subject: " + subject;
        
        // Construct the JSON request body for chat-based models
        String requestBody = """
            {
              "model": "gpt-3.5-turbo",  
              "messages": [
                {
                  "role": "user",
                  "content": "%s"
                }
              ],
              "max_tokens": 100
            }
            """.formatted(prompt);
        
        return webClient.post()
                        .uri("/chat/completions")  // Use the correct chat endpoint
                        .header("Authorization", "Bearer " + apiKey)
                        .header("Content-Type", "application/json")
                        .bodyValue(requestBody)
                        .retrieve()
                        .bodyToMono(String.class)
                        .doOnNext(response -> System.out.println("OpenAI response: " + response))
                        .map(response -> extractQuestionFromResponse(response));  // Extract question
    }

    private InterviewQuestionResponse extractQuestionFromResponse(String response) {
        try {
            // Use Jackson to parse the response
            JsonNode jsonResponse = new ObjectMapper().readTree(response);
            String question = jsonResponse
                .path("choices")
                .path(0)
                .path("message")
                .path("content")
                .asText();  // Extract the question from the response

            return new InterviewQuestionResponse(question);
        } catch (Exception e) {
            throw new RuntimeException("Error extracting question from response", e);
        }
    }
}*/
