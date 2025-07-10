package com.portal.student.integration;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@Service
@FeignClient(name = "library-service", url = "http://localhost:8081")
public interface LibraryServiceIntegration {
    @PostMapping("/api/library/accounts")
    void createLibraryAccount(@RequestParam Long studentId);
}
