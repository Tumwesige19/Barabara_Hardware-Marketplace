'use client';

import Link from 'next/link';
import { X, User, ChevronRight, ChevronDown } from 'lucide-react';
import { useEffect } from 'react';
import { categories } from '@/lib/data';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-50 bg-black/80 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            >
                <div className="absolute top-4 left-[380px] text-white cursor-pointer hidden md:block">
                    <X className="h-8 w-8" />
                </div>
            </div>

            {/* Sidebar Panel */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-[365px] max-w-[85vw] bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="bg-[#232f3e] text-white px-8 py-3 flex items-center gap-3">
                    <User className="h-8 w-8 rounded-full bg-white text-[#232f3e] p-1" />
                    <span className="text-xl font-bold">Hello, Sign in</span>
                </div>

                {/* Content */}
                <div className="h-[calc(100%-56px)] overflow-y-auto pb-8">

                    {/* Section: Trending */}
                    <div className="py-4 border-b border-gray-200">
                        <h3 className="px-8 text-lg font-bold text-[#111] mb-2">Trending</h3>
                        <ul>
                            <li>
                                <Link href="/products" className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]" onClick={onClose}>
                                    Best Sellers
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]" onClick={onClose}>
                                    New Releases
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]" onClick={onClose}>
                                    Movers & Shakers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Section: Shop By Department */}
                    <div className="py-4 border-b border-gray-200">
                        <h3 className="px-8 text-lg font-bold text-[#111] mb-2">Shop By Department</h3>
                        <ul>
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/products?category=${category.slug}`}
                                        className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]"
                                        onClick={onClose}
                                    >
                                        {category.name}
                                        <ChevronRight className="h-4 w-4 text-gray-500" />
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button className="w-full flex items-center px-8 py-3 hover:bg-gray-100 text-sm text-[#111] font-medium">
                                    See All
                                    <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Section: Programs & Features */}
                    <div className="py-4 border-b border-gray-200">
                        <h3 className="px-8 text-lg font-bold text-[#111] mb-2">Programs & Features</h3>
                        <ul>
                            <li>
                                <Link href="/products" className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]" onClick={onClose}>
                                    Gift Cards
                                    <ChevronRight className="h-4 w-4 text-gray-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]" onClick={onClose}>
                                    Barabara Live
                                    <ChevronRight className="h-4 w-4 text-gray-500" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]" onClick={onClose}>
                                    International Shopping
                                    <ChevronRight className="h-4 w-4 text-gray-500" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Section: Help & Settings */}
                    <div className="py-4">
                        <h3 className="px-8 text-lg font-bold text-[#111] mb-2">Help & Settings</h3>
                        <ul>
                            <li>
                                <Link href="/about" className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]" onClick={onClose}>
                                    Your Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]" onClick={onClose}>
                                    Customer Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="flex items-center justify-between px-8 py-3 hover:bg-gray-100 text-sm text-[#111]" onClick={onClose}>
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
}
