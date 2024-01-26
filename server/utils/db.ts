import { createClient as createLibSQLClient } from '@libsql/client/http';
import { drizzle as drizzleLibSQL, LibSQLDatabase } from 'drizzle-orm/libsql';

let _db: LibSQLDatabase | null = null;

export const useDB = () => {
  if (!_db) {
    if (process.env.TURSO_DB_URL && process.env.TURSO_DB_TOKEN) {
      // Turso in production
      _db = drizzleLibSQL(
        createLibSQLClient({
          url: process.env.TURSO_DB_URL,
          authToken: process.env.TURSO_DB_TOKEN,
        }),
      );
    } else {
      throw new Error('No database configured for production');
    }
  }
  return _db;
};
