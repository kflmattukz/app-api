import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

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
