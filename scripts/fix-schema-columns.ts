const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const db = new Database(dbPath);

const columnsToAdd = [
    { name: 'locationLink', type: 'TEXT' },
    { name: 'phone', type: 'TEXT' },
    { name: 'shippingAddress', type: 'TEXT' },
    { name: 'city', type: 'TEXT' },
    { name: 'postalCode', type: 'TEXT' }
];

console.log('Checking Order table schema...');
const currentColumns = db.prepare('PRAGMA table_info("Order")').all().map((c: any) => c.name);

for (const col of columnsToAdd) {
    if (!currentColumns.includes(col.name)) {
        console.log(`Adding column ${col.name}...`);
        try {
            db.prepare(`ALTER TABLE "Order" ADD COLUMN "${col.name}" ${col.type}`).run();
            console.log(`Added ${col.name}`);
        } catch (error) {
            console.error(`Failed to add ${col.name}:`, error);
        }
    } else {
        console.log(`Column ${col.name} already exists.`);
    }
}

console.log('Schema update complete.');
