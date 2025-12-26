#!/bin/bash

# Complete Project Setup Script

echo "========================================="
echo "Movie Ticket Booking System - Setup"
echo "========================================="
echo ""

# Function to check command
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "✗ $1 is not installed"
        return 1
    else
        echo "✓ $1 is installed"
        return 0
    fi
}

# Check prerequisites
echo "Checking prerequisites..."
check_command "docker" || DOCKER_MISSING=true
check_command "docker-compose" || COMPOSE_MISSING=true
check_command "java" || JAVA_MISSING=true
check_command "mvn" || MAVEN_MISSING=true
check_command "node" || NODE_MISSING=true
check_command "npm" || NPM_MISSING=true

echo ""

# If Docker and Docker Compose are available, offer quick start
if [ -z "$DOCKER_MISSING" ] && [ -z "$COMPOSE_MISSING" ]; then
    echo "========================================="
    echo "Quick Start with Docker"
    echo "========================================="
    echo ""
    read -p "Do you want to start the application with Docker? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Starting application with Docker Compose..."
        docker-compose up -d
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✓ Application started successfully!"
            echo ""
            echo "Access the application at:"
            echo "  Frontend: http://localhost"
            echo "  Backend API: http://localhost:8080"
            echo "  MySQL: localhost:3306"
            echo ""
            echo "To stop the application, run:"
            echo "  docker-compose down"
        else
            echo "✗ Failed to start application"
            exit 1
        fi
        exit 0
    fi
fi

# Manual setup
echo "========================================="
echo "Manual Setup"
echo "========================================="
echo ""

# Setup backend
if [ -z "$JAVA_MISSING" ] && [ -z "$MAVEN_MISSING" ]; then
    echo "Setting up Backend..."
    cd backend
    chmod +x setup.sh
    ./setup.sh
    cd ..
    echo ""
else
    echo "⚠ Skipping backend setup (Java or Maven not installed)"
    echo ""
fi

# Setup frontend
if [ -z "$NODE_MISSING" ] && [ -z "$NPM_MISSING" ]; then
    echo "Setting up Frontend..."
    cd frontend
    chmod +x setup.sh
    ./setup.sh
    cd ..
    echo ""
else
    echo "⚠ Skipping frontend setup (Node.js or npm not installed)"
    echo ""
fi

echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Start MySQL database:"
echo "   docker run -d --name mysql-movie-booking \\"
echo "     -e MYSQL_ROOT_PASSWORD=password \\"
echo "     -e MYSQL_DATABASE=movie_booking_db \\"
echo "     -p 3306:3306 mysql:8.0"
echo ""
echo "2. Start Backend:"
echo "   cd backend && mvn spring-boot:run"
echo ""
echo "3. Start Frontend:"
echo "   cd frontend && npm start"
echo ""
echo "Or use Docker Compose:"
echo "   docker-compose up -d"
