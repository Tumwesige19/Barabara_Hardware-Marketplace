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

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -current.clientWidth : current.clientWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white p-6 mb-8 mx-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                <a href="/products" className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm font-medium">
                    See more
                </a>
            </div>

            <div className="relative group">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
                >
                    {products.map((product) => (
                        <div key={product.id} className="min-w-[240px] max-w-[240px]">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 shadow-md rounded-l-md opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
}
