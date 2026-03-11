package com.example.Lab8.repository;

import com.example.Lab8.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IStudentRepository extends MongoRepository<Student, String> {
    public Student findByEmail(String email);
}
