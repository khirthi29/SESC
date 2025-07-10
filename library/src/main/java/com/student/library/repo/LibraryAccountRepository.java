package com.student.library.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.student.library.model.LibraryAccount;

public interface LibraryAccountRepository extends JpaRepository<LibraryAccount, Long> {

    LibraryAccount findByStudentId(Long studentId);
}
