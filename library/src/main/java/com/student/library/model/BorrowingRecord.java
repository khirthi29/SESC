package com.student.library.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class BorrowingRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long bookId;
    private LocalDate borrowedDate = LocalDate.now();
    private LocalDate dueDate = borrowedDate.plusDays(14); // 14-day borrowing period

    public BorrowingRecord() {
    }

    public BorrowingRecord(Long studentId, Long bookId) {
        this.studentId = studentId;
        this.bookId = bookId;
    }

    public double calculateFine() {
        LocalDate today = LocalDate.now();
        if (today.isAfter(dueDate)) {
            long overdueDays = java.time.temporal.ChronoUnit.DAYS.between(dueDate, today);
            return overdueDays * 5.0; // Example: $5/day fine
        }
        return 0.0;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public Long getBookId() {
		return bookId;
	}

	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}

	public LocalDate getBorrowedDate() {
		return borrowedDate;
	}

	public void setBorrowedDate(LocalDate borrowedDate) {
		this.borrowedDate = borrowedDate;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

}
