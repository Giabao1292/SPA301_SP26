package com.example.Assignment2.controller;

import com.example.Assignment2.dto.AccountRequest;
import com.example.Assignment2.dto.AccountResponse;
import com.example.Assignment2.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/staff/profile")
public class StaffProfileController {
    private final AccountService accountService;

    public StaffProfileController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountResponse> getProfile(@PathVariable Integer id) {
        return ResponseEntity.ok(accountService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountResponse> updateProfile(@PathVariable Integer id,
                                                         @Valid @RequestBody AccountRequest request) {
        return ResponseEntity.ok(accountService.update(id, request));
    }
}