package com.majorproject.gradeusbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScoreModel {
    private Long studentId;
    private Long scorerId;
    private Long topicId;
    private Long scoreValue;
}
