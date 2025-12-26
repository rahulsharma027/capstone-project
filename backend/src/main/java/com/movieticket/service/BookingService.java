package com.movieticket.service;

import com.movieticket.dto.BookingRequest;
import com.movieticket.entity.Booking;
import com.movieticket.entity.Show;
import com.movieticket.entity.User;
import com.movieticket.repository.BookingRepository;
import com.movieticket.repository.ShowRepository;
import com.movieticket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private ShowRepository showRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public Booking createBooking(String username, BookingRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Show show = showRepository.findById(request.getShowId())
                .orElseThrow(() -> new RuntimeException("Show not found"));
        
        if (show.getAvailableSeats() < request.getNumberOfSeats()) {
            throw new RuntimeException("Not enough seats available");
        }
        
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setShow(show);
        booking.setNumberOfSeats(request.getNumberOfSeats());
        booking.setSeatNumbers(request.getSeatNumbers());
        booking.setTotalAmount(show.getPrice() * request.getNumberOfSeats());
        booking.setBookingReference(generateBookingReference());
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        booking.setBookingDate(LocalDateTime.now());
        
        // Update available seats
        show.setAvailableSeats(show.getAvailableSeats() - request.getNumberOfSeats());
        showRepository.save(show);
        
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getUserBookings(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByUserId(user.getId());
    }
    
    public Booking getBookingByReference(String reference) {
        return bookingRepository.findByBookingReference(reference)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    @Transactional
    public void cancelBooking(Long bookingId, String username) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        if (!booking.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized to cancel this booking");
        }
        
        if (booking.getStatus() != Booking.BookingStatus.CONFIRMED) {
            throw new RuntimeException("Booking cannot be cancelled");
        }
        
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking.setCancellationDate(LocalDateTime.now());
        
        // Restore available seats
        Show show = booking.getShow();
        show.setAvailableSeats(show.getAvailableSeats() + booking.getNumberOfSeats());
        showRepository.save(show);
        
        bookingRepository.save(booking);
    }
    
    private String generateBookingReference() {
        return "BK" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
