import { lucia } from 'lucia';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { h3 } from 'lucia/middleware';
import 'lucia/polyfill/node';

export const auth = lucia({
  adapter: libsql(libsqlClient, {
    user: 'users',
    key: 'user_key',
    session: 'user_session',
  }),
  middleware: h3(),
  env: process.dev ? 'DEV' : 'PROD',
  getUserAttributes: (data) => {
    return {
      email: data.email,
    };
  },
});
