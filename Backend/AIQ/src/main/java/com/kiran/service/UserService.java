package com.kiran.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kiran.model.User;
import com.kiran.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new user
    public User registerUser(User user) {
        
        // Check if the username already exists
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Username already taken");
        }

        // Check if the email already exists
        Optional<User> existingEmail = userRepository.findByEmail(user.getEmail());
        if (existingEmail.isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        
        // Save the new user if no conflicts are found
        return userRepository.save(user);  
    }
    

    // Find user by username
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Find user by email
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Login user (for simplicity, just check if the username and password match)
    public boolean loginUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent() && user.get().getPassword().equals(password);
    }

    // Check if username exists (returns Optional)
    public Optional<User> usernameExists(String username) {
        return userRepository.findByUsername(username);
    }

    // Check if an email exists
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    // Delete user by username
    public void deleteUserByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    // Delete user by email
    public void deleteUserByEmail(String email) {
        userRepository.deleteByEmail(email);
    }
}
