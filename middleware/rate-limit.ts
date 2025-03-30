import { type NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
   url: process.env.UPSTASH_REDIS_REST_URL!,
   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiting middleware
export async function rateLimitMiddleware(
   req: NextRequest,
   { limit = 10, window = 60 } = {}
) {
   // Get IP address from request
   const ip = req.headers.get('x-forwarded-for') || 'anonymous';

   // Create a unique key for this IP and endpoint
   const key = `rate-limit:${ip}:${req.nextUrl.pathname}`;

   // Get current count
   const count = await redis.incr(key);

   // Set expiry on first request
   if (count === 1) {
      await redis.expire(key, window);
   }

   // Get remaining time to live
   const ttl = await redis.ttl(key);

   // Set headers
   const response = NextResponse.next();
   response.headers.set('X-RateLimit-Limit', limit.toString());
   response.headers.set(
      'X-RateLimit-Remaining',
      Math.max(0, limit - count).toString()
   );
   response.headers.set(
      'X-RateLimit-Reset',
      (Date.now() + ttl * 1000).toString()
   );

   // If limit exceeded, return 429 Too Many Requests
   if (count > limit) {
      return new NextResponse(
         JSON.stringify({
            error: 'Too many requests, please try again later.',
         }),
         {
            status: 429,
            headers: {
               'Content-Type': 'application/json',
               'X-RateLimit-Limit': limit.toString(),
               'X-RateLimit-Remaining': '0',
               'X-RateLimit-Reset': (Date.now() + ttl * 1000).toString(),
               'Retry-After': ttl.toString(),
            },
         }
      );
   }

   return response;
}
