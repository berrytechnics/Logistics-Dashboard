#!/bin/bash

# Docker scripts for Logistics Dashboard

case "$1" in
  "start")
    echo "Starting Logistics Dashboard with Docker Compose..."
    docker-compose up -d
    echo "Services started!"
    echo "Dashboard: http://localhost:3000"
    echo "API: http://localhost:3001"
    echo "API Docs: http://localhost:3001"
    ;;
  
  "stop")
    echo "Stopping Logistics Dashboard..."
    docker-compose down
    echo "Services stopped!"
    ;;
  
  "restart")
    echo "Restarting Logistics Dashboard..."
    docker-compose down
    docker-compose up -d
    echo "Services restarted!"
    ;;
  
  "logs")
    echo "Showing logs..."
    docker-compose logs -f
    ;;
  
  "build")
    echo "Building containers..."
    docker-compose build
    echo "Build complete!"
    ;;
  
  "clean")
    echo "Cleaning up containers and images..."
    docker-compose down -v --remove-orphans
    docker system prune -f
    echo "Cleanup complete!"
    ;;
  
  "api-logs")
    echo "Showing API logs..."
    docker-compose logs -f api
    ;;
  
  "app-logs")
    echo "Showing app logs..."
    docker-compose logs -f app
    ;;
  
  "shell")
    echo "Opening shell in app container..."
    docker-compose exec app sh
    ;;
  
  "api-shell")
    echo "Opening shell in API container..."
    docker-compose exec api sh
    ;;
  
  *)
    echo "Logistics Dashboard Docker Scripts"
    echo ""
    echo "Usage: ./docker-scripts.sh [command]"
    echo ""
    echo "Commands:"
    echo "  start      - Start all services"
    echo "  stop       - Stop all services"
    echo "  restart    - Restart all services"
    echo "  logs       - Show all logs"
    echo "  api-logs   - Show API logs only"
    echo "  app-logs   - Show app logs only"
    echo "  build      - Build containers"
    echo "  clean      - Clean up containers and images"
    echo "  shell      - Open shell in app container"
    echo "  api-shell  - Open shell in API container"
    echo ""
    echo "Services:"
    echo "  Dashboard: http://localhost:3000"
    echo "  API: http://localhost:3001"
    echo "  API Docs: http://localhost:3001"
    ;;
esac 