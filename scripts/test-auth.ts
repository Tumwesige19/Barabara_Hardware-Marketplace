import { prisma } from '../lib/prisma';
import { hashPassword } from '../lib/auth';

async function testUserCreation() {
    try {
        console.log('Testing database connection...');

        // Test connection
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        // Try to create a test user
        const testEmail = 'test@barabara.com';

        // Check if user exists
        const existing = await prisma.user.findUnique({
            where: { email: testEmail }
        });

        if (existing) {
            console.log('ℹ️  Test user already exists, deleting...');
            await prisma.user.delete({
                where: { email: testEmail }
            });
        }

        // Create test user
        const hashedPassword = await hashPassword('password123');
        const user = await prisma.user.create({
            data: {
                name: 'Test User',
                email: testEmail,
                password: hashedPassword,
                phone: '0771234567'
            }
        });

        console.log('✅ Test user created successfully:', {
            id: user.id,
            name: user.name,
            email: user.email
        });

        // Clean up
        await prisma.user.delete({
            where: { id: user.id }
        });
        console.log('✅ Test user deleted successfully');

        console.log('\n✅ All tests passed! Database is working correctly.');

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testUserCreation();
