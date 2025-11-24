import { getDashboardStats, getOrders } from '@/app/actions';
import { formatCurrency } from '@/lib/utils';
import { CreditCard, Package, Users, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { StatusBadge } from '@/components/admin/StatusBadge';

export default async function AdminDashboard() {
    const stats = await getDashboardStats();
    const recentOrders = await getOrders(); // Fetch recent orders for the list

    // Calculate growth (mock logic for now as we don't have historical data)
    const revenueGrowth = "+20.1%";
    const activeNow = "+573";

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your store's performance.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/analytics" className="block">
                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors cursor-pointer h-full">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
                        <p className="text-xs text-muted-foreground">{revenueGrowth} from last month</p>
                    </div>
                </Link>
                <Link href="/admin/orders?status=Pending" className="block">
                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors cursor-pointer h-full">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Pending Orders</h3>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                        <p className="text-xs text-muted-foreground">{stats.totalOrders} total orders</p>
                    </div>
                </Link>
                <Link href="/admin/messages?status=Unread" className="block">
                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors cursor-pointer h-full">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Unread Messages</h3>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{stats.unreadMessages}</div>
                        <p className="text-xs text-muted-foreground">{stats.totalMessages} total messages</p>
                    </div>
                </Link>
                <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Active Now</h3>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{activeNow}</div>
                    <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="p-6 flex flex-col space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold leading-none tracking-tight">Recent Orders</h3>
                                <p className="text-sm text-muted-foreground">You made {stats.totalOrders} sales this month.</p>
                            </div>
                            <Link href="/admin/orders" className="text-sm text-primary hover:underline flex items-center">
                                View All <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <div className="space-y-8">
                            {recentOrders.slice(0, 5).map((order) => (
                                <Link key={order.id} href={`/admin/orders?search=${order.id}`} className="flex items-center justify-between group hover:bg-muted/50 p-2 -mx-2 rounded-lg transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{order.customerName}</p>
                                            <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <StatusBadge status={order.status} />
                                        <div className="font-medium w-24 text-right">{formatCurrency(order.total)}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
