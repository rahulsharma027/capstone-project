export interface Movie {
  id: number;
  title: string;
  description: string;
  genre: string;
  language: string;
  duration: number;
  director: string;
  cast: string;
  posterUrl: string;
  trailerUrl: string;
  rating: number;
  releaseDate: string;
  isActive: boolean;
}

export interface Show {
  id: number;
  movie: Movie;
  theater: Theater;
  showTime: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  isActive: boolean;
}

export interface Theater {
  id: number;
  name: string;
  location: string;
  city: string;
  address: string;
  totalSeats: number;
  isActive: boolean;
}

export interface Booking {
  id: number;
  show: Show;
  numberOfSeats: number;
  seatNumbers: string;
  totalAmount: number;
  bookingReference: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  bookingDate: string;
  cancellationDate?: string;
}

export interface BookingRequest {
  showId: number;
  numberOfSeats: number;
  seatNumbers: string;
}
