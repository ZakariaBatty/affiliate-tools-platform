#!/bin/sh

set -e

echo "Waiting for database to be ready..."
# Wait for the database to be ready
npx wait-on -t 60000 tcp:postgres:5432

echo "Running database migrations..."
# Run migrations
npx prisma migrate deploy

# Seed the database if SEED_DATABASE is true
if [ "$SEED_DATABASE" = "true" ]; then
  echo "Seeding database..."
  npx prisma db seed
else
  echo "Skipping database seed"
fi

echo "Database setup complete!"

