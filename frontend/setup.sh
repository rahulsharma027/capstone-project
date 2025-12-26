#!/bin/bash

# Frontend Setup Script

echo "Setting up Movie Ticket Booking Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm."
    exit 1
fi

echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Navigate to frontend directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully!"
    echo ""
    echo "You can now run:"
    echo "  npm start          - Start development server"
    echo "  npm run build      - Build for production"
    echo "  npm test           - Run tests"
else
    echo "✗ Failed to install dependencies"
    exit 1
fi
