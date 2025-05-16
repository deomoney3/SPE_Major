package com.majorproject.gradeusbackend;

import com.majorproject.gradeusbackend.entity.Class;
import com.majorproject.gradeusbackend.entity.ClassGroup;
import com.majorproject.gradeusbackend.exceptions.ResourceNotFoundException;
import com.majorproject.gradeusbackend.repository.ClassGroupRepository;
import com.majorproject.gradeusbackend.repository.ClassRepository;
import com.majorproject.gradeusbackend.service.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class groupsTest {

    @Mock
    private ClassRepository classRepository;

    @Mock
    private ClassGroupRepository groupRepository;

    @InjectMocks
    private TeacherService teacherService;

    private Class testClass;
    private ClassGroup testGroup;

    @BeforeEach
    public void setUp() {
        testClass = new Class();
        testClass.setClassId(1L);

        testGroup = new ClassGroup();
        testGroup.setClassGroupId(1L);
        testGroup.setName("Test Group");
        testGroup.setDescription("This is a test group.");
        testGroup.setClassObj(testClass);
    }

    @Test
    public void testAddGroupWithNonExistingClass() {
        when(classRepository.findById(anyLong())).thenThrow(new ResourceNotFoundException("Class not found"));

        ClassGroup newGroup = new ClassGroup();
        newGroup.setName("New Group");
        newGroup.setDescription("This is a new group.");

        assertThrows(ResourceNotFoundException.class, () -> {
            teacherService.addGroup(newGroup, 1L);
        });
    }
}

