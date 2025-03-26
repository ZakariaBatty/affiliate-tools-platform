import { NextResponse } from 'next/server';

export async function GET() {
   return NextResponse.json({
      status: 'ok',
      version: '1.0.0', // Update version as needed
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
   });
}
