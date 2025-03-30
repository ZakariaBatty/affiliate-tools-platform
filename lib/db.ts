/**
 * Helper function to execute database operations with proper connection handling
 * @param operation Function that performs database operations
 * @returns Result of the database operation
 */
export async function withDb<T>(operation: () => Promise<T>): Promise<T> {
   try {
      return await operation();
   } catch (error) {
      console.error('Database operation failed:', error);
      throw error;
   }
}

// Example usage:
// const users = await withDb(() => prisma.user.findMany())
