package com.kiran.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.api.GenerationConfig;
import com.google.cloud.vertexai.api.HarmCategory;
import com.google.cloud.vertexai.api.SafetySetting;
import com.google.cloud.vertexai.generativeai.ChatSession;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;

import jakarta.annotation.PostConstruct;

@Service
public class VertexService {

    private VertexAI vertexAi;
    private GenerativeModel model;

    @PostConstruct
    public void init() throws IOException {

        vertexAi = new VertexAI("Your project id ", "us-central1");

        GenerationConfig generationConfig = GenerationConfig.newBuilder()
                .setMaxOutputTokens(8192)
                .setTemperature(2F)
                .setTopP(0.95F)
                .build();

        List<SafetySetting> safetySettings = Arrays.asList(
                SafetySetting.newBuilder()
                        .setCategory(HarmCategory.HARM_CATEGORY_HATE_SPEECH)
                        .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE)
                        .build(),
                SafetySetting.newBuilder()
                        .setCategory(HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT)
                        .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE)
                        .build(),
                SafetySetting.newBuilder()
                        .setCategory(HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT)
                        .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE)
                        .build(),
                SafetySetting.newBuilder()
                        .setCategory(HarmCategory.HARM_CATEGORY_HARASSMENT)
                        .setThreshold(SafetySetting.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE)
                        .build()
        );

        model = new GenerativeModel.Builder()
                .setModelName("gemini-1.5-flash-002")
                .setVertexAi(vertexAi)
                .setGenerationConfig(generationConfig)
                .setSafetySettings(safetySettings)
                .build();
    }

    public GenerateContentResponse generateInterviewQuestion(String topic) throws IOException {
        // Update the system instruction dynamically with the selected topic
        var systemInstruction = ContentMaker
            .fromMultiModalData("You are an AI interview assistant. The user has selected the topic: " + topic + ". Your task is to generate 8-9 interview questions on this topic. Each question should test different aspects, such as core concepts, problem-solving, and best practices, covering a range of difficulty levels, from basic to advanced. Do not deviate from the topic. Focus on testing the candidate's knowledge thoroughly on this subject.");

        ChatSession chatSession = model.startChat();
        try {
            // Send the prompt dynamically and return the response
            return chatSession.sendMessage(systemInstruction);
        } catch (Exception e) {
            e.printStackTrace();
            throw new IOException("Error generating question.");
        }
    }
}
