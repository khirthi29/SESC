package com.student.library.repo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.student.library.model.BorrowingRecord;

@Repository
public interface BorrowingRecordRepository extends JpaRepository<BorrowingRecord, Long> {
    Optional<BorrowingRecord> findByStudentIdAndBookId(Long studentId, Long bookId);

    List<BorrowingRecord> findAllByStudentId(Long studentId);

    @Query(value = "SELECT * FROM borrowing_record WHERE student_id = :studentId", nativeQuery = true)
    List<BorrowingRecord> findOverdueRecords(@Param("studentId") Long studentId);

}
