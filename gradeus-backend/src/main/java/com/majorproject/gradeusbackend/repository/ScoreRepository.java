package com.majorproject.gradeusbackend.repository;

import com.majorproject.gradeusbackend.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    Score findByStudent_IdAndScorer_IdAndTopic_TopicId(Long studentId,
                                                       Long scorerId,
                                                       Long topicId);

    List<Score> findByTopic_TopicId(Long topicId);

    Long deleteByStudent_IdAndScorer_IdAndTopic_TopicId(Long studentId,
                                                        Long scorerId,
                                                        Long topicId);
}