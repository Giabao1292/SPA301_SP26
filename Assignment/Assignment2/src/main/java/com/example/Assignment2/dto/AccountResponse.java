package com.example.Assignment2.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AccountResponse {
    private Integer id;
    private String accountName;
    private String email;
    private Integer role;
}