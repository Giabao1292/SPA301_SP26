package com.example.Lab8.controller;



import com.example.Lab8.model.Student;
import com.example.Lab8.service.IStudentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


import java.io.IOException;

@Controller
public class LoginController {

    @Autowired
    private IStudentService iStudentService;

    @RequestMapping(value = "/login")
    public ModelAndView showLogin(HttpServletResponse response, HttpServletRequest request) throws IOException {
        // Khởi tạo ModelAndView trỏ đến view name "login" (login.jsp)
        ModelAndView model = new ModelAndView("login");
        return model;
    }

    @PostMapping("/login")
    public ModelAndView handleLogin(HttpServletRequest request) {
        String email = request.getParameter("txtEmail");
        String password = request.getParameter("txtPassword");

        // Kiểm tra nếu email hoặc password trống
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            ModelAndView model = new ModelAndView("login");
            model.addObject("error", "Email và mật khẩu không được để trống!");
            return model;
        }

        Student student = null;
        if (email != null && !email.isBlank()) {
            student = iStudentService.findByEmail(email);
        }

        if (student != null && student.getPassword() != null && student.getPassword().equals(password)) {
            HttpSession session = request.getSession();
            session.setAttribute("email", email);
            return new ModelAndView("redirect:/");
        }

        ModelAndView model = new ModelAndView("login");
        model.addObject("error", "Email hoặc mật khẩu không đúng");
        return model;
    }
}