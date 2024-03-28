import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from '~/server/database/schema/users';

export const uerKeys = sqliteTable('user_key', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  hashedPassword: text('hashed_password'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
