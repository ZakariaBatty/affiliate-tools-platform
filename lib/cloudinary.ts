import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
   secure: true,
});

// Function to generate a signature for direct uploads (client-side)
export function generateSignature(folder = 'blog-posts') {
   const timestamp = Math.round(new Date().getTime() / 1000);
   const params = {
      timestamp,
      folder,
   };

   const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET!
   );

   return {
      signature,
      timestamp,
   };
}

// Server-side function to upload an image to Cloudinary
export async function uploadToCloudinary(file: Buffer, options = {}) {
   return new Promise((resolve, reject) => {
      const uploadOptions = {
         folder: 'blog-posts',
         ...options,
      };

      cloudinary.uploader
         .upload_stream(uploadOptions, (error, result) => {
            if (error) return reject(error);
            resolve(result);
         })
         .end(file);
   });
}
