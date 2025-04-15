import { type NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const config = {
   api: {
      bodyParser: false,
   },
};

export async function POST(request: NextRequest) {
   try {
      const formData = await request.formData();
      const file = formData.get('file') as File;

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

      // Convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Upload to Cloudinary
      const result = (await uploadToCloudinary(buffer, {
         resource_type: 'image',
         // You can add more options here like:
         // public_id: `${Date.now()}`,
         // transformation: [{ width: 1000, crop: "limit" }],
      })) as any;

      // Return the Cloudinary URL
      return NextResponse.json({
         url: result.secure_url,
         public_id: result.public_id,
         // You can return more metadata if needed
         width: result.width,
         height: result.height,
         format: result.format,
      });
   } catch (error) {
      console.error('Error in upload route:', error);
      return NextResponse.json(
         { error: 'Failed to upload image' },
         { status: 500 }
      );
   }
}
