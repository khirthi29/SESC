package com.portal.student.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.student.model.Course;
import com.portal.student.serviceimpl.CourseService;

@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

	@Autowired
	private CourseService courseService;

	@GetMapping
	public ResponseEntity<List<Course>> getAllCourses() {
		return ResponseEntity.ok(courseService.getAllCourses());
	}
}
