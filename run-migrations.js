import { execSync } from 'child_process';

console.log('Generating Prisma client and running migrations...');
execSync('npx prisma migrate dev --name init');
execSync('curl -X POST http://localhost:3000/api/seed');

console.log('Migrations completed successfully!');

