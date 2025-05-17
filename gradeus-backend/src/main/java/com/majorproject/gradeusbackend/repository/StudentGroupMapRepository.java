package com.majorproject.gradeusbackend.repository;

import com.majorproject.gradeusbackend.entity.StudentGroupMap;
import com.majorproject.gradeusbackend.utils.StudentGroupMapId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentGroupMapRepository extends JpaRepository<StudentGroupMap, StudentGroupMapId> {

    Long deleteByStudent_IdAndGroup_ClassGroupId(Long studentId, Long groupId);
}