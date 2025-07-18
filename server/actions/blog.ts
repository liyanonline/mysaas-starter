'use server';

import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { posts } from '@/lib/db/schema/post';
import { eq } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';
import { z } from 'zod';
import { error } from 'console';

// Validation schema for blog posts
const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
});

function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // replace non-alphanum with dashes
        .replace(/^-+|-+$/g, '');    // remove leading/trailing dashes
}

function isContentEmpty(html: string): boolean {
    const text = html
        .replace(/<p><br><\/p>/g, '') // Remove empty <p><br></p>
        .replace(/<[^>]*>/g, '')      // Remove all HTML tags
        .trim();
    return text.length === 0;
}

// Create a blog post
export async function createPost(_prevState: any, formData: FormData) {
    // const user = await getUser();
    // if (!user) {
    //     return { error: 'Unauthorized' };
    // }
    let user;
    try {
        user = await getUser();
        console.log('User in createPost:', user);

    } catch (err) {
        console.error('getUser() failed', err);
        return { error: 'Unauthorized', success: false };
    }

    if (!user) {
        return { error: 'Unauthorized to post', success: false };
    }

    // const validated = postSchema.safeParse({
    //     title: formData.get('title'),
    //     content: formData.get('content'),
    // });
    const validated = postSchema.safeParse({
        title: formData.get('title')?.toString() ?? '',
        content: formData.get('content')?.toString() ?? '',
    });

    if (!validated.success) {
        console.warn('Validation failed:', validated.error);
        return { error: validated.error.errors[0].message, success: false };
    }

    try {
        // const slug = slugify(validated.data.title);
        let baseSlug = slugify(validated.data.title);
        let slug = baseSlug;
        let count = 1;

        while (
            (await db.select().from(posts).where(eq(posts.slug, slug)).limit(1)).length > 0
        ) {
            slug = `${baseSlug}-${count++}`;
        }


        await db.insert(posts).values({
            title: validated.data.title,
            slug,
            content: validated.data.content,
            authorId: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return { success: true, error: null };
    } catch (error) {
        console.error('DB insert error:', error);
        return { error: 'Failed to create post', success: false };
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
// export async function updatePost(id: number, formData: FormData) {
//     const user = await getUser();
//     if (!user) {
//         return { error: 'Unauthorized' };
//     }

//     const validated = postSchema.safeParse({
//         title: formData.get('title'),
//         content: formData.get('content'),
//     });

//     if (!validated.success) {
//         return { error: validated.error.errors[0].message };
//     }

//     const post = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
//     if (post[0].authorId !== user.id) {
//         return { error: 'Forbidden: You can only edit your own posts' };
//     }

//     try {
//         await db
//             .update(posts)
//             .set({
//                 title: validated.data.title,
//                 content: validated.data.content,
//                 updatedAt: new Date(),
//             })
//             .where(eq(posts.id, id));
//         return { success: true };
//     } catch (error) {
//         return { error: 'Failed to update post' };
//     }
// }

export async function updatePost(
    postId: number,
    prevState: { success: boolean; error: string | null },
    formData: FormData
): Promise<{ success: boolean; error: string | null }> {
    const title = formData.get('title')?.toString() || '';
    const content = formData.get('content')?.toString() || '';

    if (!title || !content) {
        return { success: false, error: 'Title and content are required.' };
    }

    await db.update(posts)
        .set({ title, content, updatedAt: new Date() })
        .where(eq(posts.id, postId));

    return { success: true, error: null };
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