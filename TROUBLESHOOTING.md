# Troubleshooting Guide

## Common Issues and Solutions

### Frontend Issues

#### 1. Module Not Found Errors
**Error:** `Cannot find module '@angular/core'` or similar

**Solution:**
```bash
cd frontend
npm install
```

If that doesn't work, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 2. Port Already in Use
**Error:** `Port 4200 is already in use`

**Solution:**
```bash
# Find and kill the process using port 4200
lsof -ti:4200 | xargs kill -9

# Or use a different port
ng serve --port 4201
```

#### 3. CORS Errors
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend is running on port 8080
- Check `application.properties` has correct CORS configuration:
```properties
cors.allowed-origins=http://localhost:4200
```

#### 4. API Connection Errors
**Error:** `Http failure response for http://localhost:8080/api/...`

**Solution:**
- Verify backend is running: `curl http://localhost:8080/actuator/health`
- Check environment configuration in `src/environments/environment.development.ts`

### Backend Issues

#### 1. Database Connection Failed
**Error:** `Communications link failure`

**Solution:**
```bash
# Check if MySQL is running
docker ps | grep mysql

# Start MySQL if not running
docker run -d --name mysql-movie-booking \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=movie_booking_db \
  -p 3306:3306 mysql:8.0

# Wait for MySQL to be ready
sleep 20
```

#### 2. Port 8080 Already in Use
**Error:** `Port 8080 is already in use`

**Solution:**
```bash
# Find and kill the process
lsof -ti:8080 | xargs kill -9

# Or change port in application.properties
server.port=8081
```

#### 3. Maven Build Failures
**Error:** Build failures or test failures

**Solution:**
```bash
# Clean build
mvn clean install -DskipTests

# Or with tests
mvn clean install
```

#### 4. JWT Token Issues
**Error:** `Invalid JWT token` or authentication failures

**Solution:**
- Clear browser localStorage
- Try registering a new user
- Check JWT secret in `application.properties`

### Docker Issues

#### 1. Docker Build Fails
**Error:** Build errors during docker build

**Solution:**
```bash
# Clear Docker cache
docker builder prune -a

# Rebuild with no cache
docker-compose build --no-cache
```

#### 2. Container Stops Immediately
**Error:** Container exits right after starting

**Solution:**
```bash
# Check container logs
docker logs movie-booking-backend
docker logs movie-booking-frontend

# Check if MySQL is healthy
docker-compose ps
```

#### 3. Cannot Connect to MySQL Container
**Error:** Backend can't connect to MySQL in Docker

**Solution:**
- Wait for MySQL health check to pass
- Check docker-compose network configuration
- Verify environment variables in docker-compose.yml

### AWS Issues

#### 1. CloudFormation Stack Creation Fails
**Error:** Stack rollback or creation failure

**Solution:**
```bash
# Check stack events
aws cloudformation describe-stack-events \
  --stack-name production-movie-booking-stack \
  --region us-east-1

# Delete failed stack
aws cloudformation delete-stack \
  --stack-name production-movie-booking-stack
```

#### 2. ECR Push Permission Denied
**Error:** Permission denied when pushing to ECR

**Solution:**
```bash
# Re-authenticate with ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com
```

#### 3. RDS Connection Timeout
**Error:** Cannot connect to RDS

**Solution:**
- Check security group rules
- Verify RDS endpoint
- Check if RDS is in the same VPC as your application

### Development Environment Setup

#### Quick Health Check Script
Create a file `health-check.sh`:

```bash
#!/bin/bash

echo "Running health checks..."

# Check MySQL
echo -n "MySQL: "
docker ps | grep mysql > /dev/null && echo "✓ Running" || echo "✗ Not running"

# Check Backend
echo -n "Backend: "
curl -s http://localhost:8080/actuator/health > /dev/null && echo "✓ Healthy" || echo "✗ Not responding"

# Check Frontend
echo -n "Frontend: "
curl -s http://localhost:4200 > /dev/null && echo "✓ Accessible" || echo "✗ Not accessible"
```

Run with:
```bash
chmod +x health-check.sh
./health-check.sh
```

### Common Commands Reference

#### Frontend
```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
ng lint
```

#### Backend
```bash
# Clean and build
mvn clean install

# Run application
mvn spring-boot:run

# Run tests
mvn test

# Package
mvn package
```

#### Docker
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build backend

# Remove volumes (clean database)
docker-compose down -v
```

#### Database
```bash
# Connect to MySQL
mysql -h localhost -P 3306 -u root -p

# Connect to MySQL in Docker
docker exec -it mysql-movie-booking mysql -u root -p

# Export database
mysqldump -u root -p movie_booking_db > backup.sql

# Import database
mysql -u root -p movie_booking_db < backup.sql
```

### Getting Help

If you encounter issues not covered here:

1. Check application logs
2. Review error messages carefully
3. Verify all prerequisites are installed
4. Check GitHub issues
5. Review the main README.md for setup instructions

### Clean Slate Reset

If nothing works, try a complete reset:

```bash
# Stop all services
docker-compose down -v

# Clean frontend
cd frontend
rm -rf node_modules package-lock.json dist .angular
npm install
cd ..

# Clean backend
cd backend
mvn clean
cd ..

# Restart
docker-compose up -d
```
