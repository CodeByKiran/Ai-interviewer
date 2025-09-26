package com.kiran.DTO;

public class InterviewQuestion {
    private int id;
    private String question;
    private String difficulty;

    public InterviewQuestion() {}

    public InterviewQuestion(int id, String question, String difficulty) {
        this.id = id;
        this.question = question;
        this.difficulty = difficulty;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
