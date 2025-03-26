#!/bin/bash

# Wait for database to be ready
echo "Waiting for database to be ready..."
npx wait-on tcp:postgres:5432 -t 60000

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Run seed if specified
if [ "$SEED_DATABASE" = "true" ]; then
  echo "Seeding database..."
  npx prisma db seed
fi

echo "Database setup complete!"

