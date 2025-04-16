import { execSync } from 'child_process';

console.log('Generating Prisma client and running migrations...');
execSync('npx prisma migrate dev --name init');

console.log('Migrations completed successfully!');

