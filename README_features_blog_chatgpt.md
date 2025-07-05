Perfect — let’s now extend your schema and relations to include **blog posts that are authored by users**. Here's a step-by-step update:

---

## ✅ 1. Define the `posts` table with `authorId` foreign key

Create `posts.ts` inside your `drizzle/schema/` folder:

```ts
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content').notNull(),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id),
  publishedAt: timestamp('published_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

---

## ✅ 2. Define Post → User Relation

In `relations.ts` or right below `posts.ts`, add:

```ts
import { relations } from 'drizzle-orm';
import { posts } from './posts';
import { users } from './users';

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  // existing:
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),

  // new:
  posts: many(posts),
}));
```

---

## ✅ 3. Infer Types

In `schema.ts` or `types.ts`:

```ts
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
```

---

## ✅ 4. Example Query with Author

In any handler or route (like `/api/blog`):

```ts
const allPosts = await db.query.posts.findMany({
  with: {
    author: {
      columns: {
        id: true,
        name: true,
        email: true,
      },
    },
  },
  orderBy: (posts, { desc }) => [desc(posts.publishedAt)],
});
```

---

## ✅ 5. Create Post with Authenticated User

In `/api/blog/route.ts`:

```ts
import { getUser } from '@/lib/auth'; // your custom auth util
import { db } from '@/db';
import { posts } from '@/db/schema/posts';

export async function POST(req: Request) {
  const user = await getUser(); // retrieve logged-in user from Supabase
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { title, content, slug } = await req.json();

  const result = await db.insert(posts).values({
    title,
    content,
    slug,
    authorId: user.id,
  });

  return new Response(JSON.stringify(result), { status: 201 });
}
```

---

## ✅ 6. Update Blog UI to Show Author

In `/blog/page.tsx` or `/blog/[slug]/page.tsx`:

```tsx
<p className="text-muted-foreground text-sm">
  By {post.author.name || 'Anonymous'} on {new Date(post.publishedAt).toDateString()}
</p>
```

---

## ✅ 7. Optional: Restrict Editing to Author

In `/api/blog/[slug]/route.ts` (for PUT/DELETE):

```ts
if (post.authorId !== user.id) {
  return new Response('Forbidden', { status: 403 });
}
```

---

## ✅ You Now Have:

* A `posts` table with a foreign key to `users`
* `drizzle-orm` relations to fetch authors with posts
* API + frontend integration ready for CRUD
* Type-safe inferencing using Drizzle

---

### ✅ Want Next?

* Add blog post **editing & deletion**?
* Add **admin panel** to manage posts?
* Add **pagination or filtering**?

Let me know and I’ll scaffold the next part.
