import { users } from '~/server/database/schema/users';

export default defineEventHandler(async (event) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  if (!session) {
    throw createError({
      message: 'Unauthorized',
      statusCode: 401,
    });
  }
  const data = await db.select().from(users).all();
  return { data };
});
