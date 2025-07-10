package com.portal.student.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portal.student.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}
