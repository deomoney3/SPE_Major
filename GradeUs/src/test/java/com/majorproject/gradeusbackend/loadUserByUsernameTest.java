package com.majorproject.gradeusbackend;

import com.majorproject.gradeusbackend.entity.User;
import com.majorproject.gradeusbackend.repository.UserRepository;
import com.majorproject.gradeusbackend.service.UserDetailsServiceImpl;
import com.majorproject.gradeusbackend.utils.Role;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class loadUserByUsernameTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @BeforeEach
    public void setUp() {
        // Reset the mock objects before each test
        // to ensure a clean state
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
    }

    @Test
    public void testLoadUserByUsername() {
        User user = User.builder()
                .id(1L)
                .username("testuser")
                .password("testpassword")
                .firstname("Test")
                .lastname("User")
                .email("testuser@example.com")
                .phoneNumber("1234567890")
                .role(Role.STUDENT)
                .build();

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        Assertions.assertEquals(user, userDetailsService.loadUserByUsername("testuser"));
    }

}

