import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  out: 'server/database/migrations',
  schema: 'server/database/schema',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DB_URL as string,
    authToken: process.env.TURSO_DB_TOKEN as string,
  },
} satisfies Config;
