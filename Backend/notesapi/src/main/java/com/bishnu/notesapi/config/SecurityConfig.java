package com.bishnu.notesapi.config;

import com.bishnu.notesapi.security.JwtFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication
        .UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;


    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http
    )throws Exception{

        http
                .csrf(csrf->csrf.disable())

                .cors(cors->{})

/* allow websocket + auth */
                .authorizeHttpRequests(auth->auth

                        .requestMatchers(
                                "/auth/**",
                                "/ws/**",
                                "/ws/info/**"
                        )
                        .permitAll()

                        .anyRequest()
                        .permitAll()

                )

/* keep jwt filter */
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();

    }

}