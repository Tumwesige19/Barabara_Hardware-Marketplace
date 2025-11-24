const db = require('better-sqlite3')('barabara.db');

try {
    console.log('Checking for location_link column...');

    const tableInfo = db.prepare("PRAGMA table_info(orders)").all();
    const hasLocationLink = tableInfo.some(col => col.name === 'location_link');

    if (!hasLocationLink) {
        console.log('Adding location_link column...');
        db.prepare("ALTER TABLE orders ADD COLUMN location_link TEXT").run();
        console.log('✅ Added location_link column successfully.');
    } else {
        console.log('ℹ️ location_link column already exists.');
    }

} catch (error) {
    console.error('❌ Migration failed:', error);
}
