// app/actions/case.ts
'use server';

import { createCase, updateCase } from '@/lib/db/queries/case';
import { getUser } from '@/lib/db/queries'; // getUser should return current session user

export async function createCaseAction(formData: FormData) {
    const user = await getUser();
    if (!user) return { error: 'Unauthorized' };

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    await createCase({ title, description, authorId: user.id });
    return { success: true };
}


import { db } from '@/lib/db/drizzle';
import { cases } from '@/lib/db/schema/case';
import { eq } from 'drizzle-orm';

export async function updateCaseAction(
    id: number,
    _prevState: { success: boolean; error: string | null },
    formData: FormData
) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!title) {
        return { success: false, error: 'Title is required' };
    }

    try {
        await db
            .update(cases)
            .set({ title, description, updatedAt: new Date() })
            .where(eq(cases.id, id));

        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: 'Database update failed' };
    }
}


// export async function updateCaseAction(id: number, formData: FormData) {
//     const user = await getUser();
//     if (!user) return { error: 'Unauthorized' };
//     // if (user.id !== case.authorId && user.role !== 'admin') {
//     //     return { error: 'Forbidden' };
//     // }

//     const title = formData.get('title') as string;
//     const description = formData.get('description') as string;

//     await updateCase(id, { title, description });
//     return { success: true };
// }
