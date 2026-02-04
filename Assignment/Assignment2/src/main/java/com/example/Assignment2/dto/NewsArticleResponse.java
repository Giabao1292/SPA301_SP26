package com.example.Assignment2.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class NewsArticleResponse {
    private Integer id;
    private String newsTitle;
    private String headline;
    private String newsContent;
    private String newsSource;
    private Integer categoryId;
    private String categoryName;
    private Boolean newsStatus;
    private Integer createdById;
    private String createdByName;
    private Integer updatedById;
    private String updatedByName;
    private Instant createdDate;
    private Instant modifiedDate;
    private List<TagResponse> tags;
}