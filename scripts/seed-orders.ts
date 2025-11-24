const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

const testOrders = [
    {
        customerName: 'John Doe',
        items: JSON.stringify([{ id: 'dl-001', name: 'Smart Lock', price: 450000, quantity: 1 }]),
        total: 450000,
        paymentMethod: 'Mobile Money (MTN)',
        userId: 'user_1',
        phone: '0771234567',
        shippingAddress: 'Kampala Road',
        city: 'Kampala',
        postalCode: '10101',
        locationLink: 'https://maps.app.goo.gl/test1',
        status: 'Pending',
        date: new Date().toISOString() // Today
    },
    {
        customerName: 'Jane Smith',
        items: JSON.stringify([{ id: 'dl-002', name: 'WiFi Lock', price: 380000, quantity: 1 }]),
        total: 380000,
        paymentMethod: 'Card',
        userId: 'user_2',
        phone: '0701234567',
        shippingAddress: 'Entebbe Road',
        city: 'Entebbe',
        postalCode: '20202',
        locationLink: null,
        status: 'Shipped',
        date: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
    },
    {
        customerName: 'Bob Brown',
        items: JSON.stringify([{ id: 'dl-003', name: 'Keypad Lock', price: 250000, quantity: 1 }]),
        total: 250000,
        paymentMethod: 'Cash',
        userId: 'user_3',
        phone: '0751234567',
        shippingAddress: 'Jinja Road',
        city: 'Jinja',
        postalCode: '30303',
        locationLink: 'https://maps.app.goo.gl/test3',
        status: 'Delivered',
        date: new Date(Date.now() - 86400000 * 5).toISOString() // 5 days ago
    }
];

console.log('Seeding users...');
const userStmt = db.prepare(`
    INSERT OR IGNORE INTO "User" (id, email, password, name, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?)
`);

const users = [
    { id: 'user_1', email: 'john@example.com', name: 'John Doe' },
    { id: 'user_2', email: 'jane@example.com', name: 'Jane Smith' },
    { id: 'user_3', email: 'bob@example.com', name: 'Bob Brown' }
];

for (const user of users) {
    try {
        userStmt.run(user.id, user.email, 'password123', user.name, new Date().toISOString(), new Date().toISOString());
        console.log(`Created user ${user.name}`);
    } catch (e: any) {
        console.log(`User ${user.name} might already exist:`, e.message);
    }
}

console.log('Seeding orders...');

const stmt = db.prepare(`
    INSERT INTO "Order" (id, customerName, items, total, paymentMethod, userId, phone, shippingAddress, city, postalCode, locationLink, status, date, updatedAt, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const order of testOrders) {
    const id = generateId();
    try {
        stmt.run(
            id,
            order.customerName,
            order.items,
            order.total,
            order.paymentMethod,
            order.userId,
            order.phone,
            order.shippingAddress,
            order.city,
            order.postalCode,
            order.locationLink,
            order.status,
            order.date,
            new Date().toISOString(), // updatedAt
            new Date().toISOString()  // createdAt
        );
        console.log(`Created order ${id} for ${order.customerName}`);
    } catch (error: any) {
        console.error(`Failed to create order for ${order.customerName}:`, error.message);
        if (error.code) console.error('Error code:', error.code);
    }
}

console.log('Seeding complete.');
