import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import * as postsSchema from '../posts/schema';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  roleId: integer('role_id').references(() => roles.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
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

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  roleName: text('role_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date(Date.now())),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  user_profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  posts: many(postsSchema.posts),
  user_role: one(roles, { fields: [users.roleId], references: [roles.id] }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  list_user: many(users),
}));
