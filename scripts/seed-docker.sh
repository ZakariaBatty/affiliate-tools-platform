#!/bin/bash

echo "🌱 Running database seed in Docker environment..."

# Wait for database to be ready
echo "Waiting for database to be ready..."
npx wait-on tcp:postgres:5432 -t 60000

# Check if database exists and is accessible
npx prisma db push --skip-generate

# Run the seed
npx prisma db seed

echo "✅ Seed completed successfully!"