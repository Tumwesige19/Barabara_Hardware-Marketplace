'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, categories } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { Filter, X } from 'lucide-react';

function ProductList() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    useEffect(() => {
        setSelectedCategory(categoryParam);
    }, [categoryParam]);

    const filteredProducts = selectedCategory
        ? products.filter((p) => p.category === selectedCategory)
        : products;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 transform bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none md:p-0
          ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
                    <div className="flex items-center justify-between mb-6 md:hidden">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <button onClick={() => setIsMobileFiltersOpen(false)}>
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/products"
                                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === null
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                >
                                    All Products
                                </Link>
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/products?category=${category.slug}`}
                                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === category.slug
                                                ? 'bg-primary/10 text-primary font-medium'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`}
                                        onClick={() => setIsMobileFiltersOpen(false)}
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile filters */}
                {isMobileFiltersOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/50 md:hidden"
                        onClick={() => setIsMobileFiltersOpen(false)}
                    />
                )}

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">
                            {selectedCategory
                                ? categories.find((c) => c.slug === selectedCategory)?.name
                                : 'All Products'}
                        </h1>
                        <button
                            className="flex items-center gap-2 md:hidden px-4 py-2 border border-border rounded-md text-sm"
                            onClick={() => setIsMobileFiltersOpen(true)}
                        >
                            <Filter className="h-4 w-4" />
                            Filters
                        </button>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No products found in this category.</p>
                            <Link href="/products" className="text-primary hover:underline mt-2 inline-block">
                                View all products
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading products...</div>}>
            <ProductList />
        </Suspense>
    );
}
