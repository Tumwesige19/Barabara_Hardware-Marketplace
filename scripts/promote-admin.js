const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    await client.connect();

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
        console.error('❌ Set ADMIN_EMAIL env var first.');
        await client.end();
        return;
    }

    // Promote to admin
    const result = await client.query(
        `UPDATE "User" SET role = 'admin' WHERE email = $1 RETURNING id, email, name, role`,
        [adminEmail]
    );

    if (result.rowCount === 0) {
        console.log(`❌ No user found with email: ${adminEmail}`);
    } else {
        const u = result.rows[0];
        console.log(`\n✅ SUCCESS! Admin role granted:\n`);
        console.log(`   Name:  ${u.name}`);
        console.log(`   Email: ${u.email}`);
        console.log(`   Role:  ${u.role}`);
        console.log(`\n🚀 You can now access: https://www.barabara-hardware-marketplace.com/admin`);
        console.log(`   (Sign out and back in first to refresh your session token)\n`);
    }

    await client.end();
}

run().catch(e => {
    console.error('❌ Error:', e.message);
    client.end();
});
