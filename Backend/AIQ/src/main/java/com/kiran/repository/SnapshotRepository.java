package com.kiran.repository;

import com.kiran.entity.Snapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SnapshotRepository extends JpaRepository<Snapshot, Long> {
    List<Snapshot> findByCandidateEmail(String email);
}
