package com.example.Assignment2.controller;

import com.example.Assignment2.dto.AccountResponse;
import com.example.Assignment2.dto.AuthRequest;
import com.example.Assignment2.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AccountService accountService;

    public AuthController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/login")
    public ResponseEntity<AccountResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(accountService.authenticate(request));
    }
}