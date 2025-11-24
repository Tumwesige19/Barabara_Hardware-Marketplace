
const db = require('better-sqlite3')('prisma/dev.db');

// Mock data simulating what the checkout page sends
const mockOrderData = {
    customerName: 'John Doe',
    customerEmail: 'john@example.com', // Valid email in DB
    items: [],
    subtotal: 1000,
    tax: 80,
    shipping: 5000,
    total: 6080,
    paymentMethod: 'Cash on Delivery',
    userId: 'invalid_user_id_from_stale_session', // INVALID ID
    phone: '0771234567',
    shippingAddress: 'Test Address',
    city: 'Kampala',
    postalCode: '12345'
};

console.log('Testing Smart Fix with invalid userId:', mockOrderData.userId);

// Replicating the logic from app/actions.ts
try {
    // 1. Check if user exists
    let validUserId = mockOrderData.userId;
    const userExists = db.prepare('SELECT id FROM User WHERE id = ?').get(mockOrderData.userId);

    if (!userExists) {
        console.log(`User ID ${mockOrderData.userId} not found. Attempting lookup by email: ${mockOrderData.customerEmail}`);
        const userByEmail = db.prepare('SELECT id FROM User WHERE email = ?').get(mockOrderData.customerEmail);

        if (userByEmail) {
            console.log(`SUCCESS: Found correct user ID: ${userByEmail.id}`);
            validUserId = userByEmail.id;
        } else {
            console.log('FAILURE: Could not find user by email either.');
        }
    } else {
        console.log('User ID is valid.');
    }

} catch (error) {
    console.error('Test failed:', error);
}
