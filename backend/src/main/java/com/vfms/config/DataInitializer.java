package com.vfms.config;

import com.vfms.auth.model.Role;
import com.vfms.auth.model.User;
import com.vfms.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner commandLineRunner() {
        return args -> {
            String adminEmail = System.getenv("ADMIN_EMAIL") != null ? System.getenv("ADMIN_EMAIL") : "admin@fleet.com";
            String adminPassword = System.getenv("ADMIN_PASSWORD") != null ? System.getenv("ADMIN_PASSWORD") : "password";

            if (repository.findByEmail(adminEmail).isEmpty()) {
                var admin = User.builder()
                        .name("System Administrator")
                        .email(adminEmail)
                        .password(passwordEncoder.encode(adminPassword))
                        .role(Role.ADMIN)
                        .emailVerified(true)
                        .build();
                repository.save(admin);
                System.out.println("Default Admin created: " + adminEmail);
            }
        };
    }
}
