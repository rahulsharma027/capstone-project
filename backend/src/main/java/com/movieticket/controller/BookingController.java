package com.movieticket.controller;

import com.movieticket.dto.BookingRequest;
import com.movieticket.entity.Booking;
import com.movieticket.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest request, Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(bookingService.createBooking(username, request));
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<Booking>> getUserBookings(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(bookingService.getUserBookings(username));
    }
    
    @GetMapping("/reference/{reference}")
    public ResponseEntity<Booking> getBookingByReference(@PathVariable String reference) {
        return ResponseEntity.ok(bookingService.getBookingByReference(reference));
    }
    
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        bookingService.cancelBooking(id, username);
        return ResponseEntity.ok().build();
    }
}
