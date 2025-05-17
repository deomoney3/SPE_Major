package com.majorproject.gradeusbackend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.majorproject.gradeusbackend.utils.StudentGroupMapId;
import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "student_group_map")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class StudentGroupMap {

    @EmbeddedId
    private StudentGroupMapId studentGroupMapId;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("studentId")
    @JoinColumn(name = "student_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    private User student;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("groupId")
    @JoinColumn(name = "group_id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "groupId")
    @JsonIdentityReference(alwaysAsId = true)
    private ClassGroup group;
}