package com.portal.student.controller;

import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.student.integration.FinanceServiceIntegration;
import com.portal.student.integration.LibraryServiceIntegration;
import com.portal.student.model.Student;
import com.portal.student.serviceimpl.StudentService;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private FinanceServiceIntegration financeServiceIntegration;

    @Autowired
    private LibraryServiceIntegration libraryServiceIntegration;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
    	
    	try {
    	    String encodedPassword = passwordEncoder.encode(student.getPassword());

        	student.setPassword(encodedPassword);
        } catch (Exception e) {
            throw new RuntimeException("Error: MD5 algorithm not found.", e);
        }
        
        Student savedStudent = studentService.registerStudent(student);

        
        Map<String, Object> request = new HashMap<>();
        request.put("accountHolderName", student.getName());
        request.put("accountType", "Saving"); // Saving or Employee 
        request.put("balance", 1000); // Initial Amount
        request.put("studentId", savedStudent.getId()); // Initial Amount

        financeServiceIntegration.createFinanceAccount(request);
        libraryServiceIntegration.createLibraryAccount(savedStudent.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(studentService.getStudent(studentId));
    }

    @GetMapping("/{studentId}/balance")
    public ResponseEntity<Map<String, Object>> getOutstandingBalance(@PathVariable Long studentId) {
        return ResponseEntity.ok(financeServiceIntegration.getOutstandingBalance(studentId));
    }
}
