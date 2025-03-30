import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
   console.log('🌱 Starting seeding...');

   // Clean up existing data
   await cleanDatabase();

   // Create users
   const users = await createUsers();

   // Create categories
   const categories = await createCategories();

   // Create tags
   const tags = await createTags();

   // Create companies
   const companies = await createCompanies(users);

   // Create tools
   const tools = await createTools(categories, tags, companies);

   // Create blog posts
   const blogs = await createBlogs(categories, tags);

   // Create ratings and comments
   await createRatingsAndComments(users, tools, blogs);

   // Create saved tools
   await createSavedTools(users, tools);

   // Create comparisons
   await createComparisons(users, tools);

   // Create plans
   const plans = await createPlans();

   // Create subscriptions
   await createSubscriptions(users, companies, plans);

   // Create activities
   await createActivities(users, tools, blogs);

   // Create views
   await createViews(users, tools, blogs);

   console.log('✅ Seeding completed successfully!');
}

async function cleanDatabase() {
   console.log('🧹 Cleaning existing data...');

   // Delete in reverse order of dependencies
   await prisma.activity.deleteMany();
   await prisma.subscriptions.deleteMany();
   await prisma.plan.deleteMany();
   await prisma.comparisonTool.deleteMany();
   await prisma.comparison.deleteMany();
   await prisma.savedTool.deleteMany();
   await prisma.toolComment.deleteMany();
   await prisma.toolRating.deleteMany();
   await prisma.blogComment.deleteMany();
   await prisma.blogView.deleteMany();
   await prisma.toolView.deleteMany();
   await prisma.blogTag.deleteMany();
   await prisma.blogCategory.deleteMany();
   await prisma.blog.deleteMany();
   await prisma.toolTag.deleteMany();
   await prisma.toolCategory.deleteMany();
   await prisma.tool.deleteMany();
   await prisma.teamMember.deleteMany();
   await prisma.company.deleteMany();
   await prisma.tag.deleteMany();
   await prisma.category.deleteMany();
   await prisma.passwordReset.deleteMany();
   await prisma.verificationToken.deleteMany();
   await prisma.session.deleteMany();
   await prisma.account.deleteMany();
   await prisma.user.deleteMany();

   console.log('✅ Database cleaned');
}

async function createUsers() {
   console.log('👤 Creating users...');

   const adminPassword = await hash('admin123', 10);
   const userPassword = await hash('password123', 10);

   // Create admin user
   const admin = await prisma.user.create({
      data: {
         name: 'Admin User',
         email: 'admin@example.com',
         password: adminPassword,
         role: 'ADMIN',
         status: 'ACTIVE',
         emailVerified: new Date(),
         image: faker.image.avatar(),
      },
   });

   // Create regular users
   const users = [];
   for (let i = 0; i < 10; i++) {
      const user = await prisma.user.create({
         data: {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: userPassword,
            role: 'USER',
            status: 'ACTIVE',
            emailVerified: faker.helpers.arrayElement([new Date(), null]),
            image: faker.image.avatar(),
         },
      });
      users.push(user);
   }

   // Create company users
   for (let i = 0; i < 5; i++) {
      const user = await prisma.user.create({
         data: {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            password: userPassword,
            role: 'COMPANY',
            status: 'ACTIVE',
            emailVerified: new Date(),
            image: faker.image.avatar(),
         },
      });
      users.push(user);
   }

   console.log(`✅ Created ${users.length + 1} users`);
   return [admin, ...users];
}

async function createCategories() {
   console.log('📂 Creating categories...');

   const categoryNames = [
      'AI Chatbots',
      'Image Generation',
      'Text to Speech',
      'Speech to Text',
      'Video Generation',
      'Code Generation',
      'Data Analysis',
      'Content Writing',
      'Translation',
      'Summarization',
   ];

   const categories = [];
   for (const name of categoryNames) {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      const category = await prisma.category.create({
         data: {
            name,
            slug,
            description: faker.lorem.paragraph(),
            icon: faker.helpers.arrayElement([
               'chat',
               'image',
               'audio',
               'video',
               'code',
               'data',
               'text',
               'translate',
               'summary',
            ]),
         },
      });
      categories.push(category);
   }

   console.log(`✅ Created ${categories.length} categories`);
   return categories;
}

async function createTags(): Promise<{ id: string }[]> {
   console.log('🏷️ Creating tags...');

   const tagNames = [
      'Free',
      'Paid',
      'API',
      'Open Source',
      'Enterprise',
      'Mobile',
      'Desktop',
      'Web',
      'Chrome Extension',
      'VSCode Extension',
      'GPT-4',
      'GPT-3',
      'DALL-E',
      'Stable Diffusion',
      'Midjourney',
   ];

   const tags = [];
   for (const name of tagNames) {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      const tag = await prisma.tag.create({
         data: {
            name,
            slug,
         },
      });
      tags.push(tag);
   }

   console.log(`✅ Created ${tags.length} tags`);
   return tags;
}

