package com.example.Lab4.dto.request;

import lombok.Data;

@Data
public class OrchidRequestDTO {
    private String name;
    private Boolean isAttractive;
    private Boolean isNatural;
    private String orchidDescription;
    private String orchidUrl;
    private Integer categoryId;
}
