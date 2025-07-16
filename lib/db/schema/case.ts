// lib/db/schema/case.ts
import { users } from '../schema'; // Adjust the import path as necessary
import { pgTable, serial, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const cases = pgTable("cases", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    status: varchar("status", { length: 20 }).default("open"), // 'open' | 'resolved'
    authorId: integer("author_id").references(() => users.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    caseId: integer("case_id").references(() => cases.id).notNull(),
    authorId: integer("author_id").references(() => users.id).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const tags = pgTable("tags", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).unique().notNull(),
});

export const caseTags = pgTable("case_tags", {
    caseId: integer("case_id").references(() => cases.id).notNull(),
    tagId: integer("tag_id").references(() => tags.id).notNull(),
});

// export const cases = pgTable('cases', {
//     id: serial('id').primaryKey(),
//     title: text('title').notNull(),
//     description: text('description'),
//     createdAt: timestamp('created_at').defaultNow(),
//     updatedAt: timestamp('updated_at').defaultNow().notNull(),
//     authorId: integer('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
// });