async function createCompanies(users: any) {
   console.log('🏢 Creating companies...');

   const companyUsers = users.filter((user: any) => user.role === 'COMPANY');

   const companies = [];
   for (const user of companyUsers) {
      const companyName = faker.company.name();
      const company = await prisma.company.create({
         data: {
            name: companyName,
            description: faker.company.catchPhrase(),
            website: faker.internet.url(),
            logo: faker.image.urlLoremFlickr({ category: 'business' }),
            userId: user.id,
            verified: faker.datatype.boolean(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
         },
      });
      companies.push(company);

      // Add team members
      const teamSize = faker.number.int({ min: 1, max: 3 });
      for (let i = 0; i < teamSize; i++) {
         await prisma.teamMember.create({
            data: {
               companyId: company.id,
               email: faker.internet.email().toLowerCase(),
               role: faker.helpers.arrayElement(['ADMIN', 'EDITOR', 'VIEWER']),
               status: faker.helpers.arrayElement(['PENDING', 'ACTIVE']),
            },
         });
      }
   }

   console.log(`✅ Created ${companies.length} companies`);
   return companies;
}

async function createTools(
   categories: { id: string }[],
   tags: { id: string }[],
   companies: any
) {
   console.log('🔧 Creating tools...');

   const toolNames = [
      'ChatGPT',
      'DALL-E',
      'Midjourney',
      'GitHub Copilot',
      'Jasper',
      'Grammarly AI',
      'Synthesia',
      'Descript',
      'RunwayML',
      'Hugging Face',
   ];

   const tools = [];
   for (let i = 0; i < toolNames.length; i++) {
      const name = toolNames[i];
      const slug = name.toLowerCase().replace(/\s+/g, '-');

      // Select random company or null
      const company = faker.helpers.arrayElement([...companies, null, null]);

      // Create tool
      const tool = await prisma.tool.create({
         data: {
            name,
            slug,
            description: faker.lorem.paragraph(),
            longDescription: faker.lorem.paragraphs(3),
            website: faker.internet.url(),
            logo: faker.image.urlLoremFlickr({ category: 'technology' }),
            imageUrl: faker.image.urlLoremFlickr({ category: 'technology' }),
            companyId: company?.id,
            verified: faker.datatype.boolean(),
            featured: faker.datatype.boolean(),
            pricing: {
               free: faker.datatype.boolean(),
               freeTrial: faker.datatype.boolean(),
               startingPrice: faker.helpers.arrayElement([
                  0, 9.99, 19.99, 29.99, 49.99, 99.99,
               ]),
               priceModel: faker.helpers.arrayElement([
                  'FREE',
                  'FREEMIUM',
                  'SUBSCRIPTION',
                  'ONE_TIME',
                  'CONTACT',
               ]),
            },
            features: Array(faker.number.int({ min: 3, max: 8 }))
               .fill(null)
               .map(() => faker.lorem.sentence()),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
         },
      });

      // Add categories (2-4 per tool)
      const numCategories = faker.number.int({ min: 2, max: 4 });
      const selectedCategories: { id: string }[] = faker.helpers.arrayElements(
         categories,
         numCategories
      );
      for (const category of selectedCategories) {
         await prisma.toolCategory.create({
            data: {
               toolId: tool.id,
               categoryId: category.id,
            },
         });
      }

      // Add tags (3-6 per tool)
      const numTags = faker.number.int({ min: 3, max: 6 });
      const selectedTags: { id: string }[] = faker.helpers.arrayElements(
         tags as { id: string }[],
         numTags
      );
      for (const tag of selectedTags) {
         const typedTag = tag as { id: string }; // Explicitly cast tag
         await prisma.toolTag.create({
            data: {
               toolId: tool.id,
               tagId: typedTag.id,
            },
         });
      }

      tools.push(tool);
   }

   console.log(`✅ Created ${tools.length} tools`);
   return tools;
}

async function createBlogs(categories: { id: string }[], tags: any) {
   console.log('📝 Creating blog posts...');

   const blogTitles = [
      'Top 10 AI Tools for Content Creation',
      'How to Use AI to Improve Your Workflow',
      'The Future of AI in Business',
      'Comparing the Best AI Image Generators',
      'Getting Started with AI Programming Assistants',
      'AI Tools That Will Save You Hours Every Week',
      'Ethical Considerations When Using AI Tools',
      'How to Choose the Right AI Tool for Your Needs',
   ];

   const blogs = [];
   for (let i = 0; i < blogTitles.length; i++) {
      const title = blogTitles[i];
      const slug = title.toLowerCase().replace(/\s+/g, '-');

      // Create blog with author as JSON
      const blog = await prisma.blog.create({
         data: {
            title,
            slug,
            excerpt: faker.lorem.paragraph(),
            content: faker.lorem.paragraphs(10),
            coverImage: faker.image.urlLoremFlickr({ category: 'technology' }),
            author: {
               name: faker.person.fullName(),
               image: faker.image.avatar(),
               bio: faker.person.bio(),
            },
            published: true,
            featured: faker.datatype.boolean(),
            readingTime: faker.number.int({ min: 3, max: 15 }),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
         },
      });

      // Add categories (1-3 per blog)
      const numCategories = faker.number.int({ min: 1, max: 3 });
      const selectedCategories = faker.helpers.arrayElements(
         categories,
         numCategories
      );
      for (const category of selectedCategories) {
         await prisma.blogCategory.create({
            data: {
               blogId: blog.id,
               categoryId: category.id,
            },
         });
      }

      // Add tags (2-5 per blog)
      const numTags = faker.number.int({ min: 2, max: 5 });
      const selectedTags = faker.helpers.arrayElements(tags, numTags);
      for (const tag of selectedTags) {
         const typedTag = tag as { id: string }; // Explicitly cast tag

         await prisma.blogTag.create({
            data: {
               blogId: blog.id,
               tagId: typedTag.id,
            },
         });
      }

      blogs.push(blog);
   }

   console.log(`✅ Created ${blogs.length} blog posts`);
   return blogs;
}

async function createRatingsAndComments(users: any, tools: any, blogs: any) {
   console.log('⭐ Creating ratings and comments...');

   // Create tool ratings
   for (const tool of tools) {
      const numRatings = faker.number.int({ min: 5, max: 20 });
      const ratingUsers = faker.helpers.arrayElements(users, numRatings);

      for (const user of ratingUsers) {
         const typedUser = user as { id: string }; // Explicitly cast tag

         await prisma.toolRating.create({
            data: {
               toolId: tool.id,
               userId: typedUser.id,
               rating: faker.number.int({ min: 1, max: 5 }),
               review: faker.datatype.boolean()
                  ? faker.lorem.paragraph()
                  : null,
               createdAt: faker.date.recent(),
            },
         });
      }
   }

   // Create tool comments
   for (const tool of tools) {
      const numComments = faker.number.int({ min: 0, max: 10 });
      const commentUsers = faker.helpers.arrayElements(users, numComments);

      for (const user of commentUsers) {
         const typedUser = user as { id: string }; // Explicitly cast tag

         const comment = await prisma.toolComment.create({
            data: {
               toolId: tool.id,
               userId: typedUser.id,
               content: faker.lorem.paragraph(),
               createdAt: faker.date.recent(),
            },
         });

         // Add replies to some comments
         if (faker.datatype.boolean()) {
            const numReplies = faker.number.int({ min: 1, max: 3 });
            const replyUsers = faker.helpers.arrayElements(users, numReplies);

            for (const replyUser of replyUsers) {
               const typedUser = replyUser as { id: string }; // Explicitly cast tag

               await prisma.toolComment.create({
                  data: {
                     toolId: tool.id,
                     userId: typedUser.id,
                     content: faker.lorem.paragraph(),
                     parentId: comment.id,
                     createdAt: faker.date.recent(),
                  },
               });
            }
         }
      }
   }

   // Create blog comments
   for (const blog of blogs) {
      const numComments = faker.number.int({ min: 0, max: 15 });
      const commentUsers = faker.helpers.arrayElements(users, numComments);

      for (const user of commentUsers) {
         const typedUser = user as { id: string };

         const comment = await prisma.blogComment.create({
            data: {
               blogId: blog.id,
               userId: typedUser.id,
               content: faker.lorem.paragraph(),
               createdAt: faker.date.recent(),
            },
         });

         // Add replies to some comments
         if (faker.datatype.boolean()) {
            const numReplies = faker.number.int({ min: 1, max: 3 });
            const replyUsers = faker.helpers.arrayElements(users, numReplies);

            for (const replyUser of replyUsers) {
               const typedUser = replyUser as { id: string };

               await prisma.blogComment.create({
                  data: {
                     blogId: blog.id,
                     userId: typedUser.id,
                     content: faker.lorem.paragraph(),
                     parentId: comment.id,
                     createdAt: faker.date.recent(),
                  },
               });
            }
         }
      }
   }

   console.log('✅ Created ratings and comments');
}

async function createSavedTools(users: any, tools: any) {
   console.log('🔖 Creating saved tools...');

   for (const user of users) {
      // Each user saves 0-5 tools
      const numSaved = faker.number.int({ min: 0, max: 5 });
      const savedTools = faker.helpers.arrayElements(tools, numSaved);

      for (const tool of savedTools) {
         const typedTool = tool as { id: string };

         await prisma.savedTool.create({
            data: {
               userId: user.id,
               toolId: typedTool.id,
               createdAt: faker.date.recent(),
            },
         });
      }
   }

   console.log('✅ Created saved tools');
}

async function createComparisons(users: any, tools: any) {
   console.log('🔄 Creating comparisons...');

   // Create 5-10 comparisons
   const numComparisons = faker.number.int({ min: 5, max: 10 });

   for (let i = 0; i < numComparisons; i++) {
      const user = faker.helpers.arrayElement(users);
      const typedUser = user as { id: string };

      // Select 2-4 tools to compare
      const numTools = faker.number.int({ min: 2, max: 4 });
      const comparisonTools = faker.helpers.arrayElements(tools, numTools);

      const comparison = await prisma.comparison.create({
         data: {
            userId: typedUser.id,
            title: `Comparison of ${comparisonTools
               .map((t: any) => t.name)
               .join(' vs ')}`,
            createdAt: faker.date.recent(),
         },
      });

      // Add tools to comparison
      for (const tool of comparisonTools) {
         const typedTool = tool as { id: string };

         await prisma.comparisonTool.create({
            data: {
               comparisonId: comparison.id,
               toolId: typedTool.id,
               notes: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
            },
         });
      }
   }

   console.log(`✅ Created ${numComparisons} comparisons`);
}

async function createPlans() {
   console.log('💰 Creating subscription plans...');

   const planData = [
      {
         name: 'Free',
         description: 'Basic access to the platform',
         features: [
            'Limited tool listings',
            'Basic analytics',
            'Community support',
         ],
         price: 0,
         interval: 'monthly',
         isPopular: false,
      },
      {
         name: 'Pro',
         description: 'Enhanced features for professionals',
         features: [
            'Unlimited tool listings',
            'Advanced analytics',
            'Priority support',
            'Featured placement',
         ],
         price: 29.99,
         interval: 'monthly',
         isPopular: true,
      },
      {
         name: 'Business',
         description: 'Complete solution for businesses',
         features: [
            'Everything in Pro',
            'API access',
            'White-label options',
            'Dedicated account manager',
         ],
         price: 99.99,
         interval: 'monthly',
         isPopular: false,
      },
      {
         name: 'Pro Annual',
         description: 'Enhanced features for professionals (annual billing)',
         features: [
            'Unlimited tool listings',
            'Advanced analytics',
            'Priority support',
            'Featured placement',
         ],
         price: 299.99,
         interval: 'yearly',
         isPopular: false,
      },
      {
         name: 'Business Annual',
         description: 'Complete solution for businesses (annual billing)',
         features: [
            'Everything in Pro',
            'API access',
            'White-label options',
            'Dedicated account manager',
         ],
         price: 999.99,
         interval: 'yearly',
         isPopular: false,
      },
   ];

   const plans = [];
   for (const plan of planData) {
      const createdPlan = await prisma.plan.create({
         data: {
            name: plan.name,
            description: plan.description,
            features: plan.features,
            price: plan.price,
            interval: plan.interval,
            active: true,
            isPopular: plan.isPopular,
         },
      });
      plans.push(createdPlan);
   }

   console.log(`✅ Created ${plans.length} subscription plans`);
   return plans;
}

async function createSubscriptions(users: any, companies: any, plans: any) {
   console.log('💳 Creating subscription records...');

   // Create subscriptions for companies
   for (const company of companies) {
      // Select a random plan (excluding free)
      const paidPlans = plans.filter((plan: any) => plan.price > 0);
      const plan = faker.helpers.arrayElement(paidPlans) as {
         id: string;
         price: any;
      };

      // Create 1-3 subscriptions
      const numSubscriptions = faker.number.int({ min: 1, max: 3 });

      for (let i = 0; i < numSubscriptions; i++) {
         const startDate = faker.date.past({ years: 1 });
         const endDate = faker.date.future({ years: 1, refDate: startDate });

         await prisma.subscriptions.create({
            data: {
               userId: company.userId,
               planId: plan.id,
               companyId: company.id,
               amount: plan.price,
               currency: 'USD',
               status: faker.helpers.arrayElement([
                  'completed',
                  'completed',
                  'completed',
                  'pending',
                  'failed',
               ]),
               paymentMethod: faker.helpers.arrayElement([
                  'credit_card',
                  'paypal',
                  'bank_transfer',
               ]),
               paymentId: faker.string.alphanumeric(16),
               startDate: startDate,
               endDate: endDate,
               createdAt: startDate,
               updatedAt: faker.date.between({
                  from: startDate,
                  to: new Date(),
               }),
            },
         });
      }
   }

   // Create some subscriptions for regular users too
   const regularUsers = users.filter((user: any) => user.role === 'USER');
   const selectedUsers = faker.helpers.arrayElements(regularUsers, 5);

   for (const user of selectedUsers) {
      const userType = user as { id: string };
      const plan = faker.helpers.arrayElement(plans) as {
         id: string;
         price: any;
      };

      const startDate = faker.date.past({ years: 1 });
      const endDate = faker.date.future({ years: 1, refDate: startDate });

      await prisma.subscriptions.create({
         data: {
            userId: userType.id,
            planId: plan.id,
            amount: plan.price,
            currency: 'USD',
            status: faker.helpers.arrayElement([
               'completed',
               'completed',
               'pending',
               'failed',
            ]),
            paymentMethod: faker.helpers.arrayElement([
               'credit_card',
               'paypal',
               'bank_transfer',
            ]),
            paymentId: faker.string.alphanumeric(16),
            startDate: startDate,
            endDate: endDate,
            createdAt: startDate,
            updatedAt: faker.date.between({ from: startDate, to: new Date() }),
         },
      });
   }

   console.log('✅ Created subscription records');
}

async function createActivities(users: any, tools: any, blogs: any) {
   console.log('📊 Creating activity records...');

   const activityTypes = [
      'TOOL_VIEW',
      'TOOL_SAVE',
      'TOOL_RATE',
      'TOOL_COMMENT',
      'BLOG_VIEW',
      'BLOG_COMMENT',
      'LOGIN',
      'SIGNUP',
      'PROFILE_UPDATE',
   ];

   // Create 50-100 random activities
   const numActivities = faker.number.int({ min: 50, max: 100 });

   for (let i = 0; i < numActivities; i++) {
      const user = faker.helpers.arrayElement(users);
      const activityType = faker.helpers.arrayElement(activityTypes);
      let toolId = null;
      let blogId = null;
      const comparisonId = null;
      let metadata = null;

      // Set entity IDs based on activity type
      if (activityType.startsWith('TOOL_')) {
         toolId = (faker.helpers.arrayElement(tools) as { id: string }).id;
         if (activityType === 'TOOL_RATE') {
            metadata = { rating: faker.number.int({ min: 1, max: 5 }) };
         }
      } else if (activityType.startsWith('BLOG_')) {
         blogId = (faker.helpers.arrayElement(blogs) as { id: string }).id;
      }

      const typedUser = user as { id: string };

      await prisma.activity.create({
         data: {
            userId: typedUser.id,
            action: activityType,
            toolId: toolId,
            blogId: blogId,
            comparisonId: comparisonId,
            createdAt: faker.date.recent({ days: 30 }), // Within last 30 days
         },
      });
   }

   console.log(`✅ Created ${numActivities} activity records`);
}

async function createViews(users: any, tools: any, blogs: any) {
   console.log('👁️ Creating view records...');

   // Create tool views
   for (const tool of tools) {
      const numViews = faker.number.int({ min: 10, max: 100 });

      // Some views with users, some anonymous
      for (let i = 0; i < numViews; i++) {
         const hasUser = faker.datatype.boolean();
         const user = hasUser ? faker.helpers.arrayElement(users) : null;

         await prisma.toolView.create({
            data: {
               toolId: tool.id,
               userId: hasUser ? (user as { id: string }).id : null,
               createdAt: faker.date.recent({ days: 90 }),
            },
         });
      }
   }

   // Create blog views
   for (const blog of blogs) {
      const numViews = faker.number.int({ min: 5, max: 200 });

      // Some views with users, some anonymous
      for (let i = 0; i < numViews; i++) {
         const hasUser = faker.datatype.boolean();
         const user = hasUser ? faker.helpers.arrayElement(users) : null;

         await prisma.blogView.create({
            data: {
               blogId: blog.id,
               userId: hasUser ? (user as { id: string }).id : null,
               createdAt: faker.date.recent({ days: 90 }),
            },
         });
      }
   }

   console.log('✅ Created view records');
}

main()
   .catch((e) => {
      console.error('❌ Error during seeding:', e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
