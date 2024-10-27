import { sql } from 'drizzle-orm';

export const updateRoleQuery = (roleId: number, userId: number) => {
  return sql`UPDATE users SET role_id = ${roleId} WHERE id = ${userId}`;
};
