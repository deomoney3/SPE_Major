package com.majorproject.gradeusbackend;

import com.majorproject.gradeusbackend.service.JwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

public class JwtServiceTest {

    @Mock
    private UserDetails userDetails;

    @Spy
    @InjectMocks
    private JwtService jwtService;

    private String token;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        token = createToken("testUser");
    }

    @Test
    public void testIsTokenValidWithValidTokenAndMatchingUserDetails() {
        when(userDetails.getUsername()).thenReturn("testUser");
        assertTrue(jwtService.isTokenValid(token, userDetails));
    }

    @Test
    public void testIsTokenValidWithValidTokenAndNonMatchingUserDetails() {
        when(userDetails.getUsername()).thenReturn("anotherUser");
        assertFalse(jwtService.isTokenValid(token, userDetails));
    }

    private String createToken(String username) {
        Map<String, Object> extraClaims = new HashMap<>();
        return jwtService.generateToken(extraClaims, new org.springframework.security.core.userdetails.User(username,
                "", new java.util.ArrayList<>()));
    }

    private String createTokenWithExpiration(String username, Date expiration) {
        Map<String, Object> extraClaims = new HashMap<>();
        Key key = Keys.hmacShaKeyFor(jwtService.getSecretKey().getBytes());
        return Jwts.builder().setClaims(extraClaims).setSubject(username).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expiration).signWith(key).compact();
    }



}
