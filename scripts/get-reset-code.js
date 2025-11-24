const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

function generateId() {
    return 'rst_' + Math.random().toString(36).substring(2, 15);
}

console.log('='.repeat(70));
console.log('PASSWORD RESET CODE GENERATOR');
console.log('='.repeat(70));

// Show available users
const users = db.prepare('SELECT email, name FROM users').all();

if (users.length === 0) {
    console.log('\n❌ No users found in database.\n');
    db.close();
    process.exit(1);
}

console.log('\n📋 Available users:\n');
users.forEach((user, i) => {
    console.log(`   ${i + 1}. ${user.email} (${user.name})`);
});

// Get email from command line or use first user
const email = process.argv[2] || users[0].email;

const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

if (!user) {
    console.log(`\n❌ User not found: ${email}\n`);
    db.close();
    process.exit(1);
}

// Generate 5-digit code
const token = Math.floor(10000 + Math.random() * 90000).toString();
const tokenId = generateId();
const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

// Delete old tokens
db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ? AND used = 0').run(user.id);

// Store new token
db.prepare(`
    INSERT INTO password_reset_tokens (id, user_id, token, expires_at)
    VALUES (?, ?, ?, ?)
`).run(tokenId, user.id, token, expiresAt.toISOString());

console.log('\n' + '='.repeat(70));
console.log('✅ RESET CODE GENERATED');
console.log('='.repeat(70));
console.log(`\n📧 Email: ${user.email}`);
console.log(`👤 Name: ${user.name}`);
console.log(`\n🔐 YOUR RESET CODE:`);
console.log(`\n   ╔═══════════════╗`);
console.log(`   ║   ${token}   ║`);
console.log(`   ╚═══════════════╝`);
console.log(`\n⏰ Expires: ${expiresAt.toLocaleString()}`);
console.log(`\n📝 INSTRUCTIONS:`);
console.log(`   1. Go to: http://localhost:3000/reset-password`);
console.log(`   2. Enter this code: ${token}`);
console.log(`   3. Enter your new password`);
console.log(`   4. Click "Reset Password"\n`);
console.log('='.repeat(70) + '\n');

db.close();
