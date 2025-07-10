package com.portal.student.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.student.model.Student;
import com.portal.student.repo.StudentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class StudentService {
	
    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student getStudent(String studentId) {
        return studentRepository.findByUsername(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
    }
}
