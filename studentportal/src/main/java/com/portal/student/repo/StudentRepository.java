package com.portal.student.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.portal.student.model.Student;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface StudentRepository extends JpaRepository<Student, Long> {
	
    Optional<Student> findByUsername(String username);

}
