import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/schema/schema';

let _db;

export function getDb() {
  if (!_db) {
    const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

// Convenience getter — lazy initialization
export const db = new Proxy({}, {
  get(_, prop) {
    return getDb()[prop];
  },
});
