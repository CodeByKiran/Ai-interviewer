package com.kiran.contorller;

import com.google.cloud.vertexai.api.Candidate;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.kiran.model.InterviewQuestionResponse;
import com.kiran.service.VertexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    private final VertexService vertexService;

    @Autowired
    public InterviewController(VertexService vertexService) {
        this.vertexService = vertexService;
    }

    @GetMapping("/generateQuestion")
    public InterviewQuestionResponse generateQuestion(@RequestParam String topic) {
        try {
            // Call the service to generate the interview question
            GenerateContentResponse generatedQuestion = vertexService.generateInterviewQuestion(topic);

            // Check if generatedQuestion or its candidates list is null or empty
            if (generatedQuestion == null || generatedQuestion.getCandidatesList() == null || generatedQuestion.getCandidatesList().isEmpty()) {
                return new InterviewQuestionResponse("No questions were generated", null);
            }

            // Access the first candidate's content
            Candidate candidate = generatedQuestion.getCandidatesList().get(0);

            if (candidate == null || candidate.getContent() == null) {
                return new InterviewQuestionResponse("No content available", null);
            }

            // Extract the text from the parts of the content
            StringBuilder contentBuilder = new StringBuilder();
            for (var part : candidate.getContent().getPartsList()) {
                contentBuilder.append(part.getText()).append("\n\n");
            }

            // Return the response with questions
            return new InterviewQuestionResponse("Success", contentBuilder.toString().trim());
        } catch (IOException e) {
            // Log the error and return a specific error message
            e.printStackTrace();
            return new InterviewQuestionResponse("Error generating question", e.getMessage());
        }
    }

}
