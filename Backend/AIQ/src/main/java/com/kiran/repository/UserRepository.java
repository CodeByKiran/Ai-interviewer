package com.kiran.repository;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kiran.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    
    void deleteByUsername(String username);
    
    void deleteByEmail(String email);
}
