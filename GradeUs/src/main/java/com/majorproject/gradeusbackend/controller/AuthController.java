package com.majorproject.gradeusbackend.controller;

import com.majorproject.gradeusbackend.model.AuthResponse;
import com.majorproject.gradeusbackend.model.LoginRequest;
import com.majorproject.gradeusbackend.model.RegisterRequest;
import com.majorproject.gradeusbackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello!";
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request
    )
    {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }
}