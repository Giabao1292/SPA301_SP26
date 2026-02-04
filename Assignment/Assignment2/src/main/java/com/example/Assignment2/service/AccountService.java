package com.example.Assignment2.service;

import com.example.Assignment2.dto.AccountRequest;
import com.example.Assignment2.dto.AccountResponse;
import com.example.Assignment2.dto.AuthRequest;
import com.example.Assignment2.model.SystemAccount;
import com.example.Assignment2.repository.NewsArticleRepository;
import com.example.Assignment2.repository.SystemAccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AccountService {
    private final SystemAccountRepository systemAccountRepository;
    private final NewsArticleRepository newsArticleRepository;

    public AccountService(SystemAccountRepository systemAccountRepository,
                          NewsArticleRepository newsArticleRepository) {
        this.systemAccountRepository = systemAccountRepository;
        this.newsArticleRepository = newsArticleRepository;
    }

    public List<AccountResponse> getAll(String keyword) {
        List<SystemAccount> accounts = (keyword == null || keyword.isBlank())
                ? systemAccountRepository.findAll()
                : systemAccountRepository.findByAccountNameContainingIgnoreCase(keyword);
        return accounts.stream().map(this::toResponse).toList();
    }

    public AccountResponse getById(Integer id) {
        return systemAccountRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));
    }

    public AccountResponse create(AccountRequest request) {
        SystemAccount account = new SystemAccount();
        applyRequest(account, request);
        return toResponse(systemAccountRepository.save(account));
    }

    public AccountResponse update(Integer id, AccountRequest request) {
        SystemAccount account = systemAccountRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));
        applyRequest(account, request);
        return toResponse(systemAccountRepository.save(account));
    }

    public void delete(Integer id) {
        long articleCount = newsArticleRepository.countByCreatedByID_Id(id);
        if (articleCount > 0) {
            throw new IllegalStateException("Không thể xóa tài khoản đã tạo bài viết");
        }
        systemAccountRepository.deleteById(id);
    }

    public AccountResponse authenticate(AuthRequest request) {
        SystemAccount account = systemAccountRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email hoặc mật khẩu không đúng"));
        if (!account.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Email hoặc mật khẩu không đúng");
        }
        return toResponse(account);
    }

    private void applyRequest(SystemAccount account, AccountRequest request) {
        account.setAccountName(request.getAccountName());
        account.setEmail(request.getEmail());
        account.setPassword(request.getPassword());
        account.setRole(request.getRole());
    }

    private AccountResponse toResponse(SystemAccount account) {
        return AccountResponse.builder()
                .id(account.getId())
                .accountName(account.getAccountName())
                .email(account.getEmail())
                .role(account.getRole())
                .build();
    }
}