package com.example.Assignment2.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NewsArticleRequest {
    @NotBlank
    @Size(max = 255)
    private String newsTitle;

    @Size(max = 1000)
    private String headline;

    @NotBlank
    private String newsContent;

    @Size(max = 255)
    private String newsSource;

    @NotNull
    private Integer categoryId;

    @NotNull
    private Boolean newsStatus;

    @NotNull
    private Integer createdById;

    private Integer updatedById;

    private List<Integer> tagIds;
}