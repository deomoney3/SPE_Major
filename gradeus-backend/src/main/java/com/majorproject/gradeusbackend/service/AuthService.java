package com.majorproject.gradeusbackend.service;

import com.majorproject.gradeusbackend.entity.User;
import com.majorproject.gradeusbackend.model.AuthResponse;
import com.majorproject.gradeusbackend.model.LoginRequest;
import com.majorproject.gradeusbackend.model.RegisterRequest;
import com.majorproject.gradeusbackend.repository.UserRepository;
import com.majorproject.gradeusbackend.utils.Role;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService
{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request)
    {
        log.info("Register function is called.");
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole()))
                .username(request.getUsername())
                .phoneNumber(request.getPhoneNumber())
                .build();
        try
        {
            userRepository.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AuthResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (Exception exception)
        {
            // log.info("Duplicate user is found.");
            log.error("Duplicate user is found.", exception);
            return AuthResponse.builder().message("Duplicate User Found!").build();
        }
    }

    public AuthResponse login(LoginRequest request)
    {
        log.info("Login function is called.");
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        UserDetails user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();
        User userObject = (User) user;
        String jwtToken = jwtService.generateToken(user);

        log.info("Sending the jwt token back");
        return AuthResponse.builder()
                .id(userObject.getId())
                .token(jwtToken)
                .username(userObject.getUsername())
                .email(userObject.getEmail())
                .firstname(userObject.getFirstname())
                .lastname(userObject.getLastname())
                .role(userObject.getRole().name())
                .build();
    }


}
