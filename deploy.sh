#!/bin/bash

# MetaCitizen Deployment Script
echo "🚀 Starting MetaCitizen deployment..."

# Stop all running containers
echo "🛑 Stopping all containers..."
sudo docker compose down --remove-orphans

# Remove images for this project to force rebuild
echo "🗑️ Removing old images..."
sudo docker rmi $(sudo docker images "basedmetacitizen*" -q) 2>/dev/null || true

# Remove dangling images and clean build cache
echo "🧹 Cleaning Docker cache..."
sudo docker builder prune -f

# Build and start all services with no cache
echo "📦 Building and starting all services (no cache)..."
sudo docker compose build --no-cache --pull
sudo docker compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo "🔍 Checking service status..."
sudo docker compose ps

# Show logs for verification
echo "📝 Recent logs:"
sudo docker compose logs --tail=20

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo "🗄️ Database: localhost:5432"

echo ""
echo "To view logs: sudo docker compose logs -f [service_name]"
echo "To stop: sudo docker compose down" 