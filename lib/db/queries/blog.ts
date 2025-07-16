import { db } from '../drizzle';
import { users } from '../schema';
import { posts } from '../schema/post';
import { eq } from 'drizzle-orm';

// Define the Blog type
interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string;
    authorId: number;
    authorEmail: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// Define the NewBlog type for creation
interface NewBlog {
    title: string;
    content: string;
    authorId: number;
    slug?: string; // Optional slug, can be generated
}

// Fetch all blogs
export async function listBlogs(): Promise<Blog[]> {
    const blogs = await db
        .select({
            id: posts.id,
            title: posts.title,
            slug: posts.slug,
            content: posts.content,
            authorId: posts.authorId,
            authorEmail: users.email,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
        })
        .from(posts)
        .leftJoin(users, eq(posts.authorId, users.id));

    return blogs; // Return the array of blogs
}

// Fetch a single blog by ID or slug
export async function getBlog(idOrSlug: number | string): Promise<Blog | null> {
    const whereCondition =
        typeof idOrSlug === 'number'
            ? eq(posts.id, idOrSlug)
            : eq(posts.slug, idOrSlug);

    const result = await db
        .select({
            id: posts.id,
            title: posts.title,
            slug: posts.slug,
            content: posts.content,
            authorId: posts.authorId,
            authorEmail: users.email,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
        })
        .from(posts)
        .where(whereCondition) // ✅ Apply WHERE before JOIN
        .leftJoin(users, eq(posts.authorId, users.id))
        .limit(1);

    return result[0] || null;
}

// export async function getBlog(idOrSlug: number | string): Promise<Blog | null> {
//     let query = db
//         .select({
//             id: posts.id,
//             title: posts.title,
//             slug: posts.slug,
//             content: posts.content,
//             authorId: posts.authorId,
//             authorEmail: users.email,
//             createdAt: posts.createdAt,
//             updatedAt: posts.updatedAt,
//         })
//         .from(posts)
//         .leftJoin(users, eq(posts.authorId, users.id));

//     if (typeof idOrSlug === 'number') {
//         query = query.where(eq(posts.id, idOrSlug)); // Chain .where() after .from()
//     } else {
//         query = query.where(eq(posts.slug, idOrSlug)); // Chain .where() after .from()
//     }

//     const result = await query.limit(1);
//     return result[0] || null; // Return the first result or null
// }

// Create a new blog
export async function createBlog(data: NewBlog): Promise<Blog> {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const [newBlog] = await db
        .insert(posts)
        .values({
            title: data.title,
            slug,
            content: data.content,
            authorId: data.authorId,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .returning();

    if (!newBlog) {
        throw new Error('Failed to create blog');
    }

    // Fetch the full blog with author email to return consistent data
    const blog = await getBlog(newBlog.id);
    return blog!; // Non-null assertion since we just created it
}


// import { db } from '../drizzle';
// import { users } from '../schema';
// import { posts } from '../schema/post';
// import { eq } from 'drizzle-orm';

// // Define the Blog type
// interface Blog {
//     id: number;
//     title: string;
//     slug: string;
//     content: string;
//     authorId: number;
//     authorEmail: string | null;
//     createdAt: Date;
//     updatedAt: Date;
// }

// // Define the NewBlog type for creation
// interface NewBlog {
//     title: string;
//     content: string;
//     authorId: number;
//     slug?: string; // Optional slug, can be generated
// }

// // Fetch all blogs
// export async function listBlogs(): Promise<Blog[]> {
//     const blogs = await db
//         .select({
//             id: posts.id,
//             title: posts.title,
//             slug: posts.slug,
//             content: posts.content,
//             authorId: posts.authorId,
//             authorEmail: users.email,
//             createdAt: posts.createdAt,
//             updatedAt: posts.updatedAt,
//         })
//         .from(posts)
//         .leftJoin(users, eq(posts.authorId, users.id));

//     return blogs; // Return the array of blogs
// }

// // Fetch a single blog by ID or slug
// export async function getBlog(idOrSlug: number | string): Promise<Blog | null> {
//     let query = db
//         .select({
//             id: posts.id,
//             title: posts.title,
//             slug: posts.slug,
//             content: posts.content,
//             authorId: posts.authorId,
//             authorEmail: users.email,
//             createdAt: posts.createdAt,
//             updatedAt: posts.updatedAt,
//         })
//         .from(posts)
//         .leftJoin(users, eq(posts.authorId, users.id));

//     if (typeof idOrSlug === 'number') {
//         query = query.where(eq(posts.id, idOrSlug));
//     } else {
//         query = query.where(eq(posts.slug, idOrSlug));
//     }

//     const result = await query.limit(1);
//     return result[0] || null; // Return the first result or null
// }

// // Create a new blog
// export async function createBlog(data: NewBlog): Promise<Blog> {
//     const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
//     const [newBlog] = await db
//         .insert(posts)
//         .values({
//             title: data.title,
//             slug,
//             content: data.content,
//             authorId: data.authorId,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//         })
//         .returning();

//     if (!newBlog) {
//         throw new Error('Failed to create blog');
//     }

//     // Fetch the full blog with author email to return consistent data
//     const blog = await getBlog(newBlog.id);
//     return blog!; // Non-null assertion since we just created it
// }