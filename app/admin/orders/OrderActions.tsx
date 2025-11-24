'use client';

import { useState } from 'react';
import { updateOrderStatus, deleteOrder } from '@/app/actions';
import { Loader2, Trash2, Check, ChevronDown } from 'lucide-react';

interface OrderActionsProps {
    orderId: string;
    currentStatus: string;
}

export function OrderActions({ orderId, currentStatus }: OrderActionsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(currentStatus);
    const [isOpen, setIsOpen] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === status) return;

        setIsLoading(true);
        setIsOpen(false);

        const result = await updateOrderStatus(orderId, newStatus);

        if (result.success) {
            setStatus(newStatus);
        } else {
            alert('Failed to update status');
        }

        setIsLoading(false);
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;

        setIsLoading(true);
        const result = await deleteOrder(orderId);

        if (!result.success) {
            alert('Failed to delete order');
            setIsLoading(false);
        }
    };

    const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    const getStatusColor = (s: string) => {
        switch (s) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={isLoading}
                    className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border transition-colors ${getStatusColor(status)}`}
                >
                    {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : status}
                    <ChevronDown className="h-3 w-3 opacity-50" />
                </button>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute right-0 mt-1 w-36 z-20 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in zoom-in-95 bg-white">
                            <div className="p-1">
                                {statusOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleStatusChange(option)}
                                        className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground hover:bg-gray-100 ${status === option ? 'bg-accent/50 bg-gray-50' : ''
                                            }`}
                                    >
                                        {status === option && (
                                            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                                                <Check className="h-4 w-4" />
                                            </span>
                                        )}
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <button
                onClick={handleDelete}
                disabled={isLoading}
                className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                title="Delete Order"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}
