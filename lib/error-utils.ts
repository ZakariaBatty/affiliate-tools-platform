export function getErrorMessage(error: unknown): string {
   if (error instanceof Error) {
      return error.message;
   }

   if (typeof error === 'string') {
      return error;
   }

   if (typeof error === 'object' && error !== null && 'message' in error) {
      return String(error.message);
   }

   return 'An unknown error occurred';
}

export function formatValidationErrors(
   errors: Record<string, string[]>
): string {
   const errorMessages = Object.entries(errors)
      .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
      .join('; ');

   return errorMessages || 'Validation failed';
}
