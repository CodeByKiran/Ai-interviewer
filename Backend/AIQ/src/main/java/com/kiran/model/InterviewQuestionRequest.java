package com.kiran.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class InterviewQuestionRequest {
    private String subject;

    // Constructor with annotations
    @JsonCreator
    public InterviewQuestionRequest(@JsonProperty("subject") String subject) {
        this.subject = subject;
    }

    // Getter and Setter
    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
