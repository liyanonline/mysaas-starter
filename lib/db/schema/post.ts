import {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
    integer,
    check,
    uuid,
} from 'drizzle-orm/pg-core';
import { users } from '../schema';

export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: varchar('slug', { length: 200 }).notNull(),
    content: text('content').notNull(),
    authorId: integer('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});