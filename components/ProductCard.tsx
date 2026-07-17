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
        <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <Link href={`/products/${product.id}`} className="block aspect-square overflow-hidden bg-slate-50 border-b border-slate-50 relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>
            <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <Link href={`/products/${product.id}`}>
                        <h3 className="text-sm font-extrabold text-slate-800 group-hover:text-orange-500 transition-colors line-clamp-1 tracking-tight">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="mt-1 text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-slate-100/60 flex items-center justify-between gap-2">
                    <span className="text-base font-black text-orange-500">
                        {formatCurrency(product.price)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`inline-flex items-center justify-center rounded-xl bg-slate-900 hover:bg-orange-500 text-white font-bold px-3.5 py-2 text-[11px] transition-all hover:shadow-md hover:shadow-orange-500/10 active:scale-95 cursor-pointer shrink-0 gap-1.5 ${isAdding ? 'bg-orange-500 opacity-60 scale-95' : ''
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

