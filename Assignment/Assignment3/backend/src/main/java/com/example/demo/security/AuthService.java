package com.example.demo.security;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.security.dto.AuthRequest;
import com.example.demo.security.dto.AuthResponse;
import com.example.demo.security.dto.RegisterRequest;
import java.util.Locale;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;

    public AuthService(AuthenticationManager authenticationManager,
                       JwtService jwtService,
                       PasswordEncoder passwordEncoder,
                       CustomerRepository customerRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.customerRepository = customerRepository;
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(principal.getUsername(), principal.getRole());
        return new AuthResponse(token, principal.getRole());
    }

    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().toLowerCase(Locale.ROOT);
        if (customerRepository.findByEmailAddress(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        Customer customer = new Customer();
        customer.setFullName(request.getFullName());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(email);
        customer.setBirthday(request.getBirthday());
        customer.setStatus(1);
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customerRepository.save(customer);

        String token = jwtService.generateToken(customer.getEmailAddress(), "CUSTOMER");
        return new AuthResponse(token, "CUSTOMER");
    }
}