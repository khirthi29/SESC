package com.portal.student.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.student.model.Enrollment;
import com.portal.student.serviceimpl.EnrollmentService;

@RestController
@RequestMapping("/api/v1/enrollment")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/{studentId}/course/{courseId}")
    public String enrollStudent(@PathVariable Long studentId, @PathVariable Long courseId) {
        enrollmentService.enrollStudentInCourse(studentId, courseId);
        return "Student with ID " + studentId + " enrolled in Course with ID " + courseId;
    }

    @GetMapping("/{studentId}")
    public List<Enrollment> viewEnrollments(@PathVariable Long studentId) {
        return enrollmentService.viewEnrollmentsByStudent(studentId);
    }
}
