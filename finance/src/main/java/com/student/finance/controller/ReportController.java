package com.student.finance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.finance.entity.Account;
import com.student.finance.entity.Transaction;
import com.student.finance.service.AccountService;
import com.student.finance.service.TransactionService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
	
	@Autowired
    private AccountService accountService;
	
	@Autowired
    private TransactionService transactionService;

    public ReportController(AccountService accountService, TransactionService transactionService) {
        this.accountService = accountService;
        this.transactionService = transactionService;
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<Account> getAccountSummary(@PathVariable Long accountId) {
        return ResponseEntity.ok(accountService.getAccountById(accountId));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getTransactionReport() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }
}
