package com.example.Lab6.controller;

import com.example.Lab6.dto.UserResponse;
import com.example.Lab6.entity.User;
import com.example.Lab6.service.UserService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.findAll().stream()
                .map(user -> new UserResponse(user.getId(), user.getFullName(), user.getEmail()))
                .collect(Collectors.toList());
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        return new UserResponse(user.getId(), user.getFullName(), user.getEmail());
    }
}