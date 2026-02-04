package com.example.Assignment2.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CategoryResponse {
    private Integer id;
    private String categoryName;
    private String categoryDesc;
    private Integer parentCategoryId;
    private Boolean status;
}