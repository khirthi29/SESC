package com.portal.student.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.student.model.Course;
import com.portal.student.repo.CourseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}
