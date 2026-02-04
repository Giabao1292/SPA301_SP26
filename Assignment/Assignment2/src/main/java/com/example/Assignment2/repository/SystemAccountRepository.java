package com.example.Assignment2.repository;

import com.example.Assignment2.model.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SystemAccountRepository extends JpaRepository<SystemAccount, Integer> {
    Optional<SystemAccount> findByEmail(String email);

    List<SystemAccount> findByAccountNameContainingIgnoreCase(String keyword);
}