#!/bin/bash

# Stop Development Environment Script

echo "Stopping Logistics Dashboard Development Environment..."

# Stop Next.js development server if running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "Stopping Next.js development server..."
    pkill -f "next dev" || true
fi

# Stop Docker containers
echo "Stopping Docker containers..."
docker-compose down

echo "Development environment stopped!"
echo ""
echo "To start again, run: ./start-dev.sh" 