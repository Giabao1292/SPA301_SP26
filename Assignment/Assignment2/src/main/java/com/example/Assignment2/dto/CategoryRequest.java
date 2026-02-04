package com.example.Assignment2.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRequest {
    @NotBlank
    @Size(max = 100)
    private String categoryName;

    private String categoryDesc;

    private Integer parentCategoryId;

    @NotNull
    private Boolean status;
}