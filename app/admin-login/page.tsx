'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Eye, EyeOff, Lock, Mail, AlertTriangle } from 'lucide-react';

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Show any error passed via URL (e.g. from middleware access denied)
    useEffect(() => {
        const urlError = searchParams.get('error');
        if (urlError) setError(urlError);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Safety timeout — never spin forever
        const timeout = setTimeout(() => {
            setLoading(false);
            setError('Request timed out. Please check your connection and try again.');
        }, 20000);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            clearTimeout(timeout);

            if (!result || result.error) {
                setError('Invalid email or password. Access denied.');
                setLoading(false);
                return;
            }

            // Sign-in succeeded — hard redirect so the server middleware
            // verifies the admin role fresh from the new session cookie
            window.location.href = '/admin';

        } catch {
            clearTimeout(timeout);
            setError('An unexpected error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-slate-700/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

            <div className="relative w-full max-w-md">

                {/* Card */}
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4">
                            <Shield className="h-8 w-8 text-orange-500" />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight">
                            Admin Portal
                        </h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">
                            Barabara Hardware — Restricted Access
                        </p>
                    </div>

                    {/* Security notice */}
                    <div className="flex items-start gap-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl p-3.5 mb-6">
                        <Lock className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed">
                            This area is restricted to <span className="text-white font-semibold">authorised administrators only</span>. All sign-in attempts are logged.
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 mb-5">
                            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-red-300 font-medium leading-relaxed">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Admin Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                                <input
                                    id="admin-email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@example.com"
                                    className="w-full bg-slate-800/60 border border-slate-700/60 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 pl-10 text-sm outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                                <input
                                    id="admin-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••••"
                                    className="w-full bg-slate-800/60 border border-slate-700/60 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-3 pl-10 pr-12 text-sm outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                                >
                                    {showPassword
                                        ? <EyeOff className="h-4 w-4" />
                                        : <Eye className="h-4 w-4" />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            id="admin-sign-in-btn"
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 bg-orange-500 hover:bg-orange-400 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Verifying credentials...
                                </>
                            ) : (
                                <>
                                    <Shield className="h-4 w-4" />
                                    Sign In to Admin Portal
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-5 border-t border-slate-800 text-center">
                        <a
                            href="/"
                            className="text-xs text-slate-600 hover:text-slate-400 transition-colors font-medium"
                        >
                            ← Return to Barabara Store
                        </a>
                    </div>
                </div>

                {/* Bottom branding */}
                <p className="text-center text-xs text-slate-700 mt-4 font-medium">
                    Barabara Hardware Marketplace · Admin v1.0
                </p>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
            <AdminLoginForm />
        </Suspense>
    );
}
