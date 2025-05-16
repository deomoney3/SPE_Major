package com.majorproject.gradeusbackend.repository;

import com.majorproject.gradeusbackend.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClassRepository extends JpaRepository<Class, Long> {
    List<Class> findByTeacher_Id(Long teacherId);

    @Query(value = "SELECT * FROM class WHERE class_id IN (SELECT DISTINCT class_id FROM class_group WHERE class_group_id IN (SELECT DISTINCT group_id FROM student_group_map WHERE student_id = ?1))", nativeQuery = true)
    List<Class> findAllClassesForStudent(Long studentId);

}