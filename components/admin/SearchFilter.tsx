'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/lib/hooks';
import { useEffect, useState } from 'react';

export function SearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [status, setStatus] = useState(searchParams.get('status') || 'All');
    const [paymentMethod, setPaymentMethod] = useState(searchParams.get('paymentMethod') || 'All');
    const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
    const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (status && status !== 'All') params.set('status', status);
        if (paymentMethod && paymentMethod !== 'All') params.set('paymentMethod', paymentMethod);
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);

        router.push(`/admin/orders?${params.toString()}`);
    }, [debouncedSearch, status, paymentMethod, startDate, endDate, router]);

    return (
        <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by Order ID, Customer, or Phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <option value="All">All Payments</option>
                    <option value="Mobile Money">Mobile Money</option>
                    <option value="Card">Card</option>
                    <option value="Cash">Cash</option>
                </select>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Filter by Date:</span>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                />
                <span>to</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                />
                {(startDate || endDate) && (
                    <button
                        onClick={() => { setStartDate(''); setEndDate(''); }}
                        className="ml-2 text-xs text-red-500 hover:underline"
                    >
                        Clear Dates
                    </button>
                )}
            </div>
        </div>
    );
}
