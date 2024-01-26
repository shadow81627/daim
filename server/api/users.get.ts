import { users } from '~/server/database/schema/users';

export default defineEventHandler(async () => {
  const data = await db.select().from(users).all();
  return { data };
});
