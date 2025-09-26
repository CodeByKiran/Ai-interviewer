package com.kiran.repository;

import com.kiran.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    boolean existsByEmail(String email);
    Candidate findByEmail(String email);
}
