-- MySQL Database Schema for Movie Ticket Booking System

-- Create Database
CREATE DATABASE IF NOT EXISTS movie_booking_db;
USE movie_booking_db;

-- Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- User Roles Table
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role)
);

-- Movies Table
CREATE TABLE movies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    genre VARCHAR(50) NOT NULL,
    language VARCHAR(50) NOT NULL,
    duration INT, -- in minutes
    director VARCHAR(100),
    cast TEXT,
    poster_url VARCHAR(500),
    trailer_url VARCHAR(500),
    rating DECIMAL(3,1),
    release_date TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_genre (genre),
    INDEX idx_language (language),
    INDEX idx_active (is_active),
    INDEX idx_title (title)
);

-- Theaters Table
CREATE TABLE theaters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(500),
    total_seats INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_city (city),
    INDEX idx_active (is_active)
);

-- Shows Table
CREATE TABLE shows (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT NOT NULL,
    theater_id BIGINT NOT NULL,
    show_time TIMESTAMP NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    available_seats INT NOT NULL,
    total_seats INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE,
    INDEX idx_movie (movie_id),
    INDEX idx_theater (theater_id),
    INDEX idx_show_time (show_time),
    INDEX idx_active (is_active)
);

-- Bookings Table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    show_id BIGINT NOT NULL,
    number_of_seats INT NOT NULL,
    seat_numbers VARCHAR(500) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    booking_reference VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cancellation_date TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (show_id) REFERENCES shows(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_show (show_id),
    INDEX idx_reference (booking_reference),
    INDEX idx_status (status)
);

-- Sample Data Insertion

-- Insert Sample Theaters
INSERT INTO theaters (name, location, city, address, total_seats) VALUES
('PVR Cinemas', 'Phoenix Market City', 'Mumbai', 'Kurla, Mumbai - 400070', 250),
('INOX Multiplex', 'Malad', 'Mumbai', 'Malad West, Mumbai - 400064', 200),
('Cinepolis', 'Andheri', 'Mumbai', 'Andheri East, Mumbai - 400069', 180),
('Carnival Cinemas', 'Bangalore Central', 'Bangalore', 'MG Road, Bangalore - 560001', 220);

-- Insert Sample Movies
INSERT INTO movies (title, description, genre, language, duration, director, cast, poster_url, rating, release_date) VALUES
('Action Hero', 'An action-packed thriller with stunning visuals', 'Action', 'English', 150, 'Christopher Nolan', 'Tom Hardy, Christian Bale', 'https://via.placeholder.com/300x450', 8.5, '2024-01-15 00:00:00'),
('Comedy Nights', 'A hilarious comedy that will make you laugh', 'Comedy', 'Hindi', 120, 'Rohit Shetty', 'Akshay Kumar, Paresh Rawal', 'https://via.placeholder.com/300x450', 7.8, '2024-02-20 00:00:00'),
('Love Story', 'A romantic tale of two hearts', 'Romance', 'Tamil', 135, 'Mani Ratnam', 'Dhanush, Shruti Haasan', 'https://via.placeholder.com/300x450', 8.2, '2024-03-10 00:00:00'),
('Thriller Night', 'A suspenseful thriller that keeps you on edge', 'Thriller', 'Telugu', 140, 'Trivikram Srinivas', 'Mahesh Babu, Pooja Hegde', 'https://via.placeholder.com/300x450', 8.0, '2024-04-05 00:00:00'),
('Horror House', 'A terrifying horror experience', 'Horror', 'Hindi', 110, 'Ram Gopal Varma', 'Rajkummar Rao, Shraddha Kapoor', 'https://via.placeholder.com/300x450', 7.5, '2024-05-15 00:00:00');

-- Insert Sample Shows
INSERT INTO shows (movie_id, theater_id, show_time, price, available_seats, total_seats) VALUES
(1, 1, '2024-12-27 14:00:00', 250.00, 200, 250),
(1, 1, '2024-12-27 18:00:00', 300.00, 180, 250),
(2, 2, '2024-12-27 15:00:00', 200.00, 150, 200),
(2, 2, '2024-12-27 19:00:00', 250.00, 170, 200),
(3, 3, '2024-12-27 16:00:00', 220.00, 140, 180),
(4, 4, '2024-12-27 17:00:00', 280.00, 190, 220),
(5, 1, '2024-12-27 21:00:00', 300.00, 220, 250);

-- Create a default admin user (password: admin123 - BCrypt hashed)
INSERT INTO users (username, email, password, full_name, phone_number) VALUES
('admin', 'admin@moviebooking.com', '$2a$10$xJ8Z/vZBbLpVrZ9LLPQGc.YqJJHJ2K7P8QN9J1XvZ0P5H8J1J5J1J', 'Admin User', '9876543210');

INSERT INTO user_roles (user_id, role) VALUES
(1, 'ROLE_ADMIN');
