'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md">
            <Link href={`/products/${product.id}`} className="block aspect-square overflow-hidden bg-muted">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </Link>
            <div className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-foreground hover:text-primary line-clamp-1">{product.name}</h3>
                </Link>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{formatCurrency(product.price)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
