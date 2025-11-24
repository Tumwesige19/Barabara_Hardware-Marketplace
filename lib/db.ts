// Environment-aware database connection
// Uses SQLite for local development, PostgreSQL for Vercel production

import { DBAdapter } from './db-adapter';
import { SQLiteAdapter } from './adapters/sqlite';

// Check if we're in production (Vercel)
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

let db: DBAdapter;
let generateIdFunc: () => string;

if (isProduction) {
  // Production: Use PostgreSQL via Prisma
  // We use require to avoid loading Prisma Client in local dev if not needed
  const { PostgresAdapter } = require('./adapters/postgres');
  db = new PostgresAdapter();

  // Import generateId from db-vercel
  const dbVercel = require('./db-vercel');
  generateIdFunc = dbVercel.generateId;
} else {
  // Local development: Use SQLite
  db = new SQLiteAdapter();

  // Local generateId function
  generateIdFunc = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };
}

export default db;
export const generateId = generateIdFunc;
export const isUsingPostgres = isProduction;
