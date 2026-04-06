package com.bishnu.notesapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bishnu.notesapi.model.User;
import com.bishnu.notesapi.repository.UserRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    // 🔥 SIGNUP API
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        // check user already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "User already exists!";
        }

        userRepository.save(user);
        return "User registered successfully!";
    }
    // 🔥 LOGIN API
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return "User not found!";
        }

        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid password!";
        }

        return "Login successful!";
    }
    @PutMapping("/forgot")
    public String forgotPassword(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser == null) {
            return "User not found!";
        }

        existingUser.setPassword(user.getPassword());
        userRepository.save(existingUser);

        return "Password updated successfully!";
    }
}
