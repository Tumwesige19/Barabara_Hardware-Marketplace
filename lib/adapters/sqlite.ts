import Database from 'better-sqlite3';
import path from 'path';
import { DBAdapter, CreateOrderData, CreateUserData, CreateMessageData } from '../db-adapter';

export class SQLiteAdapter implements DBAdapter {
    private db: any;

    constructor() {
        const dbPath = path.join(process.cwd(), 'prisma/dev.db');
        this.db = new Database(dbPath);
        this.db.pragma('foreign_keys = ON');
    }

    // User operations
    async findUserById(id: string) {
        return this.db.prepare('SELECT * FROM User WHERE id = ?').get(id);
    }

    async findUserByEmail(email: string) {
        return this.db.prepare('SELECT * FROM User WHERE email = ?').get(email);
    }

    async findFirstUser() {
        return this.db.prepare('SELECT * FROM User LIMIT 1').get();
    }

    async createUser(data: CreateUserData) {
        return this.db.prepare(`
            INSERT INTO User (id, email, name, password, phone, role, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(data.id, data.email, data.name, data.password, data.phone, data.role || 'user', data.createdAt, data.updatedAt);
    }

    async updateUserPassword(userId: string, password: string, updatedAt: string) {
        return this.db.prepare('UPDATE User SET password = ?, updatedAt = ? WHERE id = ?')
            .run(password, updatedAt, userId);
    }

    // Order operations
    async createOrder(data: CreateOrderData) {
        return this.db.prepare(`
            INSERT INTO "Order" (id, customerName, items, total, status, date, paymentMethod, userId, phone, shippingAddress, city, postalCode, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            data.id, data.customerName, data.items, data.total, data.status, data.date,
            data.paymentMethod, data.userId, data.phone, data.shippingAddress,
            data.city, data.postalCode, data.createdAt, data.updatedAt
        );
    }

    async getOrders(search?: string, status?: string, startDate?: string, endDate?: string, paymentMethod?: string) {
        let query = 'SELECT * FROM "Order"';
        const conditions: string[] = [];
        const params: any[] = [];

        if (search) {
            conditions.push('(id LIKE ? OR customerName LIKE ? OR phone LIKE ?)');
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (status && status !== 'All') {
            conditions.push('status = ?');
            params.push(status);
        }

        if (startDate) {
            conditions.push('date >= ?');
            params.push(new Date(startDate).toISOString());
        }

        if (endDate) {
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            conditions.push('date < ?');
            params.push(end.toISOString());
        }

        if (paymentMethod && paymentMethod !== 'All') {
            conditions.push('paymentMethod LIKE ?');
            params.push(`%${paymentMethod}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY date DESC';

        return this.db.prepare(query).all(...params);
    }

    async getUserOrders(userId: string) {
        return this.db.prepare('SELECT * FROM "Order" WHERE userId = ? ORDER BY date DESC').all(userId);
    }

    async getOrderById(orderId: string) {
        return this.db.prepare('SELECT * FROM "Order" WHERE id = ?').get(orderId);
    }

    async updateOrderStatus(orderId: string, status: string, updatedAt: string) {
        return this.db.prepare('UPDATE "Order" SET status = ?, updatedAt = ? WHERE id = ?')
            .run(status, updatedAt, orderId);
    }

    async deleteOrder(orderId: string) {
        return this.db.prepare('DELETE FROM "Order" WHERE id = ?').run(orderId);
    }

    // Message operations
    async createMessage(data: CreateMessageData) {
        return this.db.prepare(`
            INSERT INTO Message (id, senderName, email, subject, message, date, status, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(data.id, data.senderName, data.email, data.subject, data.message, data.date, data.status, data.createdAt, data.updatedAt);
    }

    async getMessages() {
        return this.db.prepare('SELECT * FROM Message ORDER BY date DESC').all();
    }

    // Dashboard & Analytics
    async getDashboardStats() {
        const totalRevenue = this.db.prepare('SELECT SUM(total) as sum FROM "Order"').get();
        const pendingOrders = this.db.prepare('SELECT COUNT(*) as count FROM "Order" WHERE status = ?').get('Pending');
        const totalOrders = this.db.prepare('SELECT COUNT(*) as count FROM "Order"').get();
        const unreadMessages = this.db.prepare('SELECT COUNT(*) as count FROM Message WHERE status = ?').get('Unread');
        const totalMessages = this.db.prepare('SELECT COUNT(*) as count FROM Message').get();

        return {
            totalRevenue: totalRevenue?.sum || 0,
            pendingOrders: pendingOrders?.count || 0,
            totalOrders: totalOrders?.count || 0,
            unreadMessages: unreadMessages?.count || 0,
            totalMessages: totalMessages?.count || 0,
        };
    }

    async getAnalyticsData() {
        const statusCounts = this.db.prepare(`
            SELECT status, COUNT(*) as count 
            FROM "Order" 
            GROUP BY status
        `).all();
        return { statusCounts };
    }

    // Password Reset
    async createPasswordResetToken(data: { id: string, userId: string, token: string, used: number | boolean, expiresAt: string, createdAt: string }) {
        return this.db.prepare(`
            INSERT INTO PasswordResetToken (id, userId, token, used, expiresAt, createdAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(data.id, data.userId, data.token, data.used ? 1 : 0, data.expiresAt, data.createdAt);
    }

    async findPasswordResetToken(token: string) {
        return this.db.prepare(`
            SELECT * FROM PasswordResetToken 
            WHERE token = ?
        `).get(token);
    }

    async markPasswordResetTokenUsed(token: string) {
        return this.db.prepare('UPDATE PasswordResetToken SET used = 1 WHERE token = ?').run(token);
    }

    async deleteUnusedTokens(userId: string) {
        return this.db.prepare('DELETE FROM PasswordResetToken WHERE userId = ? AND used = 0').run(userId);
    }
}
