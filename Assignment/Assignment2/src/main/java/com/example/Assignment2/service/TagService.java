package com.example.Assignment2.service;

import com.example.Assignment2.dto.TagResponse;
import com.example.Assignment2.model.Tag;
import com.example.Assignment2.repository.TagRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TagService {
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<TagResponse> getAll(String keyword) {
        List<Tag> tags = (keyword == null || keyword.isBlank())
                ? tagRepository.findAll()
                : tagRepository.findByTagNameContainingIgnoreCase(keyword);
        return tags.stream().map(this::toResponse).toList();
    }

    public TagResponse getById(Integer id) {
        return tagRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tag"));
    }

    private TagResponse toResponse(Tag tag) {
        return TagResponse.builder()
                .id(tag.getId())
                .tagName(tag.getTagName())
                .build();
    }
}