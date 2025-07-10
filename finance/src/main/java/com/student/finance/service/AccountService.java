package com.student.finance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.finance.entity.Account;
import com.student.finance.repository.AccountRepository;

@Service
public class AccountService {
	
	@Autowired
    private AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
    }
    
    public Account getAccountByStId(Long id) {
        return accountRepository.findByStudentId(id).orElseThrow(() -> new RuntimeException("Account not found"));
    }

    public Account updateAccount(Long id, Account updatedAccount) {
        Account existingAccount = getAccountById(id);
        existingAccount.setAccountHolderName(updatedAccount.getAccountHolderName());
        existingAccount.setAccountType(updatedAccount.getAccountType());
        existingAccount.setBalance(updatedAccount.getBalance());
        return accountRepository.save(existingAccount);
    }

    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }
}

