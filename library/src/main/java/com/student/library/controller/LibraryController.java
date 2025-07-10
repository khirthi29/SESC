package com.student.library.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.student.library.model.BorrowingRecord;
import com.student.library.service.LibraryService;

@RestController
@RequestMapping("/api/library")
public class LibraryController {
	
	@Autowired
    private LibraryService libraryService;

    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }


    // Borrow a book
    @PostMapping("/books/borrow")
    public ResponseEntity<String> borrowBook(@RequestParam Long studentId, @RequestParam Long bookId) {
        libraryService.borrowBook(studentId, bookId);
        return ResponseEntity.ok("Book borrowed successfully.");
    }

    // Return a book
    @PostMapping("/books/return")
    public ResponseEntity<String> returnBook(@RequestParam Long studentId, @RequestParam Long bookId) {
        libraryService.returnBook(studentId, bookId);
        return ResponseEntity.ok("Book returned successfully.");
    }

    // Get borrowing history for a student
    @GetMapping("/books/borrowed/{studentId}")
    public List<BorrowingRecord> getBorrowingHistory(@PathVariable Long studentId) {
        return libraryService.getBorrowingHistory(studentId);
    }

    // Create library account
    @PostMapping("/accounts")
    public ResponseEntity<String> createLibraryAccount(@RequestParam Long studentId) {
        libraryService.createLibraryAccount(studentId);
        return ResponseEntity.ok("Library account created successfully.");
    }

    // Calculate overdue fines
    @GetMapping("/fines/{studentId}")
    public ResponseEntity<?> calculateFines(@PathVariable Long studentId) {
        return ResponseEntity.ok(libraryService.calculateFines(studentId));
    }
}
