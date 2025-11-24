const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

console.log('Checking orders in database...');

try {
    const orders = db.prepare('SELECT * FROM "Order"').all();
    console.log(`Found ${orders.length} orders:`);
    orders.forEach((order: any) => {
        console.log(`- ${order.id}: ${order.customerName} (${order.status})`);
    });
} catch (error: any) {
    console.error('Error:', error.message);
}
