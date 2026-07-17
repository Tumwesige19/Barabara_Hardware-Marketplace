const Database = require('better-sqlite3');
const path = require('path');

// The actual working local DB (lowercase table names)
const dbPath = path.join(process.cwd(), 'database.db');
const db = new Database(dbPath);

const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables.map(t => t.name));

// Check if role column already exists
const userCols = db.prepare("PRAGMA table_info(users)").all();
const hasRole = userCols.some(c => c.name === 'role');

if (hasRole) {
    console.log('✅ role column already exists in users table');
} else {
    db.exec('ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT "user"');
    console.log('✅ role column added to users table');
}

// Verify
const cols = db.prepare("PRAGMA table_info(users)").all();
console.log('Current columns:', cols.map(c => c.name));
db.close();
