// Install required packages
import { execSync } from 'child_process';

console.log('Installing Prisma and other dependencies...');
execSync('npm install prisma @prisma/client next-auth jsonwebtoken bcrypt');
execSync('npx prisma init');

console.log('Prisma initialized successfully!');

