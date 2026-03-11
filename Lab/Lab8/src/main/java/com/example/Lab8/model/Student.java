package com.example.Lab8.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Document(collection = "Student")
public class Student {
    @Id
    private String id;

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private double marks;

    private List<Book> books;

    public Student(String id, String email, String password, String firstName, String lastName, double marks) {
        this.firstName = firstName;
        this.email = email;
        this.id = id;
        this.lastName = lastName;
        this.marks = marks;
        this.password = password;
    }
}