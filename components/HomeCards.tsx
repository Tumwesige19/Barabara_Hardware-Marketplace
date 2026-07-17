'use client';

import Link from 'next/link';
import { ArrowRight, Key, Shield, Hammer, Lock } from 'lucide-react';

export function HomeCards() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto max-w-7xl px-6">
                
                {/* Header */}
                <div className="flex flex-col mb-10">
                    <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Curated Collections</span>
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                        Engineered for High-End Living
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 animate-fade-in">
                    
                    {/* Card 1: Flagship Smart Security (Large: span 3 cols, span 2 rows) */}
                    <div className="md:col-span-3 md:row-span-2 bento-card-dark p-8 flex flex-col justify-between h-[500px] relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                        <div 
                            className="absolute inset-0 bg-cover bg-center transform scale-100 group-hover:scale-105 transition-transform duration-700"
                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800')` }}
                        />
                        
                        <div className="relative z-20">
                            <span className="inline-flex items-center justify-center p-2.5 rounded-full bg-white/10 text-orange-500 backdrop-blur-md mb-4 border border-white/10">
                                <Key className="h-5 w-5" />
                            </span>
                            <h3 className="text-2xl font-black text-white leading-tight mb-2 tracking-tight">
                                Smart Security Systems
                            </h3>
                            <p className="text-xs text-slate-300 font-medium max-w-xs leading-relaxed">
                                Keyless entries, biometric scanner deadbolts, and Wi-Fi tracking hubs.
                            </p>
                        </div>

                        <div className="relative z-20 mt-auto pt-6">
                            <Link 
                                href="/products?category=door-locks" 
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 group/link transition-colors cursor-pointer"
                            >
                                <span>Browse Smart Access</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: Precision Mortise Locks (Medium: span 3 cols) */}
                    <div className="md:col-span-3 bento-card p-8 flex flex-col justify-between h-[238px] relative group overflow-hidden bg-slate-50 border border-slate-200/60">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                        
                        <div className="relative z-10">
                            <span className="inline-flex items-center justify-center p-2.5 rounded-full bg-slate-900/5 text-slate-900 mb-3">
                                <Shield className="h-4 w-4 text-orange-500" />
                            </span>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1.5">
                                Heavy Duty Mortise Locksets
                            </h3>
                            <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
                                Hardened steel mechanisms and cylinder cores built for structural perimeter gates.
                            </p>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <Link 
                                href="/products?category=door-locks" 
                                className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 group/link transition-colors cursor-pointer"
                            >
                                <span>Explore Mortise Locks</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 3: Hand Finished Handles (Medium: span 3 cols) */}
                    <div className="md:col-span-3 bento-card p-8 flex flex-col justify-between h-[238px] relative group overflow-hidden bg-slate-50 border border-slate-200/60">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                        
                        <div className="relative z-10">
                            <span className="inline-flex items-center justify-center p-2.5 rounded-full bg-slate-900/5 text-slate-900 mb-3">
                                <Hammer className="h-4 w-4 text-orange-500" />
                            </span>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1.5">
                                Modern Architectural Levers
                            </h3>
                            <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
                                Hand-finished solid copper and brass rose handles for minimal interior styling.
                            </p>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <Link 
                                href="/products?category=door-locks" 
                                className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 group/link transition-colors cursor-pointer"
                            >
                                <span>Browse Lever Knobs</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 4: Industrial Padlocks (Wide: span 6 cols on bottom) */}
                    <div className="md:col-span-6 bento-card p-8 flex flex-col md:flex-row md:items-center justify-between min-h-[200px] relative group overflow-hidden bg-slate-50 border border-slate-200/60 gap-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />
                        
                        <div className="relative z-10 max-w-md">
                            <span className="inline-flex items-center justify-center p-2.5 rounded-full bg-slate-900/5 text-slate-900 mb-3">
                                <Lock className="h-4 w-4 text-orange-500" />
                            </span>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1.5">
                                Industrial Security Padlocks
                            </h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Weatherproof, cut-resistant laminated steel locks and combination padlocks designed for shipping containers, commercial facilities, and warehouses.
                            </p>
                        </div>

                        <div className="relative z-10 shrink-0 self-start md:self-center">
                            <Link 
                                href="/products?category=door-locks" 
                                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 hover:bg-orange-500 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-all shadow hover:shadow-orange-500/10 cursor-pointer"
                            >
                                <span>Shop Security Padlocks</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}


