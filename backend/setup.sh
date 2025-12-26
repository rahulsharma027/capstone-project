#!/bin/bash

# Backend Setup Script

echo "Setting up Movie Ticket Booking Backend..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "Error: Maven is not installed. Please install Maven 3.9 or higher."
    exit 1
fi

echo "Java version:"
java -version

echo ""
echo "Maven version:"
mvn -v

# Navigate to backend directory
cd "$(dirname "$0")"

# Build the project
echo ""
echo "Building backend application..."
mvn clean install -DskipTests

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✓ Backend built successfully!"
    echo ""
    echo "You can now run:"
    echo "  mvn spring-boot:run    - Start the application"
    echo "  mvn test               - Run tests"
else
    echo "✗ Failed to build backend"
    exit 1
fi
