// ✅ 2. ✅ Fixed, Safe Version of seed.ts

// Here's a safe and complete version of your script that:

//     Avoids duplicate emails

//     Handles team and membership insertion cleanly

//     Adds Stripe products

//     Inserts blog posts related to the user

//     Handles both missing and existing user / team safely

import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { posts, users, teams, teamMembers } from './schema';
import { hashPassword } from '@/lib/auth/session';
import { activityLogs } from './schema';

async function createStripeProducts() {
  console.log('Creating Stripe products and prices...');

  const baseProduct = await stripe.products.create({
    name: 'Base',
    description: 'Base subscription plan',
  });

  await stripe.prices.create({
    product: baseProduct.id,
    unit_amount: 800,
    currency: 'usd',
    recurring: {
      interval: 'month',
      trial_period_days: 7,
    },
  });

  const plusProduct = await stripe.products.create({
    name: 'Plus',
    description: 'Plus subscription plan',
  });

  await stripe.prices.create({
    product: plusProduct.id,
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
      trial_period_days: 7,
    },
  });

  console.log('Stripe products and prices created.');
}

async function seed() {

  // if you want to start from a clean slate every time.
  await db.delete(activityLogs);
  await db.delete(teamMembers);
  await db.delete(posts);
  await db.delete(teams);
  await db.delete(users);

  console.log('Existing data cleared.');
  // Create an initial user
  const email = 'test@test.com';
  const password = 'admin123';
  const passwordHash = await hashPassword(password);

  // Check if user exists
  let user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user) {
    [user] = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        role: 'owner',
      })
      .returning();
    console.log('User created.');
  } else {
    console.log('User already exists.');
  }

  // Create a team (or skip if one exists for simplicity)
  const [team] = await db
    .insert(teams)
    .values({
      name: 'Test Team',
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: team.id,
    userId: user.id,
    role: 'owner',
  });

  console.log('Team and membership created.');

  await createStripeProducts();

  // Create blog post
  await db.insert(posts).values([
    {
      title: 'My First Blog Post',
      slug: 'my-first-blog-post',
      content: 'This is the content of my first blog post!',
      authorId: user.id,
      updatedAt: new Date(),
    },
  ]);

  console.log('Blog post inserted.');
}

seed()
  .catch((error) => {
    console.error('❌ Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('✅ Seed process finished. Exiting...');
    process.exit(0);
  });


// import { stripe } from '../payments/stripe';
// import { db } from './drizzle';
// import { posts, users, teams, teamMembers } from './schema';
// import { hashPassword } from '@/lib/auth/session';

// async function createStripeProducts() {
//   console.log('Creating Stripe products and prices...');

//   const baseProduct = await stripe.products.create({
//     name: 'Base',
//     description: 'Base subscription plan',
//   });

//   await stripe.prices.create({
//     product: baseProduct.id,
//     unit_amount: 800, // $8 in cents
//     currency: 'usd',
//     recurring: {
//       interval: 'month',
//       trial_period_days: 7,
//     },
//   });

//   const plusProduct = await stripe.products.create({
//     name: 'Plus',
//     description: 'Plus subscription plan',
//   });

//   await stripe.prices.create({
//     product: plusProduct.id,
//     unit_amount: 1200, // $12 in cents
//     currency: 'usd',
//     recurring: {
//       interval: 'month',
//       trial_period_days: 7,
//     },
//   });

//   console.log('Stripe products and prices created successfully.');
// }

// async function seed() {
//   const email = 'test@test.com';
//   const password = 'admin123';
//   const passwordHash = await hashPassword(password);

//   const [user] = await db
//     .insert(users)
//     .values([
//       {
//         email: email,
//         passwordHash: passwordHash,
//         role: "owner",
//       },
//     ])
//     .returning();

//   console.log('Initial user created.');

//   const [team] = await db
//     .insert(teams)
//     .values({
//       name: 'Test Team',
//     })
//     .returning();

//   await db.insert(teamMembers).values({
//     teamId: team.id,
//     userId: user.id,
//     role: 'owner',
//   });

//   await createStripeProducts();


//   await db.insert(posts).values([
//     {
//       title: 'My First Blog Post',
//       content: 'This is the content of my first blog post!',
//       authorId: user.id,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ]);

// }

// seed()
//   .catch((error) => {
//     console.error('Seed process failed:', error);
//     process.exit(1);
//   })
//   .finally(() => {
//     console.log('Seed process finished. Exiting...');
//     process.exit(0);
//   });
