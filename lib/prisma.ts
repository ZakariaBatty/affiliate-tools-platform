import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
   prisma: PrismaClient | undefined;
};

// Use officially supported options
const prismaClientSingleton = () => {
   return new PrismaClient({
      log: ['query', 'error', 'warn'],
   });
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
