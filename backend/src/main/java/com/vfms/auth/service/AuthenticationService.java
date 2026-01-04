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
         * Registers a new user, saves them to the database, and generates a JWT token.
         *
         * @param request The registration details.
         * @return An AuthenticationResponse containing the JWT token.
         */
        public AuthenticationResponse register(RegisterRequest request) {
                var user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(request.getRole())
                                .build();
                repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .role(user.getRole().name())
                                .build();
        }

        /**
         * Authenticates a user by verifying credentials and generating a JWT token.
         *
         * @param request The authentication details (email and password).
         * @return An AuthenticationResponse containing the JWT token.
         */
        public AuthenticationResponse authenticate(AuthenticationRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthenticationResponse.builder()
                                .token(jwtToken)
                                .role(user.getRole().name())
                                .build();
        }
}
