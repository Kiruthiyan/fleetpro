package com.vfms.auth.controller;

import com.vfms.auth.dto.AuthenticationRequest;
import com.vfms.auth.dto.AuthenticationResponse;
import com.vfms.auth.dto.RegisterRequest;
import com.vfms.auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    /**
     * Registers a new user with the provided details.
     *
     * @param request The registration request containing username, email, password,
     *                and role.
     * @return A ResponseEntity containing the authentication response (token).
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    /**
     * Authenticates a user with the provided credentials.
     *
     * @param request The authentication request containing username and password.
     * @return A ResponseEntity containing the authentication response (token).
     */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
