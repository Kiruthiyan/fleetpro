package com.vfms.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        // In a real app, this would aggregate data from services
        // For now, return dynamic 0 state until data is populated
        Map<String, Object> stats = new HashMap<>();
        stats.put("activeTrips", 0);
        stats.put("distance", 0);
        stats.put("hours", 0);
        return ResponseEntity.ok(stats);
    }
}
