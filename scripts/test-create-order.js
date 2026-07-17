import db from './lib/db.js';

// Test creating an order directly
const testOrder = {
    id: 'ORD-20251123-TEST',
    customerName: 'Test Customer',
    items: JSON.stringify([{
        productId: 'dl-002',
        name: 'Test Product',
        price: 100000,
        quantity: 1,
        image: '/test.png',
        category: 'door-locks'
    }]),
    total: 108000,
    paymentMethod: 'Cash on Delivery',
    userId: 'user_1',
    phone: '0771234567',
    shippingAddress: '123 Test St',
    city: 'Kampala',
    postalCode: '12345',
    status: 'Pending',
    date: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
};

try {
    const stmt = db.prepare(`
        INSERT INTO "Order" (
            id, customerName, items, total, paymentMethod, userId,
            phone, shippingAddress, city, postalCode, status,
            date, updatedAt, createdAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
        testOrder.id,
        testOrder.customerName,
        testOrder.items,
        testOrder.total,
        testOrder.paymentMethod,
        testOrder.userId,
        testOrder.phone,
        testOrder.shippingAddress,
        testOrder.city,
        testOrder.postalCode,
        testOrder.status,
        testOrder.date,
        testOrder.updatedAt,
        testOrder.createdAt
    );

    console.log('✅ Test order created successfully!');
    console.log('Order ID:', testOrder.id);

    // Verify it was created
    const verify = db.prepare('SELECT * FROM "Order" WHERE id = ?').get(testOrder.id);
    console.log('✅ Verified order exists:', verify);

} catch (error) {
    console.error('❌ Error creating test order:', error);
}
