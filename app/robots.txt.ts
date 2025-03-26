import type { MetadataRoute } from 'next';
import { allTools } from '@/data/tools';
import { blogPosts } from '@/data/blog-data';
import { siteConfig } from '@/lib/seo-config';

export default function sitemap(): MetadataRoute.Sitemap {
   const baseUrl = siteConfig.url;

   // Static routes
   const routes = [
      '/',
      '/tools',
      '/blog',
      '/about',
      '/contact',
      '/pricing',
   ].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : 0.8,
   }));

   // Tool pages
   const toolRoutes = allTools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
   }));

   // Blog pages
   const blogRoutes = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
   }));

   return [...routes, ...toolRoutes, ...blogRoutes];
}
