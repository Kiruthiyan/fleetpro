package com.vfms.trip.controller;

import com.vfms.trip.model.Trip;
import com.vfms.trip.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {
    private final TripService service;

    /**
     * Retrieves all trips.
     * 
     * @return List of all trips.
     */
    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips() {
        return ResponseEntity.ok(service.getAllTrips());
    }

    /**
     * Retrieves a trip by ID.
     * 
     * @param id The trip ID.
     * @return The trip details.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTrip(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getTripById(id));
    }

    /**
     * Creates a new trip.
     * 
     * @param trip The trip details.
     * @return The created trip.
     */
    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip) {
        return ResponseEntity.ok(service.createTrip(trip));
    }

    /**
     * Updates an existing trip (e.g. status update).
     * 
     * @param id   The trip ID.
     * @param trip The updated details.
     * @return The updated trip.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Integer id, @RequestBody Trip trip) {
        return ResponseEntity.ok(service.updateTrip(id, trip));
    }

    /**
     * Deletes a trip.
     * 
     * @param id The trip ID.
     * @return No content.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Integer id) {
        service.deleteTrip(id);
        return ResponseEntity.ok().build();
    }
}
