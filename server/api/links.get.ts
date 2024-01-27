import { links } from '~/server/database/schema/links';

export default defineEventHandler(async () => {
  const data = await db.select().from(links).all();
  return { data };
});
