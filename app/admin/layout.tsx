import Link from 'next/link';
import { LayoutDashboard, ShoppingCart, MessageSquare, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-muted/20">
            {/* Sidebar */}
            <aside className="w-64 bg-background border-r border-border hidden md:flex flex-col">
                <div className="p-6 border-b border-border">
                    <h1 className="text-xl font-bold text-primary">Barabara Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                    >
                        <MessageSquare className="h-5 w-5" />
                        Messages
                    </Link>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-muted transition-colors"
                    >
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>
                <div className="p-4 border-t border-border">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Exit Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
