package com.vfms.auth.service;

import com.vfms.auth.dto.AuthenticationRequest;
import com.vfms.auth.dto.AuthenticationResponse;
import com.vfms.auth.dto.RegisterRequest;
import com.vfms.auth.model.User;
import com.vfms.auth.repository.UserRepository;
import com.vfms.auth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

        private final UserRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

    /**
     * Admin creates a new user (Invite flow).
     */
    public AuthenticationResponse signup(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .role(request.getRole())
                .emailVerified(false)
                .password(passwordEncoder.encode(request.getPassword() != null ? request.getPassword() : "temp1234")) // Preliminary password
                .emailVerificationToken(java.util.UUID.randomUUID().toString())
                .emailVerificationTokenExpiry(java.time.LocalDateTime.now().plusDays(1))
                .build();

        repository.save(user);

        // TODO: Send Email with verification token: user.getEmailVerificationToken()
        // verify-email?token=...

        return AuthenticationResponse.builder()
                .token(null) // No token yet, user must verify
                .role(user.getRole().name())
                .build();
    }

    public void verifyEmail(String token) {
        var user = repository.findByEmailVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired verification token"));

        if (user.getEmailVerificationTokenExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new RuntimeException("Verification token has expired");
        }

        // Just check validity here, confirmation happens on setPassword
        repository.save(user);
    }

    public AuthenticationResponse setPassword(String token, String newPassword) {
        var user = repository.findByEmailVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        if (user.getEmailVerificationTokenExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new RuntimeException("Token has expired");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setEmailVerified(true);
        user.setEmailVerificationToken(null);
        user.setEmailVerificationTokenExpiry(null);
        repository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        
        if (!user.getEmailVerified()) {
            throw new RuntimeException("Email not verified. Please check your email.");
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .build();
    }

    public void forgotPassword(String email) {
        var user = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));
        
        user.setPasswordResetToken(java.util.UUID.randomUUID().toString());
        user.setPasswordResetTokenExpiry(java.time.LocalDateTime.now().plusHours(1));
        repository.save(user);
        
        // TODO: Send email
    }

    public void resetPassword(String token, String newPassword) {
        var user = repository.findByPasswordResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid or expired reset token"));

        if (user.getPasswordResetTokenExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new RuntimeException("Reset token has expired");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiry(null);
        repository.save(user);
    }
}
