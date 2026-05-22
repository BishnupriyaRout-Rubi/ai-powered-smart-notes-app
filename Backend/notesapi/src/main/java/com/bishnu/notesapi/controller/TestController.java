package com.bishnu.notesapi.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    public class TestController {

        @GetMapping("/")
        public String home() {
            return "Notes API Running Successfully";
        }
    }

