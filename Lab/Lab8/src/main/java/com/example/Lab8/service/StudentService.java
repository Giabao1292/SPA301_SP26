package com.example.Lab8.service;

import com.example.Lab8.model.Student;
import com.example.Lab8.repository.IStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements IStudentService {
    @Autowired
    private IStudentRepository studentRepository;
    @Override
    public void delete(Student student) {
        studentRepository.delete(student);
    }

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public void save(Student student) {
        studentRepository.save(student);
    }

    @Override
    public Student findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    @Override
    public Student update(String studentID, Student updateStudent) {
        Optional<Student> student = studentRepository.findById(studentID);
        if(student.isPresent()){
            Student existingStudent = student.get();
            existingStudent.setEmail(updateStudent.getEmail());
            existingStudent.setPassword(updateStudent.getPassword());
            existingStudent.setFirstName(updateStudent.getFirstName());
            existingStudent.setLastName(updateStudent.getLastName());
            existingStudent.setMarks(updateStudent.getMarks());
            return studentRepository.save(existingStudent);
        }
        return updateStudent;
    }
}
