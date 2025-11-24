import prisma from '../db-vercel';
import { DBAdapter, CreateOrderData, CreateUserData, CreateMessageData } from '../db-adapter';

export class PostgresAdapter implements DBAdapter {
    // User operations
    async findUserById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    async findUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }

    async findFirstUser() {
        return prisma.user.findFirst();
    }

    async createUser(data: CreateUserData) {
        return prisma.user.create({
            data: {
                id: data.id,
                email: data.email,
                name: data.name,
                password: data.password,
                phone: data.phone,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            }
        });
    }

    async updateUserPassword(userId: string, password: string, updatedAt: string) {
        return prisma.user.update({
            where: { id: userId },
            data: { password, updatedAt }
        });
    }

    // Order operations
    async createOrder(data: CreateOrderData) {
        return prisma.order.create({
            data: {
                id: data.id,
                customerName: data.customerName,
                items: data.items,
                total: data.total,
                status: data.status,
                date: data.date,
                paymentMethod: data.paymentMethod,
                userId: data.userId,
                phone: data.phone,
                shippingAddress: data.shippingAddress,
                city: data.city,
                postalCode: data.postalCode,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            }
        });
    }

    async getOrders(search?: string, status?: string, startDate?: string, endDate?: string, paymentMethod?: string) {
        const where: any = {};

        if (search) {
            where.OR = [
                { id: { contains: search, mode: 'insensitive' } },
                { customerName: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (status && status !== 'All') {
            where.status = status;
        }

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setDate(end.getDate() + 1);
                where.date.lt = end;
            }
        }

        if (paymentMethod && paymentMethod !== 'All') {
            where.paymentMethod = { contains: paymentMethod, mode: 'insensitive' };
        }

        return prisma.order.findMany({
            where,
            orderBy: { date: 'desc' }
        });
    }

    async getUserOrders(userId: string) {
        return prisma.order.findMany({
            where: { userId },
            orderBy: { date: 'desc' }
        });
    }

    async getOrderById(orderId: string) {
        return prisma.order.findUnique({ where: { id: orderId } });
    }

    async updateOrderStatus(orderId: string, status: string, updatedAt: string) {
        return prisma.order.update({
            where: { id: orderId },
            data: { status, updatedAt }
        });
    }

    async deleteOrder(orderId: string) {
        return prisma.order.delete({ where: { id: orderId } });
    }

    // Message operations
    async createMessage(data: CreateMessageData) {
        return prisma.message.create({
            data: {
                id: data.id,
                senderName: data.senderName,
                email: data.email,
                subject: data.subject,
                message: data.message,
                date: data.date,
                status: data.status,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            }
        });
    }

    async getMessages() {
        return prisma.message.findMany({
            orderBy: { date: 'desc' }
        });
    }

    // Dashboard & Analytics
    async getDashboardStats() {
        const totalRevenue = await prisma.order.aggregate({ _sum: { total: true } });
        const pendingOrders = await prisma.order.count({ where: { status: 'Pending' } });
        const totalOrders = await prisma.order.count();
        const unreadMessages = await prisma.message.count({ where: { status: 'Unread' } });
        const totalMessages = await prisma.message.count();

        return {
            totalRevenue: totalRevenue._sum.total || 0,
            pendingOrders,
            totalOrders,
            unreadMessages,
            totalMessages
        };
    }

    async getAnalyticsData() {
        const statusCounts = await prisma.order.groupBy({
            by: ['status'],
            _count: { status: true }
        });

        // Normalize to match SQLite format { status: string, count: number }
        const normalizedCounts = statusCounts.map(item => ({
            status: item.status,
            count: item._count.status
        }));

        return { statusCounts: normalizedCounts };
    }

    // Password Reset
    async createPasswordResetToken(data: { id: string, userId: string, token: string, used: number | boolean, expiresAt: string, createdAt: string }) {
        return prisma.passwordResetToken.create({
            data: {
                id: data.id,
                userId: data.userId,
                token: data.token,
                used: Boolean(data.used),
                expiresAt: data.expiresAt,
                createdAt: data.createdAt
            }
        });
    }

    async findPasswordResetToken(token: string) {
        return prisma.passwordResetToken.findUnique({ where: { token } });
    }

    async markPasswordResetTokenUsed(token: string) {
        return prisma.passwordResetToken.update({
            where: { token },
            data: { used: true }
        });
    }

    async deleteUnusedTokens(userId: string) {
        return prisma.passwordResetToken.deleteMany({
            where: { userId, used: false }
        });
    }
}
