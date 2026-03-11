package com.example.Lab8.controller;

import com.example.Lab8.model.Student;
import com.example.Lab8.service.IStudentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;


@Controller
public class HomeController {

    @Autowired
    private IStudentService iStudentService;

    @GetMapping("/")
    public ModelAndView showStudent(HttpServletResponse response, HttpServletRequest request) {
        HttpSession session = request.getSession();

        // Kiểm tra quyền truy cập qua session
        if (session.getAttribute("email") != null) {
            List<Student> studentList = iStudentService.findAll();
            ModelAndView model = new ModelAndView("home");
            model.addObject("studentList", studentList);
            return model;
        } else {
            // Nếu chưa đăng nhập, trả về trang login
            return new ModelAndView("login");
        }
    }

    @RequestMapping(value = "/manageStudent")
    public String manageStudent(HttpServletRequest request) {
        HttpSession session = request.getSession();

        // Bảo mật: Chỉ cho phép thao tác nếu đã đăng nhập
        if (session.getAttribute("email") != null) {
            String type = request.getParameter("btnManageStudent");
            String email = request.getParameter("txtEmail");

            if (email != null && !email.isEmpty()) {
                try {
                    String studentID = request.getParameter("txtID");
                    String password = request.getParameter("txtPassword");
                    String firstName = request.getParameter("txtFirstName");
                    String lastName = request.getParameter("txtLastName");
                    double mark = Double.parseDouble(request.getParameter("txtMark"));

                    Student student = new Student(studentID, email, password, firstName, lastName, mark);

                    switch (type) {
                        case "add":
                            iStudentService.save(student);
                            break;
                        case "update":
                            iStudentService.update(studentID, student);
                            break;
                        case "delete":
                            iStudentService.delete(student);
                            break;
                        default:
                            break;
                    }
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                }
                return "redirect:/";
            }
            return "redirect:/";
        }

        return "redirect:/login";
    }
}