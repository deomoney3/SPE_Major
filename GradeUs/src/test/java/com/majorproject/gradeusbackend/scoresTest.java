package com.majorproject.gradeusbackend;

import com.majorproject.gradeusbackend.entity.Score;
import com.majorproject.gradeusbackend.entity.User;
import com.majorproject.gradeusbackend.model.ScoreResponse;
import com.majorproject.gradeusbackend.repository.ScoreRepository;
import com.majorproject.gradeusbackend.repository.TopicRepository;
import com.majorproject.gradeusbackend.repository.UserRepository;
import com.majorproject.gradeusbackend.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class scoresTest {

    @Mock
    private ScoreRepository scoreRepository;

    @Mock
    private TopicRepository topicRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private StudentService studentService;

    private User user;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        user = User.builder().id(1L).username("testuser").password("testpassword").build();
        Authentication authentication = new TestingAuthenticationToken(user, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
    @DisplayName("Test getScore() with existing score")
    public void testGetScoreWithExistingScore() {
        Score score = Score.builder().scoreValue(80L).build();
        Long studentId = 2L;
        Long topicId = 3L;
        Long scorerId = user.getId();

        when(scoreRepository.findByStudent_IdAndScorer_IdAndTopic_TopicId(studentId, scorerId, topicId)).thenReturn(score);

        ScoreResponse scoreResponse = studentService.getScore(studentId, topicId);

        assertNotNull(scoreResponse);
        assertEquals(80L, scoreResponse.getScoreValue());
        assertTrue(scoreResponse.getPresent());
    }

    @Test
    @DisplayName("Test getScore() with non-existing score")
    public void testGetScoreWithNonExistingScore() {
        Long studentId = 2L;
        Long topicId = 3L;
        Long scorerId = user.getId();

        when(scoreRepository.findByStudent_IdAndScorer_IdAndTopic_TopicId(studentId, scorerId, topicId)).thenReturn(null);

        ScoreResponse scoreResponse = studentService.getScore(studentId, topicId);

        assertNotNull(scoreResponse);
        assertEquals(0L, scoreResponse.getScoreValue());
        assertFalse(scoreResponse.getPresent());
    }
}
