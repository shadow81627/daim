import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const links = sqliteTable('links', {
  id: integer('id').primaryKey(),
  type: text('type'),
  slug: text('slug'),
  name: text('name'),
  description: text('description'),
  url: text('url'),
  image: text('image'),
  color: text('color'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('update_at'),
  deletedAt: text('deleted_at'),
});
