package com.movieticket.repository;

import com.movieticket.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByGenre(String genre);
    List<Movie> findByLanguage(String language);
    List<Movie> findByGenreAndLanguage(String genre, String language);
    List<Movie> findByIsActiveTrue();
    List<Movie> findByTitleContainingIgnoreCase(String title);
}
