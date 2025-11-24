const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

async function createTestUser() {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create user
        const stmt = db.prepare(`
            INSERT INTO User (id, email, name, password, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        const now = new Date().toISOString();
        stmt.run('user_1', 'admin@example.com', 'Admin User', hashedPassword, now, now);

        console.log('✅ Test user created successfully!');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');
        console.log('\nYou can now log in and place orders!');
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        db.close();
    }
}

createTestUser();
