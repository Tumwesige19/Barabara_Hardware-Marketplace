const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    await client.connect();
    console.log('✅ Connected to Neon PostgreSQL\n');

    // First: apply migration if role column doesn't exist
    try {
        await client.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'`);
        console.log('✅ role column ensured on User table\n');
    } catch (e) {
        console.log('Note (migration):', e.message);
    }

    // List all users
    const { rows } = await client.query(
        `SELECT id, email, name, role, "createdAt" FROM "User" ORDER BY "createdAt" ASC`
    );

    console.log('=== USERS IN PRODUCTION DATABASE ===\n');
    if (rows.length === 0) {
        console.log('No users found.');
    } else {
        rows.forEach((u, i) => {
            console.log(`${i + 1}. ${u.name}`);
            console.log(`   Email: ${u.email}`);
            console.log(`   Role:  ${u.role}`);
            console.log(`   Joined: ${new Date(u.createdAt).toLocaleDateString()}`);
            console.log('');
        });
    }

    await client.end();
}

run().catch(e => {
    console.error('❌ Error:', e.message);
    client.end();
});
