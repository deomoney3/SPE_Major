package com.majorproject.gradeusbackend.repository;

import com.majorproject.gradeusbackend.entity.ClassGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassGroupRepository extends JpaRepository<ClassGroup, Long> {
    List<ClassGroup> findByClassObj_ClassId(Long classId);
}