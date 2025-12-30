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

-- Insert Sample Movies with Real IMDB Poster Links
INSERT INTO movies (title, description, genre, language, duration, director, cast, poster_url, trailer_url, rating, release_date) VALUES
('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'Action', 'English', 152, 'Christopher Nolan', 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', 'https://www.youtube.com/watch?v=EXeTwQWrcwY', 9.0, '2025-01-15 00:00:00'),

('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'Sci-Fi', 'English', 148, 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 8.8, '2025-01-20 00:00:00'),

('3 Idiots', 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.', 'Comedy', 'Hindi', 170, 'Rajkumar Hirani', 'Aamir Khan, Madhavan, Mona Singh, Sharman Joshi', 'https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', 'https://www.youtube.com/watch?v=K0eDlFX9GMc', 8.4, '2025-02-14 00:00:00'),

('Drishyam', 'A man goes to extreme lengths to save his family from punishment after the family commits an accidental crime.', 'Thriller', 'Hindi', 163, 'Nishikant Kamat', 'Ajay Devgn, Tabu, Shriya Saran, Rajat Kapoor', 'https://m.media-amazon.com/images/M/MV5BMTcwNjY5Mzc2Ml5BMl5BanBnXkFtZTgwNjYwMTE0MzE@._V1_SX300.jpg', 'https://www.youtube.com/watch?v=AuuX2j14NBg', 8.2, '2025-03-10 00:00:00'),

('Tumbbad', 'A mythological story about a goddess who created the entire universe. The plot revolves around the consequences when humans build a temple for her first-born.', 'Horror', 'Hindi', 104, 'Rahi Anil Barve', 'Sohum Shah, Jyoti Malshe, Anita Date, Dhundiraj Prabhakar Jogalekar', 'https://m.media-amazon.com/images/M/MV5BMTc5NDUzOTYyMl5BMl5BanBnXkFtZTgwOTMwMjMyNjM@._V1_SX300.jpg', 'https://www.youtube.com/watch?v=sztf4V8z2qE', 8.2, '2025-03-20 00:00:00'),

('Bahubali 2: The Conclusion', 'When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.', 'Action', 'Telugu', 167, 'S.S. Rajamouli', 'Prabhas, Rana Daggubati, Anushka Shetty, Tamannaah Bhatia', 'https://m.media-amazon.com/images/M/MV5BYThjM2Y4ZmYtZjU3YS00ZjdkLThhNzctOWI4MzI1MmI5MTIwXkEyXkFqcGdeQXVyNjE1OTQ0NjA@._V1_SX300.jpg', 'https://www.youtube.com/watch?v=sOEg_YZQsTI', 8.7, '2025-04-01 00:00:00'),

('RRR', 'A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.', 'Action', 'Telugu', 187, 'S.S. Rajamouli', 'N.T. Rama Rao Jr., Ram Charan, Ajay Devgn, Alia Bhatt', 'https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg', 'https://www.youtube.com/watch?v=GY4CDSuRgk4', 8.9, '2025-04-10 00:00:00'),

('Dangal', 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.', 'Drama', 'Hindi', 161, 'Nitesh Tiwari', 'Aamir Khan, Sakshi Tanwar, Fatima Sana Shaikh, Sanya Malhotra', 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SX300.jpg', 'https://www.youtube.com/watch?v=x_7YlGv9u1g', 8.6, '2025-05-01 00:00:00'),

('Vikram', 'Members of a black ops team must track and eliminate a gang of masked murderers.', 'Action', 'Tamil', 174, 'Lokesh Kanagaraj', 'Kamal Haasan, Vijay Sethupathi, Fahadh Faasil, Narain', 'https://m.media-amazon.com/images/M/MV5BZDNjMjM0YzUtNjg2Yi00MjNlLWI0M2QtMDMzM2RjNzc4ZGI5XkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_SX300.jpg', 'https://www.youtube.com/watch?v=OKBMCL-frPU', 8.5, '2025-05-15 00:00:00'),

('K.G.F: Chapter 2', 'In the blood-soaked Kolar Gold Fields, Rockys name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order.', 'Action', 'Kannada', 168, 'Prashanth Neel', 'Yash, Sanjay Dutt, Raveena Tandon, Srinidhi Shetty', 'https://m.media-amazon.com/images/M/MV5BMGJkY2I5NjAtZjhkYy00ZmFjLWE3ZjgtNGQxMmU1ZGFmYzg0XkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_SX300.jpg', 'https://www.youtube.com/watch?v=JKa05nyUmuQ', 8.3, '2025-06-01 00:00:00');

-- Insert Sample Shows
INSERT INTO shows (movie_id, theater_id, show_time, price, available_seats, total_seats) VALUES
-- The Dark Knight shows
(1, 1, '2025-12-31 14:00:00', 250.00, 200, 250),
(1, 1, '2025-12-31 18:00:00', 300.00, 180, 250),
(1, 2, '2025-12-31 21:00:00', 280.00, 150, 200),
-- Inception shows
(2, 2, '2025-12-31 15:00:00', 200.00, 150, 200),
(2, 2, '2025-12-31 19:00:00', 250.00, 170, 200),
(2, 3, '2025-12-31 22:00:00', 220.00, 140, 180),
-- 3 Idiots shows
(3, 3, '2025-12-31 16:00:00', 220.00, 140, 180),
(3, 4, '2025-12-31 20:00:00', 240.00, 180, 220),
-- Drishyam shows
(4, 4, '2025-12-31 17:00:00', 280.00, 190, 220),
(4, 1, '2025-12-31 21:00:00', 300.00, 220, 250),
-- Tumbbad shows
(5, 1, '2025-12-31 23:00:00', 300.00, 220, 250),
(5, 2, '2025-12-31 23:30:00', 280.00, 180, 200),
-- Bahubali 2 shows
(6, 1, '2026-01-01 13:00:00', 350.00, 230, 250),
(6, 3, '2026-01-01 17:00:00', 300.00, 160, 180),
-- RRR shows
(7, 2, '2026-01-01 14:00:00', 320.00, 180, 200),
(7, 4, '2026-01-01 18:00:00', 350.00, 200, 220),
-- Dangal shows
(8, 3, '2026-01-01 15:00:00', 250.00, 150, 180),
(8, 1, '2026-01-01 19:00:00', 280.00, 220, 250),
-- Vikram shows
(9, 4, '2026-01-01 16:00:00', 300.00, 210, 220),
(9, 2, '2026-01-01 20:00:00', 320.00, 190, 200),
-- K.G.F: Chapter 2 shows
(10, 1, '2026-01-01 22:00:00', 350.00, 240, 250),
(10, 3, '2026-01-01 21:00:00', 280.00, 170, 180);

-- Create a default admin user (password: admin123 - BCrypt hashed)
INSERT INTO users (username, email, password, full_name, phone_number) VALUES
('admin', 'admin@moviebooking.com', '$2a$10$xJ8Z/vZBbLpVrZ9LLPQGc.YqJJHJ2K7P8QN9J1XvZ0P5H8J1J5J1Ja', 'Admin User', '9876543210');

INSERT INTO user_roles (user_id, role) VALUES
(1, 'ROLE_ADMIN');
