export interface Order {
    id: string;
    customerName: string;
    items: string[];
    total: number;
    status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
    date: string;
    paymentMethod: 'Mobile Money' | 'Card';
}

export interface Message {
    id: string;
    senderName: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: 'Unread' | 'Read';
}

export const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        items: ['Titan Biometric Smart Lock', 'Heavy Duty Hammer'],
        total: 1850000,
        status: 'Pending',
        date: '2025-11-23',
        paymentMethod: 'Mobile Money',
    },
    {
        id: 'ORD-002',
        customerName: 'Jane Smith',
        items: ['Industrial Power Drill'],
        total: 450000,
        status: 'Processing',
        date: '2025-11-22',
        paymentMethod: 'Card',
    },
    {
        id: 'ORD-003',
        customerName: 'Michael Brown',
        items: ['Safety Helmet', 'Work Gloves'],
        total: 85000,
        status: 'Delivered',
        date: '2025-11-20',
        paymentMethod: 'Mobile Money',
    },
    {
        id: 'ORD-004',
        customerName: 'Sarah Wilson',
        items: ['Laser Distance Measurer'],
        total: 220000,
        status: 'Cancelled',
        date: '2025-11-19',
        paymentMethod: 'Card',
    },
    {
        id: 'ORD-005',
        customerName: 'David Lee',
        items: ['Angle Grinder', 'Cutting Discs Set'],
        total: 350000,
        status: 'Pending',
        date: '2025-11-23',
        paymentMethod: 'Mobile Money',
    },
];

export const mockMessages: Message[] = [
    {
        id: 'MSG-001',
        senderName: 'Alice Johnson',
        email: 'alice@example.com',
        subject: 'Product Inquiry',
        message: 'Do you have the Titan Smart Lock in black?',
        date: '2025-11-23',
        status: 'Unread',
    },
    {
        id: 'MSG-002',
        senderName: 'Robert Davis',
        email: 'robert@example.com',
        subject: 'Order Delay',
        message: 'My order #ORD-003 is late. Please update me.',
        date: '2025-11-22',
        status: 'Read',
    },
    {
        id: 'MSG-003',
        senderName: 'Emily White',
        email: 'emily@example.com',
        subject: 'Bulk Purchase',
        message: 'I would like to order 50 helmets. Is there a discount?',
        date: '2025-11-21',
        status: 'Unread',
    },
];
