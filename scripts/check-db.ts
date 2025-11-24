import { prisma } from '../lib/prisma';

async function main() {
    try {
        const orders = await prisma.order.findMany();
        console.log('Orders in DB:', orders);
        const messages = await prisma.message.findMany();
        console.log('Messages in DB:', messages);
    } catch (e) {
        console.error('Error querying DB:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
