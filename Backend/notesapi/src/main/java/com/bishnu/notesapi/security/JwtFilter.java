package com.bishnu.notesapi.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter
        extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    )throws ServletException, IOException{


        if(
                request.getMethod()
                        .equalsIgnoreCase("OPTIONS")
        ){
            filterChain.doFilter(
                    request,
                    response
            );
            return;
        }



        /* current path */
        String path=
                request.getServletPath();



        /* allow public endpoints + websocket */
        if(
                path.startsWith("/auth")
                        ||
                        path.startsWith("/files")
                        ||
                        path.startsWith("/uploads")


                        ||
                        path.startsWith("/ws")
                        ||
                        path.startsWith("/test")
        ){
            filterChain.doFilter(
                    request,
                    response
            );
            return;
        }



        /* protected routes need token */
        String authHeader=
                request.getHeader(
                        "Authorization"
                );



        if(
                authHeader==null
                        ||
                        !authHeader.startsWith(
                                "Bearer "
                        )
        ){
            response.setStatus(
                    HttpServletResponse
                            .SC_UNAUTHORIZED
            );
            return;
        }



        /* token exists allow */
        filterChain.doFilter(
                request,
                response
        );

    }

}