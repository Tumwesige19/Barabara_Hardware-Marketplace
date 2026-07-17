'use client';

import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t border-slate-900 bg-slate-950 text-slate-400">
            <div className="container mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-black text-white tracking-tight">
                            Barabara<span className="text-orange-500">.</span>
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                            Your one-stop shop for premium hardware, locks, and industrial tools. Building security and craftsmanship, one detail at a time.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Shop Categories</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><Link href="/products?category=door-locks" className="hover:text-orange-500 transition-colors">Door Locks</Link></li>
                            <li><Link href="/products?category=power-tools" className="hover:text-orange-500 transition-colors">Power Tools</Link></li>
                            <li><Link href="/products?category=hand-tools" className="hover:text-orange-500 transition-colors">Hand Tools</Link></li>
                            <li><Link href="/products?category=plumbing" className="hover:text-orange-500 transition-colors">Plumbing Supplies</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Company</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
                            <li><Link href="/terms" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Customer Support</h4>
                        <ul className="space-y-2.5 text-xs text-slate-500">
                            <li>123 Hardware Boulevard</li>
                            <li>Industrial Area, Kampala</li>
                            <li>support@barabara.com</li>
                            <li>+256 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
                    © {new Date().getFullYear()} Barabara Hardware. Crafted for reliability.
                </div>
            </div>
        </footer>
    );
}

