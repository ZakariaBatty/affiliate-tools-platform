import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';

// POST /api/seed - Seed the database with initial data (development only)
export async function POST(req: NextRequest) {
   // Only allow in development
   if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
         { error: 'This endpoint is only available in development mode' },
         { status: 403 }
      );
   }

   try {
      // Create admin user
      const adminPassword = await hash('admin123', 10);
      const admin = await prisma.user.upsert({
         where: { email: 'admin@example.com' },
         update: {},
         create: {
            name: 'Admin User',
            email: 'admin@example.com',
            password: adminPassword,
            role: 'ADMIN',
         },
      });

      // Create regular user
      const userPassword = await hash('user123', 10);
      const user = await prisma.user.upsert({
         where: { email: 'user@example.com' },
         update: {},
         create: {
            name: 'Regular User',
            email: 'user@example.com',
            password: userPassword,
            role: 'USER',
         },
      });

      // Create company user
      const companyPassword = await hash('company123', 10);
      const companyUser = await prisma.user.upsert({
         where: { email: 'company@example.com' },
         update: {},
         create: {
            name: 'Company User',
            email: 'company@example.com',
            password: companyPassword,
            role: 'COMPANY',
         },
      });

      // Create categories
      const categories = await Promise.all([
         prisma.category.upsert({
            where: { slug: 'email-marketing' },
            update: {},
            create: {
               name: 'Email Marketing',
               slug: 'email-marketing',
               description: 'Tools for email marketing campaigns',
               imageUrl: '/placeholder.svg?height=200&width=200',
            },
         }),
         prisma.category.upsert({
            where: { slug: 'social-media' },
            update: {},
            create: {
               name: 'Social Media',
               slug: 'social-media',
               description: 'Tools for social media marketing',
               imageUrl: '/placeholder.svg?height=200&width=200',
            },
         }),
         prisma.category.upsert({
            where: { slug: 'seo' },
            update: {},
            create: {
               name: 'SEO',
               slug: 'seo',
               description: 'Tools for search engine optimization',
               imageUrl: '/placeholder.svg?height=200&width=200',
            },
         }),
      ]);

      // Create company
      const company = await prisma.company.upsert({
         where: { slug: 'acme-inc' },
         update: {},
         create: {
            name: 'Acme Inc',
            slug: 'acme-inc',
            description: 'A leading provider of marketing tools',
            logoUrl: '/placeholder.svg?height=100&width=100',
            websiteUrl: 'https://example.com',
            ownerId: companyUser.id,
         },
      });

      // Create tools
      const tools = await Promise.all([
         prisma.tool.create({
            data: {
               name: 'Email Blast Pro',
               slug: 'email-blast-pro',
               description: 'Powerful email marketing platform',
               imageUrl: '/placeholder.svg?height=300&width=300',
               websiteUrl: 'https://example.com/email-blast',
               featured: true,
               popular: true,
               companyId: company.id,
               categories: {
                  create: [
                     {
                        category: {
                           connect: { id: categories[0].id }, // Email Marketing
                        },
                     },
                  ],
               },
            },
         }),
         prisma.tool.create({
            data: {
               name: 'Social Connect',
               slug: 'social-connect',
               description:
                  'Manage all your social media accounts in one place',
               imageUrl: '/placeholder.svg?height=300&width=300',
               websiteUrl: 'https://example.com/social-connect',
               featured: true,
               popular: false,
               companyId: company.id,
               categories: {
                  create: [
                     {
                        category: {
                           connect: { id: categories[1].id }, // Social Media
                        },
                     },
                  ],
               },
            },
         }),
         prisma.tool.create({
            data: {
               name: 'SEO Wizard',
               slug: 'seo-wizard',
               description: 'Boost your search engine rankings',
               imageUrl: '/placeholder.svg?height=300&width=300',
               websiteUrl: 'https://example.com/seo-wizard',
               featured: false,
               popular: true,
               companyId: company.id,
               categories: {
                  create: [
                     {
                        category: {
                           connect: { id: categories[2].id }, // SEO
                        },
                     },
                  ],
               },
            },
         }),
      ]);

      // Create tags
      const tags = await Promise.all([
         prisma.tag.upsert({
            where: { slug: 'beginner' },
            update: {},
            create: {
               name: 'Beginner',
               slug: 'beginner',
            },
         }),
         prisma.tag.upsert({
            where: { slug: 'advanced' },
            update: {},
            create: {
               name: 'Advanced',
               slug: 'advanced',
            },
         }),
         prisma.tag.upsert({
            where: { slug: 'tutorial' },
            update: {},
            create: {
               name: 'Tutorial',
               slug: 'tutorial',
            },
         }),
      ]);

      // Create blog posts
      const blogPosts = await Promise.all([
         prisma.blog.create({
            data: {
               title: 'Getting Started with Email Marketing',
               slug: 'getting-started-with-email-marketing',
               excerpt:
                  'Learn the basics of email marketing and how to get started',
               content: `
# Getting Started with Email Marketing

Email marketing is one of the most effective ways to reach your audience. In this guide, we'll cover the basics of email marketing and how to get started.

## Why Email Marketing?

Email marketing allows you to:
- Reach your audience directly
- Personalize your message
- Track engagement
- Generate leads and sales

## Getting Started

1. Choose an email marketing platform
2. Build your email list
3. Create compelling content
4. Test and optimize your campaigns

## Best Practices

- Use a clear subject line
- Keep your emails concise
- Include a call-to-action
- Test different approaches
- Analyze your results
          `,
               imageUrl: '/placeholder.svg?height=400&width=800',
               published: true,
               authorId: admin.id,
               categories: {
                  create: [
                     {
                        category: {
                           connect: { id: categories[0].id }, // Email Marketing
                        },
                     },
                  ],
               },
               tags: {
                  create: [
                     {
                        tag: {
                           connect: { id: tags[0].id }, // Beginner
                        },
                     },
                     {
                        tag: {
                           connect: { id: tags[2].id }, // Tutorial
                        },
                     },
                  ],
               },
            },
         }),
         prisma.blog.create({
            data: {
               title: 'Advanced Social Media Strategies',
               slug: 'advanced-social-media-strategies',
               excerpt: 'Take your social media marketing to the next level',
               content: `
# Advanced Social Media Strategies

If you've mastered the basics of social media marketing, it's time to take your strategy to the next level. This guide covers advanced techniques to maximize your social media impact.

## Content Strategy

- Create a content calendar
- Use a mix of content types
- Leverage user-generated content
- Repurpose content across platforms

## Engagement Tactics

- Host live sessions
- Create interactive polls and quizzes
- Respond promptly to comments
- Join relevant conversations

## Analytics and Optimization

- Track key performance indicators
- A/B test your content
- Analyze competitor strategies
- Adjust your approach based on data
          `,
               imageUrl: '/placeholder.svg?height=400&width=800',
               published: true,
               authorId: admin.id,
               categories: {
                  create: [
                     {
                        category: {
                           connect: { id: categories[1].id }, // Social Media
                        },
                     },
                  ],
               },
               tags: {
                  create: [
                     {
                        tag: {
                           connect: { id: tags[1].id }, // Advanced
                        },
                     },
                  ],
               },
            },
         }),
      ]);

      // Create saved tools for user
      await prisma.savedTool.create({
         data: {
            userId: user.id,
            toolId: tools[0].id, // Email Blast Pro
         },
      });

      // Create tool views
      await Promise.all([
         prisma.toolView.create({
            data: {
               userId: user.id,
               toolId: tools[0].id, // Email Blast Pro
            },
         }),
         prisma.toolView.create({
            data: {
               userId: user.id,
               toolId: tools[1].id, // Social Connect
            },
         }),
      ]);

      // Create blog views
      await Promise.all([
         prisma.blogView.create({
            data: {
               userId: user.id,
               blogId: blogPosts[0].id,
            },
         }),
      ]);

      return NextResponse.json({
         message: 'Database seeded successfully',
         data: {
            users: { admin, user, companyUser },
            categories,
            company,
            tools,
            tags,
            blogPosts,
         },
      });
   } catch (error) {
      console.error('Error seeding database:', error);
      return NextResponse.json(
         { error: 'Failed to seed database' },
         { status: 500 }
      );
   }
}
