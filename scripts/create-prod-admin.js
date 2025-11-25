const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
    try {
        console.log('Creating admin user in production...');

        // Hash password
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const now = new Date();

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email: 'admin@example.com' }
        });

        if (existingUser) {
            console.log('✅ Admin user already exists!');
            return;
        }

        // Create user
        await prisma.user.create({
            data: {
                id: 'user_admin_prod',
                email: 'admin@example.com',
                name: 'Admin User',
                password: hashedPassword,
                createdAt: now,
                updatedAt: now
            }
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@example.com');
        console.log('Password: admin123');

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();
