import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt')
    .defaultNow()
    .$onUpdateFn(() => new Date(Date.now())),
});

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  age: integer('age').notNull(),
  about: text('about'),
  userId: integer('user_id').references(() => users.id),
});

export const usersRelations = relations(users, ({ one }) => ({
  user_profile: one(profiles),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}));
