'use client';

import Link from 'next/link';
import { ShoppingCart, Star, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { products } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export function HeroCarousel() {
    const { addToCart } = useCart();
    
    // Fetch three distinct products to showcase the range of what we have
    const showcaseProducts = [
        products.find(p => p.id === 'dl-002'), // Smart Lock
        products.find(p => p.id === 'dl-013'), // Mortise Lock
        products.find(p => p.id === 'dl-022'), // Handle Lock
    ].filter(Boolean) as typeof products;

    const handleAddToCart = (product: typeof products[0]) => {
        addToCart(product);
        toast.success(`Added ${product.name} to cart`);
    };

    return (
        <div className="relative py-12 md:py-16 bg-slate-50 border-b border-slate-100 overflow-hidden">
            {/* Design accents: ambient glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none"></div>
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                
                {/* Visual Showroom Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Bespoke Hardware Showroom</span>
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                        Architectural Hardware. <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Precision Showcased.</span>
                    </h1>
                    
                    <p className="text-xs md:text-sm text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
                        Meticulously crafted locks, hand-finished copper handles, and biometric security. See what we have got below.
                    </p>
                </div>

                {/* Multi-Product Showroom Deck */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in">
                    {showcaseProducts.map((product) => (
                        <div key={product.id} className="bento-card bg-white border border-slate-200/60 p-4 shadow-xl overflow-hidden group flex flex-col justify-between">
                            {/* Product preview */}
                            <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative mb-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                
                                <span className="absolute top-2 right-2 px-2.5 py-0.5 bg-slate-950/85 backdrop-blur text-white text-[8px] font-bold rounded-full border border-white/5 uppercase tracking-widest flex items-center gap-0.5">
                                    <Award className="h-2.5 w-2.5 text-orange-500" />
                                    {product.category.replace('-', ' ')}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="mb-3">
                                    <div className="flex items-start justify-between gap-1 mb-1">
                                        <h3 className="text-xs font-black text-slate-800 group-hover:text-orange-500 transition-colors tracking-tight line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold shrink-0">
                                            <Star className="h-2.5 w-2.5 fill-current" />
                                            <span>{product.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-medium line-clamp-2 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2 mt-auto">
                                    <span className="text-sm font-black text-orange-500">
                                        {formatCurrency(product.price)}
                                    </span>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="px-3 py-2 bg-slate-900 hover:bg-orange-500 text-white font-bold text-[10px] rounded-lg transition-all shadow hover:shadow-orange-500/10 hover:scale-105 active:scale-95 shrink-0 flex items-center gap-1 cursor-pointer"
                                    >
                                        <ShoppingCart className="h-3 w-3" />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
