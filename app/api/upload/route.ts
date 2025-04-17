import { type NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME || 'demo',
   api_key: process.env.CLOUDINARY_API_KEY || '123456789012345',
   api_secret:
      process.env.CLOUDINARY_API_SECRET || 'abcdefghijklmnopqrstuvwxyz12',
   secure: true,
});

export async function POST(request: NextRequest) {
   try {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      const type = (formData.get('type') as string) || 'blogs'; // Default to blogs if not specified

      if (!file) {
         return NextResponse.json(
            { error: 'No file provided' },
            { status: 400 }
         );
      }

      // Check if it's an image
      if (!file.type.startsWith('image/')) {
         return NextResponse.json(
            { error: 'File must be an image' },
            { status: 400 }
         );
      }

      // Determine folder path based on type
      const folder = `aitools/${type === 'tools' ? 'tools' : 'blogs'}`;

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
         const uploadStream = cloudinary.uploader.upload_stream(
            {
               folder: folder,
               resource_type: 'image',
               transformation: [
                  { width: 1200, crop: 'limit' },
                  { quality: 'auto' },
               ],
            },
            (error, result) => {
               if (error) reject(error);
               else resolve(result);
            }
         );

         // Write buffer to stream
         const Readable = require('stream').Readable;
         const readableInstanceStream = new Readable({
            read() {
               this.push(buffer);
               this.push(null);
            },
         });

         readableInstanceStream.pipe(uploadStream);
      });

      return NextResponse.json({
         url: (result as any).secure_url,
         public_id: (result as any).public_id,
         folder: folder,
      });
   } catch (error) {
      console.error('Error in upload route:', error);
      return NextResponse.json(
         { error: 'Failed to upload image' },
         { status: 500 }
      );
   }
}
