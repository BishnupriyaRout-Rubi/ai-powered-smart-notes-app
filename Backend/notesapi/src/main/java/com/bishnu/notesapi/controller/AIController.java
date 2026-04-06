package com.bishnu.notesapi.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/ai")
public class AIController {


    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ai.key}")
    private String apiKey;
    @PostMapping("/generate")
    public String generateText(@RequestBody Map<String, String> body) {

        String prompt = body.get("prompt");

        try {
            String url = "https://openrouter.ai/api/v1/chat/completions";

            // 🔥 HEADERS
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey); // 🔴 apna key
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 🔥 REQUEST BODY
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "openrouter/auto");

            List<Map<String, String>> messages = new ArrayList<>();
            Map<String, String> msg = new HashMap<>();
            msg.put("role", "user");
            msg.put("content", prompt);

            messages.add(msg);
            requestBody.put("messages", messages);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(requestBody, headers);

            // 🔥 API CALL
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            String responseBody = response.getBody();

            // 🔥 JSON PARSE
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(responseBody);

            String aiText = jsonNode
                    .get("choices")
                    .get(0)
                    .get("message")
                    .get("content")
                    .asText();

            return aiText;

        } catch (Exception e) {
            e.printStackTrace();
            return "AI service temporarily unavailable";
        }
    }
}