import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
    // id: text('id').primaryKey(),
    id: uuid('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    // plan: text('plan').notNull(),
    // plan: text('plan'), // nullable by default
    plan: text('plan').default('free'),
    stripe_id: text('stripe_id').notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
