package com.bishnu.notesapi.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET=
            "myverysecurejwtsecretkeyfornotesappbishnu2026secure12345";

    private Key getKey(){
        return Keys.hmacShaKeyFor(
                SECRET.getBytes(
                        StandardCharsets.UTF_8
                )
        );
    }


    public String generateToken(
            String email
    ){

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(
                        new Date()
                )
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        +86400000
                        )
                )
                .signWith(
                        getKey()
                )
                .compact();

    }



    public String extractEmail(
            String token
    ){

        Claims claims=
                Jwts.parserBuilder()
                        .setSigningKey(getKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

        return claims.getSubject();

    }



    public boolean validateToken(
            String token
    ){

        try{

            Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token);

            return true;

        }
        catch(Exception e){
            return false;
        }

    }

}