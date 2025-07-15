#!/bin/bash

# Start Development Environment Script
# This script starts both the Docker containers and the local Next.js development server

echo "Starting Logistics Dashboard Development Environment..."

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "Port $port is already in use"
        return 1
    else
        return 0
    fi
}

# Function to wait for a service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo "Waiting for $service_name to be ready..."
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo "$service_name is ready!"
            return 0
        fi
        echo "Attempt $attempt/$max_attempts - $service_name not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "Warning: $service_name may not be fully ready"
    return 1
}

# Start Docker containers
echo "Starting Docker containers..."
docker-compose up -d

# Wait for API to be ready
wait_for_service "http://localhost:3001/analytics" "Mock API"

# Check if Next.js dev server is already running
if check_port 3000; then
    echo "Starting Next.js development server..."
    npm run dev &
    DEV_PID=$!
    echo "Next.js development server started with PID: $DEV_PID"
else
    echo "Next.js development server is already running on port 3000"
fi

# Wait for Next.js to be ready
wait_for_service "http://localhost:3000" "Next.js App"

echo ""
echo "🎉 Development environment is ready!"
echo ""
echo "Services:"
echo "  📊 Dashboard: http://localhost:3000"
echo "  🔌 API: http://localhost:3001"
echo "  📚 API Docs: http://localhost:3001"
echo ""
echo "To stop all services, run: ./stop-dev.sh"
echo "To view logs, run: docker-compose logs -f"
echo ""
echo "Press Ctrl+C to stop the development server (Docker containers will continue running)"
echo ""

# Keep the script running and handle cleanup
trap 'echo "Stopping development server..."; kill $DEV_PID 2>/dev/null; exit' INT

# Wait for the background process
wait $DEV_PID 