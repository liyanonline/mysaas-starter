'use server';

import { db } from '@/lib/db/drizzle';
import { posts, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
// import { getUser } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';
import { z } from 'zod';

// Validation schema for blog posts
const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
});

// Create a blog post
export async function createPost(formData: FormData) {
    const user = await getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const validated = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if (!validated.success) {
        return { error: validated.error.errors[0].message };
    }

    try {
        await db.insert(posts).values({
            title: validated.data.title,
            content: validated.data.content,
            authorId: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return { success: true };
    } catch (error) {
        return { error: 'Failed to create post' };
    }
}

// Fetch all blog posts
export async function getPosts() {
    return await db.select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        authorId: posts.authorId,
        authorEmail: users.email,
    }).from(posts).leftJoin(users, eq(posts.authorId, users.id));
}

// Fetch a single blog post by ID
export async function getPostById(id: number) {
    const post = await db
        .select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            createdAt: posts.createdAt,
            authorId: posts.authorId,
            authorEmail: users.email,
        })
        .from(posts)
        .leftJoin(users, eq(posts.authorId, users.id))
        .where(eq(posts.id, id))
        .limit(1);

    return post[0] || null;
}

// Update a blog post
export async function updatePost(id: number, formData: FormData) {
    const user = await getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const validated = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });

    if (!validated.success) {
        return { error: validated.error.errors[0].message };
    }

    const post = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    if (post[0].authorId !== user.id) {
        return { error: 'Forbidden: You can only edit your own posts' };
    }

    try {
        await db
            .update(posts)
            .set({
                title: validated.data.title,
                content: validated.data.content,
                updatedAt: new Date(),
            })
            .where(eq(posts.id, id));
        return { success: true };
    } catch (error) {
        return { error: 'Failed to update post' };
    }
}

// Delete a blog post
export async function deletePost(id: number) {
    const user = await getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const post = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    if (post[0].authorId !== user.id) {
        return { error: 'Forbidden: You can only delete your own posts' };
    }

    try {
        await db.delete(posts).where(eq(posts.id, id));
        return { success: true };
    } catch (error) {
        return { error: 'Failed to delete post' };
    }
}