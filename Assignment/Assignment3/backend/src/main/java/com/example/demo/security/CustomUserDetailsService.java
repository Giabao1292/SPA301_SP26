package com.example.demo.security;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final CustomerRepository customerRepository;

    @Value("${app.staff.email}")
    private String staffEmail;

    @Value("${app.staff.password}")
    private String staffPassword;

    public CustomUserDetailsService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (staffEmail != null && staffEmail.equalsIgnoreCase(username)) {
            return new CustomUserDetails(staffEmail, staffPassword, "STAFF");
        }

        Customer customer = customerRepository.findByEmailAddress(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new CustomUserDetails(customer.getEmailAddress(), customer.getPassword(), "CUSTOMER");
    }
}