package com.kiran.contorller;

import com.kiran.entity.*;
import com.kiran.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/interview")
public class InterviewControl {

    @Autowired
    private CandidateRepository candidateRepo;

    @Autowired
    private InterviewQuestionRepository questionRepo;

    @Autowired
    private InterviewAnswerRepository answerRepo;

    @Autowired
    private SnapshotRepository snapshotRepo;

    @Autowired
    private ActivityLogRepository activityRepo;

    // ---------------- Start Interview ----------------
    @PostMapping("/generate")
    public List<InterviewQuestion> generateQuestions(@RequestBody Map<String, Object> payload) {
        String email = (String) payload.get("candidateEmail");
        List<String> skills = (List<String>) payload.get("skills");

        // Save candidate if not exists
        if (!candidateRepo.existsByEmail(email)) {
            Candidate candidate = new Candidate();
            candidate.setEmail(email);
            candidate.setName((String) payload.getOrDefault("name", "Unknown"));
            candidate.setPhone((String) payload.getOrDefault("phone", ""));
            candidateRepo.save(candidate);
        }

        // For now, mock questions (6 questions: easy-medium-hard)
        List<InterviewQuestion> questions = new ArrayList<>();
        String[] difficulties = {"Easy", "Medium", "Hard"};
        for (int i = 0; i < 6; i++) {
            InterviewQuestion q = new InterviewQuestion();
            q.setCandidateEmail(email);
            q.setDifficulty(difficulties[i % 3]);
            q.setQuestionText("Sample Question " + (i + 1) + " related to skills: " + String.join(", ", skills));
            questionRepo.save(q);
            questions.add(q);
        }

        return questions;
    }

    // ---------------- Log Activity ----------------
    @PostMapping("/log-activity")
    public String logActivity(@RequestBody Map<String, Object> payload) {
        ActivityLog log = new ActivityLog();
        log.setCandidateEmail((String) payload.get("candidateId"));
        log.setActivityType((String) payload.get("type"));
        log.setTimestamp((Long) payload.get("timestamp"));
        activityRepo.save(log);
        return "Activity logged";
    }

    // ---------------- Snapshot Upload ----------------
    @PostMapping("/snapshot")
    public String uploadSnapshot(@RequestBody Map<String, Object> payload) {
        Snapshot snapshot = new Snapshot();
        snapshot.setCandidateEmail((String) payload.get("candidateId"));
        snapshot.setTimestamp((Long) payload.get("timestamp"));
        snapshot.setImageBase64((String) payload.get("imageBase64"));
        snapshotRepo.save(snapshot);
        return "Snapshot saved";
    }

    // ---------------- Submit Interview ----------------
    @PostMapping("/submit")
    public String submitInterview(@RequestBody Map<String, Object> payload) {
        String candidateEmail = (String) payload.get("candidateId");
        Map<String, String> answers = (Map<String, String>) payload.get("answers");

        // Save answers
        for (Map.Entry<String, String> entry : answers.entrySet()) {
            Long questionId = Long.parseLong(entry.getKey());
            String ans = entry.getValue();

            InterviewAnswer answer = new InterviewAnswer();
            answer.setCandidateEmail(candidateEmail);
            answer.setQuestionId(questionId);
            answer.setAnswer(ans);
            answerRepo.save(answer);
        }

        return "Interview submitted successfully!";
    }
}
