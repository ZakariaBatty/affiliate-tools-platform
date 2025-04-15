import {
   createBlogPost,
   deleteBlogPost,
   updateBlogPost,
} from '@/app/actions/admin/blog';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
   try {
      const data = await request.json();
      const post = await createBlogPost(data);
      return NextResponse.json({ success: true, post }, { status: 201 });
   } catch (error) {
      console.error('Error creating blog post:', error);
      return NextResponse.json(
         { success: false, error: 'Failed to create blog post' },
         { status: 500 }
      );
   }
}

export async function PUT(request: NextRequest) {
   try {
      const data = await request.json();
      const { id, ...updateData } = data;

      if (!id) {
         return NextResponse.json(
            { success: false, error: 'Blog post ID is required' },
            { status: 400 }
         );
      }

      const post = await updateBlogPost(id, updateData);
      return NextResponse.json({ success: true, post });
   } catch (error) {
      console.error('Error updating blog post:', error);
      return NextResponse.json(
         { success: false, error: 'Failed to update blog post' },
         { status: 500 }
      );
   }
}

export async function DELETE(request: NextRequest) {
   try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');

      if (!id) {
         return NextResponse.json(
            { success: false, error: 'Blog post ID is required' },
            { status: 400 }
         );
      }

      await deleteBlogPost(id);
      return NextResponse.json({ success: true });
   } catch (error) {
      console.error('Error deleting blog post:', error);
      return NextResponse.json(
         { success: false, error: 'Failed to delete blog post' },
         { status: 500 }
      );
   }
}
