package com.majorproject.gradeusbackend.repository;

import com.majorproject.gradeusbackend.entity.User;
import com.majorproject.gradeusbackend.utils.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query(value = "SELECT * FROM user WHERE id IN (SELECT student_id FROM student_group_map WHERE group_id = ?1)", nativeQuery = true)
    List<User> findStudentsInGroup(Long groupId);

    @Query(value = "SELECT * FROM user WHERE role = 'STUDENT' AND id NOT IN (SELECT DISTINCT student_id FROM student_group_map WHERE group_id in (SELECT class_group_id FROM class_group WHERE class_id = ?1))", nativeQuery = true)
    List<User> findStudentsNotInGroup(Long classId);

    List<User> findByRole(Role role);
    @Query(value = """
    SELECT * 
    FROM user 
    WHERE id IN (
        SELECT student_id 
        FROM student_group_map 
        WHERE group_id IN (
            SELECT DISTINCT group_id 
            FROM class_group 
            JOIN student_group_map ON class_group_id = group_id 
            WHERE student_id = ?1 AND class_id = ?2
        )
    ) 
    AND id != ?1
    """, nativeQuery = true)
    List<User> getGroupMembersInClass(Long studentId, Long classId);


}
