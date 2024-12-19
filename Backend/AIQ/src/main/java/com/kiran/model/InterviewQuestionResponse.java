package com.kiran.model;

public class InterviewQuestionResponse {
    private String message;
    private String questions;

    // Constructor
    public InterviewQuestionResponse(String message, String questions) {
        this.message = message;
        this.questions = questions;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getQuestions() {
        return questions;
    }

    public void setQuestions(String questions) {
        this.questions = questions;
    }
}
