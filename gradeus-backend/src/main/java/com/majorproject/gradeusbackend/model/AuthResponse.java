package com.majorproject.gradeusbackend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private Long id;
    private String token;
    private String username;
    private String role;
    private String firstname;
    private String lastname;
    private String email;
    private String phoneNumber;
    private String message;
}

