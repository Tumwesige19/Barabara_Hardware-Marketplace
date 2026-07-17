'use client';

import { Product } from '@/lib/data';
import { ProductCard } from './ProductCard';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductRowProps {
    title: string;
    products: Product[];
}

export function ProductRow({ title, products }: ProductRowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    if (!products || products.length === 0) {
        return null;
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -current.clientWidth : current.clientWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white border border-slate-100 p-6 mb-8 mx-4 md:mx-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">{title}</h2>
                <a 
                    href="/products" 
                    className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 hover:text-orange-500 hover:border-orange-500 hover:bg-slate-50 transition-all"
                >
                    See more
                </a>
            </div>

            <div className="relative group">
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 bg-white/90 hover:bg-orange-500 border border-slate-100 hover:border-orange-400 hover:scale-105 text-slate-700 hover:text-white shadow-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
                >
                    {products.map((product) => (
                        <div key={product.id} className="min-w-[220px] max-w-[220px] py-1">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 bg-white/90 hover:bg-orange-500 border border-slate-100 hover:border-orange-400 hover:scale-105 text-slate-700 hover:text-white shadow-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}

