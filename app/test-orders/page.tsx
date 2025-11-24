import { getOrders } from '@/app/actions';

export default async function TestOrdersPage() {
    const orders = await getOrders();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Orders Test</h1>
            <p className="mb-4">Found {orders.length} orders</p>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(orders, null, 2)}
            </pre>
        </div>
    );
}
