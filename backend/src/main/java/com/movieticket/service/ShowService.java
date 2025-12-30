package com.movieticket.service;

import com.movieticket.entity.Show;
import com.movieticket.repository.ShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ShowService {
    
    @Autowired
    private ShowRepository showRepository;
    
    public List<Show> getAllShows() {
        return showRepository.findAll();
    }
    
    public Show getShowById(Long id) {
        return showRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Show not found"));
    }
    
    public List<Show> getShowsByMovie(Long movieId) {
        return showRepository.findByMovieId(movieId);
    }
    
    public List<Show> getShowsByTheater(Long theaterId) {
        return showRepository.findByTheaterId(theaterId);
    }
    
    public List<Show> getActiveUpcomingShows() {
        return showRepository.findByIsActiveTrueAndShowTimeAfter(LocalDateTime.now());
    }
    
    public Show createShow(Show show) {
        return showRepository.save(show);
    }
    
    public Show updateShow(Long id, Show showDetails) {
        Show show = getShowById(id);
        show.setShowTime(showDetails.getShowTime());
        show.setPrice(showDetails.getPrice());
        show.setAvailableSeats(showDetails.getAvailableSeats());
        show.setTotalSeats(showDetails.getTotalSeats());
        show.setIsActive(showDetails.getIsActive());
        return showRepository.save(show);
    }
    
    public void deleteShow(Long id) {
        Show show = getShowById(id);
        show.setIsActive(false);
        showRepository.save(show);
    }
}
