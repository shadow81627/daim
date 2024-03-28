import { links } from '~/server/database/schema/links';

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    throw createError({
      message: 'Unauthorized',
      statusCode: 401,
    });
  }
  const body = await readBody(event);
  const result = await db.insert(links).values(body).returning().run();
  return { data: result };
});
