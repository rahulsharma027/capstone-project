# Quick Start Guide

## 🚀 Option 1: Docker (Recommended - Fastest)

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Steps
```bash
cd /Users/sharrahu/Documents/Projects/capstone
docker-compose up -d
```

Wait 30 seconds, then access:
- **Frontend:** http://localhost
- **Backend API:** http://localhost:8080

---

## 💻 Option 2: Local Development

### Prerequisites
- Java 17+, Node.js 18+, Maven 3.9+, MySQL 8.0

### Step 1: Database
```bash
docker run -d --name mysql-movie-booking \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=movie_booking_db \
  -p 3306:3306 mysql:8.0
```

### Step 2: Backend
```bash
cd backend
./setup.sh
mvn spring-boot:run
```

### Step 3: Frontend (new terminal)
```bash
cd frontend
./setup.sh
npm start
```

Frontend: http://localhost:4200

---

## 📝 First Login

### Test Account
- Username: **admin**
- Password: **admin123**

### Or Create New Account
1. Click "Signup"
2. Fill form and register
3. Login with your credentials

---

## 🧪 Quick Test

1. Browse Movies
2. Select a movie
3. Choose a show
4. Book tickets
5. View "My Bookings"

---

## 🔧 Troubleshooting

**Frontend errors?**
```bash
cd frontend && npm install
```

**Port conflicts?**
```bash
lsof -ti:8080 | xargs kill -9
lsof -ti:4200 | xargs kill -9
```

**Reset everything?**
```bash
docker-compose down -v
docker-compose up -d
```

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more help.

---

## 🎯 What's Working

✅ **Frontend Issues Fixed:**
- Added missing RouterModule import
- Added environment configuration
- Updated API URLs to use environment variables
- Fixed TypeScript strict mode issues

✅ **AWS Deployment Fixed:**
- Improved error handling
- Better cross-platform compatibility
- Added AWS CLI validation
- Fixed echo commands for portability

✅ **Setup Scripts:**
- Added automated setup scripts for easy installation
- Made all scripts executable
- Created comprehensive troubleshooting guide

---

## 📖 Full Documentation

- [README.md](README.md) - Complete project documentation
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Detailed troubleshooting
- [aws/README.md](aws/README.md) - AWS deployment guide

---

**Ready to go! 🎬**
