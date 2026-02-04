package com.example.Assignment2.controller;

import com.example.Assignment2.dto.TagResponse;
import com.example.Assignment2.service.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public ResponseEntity<List<TagResponse>> getAll(@RequestParam(value = "keyword", required = false) String keyword) {
        return ResponseEntity.ok(tagService.getAll(keyword));
    }
}