package com.vfms.trip.service;

import com.vfms.trip.model.Trip;
import com.vfms.trip.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository repository;

    public List<Trip> getAllTrips() {
        return repository.findAll();
    }

    public List<Trip> getTripsByDriver(Integer driverId) {
        return repository.findByDriverId(driverId);
    }

    public List<Trip> getTripsByRequester(Integer requesterId) {
        return repository.findByRequesterId(requesterId);
    }

    public List<Trip> getTripsByStatus(com.vfms.trip.model.TripStatus status) {
        return repository.findByStatus(status);
    }

    public Trip getTripById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Trip not found"));
    }

    public Trip createTrip(Trip trip) {
        return repository.save(trip);
    }

    public Trip updateTrip(Integer id, Trip tripDetails) {
        Trip trip = getTripById(id);
        trip.setStartLocation(tripDetails.getStartLocation());
        trip.setEndLocation(tripDetails.getEndLocation());
        trip.setStartTime(tripDetails.getStartTime());
        trip.setEndTime(tripDetails.getEndTime());
        trip.setStatus(tripDetails.getStatus());
        trip.setDriver(tripDetails.getDriver());
        trip.setVehicle(tripDetails.getVehicle());
        trip.setDistance(tripDetails.getDistance());
        return repository.save(trip);
    }

    public void deleteTrip(Integer id) {
        repository.deleteById(id);
    }
}
