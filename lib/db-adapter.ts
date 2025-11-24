// Database Adapter Interface
// This defines the contract that both SQLite and PostgreSQL adapters must implement

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
}

export interface CreateOrderData {
    id: string;
    customerName: string;
    items: string; // JSON string
    total: number;
    paymentMethod: string;
    userId: string;
    phone: string;
    shippingAddress: string;
    city: string;
    postalCode: string;
    status: string;
    date: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserData {
    id: string;
    email: string;
    name: string;
    password: string;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateMessageData {
    id: string;
    senderName: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface DBAdapter {
    // User operations
    findUserById(id: string): Promise<any>;
    findUserByEmail(email: string): Promise<any>;
    findFirstUser(): Promise<any>;
    createUser(data: CreateUserData): Promise<any>;
    updateUserPassword(userId: string, password: string, updatedAt: string): Promise<any>;

    // Order operations
    createOrder(data: CreateOrderData): Promise<any>;
    getOrders(search?: string, status?: string, startDate?: string, endDate?: string, paymentMethod?: string): Promise<any[]>;
    getUserOrders(userId: string): Promise<any[]>;
    updateOrderStatus(orderId: string, status: string, updatedAt: string): Promise<any>;
    deleteOrder(orderId: string): Promise<any>;
    getOrderById(orderId: string): Promise<any>;

    // Message operations
    createMessage(data: CreateMessageData): Promise<any>;
    getMessages(): Promise<any[]>;

    // Dashboard & Analytics
    getDashboardStats(): Promise<any>;
    getAnalyticsData(): Promise<any>;

    // Password Reset
    createPasswordResetToken(data: { id: string, userId: string, token: string, used: number | boolean, expiresAt: string, createdAt: string }): Promise<any>;
    findPasswordResetToken(token: string): Promise<any>;
    markPasswordResetTokenUsed(token: string): Promise<any>;
    deleteUnusedTokens(userId: string): Promise<any>;
}
