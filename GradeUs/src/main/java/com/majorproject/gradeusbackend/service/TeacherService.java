package com.majorproject.gradeusbackend.service;

import com.majorproject.gradeusbackend.entity.*;
import com.majorproject.gradeusbackend.entity.Class;
import com.majorproject.gradeusbackend.exceptions.InvalidAccessException;
import com.majorproject.gradeusbackend.exceptions.ResourceNotFoundException;
import com.majorproject.gradeusbackend.repository.*;
import com.majorproject.gradeusbackend.utils.Role;
import com.majorproject.gradeusbackend.utils.StudentGroupMapId;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class TeacherService
{

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private ClassGroupRepository groupRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentGroupMapRepository studentGroupMapRepository;
    @Autowired
    private ScoreRepository scoreRepository;

    public Class addClass(Class newClass, Long teacherId)
    {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));
        newClass.setTeacher(teacher);
        log.info("Adding class with name: {} and teacher ID: {}", newClass.getName(), teacherId);
        return classRepository.save(newClass);
    }

    public ClassGroup addGroup(ClassGroup newGroup, Long classId)
    {
        Class classObj = classRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found"));
        newGroup.setClassObj(classObj);
        // System.out.println("newGroup.getClassObj().getTeacher() = " + newGroup.getClassObj());
        log.info("Adding group with name: {} to class with ID: {}", newGroup.getName(), classId);
        groupRepository.save(newGroup);
        return newGroup;
    }

    public Topic addTopic(Topic newTopic, Long classId)
    {
        try
        {
            Class classObj = classRepository.findById(classId)
                    .orElseThrow(() -> new ResourceNotFoundException("Class not found"));
            newTopic.setClassObj(classObj);
            log.info("Adding topic with name: {} to class with ID: {}", newTopic.getName(), classId);
            return topicRepository.save(newTopic);
        } catch (Exception e)
        {
            log.info("An error occurred while adding topic with name: {} to class with ID: {}", newTopic.getName(), classId, e);
            throw new RuntimeException("Failed to add topic", e);
        }
    }

    public void addStudentsToGroup(List<Long> studentIds, Long groupId)
    {
        try
        {
            log.info("Adding students with IDs: {} to group with ID: {}", studentIds, groupId);
            for (Long id : studentIds)
            {
                User user = userRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                log.info("Adding student with ID: {} to group with ID: {}", id, groupId);
                ClassGroup group = groupRepository.findById(groupId)
                        .orElseThrow(() -> new ResourceNotFoundException("Group not found"));
                StudentGroupMap studentGroupMap = new StudentGroupMap(new StudentGroupMapId(id, groupId), user, group);
                studentGroupMapRepository.save(studentGroupMap);
            }
        } catch (Exception e)
        {
            log.info("An error occurred while adding students with IDs: {} to group with ID: {}", studentIds, groupId, e);
            throw new RuntimeException("Failed to add students to group", e);
        }
    }

    public Long deleteStudentFromGroup(Long studentId, Long groupId)
    {
        try
        {
            log.info("Deleting student with ID: {} from group with ID: {}", studentId, groupId);
            return studentGroupMapRepository.deleteByStudent_IdAndGroup_ClassGroupId(studentId, groupId);
        } catch (Exception e)
        {
            log.info("An error occurred while deleting student with ID: {} from group with ID: {}", studentId, groupId, e);
            throw new RuntimeException("Failed to delete student from group", e);
        }
    }

    public List<User> getStudentsInGroup(Long groupId)
    {
        try
        {
            log.info("Getting students in group with ID: {}", groupId);
            return userRepository.findStudentsInGroup(groupId);
        } catch (Exception e)
        {
            log.info("An error occurred while getting students in group with ID: {}", groupId, e);
            throw new RuntimeException("Failed to get students in group", e);
        }
    }

    public List<User> getStudentsNotInGroup(Long classId)
    {
        try
        {
            log.info("Getting students not in any group for class with ID: {}", classId);
            return userRepository.findStudentsNotInGroup(classId);
        } catch (Exception e)
        {
            log.info("An error occurred while getting students not in any group for class with ID: {}", classId, e);
            throw new RuntimeException("Failed to get students not in any group", e);
        }
    }

    public void validateTeacherId(Long teacherId)
    {
        try
        {
            log.info("Validating teacher ID: {}", teacherId);
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();

            if (user.getId() != teacherId)
            {
                throw new InvalidAccessException("The given teacher ID cannot be used to proceed.");
            }
        } catch (Exception e)
        {
            log.info("An error occurred while validating teacher ID: {}", teacherId, e);
            throw new RuntimeException("Failed to validate teacher ID", e);
        }
    }

    public void validateClassId(Long classId)
    {
        log.info("Validating class ID: {}", classId);
        Long teacherId = classRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found"))
                .getTeacher()
                .getId(); 

        validateTeacherId(teacherId);
    }

    public void validateGroupId(Long groupId)
    {
        try
        {
            log.info("Validating group ID: {}", groupId);
            Long classId = groupRepository.findById(groupId)
                    .orElseThrow(() -> new ResourceNotFoundException("Group not found"))
                    .getClassObj()
                    .getClassId();

            validateClassId(classId);
        } catch (Exception e)
        {
            log.info("An error occurred while validating group ID: {}", groupId, e);
            throw new RuntimeException("Failed to validate group ID", e);
        }
    }

    public void validateTopicId(Long topicId)
    {
        try
        {
            log.info("Validating topic ID: {}", topicId);
            Long classId = topicRepository.findById(topicId)
                    .orElseThrow(() -> new ResourceNotFoundException("Topic not found"))
                    .getClassObj()
                    .getClassId();

            validateClassId(classId);
        } catch (Exception e)
        {
            log.info("An error occurred while validating topic ID: {}", topicId, e);
            throw new RuntimeException("Failed to validate topic ID", e);
        }
    }

    public List<Class> findAllClasses()
    {
        try
        {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) auth.getPrincipal();
            log.info("Finding all classes for user with ID: {}", user.getId());
            return classRepository.findByTeacher_Id(user.getId());
        } catch (Exception e)
        {
            log.info("An error occurred while finding all classes", e);
            throw new RuntimeException("Failed to find all classes", e);
        }
    }

    public Optional<Class> findClassById(Long id)
    {
        try
        {
            log.info("Finding class with id={}", id);
            return classRepository.findById(id);
        } catch (Exception e)
        {
            log.info("An error occurred while finding class with id={}", id, e);
            throw new RuntimeException("Failed to find class", e);
        }
    }

    public void deleteClassById(Long id)
    {
        try
        {
            log.info("Deleting class with id={}", id);
            classRepository.deleteById(id);
        } catch (Exception e)
        {
            log.info("An error occurred while deleting class with id={}", id, e);
            throw new RuntimeException("Failed to delete class", e);
        }
    }


    public List<ClassGroup> findAllGroups(Long classId)
    {
        try
        {
            log.info("Finding all groups for classId={}", classId);
            return groupRepository.findByClassObj_ClassId(classId);
        } catch (Exception e)
        {
            log.info("An error occurred while finding all groups for classId={}", classId, e);
            throw new RuntimeException("Failed to find all groups", e);
        }
    }

    public Optional<ClassGroup> findGroupById(Long id)
    {
        try
        {
            log.info("Finding group with id={}", id);
            return groupRepository.findById(id);
        } catch (Exception e)
        {
            log.info("An error occurred while finding group with id={}", id, e);
            throw new RuntimeException("Failed to find group", e);
        }
    }

    public void deleteGroupById(Long id)
    {
        try
        {
            log.info("Deleting group with id={}", id);
            groupRepository.deleteById(id);
        } catch (Exception e)
        {
            log.info("An error occurred while deleting group with id={}", id, e);
            throw new RuntimeException("Failed to delete group", e);
        }
    }


    /*public List<Topic> findAllTopics(Long classId)
    {
        try
        {
            return topicRepository.findByClassObj_ClassId(classId);
        } catch (Exception e)
        {
            log.error("An error occurred while finding all topics for classId={}", classId, e);
            throw new RuntimeException("Failed to find all topics", e);
        }
    }*/

    public List<Topic> findAllTopics(Long classId)
    {
        log.info("Finding all topics for class with ID: {}", classId);

        List<Topic> topics = topicRepository.findByClassObj_ClassId(classId);

        log.info("Found {} topics for class with ID: {}", topics.size(), classId);

        return topics;
    }


    public Optional<Topic> findTopicById(Long id)
    {
        try
        {
            log.info("Finding topic with id={}", id);
            return topicRepository.findById(id);
        } catch (Exception e)
        {
            log.info("An error occurred while finding topic with id={}", id, e);
            throw new RuntimeException("Failed to find topic", e);
        }
    }

    public void deleteTopicById(Long id)
    {
        try
        {
            log.info("Deleting topic with id={}", id);
            topicRepository.deleteById(id);
        } catch (Exception e)
        {
            log.info("An error occurred while deleting topic with id={}", id, e);
            throw new RuntimeException("Failed to delete topic", e);
        }
    }


    public List<User> getAllStudents()
    {
        try
        {
            log.info("Getting all students");
            return userRepository.findByRole(Role.STUDENT);
        } catch (Exception e)
        {
            log.info("An error occurred while getting all students", e);
            throw new RuntimeException("Failed to get all students", e);
        }
    }

    public List<Score> getScoresInTopic(Long topicId)
    {
        try
        {
            log.info("Getting scores for topicId={}", topicId);
            return scoreRepository.findByTopic_TopicId(topicId);
        } catch (Exception e)
        {
            log.info("An error occurred while getting scores for topicId={}", topicId, e);
            throw new RuntimeException("Failed to get scores", e);
        }
    }

    public Long deleteScore(Long studentId, Long scorerId, Long topicId)
    {
        try
        {
            log.info("Deleting score for studentId={}, scorerId={}, topicId={}", studentId, scorerId, topicId);
            return scoreRepository.deleteByStudent_IdAndScorer_IdAndTopic_TopicId(studentId, scorerId, topicId);
        } catch (Exception e)
        {
            log.info("An error occurred while deleting score for studentId={}, scorerId={}, topicId={}", studentId, scorerId, topicId, e);
            throw new RuntimeException("Failed to delete score", e);
        }
    }
}

