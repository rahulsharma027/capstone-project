# Frontend - Angular Application

## Overview
Modern, responsive frontend for the Movie Ticket Booking System built with Angular.

## Technology Stack
- Angular 17
- TypeScript
- RxJS
- CSS3

## Project Structure
```
src/app/
├── components/          # UI components
│   ├── navbar/
│   ├── home/
│   ├── login/
│   ├── signup/
│   ├── movie-list/
│   ├── movie-detail/
│   ├── booking/
│   └── my-bookings/
├── models/              # TypeScript interfaces
│   ├── user.model.ts
│   └── movie.model.ts
├── services/            # HTTP services
│   ├── auth.service.ts
│   ├── movie.service.ts
│   ├── show.service.ts
│   └── booking.service.ts
├── interceptors/        # HTTP interceptors
│   └── auth.interceptor.ts
├── app.component.ts
└── app.routes.ts
```

## Features

### User Interface
- **Home Page**: Featured movies and hero section
- **Movies Page**: Browse, filter by genre/language, search
- **Movie Details**: View movie information and available shows
- **Booking Page**: Select seats and confirm booking
- **My Bookings**: View and cancel bookings

### Responsive Design
- Mobile-friendly layout
- Adaptive grid system
- Touch-friendly interactions

## Running the Application

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm start
```

Navigate to `http://localhost:4200`

### Build
```bash
npm run build
```

Build artifacts will be in the `dist/` directory.

## Environment Configuration

Update API URL in services if needed:
```typescript
private apiUrl = 'http://localhost:8080/api';
```

## Testing
```bash
npm test
```

## Docker
```bash
docker build -t movie-booking-frontend .
docker run -p 80:80 movie-booking-frontend
```

## Key Components

### Authentication
- Login and signup forms
- JWT token management
- Protected routes

### Movie Browsing
- Genre and language filters
- Search functionality
- Movie cards with posters

### Booking System
- Real-time seat availability
- Booking confirmation
- Booking history

## Styling
- Custom CSS with modern design
- Color scheme: Dark navy, pink accents
- Responsive grid layouts
- Smooth animations
