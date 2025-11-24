const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
    try {
        console.log('Testing Prisma connection...');

        // Test user query
        const users = await prisma.user.findMany();
        console.log(`✅ Found ${users.length} user(s) in database`);

        // Test order query
        const orders = await prisma.order.findMany();
        console.log(`✅ Found ${orders.length} order(s) in database`);

        console.log('\n✅ Prisma is working correctly!');

    } catch (error) {
        console.error('❌ Prisma error:', error.message);
        console.error('Full error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
