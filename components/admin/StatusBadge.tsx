import { Clock, Truck, CheckCircle, XCircle, Package } from 'lucide-react';

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
    const getStatusConfig = (s: string) => {
        switch (s) {
            case 'Pending':
                return {
                    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                    icon: <Clock className="w-3.5 h-3.5 mr-1.5" />
                };
            case 'Processing':
                return {
                    color: 'bg-blue-100 text-blue-800 border-blue-200',
                    icon: <Truck className="w-3.5 h-3.5 mr-1.5" />
                };
            case 'Shipped':
                return {
                    color: 'bg-purple-100 text-purple-800 border-purple-200',
                    icon: <Truck className="w-3.5 h-3.5 mr-1.5" />
                };
            case 'Delivered':
                return {
                    color: 'bg-green-100 text-green-800 border-green-200',
                    icon: <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                };
            case 'Cancelled':
                return {
                    color: 'bg-red-100 text-red-800 border-red-200',
                    icon: <XCircle className="w-3.5 h-3.5 mr-1.5" />
                };
            default:
                return {
                    color: 'bg-gray-100 text-gray-800 border-gray-200',
                    icon: <Package className="w-3.5 h-3.5 mr-1.5" />
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color} ${className}`}>
            {config.icon}
            {status}
        </span>
    );
}
