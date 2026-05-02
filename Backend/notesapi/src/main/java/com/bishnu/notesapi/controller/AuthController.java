package com.bishnu.notesapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.bishnu.notesapi.model.User;
import com.bishnu.notesapi.repository.UserRepository;
import com.bishnu.notesapi.security.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;



    @PostMapping("/signup")
    public String signup(@RequestBody User user){

        if(userRepository.findByEmail(
                user.getEmail()) != null){
            return "User already exists!";
        }

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        userRepository.save(user);

        return "User registered successfully!";
    }



    @PostMapping("/login")
    public Map<String,String> login(
            @RequestBody User user){

        Map<String,String> response =
                new HashMap<>();

        User existingUser=
                userRepository.findByEmail(
                        user.getEmail()
                );

        if(existingUser==null){
            response.put("error",
                    "User not found");
            return response;
        }

        if(!passwordEncoder.matches(
                user.getPassword(),
                existingUser.getPassword()
        )){
            response.put("error",
                    "Invalid password");
            return response;
        }

        String token=
                jwtUtil.generateToken(
                        existingUser.getEmail()
                );

        response.put(
                "token",
                token
        );

        response.put(
                "message",
                "Login successful"
        );

        return response;
    }



    @PutMapping("/forgot")
    public String forgotPassword(
            @RequestBody User user){

        User existingUser=
                userRepository.findByEmail(
                        user.getEmail()
                );

        if(existingUser==null){
            return "User not found!";
        }

        existingUser.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        userRepository.save(
                existingUser
        );

        return "Password updated successfully!";
    }

}