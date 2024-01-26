import { users } from '~/server/database/schema/users';

export default defineEventHandler(async () => {
  const data = await useDB().select().from(users).all();
  return { data };
});
