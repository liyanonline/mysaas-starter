// lib/db/queries/case.ts
import { db } from '../drizzle';
import { cases } from '../schema/case';
import { eq } from 'drizzle-orm';

export async function getAllCases() {
    return db.select().from(cases).orderBy(cases.updatedAt);
}

export async function getCaseById(id: number) {
    const [result] = await db.select().from(cases).where(eq(cases.id, id));
    return result;
}

// export async function createCase(data: { title: string; description: string; authorId: number }) {
//     return db.insert(cases).values(data);
// }
// import { slugify } from '@/lib/utils'; // or inline the slugify function if not already available

export async function createCase(data: { title: string; description: string; authorId: number }) {
    const slug = data.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return db.insert(cases).values({
        ...data,
        slug, // ✅ now required field is included
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

export async function updateCase(id: number, data: { title: string; description: string }) {
    return db.update(cases).set({
        ...data,
        updatedAt: new Date(),
    }).where(eq(cases.id, id));
}
