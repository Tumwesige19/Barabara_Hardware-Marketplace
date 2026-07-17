/**
 * Seed Admin Script
 * -----------------
 * Promotes an existing user to admin OR creates a fresh admin account.
 *
 * Usage (local SQLite):
 *   npx tsx scripts/seed-admin.ts
 *
 * Usage (production PostgreSQL via env vars):
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=YourStrongPass123! npx tsx scripts/seed-admin.ts
 *
 * Reads from environment variables:
 *   ADMIN_EMAIL     - The email for the admin account
 *   ADMIN_PASSWORD  - The password (only used if creating a new account)
 *   DATABASE_URL    - Used automatically by Prisma in production
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Barabara Admin';

    if (!adminEmail) {
        console.error('❌ ADMIN_EMAIL environment variable is required.');
        console.error('   Run: ADMIN_EMAIL=you@example.com npx tsx scripts/seed-admin.ts');
        process.exit(1);
    }

    console.log(`\n🔐 Setting up admin account for: ${adminEmail}\n`);

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (existingUser) {
            // Promote to admin if not already
            if (existingUser.role === 'admin') {
                console.log(`✅ User "${adminEmail}" is already an admin. Nothing to do.`);
            } else {
                await prisma.user.update({
                    where: { email: adminEmail },
                    data: { role: 'admin' },
                });
                console.log(`✅ Promoted "${adminEmail}" to admin successfully!`);
                console.log(`   Previous role: ${existingUser.role} → New role: admin`);
            }
        } else {
            // Create brand new admin user
            if (!adminPassword) {
                console.error('❌ ADMIN_PASSWORD is required when creating a new admin account.');
                console.error('   Run: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=StrongPass123! npx tsx scripts/seed-admin.ts');
                process.exit(1);
            }

            if (adminPassword.length < 8) {
                console.error('❌ ADMIN_PASSWORD must be at least 8 characters long.');
                process.exit(1);
            }

            const hashedPassword = await bcrypt.hash(adminPassword, 12);

            await prisma.user.create({
                data: {
                    id: `admin_${Date.now()}`,
                    email: adminEmail,
                    name: adminName,
                    password: hashedPassword,
                    role: 'admin',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            console.log(`✅ Created new admin account:`);
            console.log(`   Email:    ${adminEmail}`);
            console.log(`   Name:     ${adminName}`);
            console.log(`   Role:     admin`);
            console.log(`\n⚠️  Keep your admin credentials safe. Do NOT commit them to Git.`);
        }

        console.log(`\n🚀 Admin portal is ready at: https://www.barabara-hardware-marketplace.com/admin`);
        console.log(`   Sign in with: ${adminEmail}\n`);
    } catch (error) {
        console.error('❌ Failed to seed admin:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seedAdmin();
