package com.portal.student.integration;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "finance-service", url = "http://localhost:8082")
public interface FinanceServiceIntegration {
	
    @PostMapping("/api/accounts")
    void createFinanceAccount(@RequestBody Map<String, Object> request);

    @GetMapping("/api/accounts/student/{id}")
    Map<String, Object> getOutstandingBalance(@PathVariable Long id);
}
