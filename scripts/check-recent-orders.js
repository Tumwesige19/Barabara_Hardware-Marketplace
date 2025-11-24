
const db = require('better-sqlite3')('prisma/dev.db');
try {
    const orders = db.prepare('SELECT id, customerName, total, date FROM "Order" ORDER BY date DESC LIMIT 5').all();
    console.log('Recent Orders:');
    console.log(orders);
} catch (error) {
    console.error('Error:', error);
}
