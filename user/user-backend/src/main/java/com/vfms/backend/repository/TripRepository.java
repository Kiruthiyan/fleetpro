package com.vfms.backend.repository;

import com.vfms.backend.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByDriverUsername(String username);
}
