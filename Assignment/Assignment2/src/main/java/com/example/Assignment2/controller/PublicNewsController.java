package com.example.Assignment2.controller;

import com.example.Assignment2.dto.NewsArticleResponse;
import com.example.Assignment2.service.NewsArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/news")
public class PublicNewsController {
    private final NewsArticleService newsArticleService;

    public PublicNewsController(NewsArticleService newsArticleService) {
        this.newsArticleService = newsArticleService;
    }

    @GetMapping
    public ResponseEntity<List<NewsArticleResponse>> getActive() {
        return ResponseEntity.ok(newsArticleService.getActive());
    }
}