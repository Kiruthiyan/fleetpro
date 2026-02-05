package com.vfms.config;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "FleetPro Backend is Running! 🚀 Status: Active";
    }
}
