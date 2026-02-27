package com.example.demo.service;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Customer findById(Integer id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found: " + id));
    }

    public Customer findByEmail(String email) {
        return customerRepository.findByEmailAddress(email)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found: " + email));
    }

    public Customer save(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.save(customer);
    }

    public Customer update(Integer id, Customer customer) {
        Customer existing = findById(id);
        existing.setFullName(customer.getFullName());
        existing.setTelephone(customer.getTelephone());
        existing.setEmailAddress(customer.getEmailAddress());
        existing.setBirthday(customer.getBirthday());
        existing.setStatus(customer.getStatus());
        existing.setPassword(passwordEncoder.encode(customer.getPassword()));
        return customerRepository.save(existing);
    }

    public Customer updateProfile(String email, Customer customer) {
        Customer existing = findByEmail(email);
        existing.setFullName(customer.getFullName());
        existing.setTelephone(customer.getTelephone());
        existing.setBirthday(customer.getBirthday());
        return customerRepository.save(existing);
    }

    public void delete(Integer id) {
        customerRepository.deleteById(id);
    }
}