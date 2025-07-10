package com.portal.student.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.student.model.Enrollment;
import com.portal.student.repo.CourseRepository;
import com.portal.student.repo.EnrollmentRepository;
import com.portal.student.repo.StudentRepository;

@Service
public class EnrollmentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public void enrollStudentInCourse(Long studentId, Long courseId) {
        if (!studentRepository.existsById(studentId)) {
            throw new IllegalStateException("Student not found with ID " + studentId);
        }

        if (!courseRepository.existsById(courseId)) {
            throw new IllegalStateException("Course not found with ID " + courseId);
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(studentId);
        enrollment.setCourseId(courseId);
        enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> viewEnrollmentsByStudent(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }
}
