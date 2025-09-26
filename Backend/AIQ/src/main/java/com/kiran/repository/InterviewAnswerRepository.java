package com.kiran.repository;

import com.kiran.entity.InterviewAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InterviewAnswerRepository extends JpaRepository<InterviewAnswer, Long> {
    List<InterviewAnswer> findByCandidateEmail(String email);
}
