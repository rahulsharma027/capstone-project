# Backend - Spring Boot Application

## Overview
RESTful API backend for the Movie Ticket Booking System built with Spring Boot.

## Technology Stack
- Java 17
- Spring Boot 3.2.0
- Spring Security with JWT
- Spring Data JPA
- MySQL 8.0
- Maven

## Project Structure
```
src/main/java/com/movieticket/
├── config/              # Configuration classes
│   └── SecurityConfig.java
├── controller/          # REST controllers
│   ├── AuthController.java
│   ├── MovieController.java
│   ├── ShowController.java
│   └── BookingController.java
├── dto/                 # Data Transfer Objects
│   ├── LoginRequest.java
│   ├── SignupRequest.java
│   ├── JwtResponse.java
│   └── BookingRequest.java
├── entity/              # JPA entities
│   ├── User.java
│   ├── Movie.java
│   ├── Theater.java
│   ├── Show.java
│   └── Booking.java
├── repository/          # Data repositories
│   ├── UserRepository.java
│   ├── MovieRepository.java
│   ├── TheaterRepository.java
│   ├── ShowRepository.java
│   └── BookingRepository.java
├── security/            # Security components
│   ├── JwtUtils.java
│   ├── JwtAuthenticationFilter.java
│   └── UserDetailsServiceImpl.java
└── service/             # Business logic
    ├── MovieService.java
    ├── ShowService.java
    └── BookingService.java
```

## Running the Application

### Prerequisites
- Java 17
- Maven 3.9+
- MySQL 8.0

### Configuration
Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/movie_booking_db
spring.datasource.username=root
spring.datasource.password=password
```

### Build and Run
```bash
mvn clean install
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Documentation

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/signin` - Login

### Movies (Public)
- `GET /api/movies/active` - List active movies
- `GET /api/movies/{id}` - Get movie details

### Bookings (Authenticated)
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user` - Get user bookings

## Testing
```bash
mvn test
```

## Docker
```bash
docker build -t movie-booking-backend .
docker run -p 8080:8080 movie-booking-backend
```
