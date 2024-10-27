import {
  integer,
  serial,
  text,
  timestamp,
  boolean,
  pgTable,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import * as usersSchema from '../users/schema';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date(Date.now())),
  userId: integer('user_id').references(() => usersSchema.users.id),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(usersSchema.users, {
    fields: [posts.userId],
    references: [usersSchema.users.id],
  }),
}));
