package com.example.Lab8.service;

import com.example.Lab8.model.Student;

import java.util.List;

public interface IStudentService {
    public List<Student> findAll();
    public void save(Student student);
    public void delete(Student student);
    public Student findByEmail(String email);
    public Student update(String studentID, Student updateStudent);

}
