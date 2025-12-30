package com.movieticket.repository;

import com.movieticket.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {
    List<Show> findByMovieId(Long movieId);
    List<Show> findByTheaterId(Long theaterId);
    List<Show> findByMovieIdAndTheaterId(Long movieId, Long theaterId);
    List<Show> findByShowTimeBetween(LocalDateTime start, LocalDateTime end);
    List<Show> findByIsActiveTrueAndShowTimeAfter(LocalDateTime currentTime);
}
