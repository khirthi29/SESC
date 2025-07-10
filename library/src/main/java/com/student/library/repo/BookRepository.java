package com.student.library.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.student.library.model.Book;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Custom method to find a book by its ISBN
    Optional<Book> findByIsbn(String isbn);
}
