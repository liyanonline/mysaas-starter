'use server';

import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema'; // Assuming users table remains the same
import { cases } from '@/lib/db/schema/case'; // Renamed from posts to cases
import { eq } from 'drizzle-orm';
import { getUser } from '@/lib/db/queries';
import { z } from 'zod';

// Validation schema for cases
const caseSchema = z.object({
    title: z.string().min(1, 'Title is required'), // e.g., Case Title
    description: z.string().min(1, 'Description is required'), // Renamed from content to description
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

// Create a case
export async function createCase(_prevState: any, formData: FormData) {
    let user;
    try {
        user = await getUser();
        console.log('User in createCase:', user);
    } catch (err) {
        console.error('getUser() failed', err);
        return { error: 'Unauthorized', success: false };
    }

    if (!user) {
        return { error: 'Unauthorized to create case', success: false };
    }

    const validated = caseSchema.safeParse({
        title: formData.get('title')?.toString() ?? '',
        description: formData.get('description')?.toString() ?? '', // Renamed from content
    });

    if (!validated.success) {
        console.warn('Validation failed:', validated.error);
        return { error: validated.error.errors[0].message, success: false };
    }

    try {
        let baseSlug = slugify(validated.data.title);
        let slug = baseSlug;
        let count = 1;

        while ((await db.select().from(cases).where(eq(cases.slug, slug)).limit(1)).length > 0) {
            slug = `${baseSlug}-${count++}`;
        }

        await db.insert(cases).values({
            title: validated.data.title,
            slug,
            description: validated.data.description, // Renamed from content
            authorId: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return { success: true, error: null };
    } catch (error) {
        console.error('DB insert error:', error);
        return { error: 'Failed to create case', success: false };
    }
}

// Fetch all cases
export async function getCases() {
    return await db.select({
        id: cases.id,
        title: cases.title,
        description: cases.description, // Renamed from content
        createdAt: cases.createdAt,
        authorId: cases.authorId,
        authorEmail: users.email,
    }).from(cases).leftJoin(users, eq(cases.authorId, users.id));
}

// Fetch a single case by ID
export async function getCaseById(id: number) {
    const caseData = await db
        .select({
            id: cases.id,
            title: cases.title,
            description: cases.description, // Renamed from content
            createdAt: cases.createdAt,
            authorId: cases.authorId,
            authorEmail: users.email,
        })
        .from(cases)
        .leftJoin(users, eq(cases.authorId, users.id))
        .where(eq(cases.id, id))
        .limit(1);

    return caseData[0] || null;
}

// Update a case
export async function updateCase(
    caseId: number,
    prevState: { success: boolean; error: string | null },
    formData: FormData
): Promise<{ success: boolean; error: string | null }> {
    const title = formData.get('title')?.toString() || '';
    const description = formData.get('description')?.toString() || ''; // Renamed from content

    if (!title || !description) {
        return { success: false, error: 'Title and description are required.' };
    }

    await db.update(cases)
        .set({ title, description, updatedAt: new Date() })
        .where(eq(cases.id, caseId));

    return { success: true, error: null };
}

// Delete a case
export async function deleteCase(id: number) {
    const user = await getUser();
    if (!user) {
        return { error: 'Unauthorized' };
    }

    const caseData = await db.select().from(cases).where(eq(cases.id, id)).limit(1);
    if (caseData[0].authorId !== user.id) {
        return { error: 'Forbidden: You can only delete your own cases' };
    }

    try {
        await db.delete(cases).where(eq(cases.id, id));
        return { success: true };
    } catch (error) {
        return { error: 'Failed to delete case' };
    }
}


// // app/actions/case.ts
// 'use server';

// import { createCase, updateCase } from '@/lib/db/queries/case';
// import { getUser } from '@/lib/db/queries'; // getUser should return current session user

// export async function createCaseAction(formData: FormData) {
//     const user = await getUser();
//     if (!user) return { error: 'Unauthorized' };

//     const title = formData.get('title') as string;
//     const description = formData.get('description') as string;

//     await createCase({ title, description, authorId: user.id });
//     return { success: true };
// }


// import { db } from '@/lib/db/drizzle';
// import { cases } from '@/lib/db/schema/case';
// import { eq } from 'drizzle-orm';

// export async function updateCaseAction(
//     id: number,
//     _prevState: { success: boolean; error: string | null },
//     formData: FormData
// ) {
//     const title = formData.get('title') as string;
//     const description = formData.get('description') as string;

//     if (!title) {
//         return { success: false, error: 'Title is required' };
//     }

//     try {
//         await db
//             .update(cases)
//             .set({ title, description, updatedAt: new Date() })
//             .where(eq(cases.id, id));

//         return { success: true, error: null };
//     } catch (error) {
//         return { success: false, error: 'Database update failed' };
//     }
// }


// // export async function updateCaseAction(id: number, formData: FormData) {
// //     const user = await getUser();
// //     if (!user) return { error: 'Unauthorized' };
// //     // if (user.id !== case.authorId && user.role !== 'admin') {
// //     //     return { error: 'Forbidden' };
// //     // }

// //     const title = formData.get('title') as string;
// //     const description = formData.get('description') as string;

// //     await updateCase(id, { title, description });
// //     return { success: true };
// // }
