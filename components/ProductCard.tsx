'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        addToCart(product);
        toast.success("Added to cart");

        // Keep the "Adding..." state for 500ms to give visual feedback (flicker)
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsAdding(false);
    };

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100/80 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full hover:border-orange-500/20">
            {/* Category Tag Overlay */}
            <div className="absolute top-3 left-3 z-10">
                <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg shadow-sm border ${
                    product.category === 'door-locks' 
                        ? 'bg-orange-50/90 text-orange-500 border-orange-100/50' 
                        : 'bg-indigo-50/90 text-indigo-600 border-indigo-100/50'
                }`}>
                    {product.category === 'door-locks' ? 'Door Lock' : 'Pipe Lock'}
                </span>
            </div>

            <Link href={`/products/${product.id}`} className="block aspect-square overflow-hidden bg-slate-50 border-b border-slate-50 relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Back-glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    <Link href={`/products/${product.id}`}>
                        <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-orange-500 transition-colors line-clamp-1 tracking-tight">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="mt-1.5 text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>
                
                <div className="mt-4 pt-3.5 border-t border-slate-100/60 flex items-center justify-between gap-2">
                    <span className="text-base font-black text-slate-900 group-hover:text-orange-500 transition-colors">
                        {formatCurrency(product.price)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`inline-flex items-center justify-center rounded-xl bg-slate-900 hover:bg-orange-500 text-white font-bold px-4 py-2.5 text-[11px] transition-all hover:shadow-lg hover:shadow-orange-500/20 active:scale-95 cursor-pointer shrink-0 gap-1.5 ${isAdding ? 'bg-orange-500 opacity-60 scale-95' : ''
                            }`}
                    >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        {isAdding ? 'Adding...' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
}

