package com.vfms.backend.service;

import com.vfms.backend.entity.Trip;
import com.vfms.backend.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;

    public List<Trip> getMyTrips(String username) {
        return tripRepository.findByDriverUsername(username);
    }

    public Trip updateTripStatus(Long tripId, String status) {
        Trip trip = tripRepository.findById(tripId).orElseThrow();
        trip.setStatus(status);
        return tripRepository.save(trip);
    }
}
