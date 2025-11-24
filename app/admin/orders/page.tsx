import { getOrders } from '@/app/actions';
import { formatCurrency } from '@/lib/utils';
import { OrderActions } from './OrderActions';
import { OrderFilters } from './OrderFilters';

export default async function AdminOrdersPage({
    searchParams,
}: {
    searchParams: { search?: string; status?: string; startDate?: string; endDate?: string; paymentMethod?: string };
}) {
    const orders = await getOrders(
        searchParams.search,
        searchParams.status,
        searchParams.startDate,
        searchParams.endDate,
        searchParams.paymentMethod
    );

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Orders Management</h1>
                <p className="text-muted-foreground">View and manage all customer orders</p>
            </div>

            <OrderFilters />

            <div className="bg-card rounded-lg border shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="p-4 text-left text-sm font-medium">Order ID</th>
                                <th className="p-4 text-left text-sm font-medium">Customer</th>
                                <th className="p-4 text-left text-sm font-medium">Items</th>
                                <th className="p-4 text-left text-sm font-medium">Total</th>
                                <th className="p-4 text-left text-sm font-medium">Payment</th>
                                <th className="p-4 text-left text-sm font-medium">Date</th>
                                <th className="p-4 text-left text-sm font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order: any) => (
                                    <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="p-4 align-middle">
                                            <span className="font-mono text-xs">{order.id}</span>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{order.customer_name}</span>
                                                {order.phone && (
                                                    <span className="text-xs text-muted-foreground">{order.phone}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="flex flex-col gap-1">
                                                {order.items.length > 1 ? (
                                                    <span className="font-medium">{order.items.length} items</span>
                                                ) : (
                                                    <span className="font-medium">{order.items[0]?.name || 'N/A'}</span>
                                                )}
                                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                    {order.items.map((item: any) => item.name).slice(0, 2).join(', ')}
                                                    {order.items.length > 2 ? '...' : ''}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle font-medium">{formatCurrency(order.total)}</td>
                                        <td className="p-4 align-middle whitespace-nowrap">
                                            <span className="inline-flex items-center gap-1">
                                                {order.payment_method.includes('Mobile') ? '📱' : '💳'}
                                                {order.payment_method}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-sm text-muted-foreground">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>

                                        <td className="p-4 align-middle">
                                            <OrderActions orderId={order.id} currentStatus={order.status} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
