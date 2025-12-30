package com.movieticket.controller;

import com.movieticket.entity.Show;
import com.movieticket.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shows")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ShowController {
    
    @Autowired
    private ShowService showService;
    
    @GetMapping
    public ResponseEntity<List<Show>> getAllShows() {
        return ResponseEntity.ok(showService.getAllShows());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Show> getShowById(@PathVariable Long id) {
        return ResponseEntity.ok(showService.getShowById(id));
    }
    
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Show>> getShowsByMovie(@PathVariable Long movieId) {
        return ResponseEntity.ok(showService.getShowsByMovie(movieId));
    }
    
    @GetMapping("/theater/{theaterId}")
    public ResponseEntity<List<Show>> getShowsByTheater(@PathVariable Long theaterId) {
        return ResponseEntity.ok(showService.getShowsByTheater(theaterId));
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<Show>> getUpcomingShows() {
        return ResponseEntity.ok(showService.getActiveUpcomingShows());
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Show> createShow(@RequestBody Show show) {
        return ResponseEntity.ok(showService.createShow(show));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Show> updateShow(@PathVariable Long id, @RequestBody Show show) {
        return ResponseEntity.ok(showService.updateShow(id, show));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteShow(@PathVariable Long id) {
        showService.deleteShow(id);
        return ResponseEntity.ok().build();
    }
}
