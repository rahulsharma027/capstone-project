# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Option 1: Docker Compose (Recommended)

1. **Prerequisites**: Install Docker and Docker Compose

2. **Start the Application**:
```bash
cd /Users/sharrahu/Documents/Projects/capstone
docker-compose up -d
```

3. **Access the Application**:
   - Frontend: http://localhost
   - Backend API: http://localhost:8080
   - MySQL: localhost:3306

4. **Stop the Application**:
```bash
docker-compose down
```

### Option 2: Manual Setup

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

#### Database
```bash
docker run -d \
  --name mysql-movie-booking \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=movie_booking_db \
  -p 3306:3306 \
  mysql:8.0
```

## 📝 Default Credentials

**Admin User**:
- Username: `admin`
- Password: `admin123`

## 🧪 Test the Application

1. **Sign Up**: Create a new user account
2. **Browse Movies**: View available movies
3. **Book Tickets**: Select a movie, choose a show, and book tickets
4. **View Bookings**: Check your booking history

## 🎯 Key Features to Try

✅ Filter movies by genre and language
✅ Search for specific movies
✅ View detailed movie information
✅ Book tickets with seat selection
✅ View and cancel bookings

## 📚 Next Steps

- Read the [full README.md](README.md) for detailed documentation
- Check [backend/README.md](backend/README.md) for API details
- Review [frontend/README.md](frontend/README.md) for UI features
- Explore [aws/README.md](aws/README.md) for deployment guide

## 🐛 Troubleshooting

### Backend won't start
- Ensure MySQL is running
- Check database connection in `application.properties`
- Verify Java 17 is installed: `java -version`

### Frontend won't start
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (should be 18+)

### Docker issues
- Ensure Docker is running
- Check ports 80, 3306, 8080 are available
- View logs: `docker-compose logs -f`

## 📧 Need Help?

Create an issue on GitHub or contact support.

---

**Happy Booking! 🎬🍿**
