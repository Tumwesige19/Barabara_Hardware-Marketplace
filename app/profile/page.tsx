'use client';

import { getUserOrders } from '@/app/actions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Loader2, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            if (session?.user?.id) {
                const userOrders = await getUserOrders(session.user.id);
                setOrders(userOrders);
                setIsLoading(false);
            } else if (status === 'unauthenticated') {
                setIsLoading(false);
            }
        }
        fetchOrders();
    }, [session, status]);

    if (status === 'loading' || isLoading) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Loading your profile...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
                <p className="mb-8">You need to be logged in to view your orders.</p>
                <Link href="/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium">
                    Sign In
                </Link>
            </div>
        );
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending': return <Clock className="w-5 h-5 text-yellow-600" />;
            case 'Processing': return <Truck className="w-5 h-5 text-blue-600" />;
            case 'Shipped': return <Truck className="w-5 h-5 text-purple-600" />;
            case 'Delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'Cancelled': return <XCircle className="w-5 h-5 text-red-600" />;
            default: return <Package className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'Processing': return 'bg-blue-50 border-blue-200 text-blue-800';
            case 'Shipped': return 'bg-purple-50 border-purple-200 text-purple-800';
            case 'Delivered': return 'bg-green-50 border-green-200 text-green-800';
            case 'Cancelled': return 'bg-red-50 border-red-200 text-red-800';
            default: return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Your Account</h1>
                <p className="text-muted-foreground mb-8">Welcome back, {session.user?.name}</p>

                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Package className="h-6 w-6" />
                    Order History
                </h2>

                {orders.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-muted/10">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                        <Link href="/products" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="border rounded-lg overflow-hidden bg-card shadow-sm">
                                <div className="bg-muted/30 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-bold">Order Placed</p>
                                            <p className="text-sm font-medium">{new Date(order.date).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-bold">Total</p>
                                            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase font-bold">Ship To</p>
                                            <p className="text-sm font-medium">{order.shipping_address || 'Address not provided'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-muted-foreground uppercase font-bold">Order # {order.id}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            <span>{order.status}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {order.items.map((item: any, index: number) => (
                                            <div key={index} className="flex items-center gap-2 text-sm">
                                                <div className="h-2 w-2 rounded-full bg-primary" />
                                                <span>
                                                    {typeof item === 'string' ? item : `${item.name} (x${item.quantity})`}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
