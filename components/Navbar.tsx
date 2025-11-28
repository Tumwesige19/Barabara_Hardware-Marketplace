'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, MapPin, ChevronDown, User, LogOut } from 'lucide-react';
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
      <nav className="flex flex-col w-full">
        {/* Top Row - Main Header */}
        <div className="bg-[#131921] text-white py-2">
          <div className="container mx-auto flex items-center justify-between px-4 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1">
              <span className="text-2xl font-bold tracking-tight">Barabara<span className="text-[#febd69]">.</span></span>
            </Link>

            {/* Location - Hidden on small screens */}
            <div className="hidden md:flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
              <MapPin className="h-5 w-5 mt-2" />
              <div className="flex flex-col text-xs leading-none">
                <span className="text-gray-300">Deliver to</span>
                <span className="font-bold">Manhattan 66502</span>
              </div>
            </div>

            {/* Smart Search Bar */}
            <SmartSearch />

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Account */}
              {status === 'loading' ? (
                <div className="hidden md:flex flex-col text-xs leading-none p-1">
                  <span className="text-gray-300">Loading...</span>
                </div>
              ) : session ? (
                <div className="hidden md:flex items-center gap-2">
                  <div className="flex flex-col text-xs leading-none hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
                    <span className="text-gray-300">Hello, {session.user?.name?.split(' ')[0]}</span>
                    <span className="font-bold">Account</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-1 text-xs hover:outline hover:outline-1 hover:outline-white rounded-sm p-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden lg:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link href="/login" className="hidden md:flex flex-col text-xs leading-none hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
                  <span className="text-gray-300">Hello, sign in</span>
                  <span className="font-bold flex items-center gap-1">Account & Lists <ChevronDown className="h-3 w-3" /></span>
                </Link>
              )}

              {/* Orders */}
              <Link href="/profile" className="hidden md:flex flex-col text-xs leading-none hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
                <span className="text-gray-300">Returns</span>
                <span className="font-bold">& Orders</span>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="flex items-end gap-1 hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 relative">
                <div className="relative">
                  <ShoppingCart className="h-8 w-8" />
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[#f08804] font-bold text-sm">
                    {totalItems}
                  </span>
                </div>
                <span className="font-bold text-sm mb-1 hidden sm:inline">Cart</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row - Navigation */}
        <div className="bg-[#232f3e] text-white text-sm">
          <div className="container mx-auto flex items-center px-4 gap-4 overflow-x-auto no-scrollbar py-1.5">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-1 font-bold hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1 whitespace-nowrap"
            >
              <Menu className="h-5 w-5" />
              All
            </button>

            <div className="flex items-center gap-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
              <Link href="/products" className="px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm whitespace-nowrap">
                Deals
              </Link>
              <Link href="/about" className="px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm whitespace-nowrap">
                Customer Service
              </Link>
              <Link href="/products" className="px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm whitespace-nowrap">
                Registry
              </Link>
              <Link href="/products" className="px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm whitespace-nowrap">
                Gift Cards
              </Link>
              <Link href="/products" className="px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm whitespace-nowrap">
                Sell
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
