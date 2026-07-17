import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, MessageSquare, BarChart2, Shield, LogOut } from 'lucide-react';
import { auth, signOut } from '@/lib/auth-config';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Server-side double-check (defence in depth — middleware is the first gate)
    const session = await auth();

    if (!session?.user) {
        redirect('/login?callbackUrl=/admin');
    }

    if (session.user.role !== 'admin') {
        redirect('/?error=Access+denied.+Admin+privileges+required.');
    }

    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-orange-500" />
                        <h1 className="text-lg font-black tracking-tight text-white">
                            Barabara <span className="text-orange-500">Admin</span>
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                        Signed in as <span className="text-slate-300">{session.user.email}</span>
                    </p>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
                    >
                        <LayoutDashboard className="h-4 w-4 shrink-0" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
                    >
                        <ShoppingCart className="h-4 w-4 shrink-0" />
                        Orders
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
                    >
                        <MessageSquare className="h-4 w-4 shrink-0" />
                        Messages
                    </Link>
                    <Link
                        href="/admin/analytics"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
                    >
                        <BarChart2 className="h-4 w-4 shrink-0" />
                        Analytics
                    </Link>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-slate-800 space-y-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    >
                        ← Back to Store
                    </Link>
                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/login' });
                        }}
                    >
                        <button
                            type="submit"
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-red-400 hover:text-white hover:bg-red-500/20 transition-all cursor-pointer"
                        >
                            <LogOut className="h-4 w-4 shrink-0" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-slate-950">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
