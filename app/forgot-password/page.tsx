'use client';

import { useState } from 'react';
import Link from 'next/link';
import { requestPasswordReset } from '@/app/actions/password-reset';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; token?: string; message?: string; error?: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        const response = await requestPasswordReset(email);
        setResult(response);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
            <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Forgot Password?</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your email to receive a 5-digit reset code
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {result?.success && result.token && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                            <p className="font-bold mb-2">🔐 Your Reset Code</p>
                            <p className="text-sm mb-2">Email service not configured. Use this code to reset your password:</p>
                            <div className="bg-white p-4 rounded border border-green-300 text-center">
                                <span className="text-4xl font-bold tracking-widest text-green-700">{result.token}</span>
                            </div>
                            <p className="text-xs mt-2">This code expires in 1 hour</p>
                            <Link
                                href="/reset-password"
                                className="inline-block mt-3 text-sm text-green-700 hover:underline font-medium"
                            >
                                Go to Reset Password →
                            </Link>
                        </div>
                    )}

                    {result?.success && !result.token && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                            <p className="font-bold mb-2">✓ Email Sent!</p>
                            <p className="text-sm">{result.message}</p>
                            <p className="text-sm mt-2">Check your inbox for the 5-digit code.</p>
                            <Link
                                href="/reset-password"
                                className="inline-block mt-3 text-sm text-green-700 hover:underline font-medium"
                            >
                                Go to Reset Password →
                            </Link>
                        </div>
                    )}

                    {result?.error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {result.error}
                        </div>
                    )}

                    {!result?.token && !result?.success && (
                        <>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {isLoading ? 'Processing...' : 'Request Reset Code'}
                            </button>
                        </>
                    )}

                    <div className="text-center space-y-2">
                        <Link href="/login" className="block text-sm text-primary hover:underline">
                            Back to Login
                        </Link>
                        <Link href="/signup" className="block text-sm text-muted-foreground hover:underline">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
