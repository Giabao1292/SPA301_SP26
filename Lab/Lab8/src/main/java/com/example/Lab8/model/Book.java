package com.example.Lab8.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@AllArgsConstructor
@Document(collection = "Books")
public class Book {

    @Id
    private String id;

    private String title;

    private String author;

    private String isbn;

    private Set<Student> students;

}