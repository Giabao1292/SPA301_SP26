package com.example.Assignment2.controller;

import com.example.Assignment2.dto.NewsArticleRequest;
import com.example.Assignment2.dto.NewsArticleResponse;
import com.example.Assignment2.service.NewsArticleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff/news")
public class StaffNewsController {
    private final NewsArticleService newsArticleService;

    public StaffNewsController(NewsArticleService newsArticleService) {
        this.newsArticleService = newsArticleService;
    }

    @GetMapping
    public ResponseEntity<List<NewsArticleResponse>> getAll(@RequestParam(value = "keyword", required = false) String keyword) {
        return ResponseEntity.ok(newsArticleService.getAll(keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsArticleResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(newsArticleService.getById(id));
    }

    @PostMapping
    public ResponseEntity<NewsArticleResponse> create(@Valid @RequestBody NewsArticleRequest request) {
        return ResponseEntity.ok(newsArticleService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsArticleResponse> update(@PathVariable Integer id,
                                                      @Valid @RequestBody NewsArticleRequest request) {
        return ResponseEntity.ok(newsArticleService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        newsArticleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/history/{accountId}")
    public ResponseEntity<List<NewsArticleResponse>> getByAuthor(@PathVariable Integer accountId) {
        return ResponseEntity.ok(newsArticleService.getByAuthor(accountId));
    }
}