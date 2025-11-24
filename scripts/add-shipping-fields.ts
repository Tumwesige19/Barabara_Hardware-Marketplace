import db from '../lib/db';

console.log('Adding shipping fields to orders table...\n');

try {
    // Add phone column
    db.exec('ALTER TABLE orders ADD COLUMN phone TEXT');
    console.log('✅ Added phone column');
} catch (e: any) {
    if (e.message.includes('duplicate column name')) {
        console.log('⚠️  phone column already exists');
    } else {
        throw e;
    }
}

try {
    // Add shipping_address column
    db.exec('ALTER TABLE orders ADD COLUMN shipping_address TEXT');
    console.log('✅ Added shipping_address column');
} catch (e: any) {
    if (e.message.includes('duplicate column name')) {
        console.log('⚠️  shipping_address column already exists');
    } else {
        throw e;
    }
}

try {
    // Add city column
    db.exec('ALTER TABLE orders ADD COLUMN city TEXT');
    console.log('✅ Added city column');
} catch (e: any) {
    if (e.message.includes('duplicate column name')) {
        console.log('⚠️  city column already exists');
    } else {
        throw e;
    }
}

try {
    // Add postal_code column
    db.exec('ALTER TABLE orders ADD COLUMN postal_code TEXT');
    console.log('✅ Added postal_code column');
} catch (e: any) {
    if (e.message.includes('duplicate column name')) {
        console.log('⚠️  postal_code column already exists');
    } else {
        throw e;
    }
}

console.log('\n✅ Database migration complete!');
console.log('Orders table now includes shipping fields.');
