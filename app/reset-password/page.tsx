'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { resetPassword } from '@/app/actions/password-reset';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        token: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        const result = await resetPassword(formData.token, formData.password);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } else {
            setError(result.error || 'Failed to reset password');
        }

        setIsLoading(false);
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
                <div className="max-w-md w-full bg-card p-8 rounded-xl shadow-lg border text-center">
                    <div className="text-green-600 text-5xl mb-4">✓</div>
                    <h2 className="text-2xl font-bold mb-2">Password Reset Successful!</h2>
                    <p className="text-muted-foreground mb-4">
                        Redirecting to login page...
                    </p>
                    <Link href="/login" className="text-primary hover:underline">
                        Go to Login Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
            <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Reset Password</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your 5-digit code and new password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="token" className="block text-sm font-medium mb-2">
                                5-Digit Reset Code
                            </label>
                            <input
                                id="token"
                                type="text"
                                required
                                maxLength={5}
                                value={formData.token}
                                onChange={(e) => setFormData({ ...formData, token: e.target.value.replace(/\D/g, '') })}
                                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl font-bold tracking-widest"
                                placeholder="12345"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Enter the code sent to your email</p>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>

                    <div className="text-center space-y-2">
                        <Link href="/forgot-password" className="block text-sm text-primary hover:underline">
                            Request New Token
                        </Link>
                        <Link href="/login" className="block text-sm text-muted-foreground hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
