import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

// This is a configuration file for drizzle-kit, a TypeScript ORM for PostgreSQL.

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} as Config;