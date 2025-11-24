import db from '@/lib/db';

export default async function DirectDBTest() {
    let result = '';
    let error = '';

    try {
        const orders = db.prepare('SELECT * FROM "Order"').all();
        result = JSON.stringify(orders, null, 2);
    } catch (e: any) {
        error = e.message;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Direct DB Test</h1>
            {error && (
                <div className="bg-red-100 p-4 rounded mb-4">
                    <p className="text-red-800 font-bold">Error:</p>
                    <pre>{error}</pre>
                </div>
            )}
            {result && (
                <div className="bg-green-100 p-4 rounded">
                    <p className="text-green-800 font-bold mb-2">Success! Found orders:</p>
                    <pre className="bg-white p-4 rounded overflow-auto">{result}</pre>
                </div>
            )}
        </div>
    );
}
