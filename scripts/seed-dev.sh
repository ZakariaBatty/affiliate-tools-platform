#!/bin/bash

echo "🌱 Running database seed in development environment..."

# Check if database exists and is accessible
npx prisma db push --skip-generate

# Run the seed
npx prisma db seed

echo "✅ Seed completed successfully!"