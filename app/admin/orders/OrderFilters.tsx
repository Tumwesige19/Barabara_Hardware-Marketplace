'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

export function OrderFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [status, setStatus] = useState(searchParams.get('status') || 'All');
    const [paymentMethod, setPaymentMethod] = useState(searchParams.get('paymentMethod') || 'All');

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (search) params.set('search', search);
        else params.delete('search');
        if (status !== 'All') params.set('status', status);
        else params.delete('status');
        if (paymentMethod !== 'All') params.set('paymentMethod', paymentMethod);
        else params.delete('paymentMethod');

        router.replace(`/admin/orders?${params.toString()}`);
    }, [search, status, paymentMethod, router, searchParams]);

    const clearFilters = () => {
        setSearch('');
        setStatus('All');
        setPaymentMethod('All');
    };

    const hasActiveFilters = search || status !== 'All' || paymentMethod !== 'All';

    return (
        <div className="mb-6 flex flex-wrap items-center gap-4 p-4 bg-muted/50 rounded-lg border">
            <div className="relative flex-grow max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search by ID, name, phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
            </select>

            <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <option value="All">All Payment Methods</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
            </select>

            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors"
                >
                    <X className="h-4 w-4" />
                    Clear Filters
                </button>
            )}
        </div>
    );
}
