'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, MapPin, ChevronDown, User, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { categories } from '@/lib/data';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SmartSearch } from './SmartSearch';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
  const { totalItems } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <nav className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/90 backdrop-blur-md flex flex-col md:h-16 h-28 justify-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-2 md:py-0 gap-2 md:gap-4 h-full">
          
          {/* Row 1: Menu button + Logo (Left) and Mobile Cart (Right) */}
          <div className="flex w-full md:w-auto items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              {/* Sidebar toggle */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center justify-center p-2 rounded-full hover:bg-slate-900 border border-transparent hover:border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <Menu className="h-4 w-4" />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center group">
                <span className="text-xl font-black tracking-tight text-white transition-colors group-hover:text-orange-500">
                  Barabara<span className="text-orange-500 group-hover:text-white transition-colors">.</span>
                </span>
              </Link>

              {/* Curated Dropdown */}
              <div className="relative group hidden lg:block">
                <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-all bg-slate-900 border border-slate-800/80 hover:border-slate-700 px-3.5 py-1.5 rounded-full cursor-pointer">
                  <span>Collections</span>
                  <ChevronDown className="h-3 w-3 text-slate-500 group-hover:text-slate-300 transition-colors" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-slate-950/95 backdrop-blur-md rounded-xl border border-slate-800/80 py-2 shadow-2xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/products?category=${category.slug}`}
                      className="block px-4 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-900/60 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                  <div className="border-t border-slate-900 my-1"></div>
                  <Link href="/products" className="block px-4 py-2 text-xs text-orange-400 hover:text-orange-300 hover:bg-slate-900/60 transition-colors">
                    All Products
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Cart Button (shown only on mobile) */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/cart"
                className="flex items-center gap-2 bg-slate-900 border border-slate-850 hover:border-slate-800 px-3.5 py-1.5 rounded-full transition-all relative group"
              >
                <ShoppingCart className="h-4 w-4 text-slate-300 group-hover:text-orange-500" />
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-slate-950">
                  {totalItems}
                </span>
              </Link>
            </div>
          </div>

          {/* Center area: Search capsule (full width on mobile) */}
          <div className="w-full md:flex-1 md:max-w-lg md:mx-auto">
            <SmartSearch />
          </div>

          {/* Right area: Utilities & Actions (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Minimal Location badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-850/60 text-[10px] text-slate-400 hover:text-slate-300 transition-colors">
              <MapPin className="h-3.5 w-3.5 text-orange-500" />
              <span>Kampala</span>
            </div>

            {/* Account auth options */}
            {status === 'loading' ? (
              <div className="hidden md:flex px-2 py-1 text-xs text-slate-400">
                <span>...</span>
              </div>
            ) : session ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                  <User className="h-3.5 w-3.5 text-orange-500" />
                  <span>{session.user?.name?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-900 hover:bg-orange-500 text-slate-400 hover:text-white border border-slate-800 hover:border-orange-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white transition-all shadow-sm shadow-orange-500/10"
              >
                <User className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Orders link */}
            <Link
              href="/profile"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-850 border border-slate-800/80 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <span>Orders</span>
            </Link>

            {/* Shopping Cart Pill */}
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-4 py-1.5 rounded-full transition-all relative group"
            >
              <div className="relative">
                <ShoppingCart className="h-4 w-4 text-slate-300 group-hover:text-orange-500 transition-colors" />
                <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-slate-950 group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              </div>
              <span className="font-bold text-xs text-slate-200 hidden sm:inline">Cart</span>
            </Link>
          </div>

        </div>
      </nav>
      
      {/* Premium Sub-Navbar Category Menu Strip */}
      <div className="sticky top-28 md:top-16 z-40 w-full h-10 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/40 flex items-center overflow-x-auto scrollbar-none">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-start md:justify-center gap-6 sm:gap-8 whitespace-nowrap">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="text-[11px] font-bold tracking-wider uppercase text-slate-400 hover:text-orange-500 transition-colors relative py-1 group/item"
            >
              {category.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-orange-500 group-hover/item:w-full transition-all duration-300" />
            </Link>
          ))}
          <span className="h-3 w-px bg-slate-800" />
          <Link
            href="/products"
            className="text-[11px] font-bold tracking-wider uppercase text-orange-400 hover:text-orange-300 transition-colors relative py-1 group/item"
          >
            All Products
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-orange-400 group-hover/item:w-full transition-all duration-300" />
          </Link>
        </div>
      </div>
    </>
  );
}

