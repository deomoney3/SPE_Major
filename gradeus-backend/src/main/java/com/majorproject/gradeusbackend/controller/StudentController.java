package com.majorproject.gradeusbackend.controller;

import com.majorproject.gradeusbackend.entity.*;
import com.majorproject.gradeusbackend.entity.Class;
import com.majorproject.gradeusbackend.model.ScoreModel;
import com.majorproject.gradeusbackend.model.ScoreResponse;
import com.majorproject.gradeusbackend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // The classes in which the student is enrolled in
    @GetMapping("/classes")
    public List<Class> getAllClasses() {
        return studentService.getAllClasses();
    }

    // The topics in a class
    @GetMapping("/topics")
    public List<Topic> getAllTopics(@RequestParam Long classId) {
        return studentService.getTopicsInClass(classId);
    }

    @GetMapping("/topic/{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable Long id) {

        Optional<Topic> optionalEntity = studentService.findTopicById(id);
        if (optionalEntity.isPresent()) {
            return new ResponseEntity<>(optionalEntity.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/group-members")
    public List<User> getGroupMembersInClass(@RequestParam Long classId) {
        return studentService.getGroupMembersInClass(classId);
    }


    @GetMapping("/get-score")
    public ResponseEntity<ScoreResponse> getScore(@RequestParam Long studentId, @RequestParam Long topicId) {
        ScoreResponse sr = this.studentService.getScore(studentId, topicId);
        return new ResponseEntity<>(sr, HttpStatus.OK);
    }

    @PostMapping("/add-score")
    public ResponseEntity<Score> addScore(@RequestBody ScoreModel score) {
        Score addedScore = studentService.addScore(score);
        return new ResponseEntity<>(addedScore, HttpStatus.CREATED);
    }
}
