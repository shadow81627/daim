// https://github.com/Atinux/nuxt-todos-edge/tree/main
// import { migrate } from 'drizzle-orm/libsql/migrator';

export default defineNitroPlugin(() => {
  if (process.dev) {
    // migrate(db, {
    //   migrationsFolder: 'server/database/migrations',
    // });
  }
});
