package com.vfms.backend.controller;

import com.vfms.backend.entity.Trip;
import com.vfms.backend.service.TripService;
import com.vfms.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;
    private final JwtService jwtService;

    @GetMapping("/my-trips")
    public ResponseEntity<List<Trip>> getMyTrips(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String jwt = authHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        return ResponseEntity.ok(tripService.getMyTrips(username));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Trip> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(tripService.updateTripStatus(id, status));
    }
}
