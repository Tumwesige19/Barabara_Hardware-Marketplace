'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ChevronRight } from 'lucide-react';
import { products } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export function SmartSearch() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<typeof products>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Filter products when query changes
    useEffect(() => {
        if (query.length > 0) {
            const searchTerms = query.toLowerCase().split(' ');
            const filtered = products.filter(product => {
                const productText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
                return searchTerms.every(term => productText.includes(term));
            }).slice(0, 5); // Limit to 5 results
            setResults(filtered);
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            router.push(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div ref={wrapperRef} className="relative flex flex-1 items-center h-10 mx-2">
            <div className="flex flex-1 items-center h-full rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#febd69] bg-white">
                <form onSubmit={handleSearch} className="flex flex-1 h-full">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.length > 0 && setIsOpen(true)}
                        placeholder="Search for locks, handles, padlocks..."
                        className="flex-1 h-full px-3 text-black focus:outline-none placeholder:text-gray-500"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => { setQuery(''); setIsOpen(false); }}
                            className="px-2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    <button
                        type="submit"
                        className="h-full px-4 bg-[#febd69] hover:bg-[#f3a847] transition-colors flex items-center justify-center"
                    >
                        <Search className="h-5 w-5 text-slate-900" />
                    </button>
                </form>
            </div>

            {/* Instant Preview Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-xl border border-gray-200 z-50 overflow-hidden">
                    <div className="py-2">
                        <div className="px-3 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Top Suggestions
                        </div>
                        {results.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors group"
                            >
                                <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 overflow-hidden border border-gray-200">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 truncate group-hover:text-[#f08804]">
                                        {product.name}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {product.category.replace('-', ' ')}
                                    </div>
                                </div>
                                <div className="text-sm font-bold text-gray-900">
                                    {formatCurrency(product.price)}
                                </div>
                            </Link>
                        ))}
                        <button
                            onClick={() => handleSearch()}
                            className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 hover:underline flex items-center gap-1 border-t border-gray-100 mt-1"
                        >
                            See all results for "{query}"
                            <ChevronRight className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
