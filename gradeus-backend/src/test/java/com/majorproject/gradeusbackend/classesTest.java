package com.majorproject.gradeusbackend;

import com.majorproject.gradeusbackend.entity.Class;
import com.majorproject.gradeusbackend.entity.User;
import com.majorproject.gradeusbackend.repository.ClassRepository;
import com.majorproject.gradeusbackend.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class classesTest
{

    @Mock
    private ClassRepository classRepository;

    @InjectMocks
    private StudentService studentService;

    @BeforeEach
    void setUp()
    {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllClasses()
    {
        // Mock the authentication object
        User user = User.builder().id(1L).username("testuser").build();
        Authentication auth = new UsernamePasswordAuthenticationToken(user, null);
        SecurityContextHolder.getContext().setAuthentication(auth);

        // Mock the repository method
        List<Class> expectedClasses = new ArrayList<>();
        expectedClasses.add(Class.builder().classId(1L).name("Test Class 1").teacher(user).build());
        expectedClasses.add(Class.builder().classId(2L).name("Test Class 2").teacher(user).build());
        when(classRepository.findAllClassesForStudent(user.getId())).thenReturn(expectedClasses);

        // Call the service method
        List<Class> actualClasses = studentService.getAllClasses();

        // Assert that the expected and actual lists of classes are equal
        assertEquals(expectedClasses, actualClasses);
    }

    // Add more test cases as needed for other methods in the StudentService class






}
