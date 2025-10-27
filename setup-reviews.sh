#!/bin/bash

# Pitt Metro Realty Reviews System Setup Script
# This script sets up the complete reviews system with database and API

echo "🏠 Setting up Pitt Metro Realty Reviews System..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    print_warning "MySQL is not installed. Please install MySQL first."
    print_status "You can install MySQL using:"
    echo "  - macOS: brew install mysql"
    echo "  - Ubuntu: sudo apt-get install mysql-server"
    echo "  - Windows: Download from https://dev.mysql.com/downloads/mysql/"
    exit 1
fi

print_status "Installing backend dependencies..."
cd "$(dirname "$0")"

# Install backend dependencies
if [ -f "package-backend.json" ]; then
    cp package-backend.json package.json
    npm install
    print_success "Backend dependencies installed"
else
    print_error "package-backend.json not found"
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating environment file..."
    cp env.example .env
    print_warning "Please edit .env file with your database credentials"
    print_status "Default database configuration:"
    echo "  DB_HOST=localhost"
    echo "  DB_USER=root"
    echo "  DB_PASSWORD=your_password_here"
    echo "  DB_NAME=pittmetro_reviews"
    echo "  DB_PORT=3306"
else
    print_status "Environment file already exists"
fi

# Setup database
print_status "Setting up database..."
if [ -f "database/setup.js" ]; then
    node database/setup.js
    if [ $? -eq 0 ]; then
        print_success "Database setup completed"
    else
        print_error "Database setup failed. Please check your database credentials in .env file"
        exit 1
    fi
else
    print_error "Database setup script not found"
    exit 1
fi

# Create database directory if it doesn't exist
mkdir -p database

# Create logs directory
mkdir -p logs

print_success "Reviews system setup completed!"
echo ""
print_status "Next steps:"
echo "1. Edit .env file with your database credentials"
echo "2. Start the API server: npm start"
echo "3. The API will be available at http://localhost:3001"
echo "4. Frontend can now connect to the reviews API"
echo ""
print_status "API Endpoints:"
echo "  GET  /api/reviews - Get all reviews"
echo "  POST /api/reviews - Add new review"
echo "  GET  /api/reviews/stats - Get review statistics"
echo "  GET  /api/health - Health check"
echo ""
print_status "Database Tables Created:"
echo "  - reviews (main reviews table)"
echo "  - review_analytics (tracking table)"
echo "  - review_cache (performance cache)"
echo ""
print_success "Setup complete! 🎉"
