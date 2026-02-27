package com.example.demo.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class StaffAuthenticationProvider implements AuthenticationProvider {
    private final PasswordEncoder passwordEncoder;

    @Value("${app.staff.email}")
    private String staffEmail;

    @Value("${app.staff.password}")
    private String staffPasswordHash;

    public StaffAuthenticationProvider(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) {
        String email = authentication.getName();
        String password = authentication.getCredentials().toString();

        if (staffEmail != null && staffEmail.equalsIgnoreCase(email)) {
            if (!passwordEncoder.matches(password, staffPasswordHash)) {
                throw new BadCredentialsException("Invalid staff credentials");
            }
            CustomUserDetails staffDetails = new CustomUserDetails(staffEmail, staffPasswordHash, "STAFF");
            return new UsernamePasswordAuthenticationToken(staffDetails, password, staffDetails.getAuthorities());
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}