package com.student.library.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.library.model.Book;
import com.student.library.model.BorrowingRecord;
import com.student.library.model.LibraryAccount;
import com.student.library.repo.BookRepository;
import com.student.library.repo.BorrowingRecordRepository;
import com.student.library.repo.LibraryAccountRepository;

@Service
public class LibraryService {
	
	@Autowired
    private BookRepository bookRepository;
	
	@Autowired
    private BorrowingRecordRepository borrowingRecordRepository;
	
	@Autowired
	private LibraryAccountRepository libraryAccountRepository;

    public LibraryService(BookRepository bookRepository, BorrowingRecordRepository borrowingRecordRepository) {
        this.bookRepository = bookRepository;
        this.borrowingRecordRepository = borrowingRecordRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public void borrowBook(Long studentId, Long bookId) {
        Optional<Book> book = bookRepository.findById(bookId);

        if (book.isEmpty() || book.get().getQuantity() <= 0) {
            throw new IllegalStateException("Book not available.");
        }

        book.get().setQuantity(book.get().getQuantity() - 1);
        bookRepository.save(book.get());

        BorrowingRecord record = new BorrowingRecord(studentId, bookId);
        borrowingRecordRepository.save(record);
    }

    public void returnBook(Long studentId, Long bookId) {
        BorrowingRecord record = borrowingRecordRepository.findByStudentIdAndBookId(studentId, bookId)
                .orElseThrow(() -> new IllegalStateException("Borrowing record not found."));

        borrowingRecordRepository.delete(record);

        Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalStateException("Book not found."));
        book.setQuantity(book.getQuantity() + 1);
        bookRepository.save(book);
    }

    public List<BorrowingRecord> getBorrowingHistory(Long studentId) {
        return borrowingRecordRepository.findAllByStudentId(studentId);
    }

    public void createLibraryAccount(Long studentId) {
    	LibraryAccount existingAccount = libraryAccountRepository.findByStudentId(studentId);
        if (existingAccount != null) {
            throw new IllegalStateException("Library account already exists for studentId: " + studentId);
        }

        // Create a new library account
        LibraryAccount libraryAccount = new LibraryAccount();
        libraryAccount.setStudentId(studentId);
        libraryAccount.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        // Save to the database
        libraryAccountRepository.save(libraryAccount);
    }

    public Double calculateFines(Long studentId) {
        List<BorrowingRecord> overdueRecords = borrowingRecordRepository.findOverdueRecords(studentId);
        return overdueRecords.stream()
                .mapToDouble(record -> record.calculateFine())
                .sum();
    }
}
