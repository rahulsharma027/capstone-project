package com.movieticket.repository;

import com.movieticket.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByShowId(Long showId);
    Optional<Booking> findByBookingReference(String bookingReference);
    List<Booking> findByUserIdAndStatus(Long userId, Booking.BookingStatus status);
}
