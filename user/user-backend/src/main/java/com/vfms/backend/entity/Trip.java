package com.vfms.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "trips")
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String startLocation;

    private String endLocation;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String status; // SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED

    @ManyToOne
    @JoinColumn(name = "user_id") // Driver
    private User driver;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
}
