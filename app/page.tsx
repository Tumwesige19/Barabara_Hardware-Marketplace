'use client';

import { useState } from 'react';
import { products } from '@/lib/data';
import { HeroCarousel } from '@/components/HeroCarousel';
import { HomeCards } from '@/components/HomeCards';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'smart' | 'mortise' | 'handles' | 'pipe' | 'padlocks'>('all');

  // Filter products by custom tab definitions from our dataset
  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'smart':
        // Biometric, WiFi, Bluetooth, Face ID (dl-002 to dl-010, dl-060, dl-061)
        return products.filter(p => p.id.startsWith('dl-00') || p.id === 'dl-010' || p.id === 'dl-060' || p.id === 'dl-061');
      case 'mortise':
        // Heavy duty and classic mortise (dl-013 to dl-020)
        return products.filter(p => p.id.startsWith('dl-01'));
      case 'handles':
        // Modern lever and knobs handles (dl-022 to dl-030, dl-065)
        return products.filter(p => p.id.startsWith('dl-02') || p.id === 'dl-065');
      case 'pipe':
        // Gate locks and pipe frame locks
        return products.filter(p => p.category === 'pipe-locks');
      case 'padlocks':
        // Biometric, combination, disc padlocks (dl-031 to dl-040)
        return products.filter(p => p.id.startsWith('dl-03'));
      case 'all':
      default:
        // Curated mix of 16 premium catalog items
        return [
          products.find(p => p.id === 'dl-002'), // smart WiFi lock
          products.find(p => p.id === 'dl-060'), // new Electric Smart Handle (Front & Back)
          products.find(p => p.id === 'dl-006'), // Face ID smart lock
          products.find(p => p.id === 'dl-009'), // video doorbell lock
          products.find(p => p.id === 'dl-013'), // modern black mortise
          products.find(p => p.id === 'dl-014'), // gold plated mortise
          products.find(p => p.id === 'dl-015'), // magnetic silent mortise
          products.find(p => p.id === 'dl-020'), // fire rated mortise
          products.find(p => p.id === 'dl-022'), // stainless steel lever
          products.find(p => p.id === 'dl-023'), // privacy bathroom lock
          products.find(p => p.id === 'dl-027'), // square lever handle
          products.find(p => p.id === 'dl-031'), // smart biometric padlock
          products.find(p => p.id === 'dl-033'), // combination padlock
          products.find(p => p.id === 'dl-063'), // new Innerlee 80mm Pipe Lock
          products.find(p => p.id === 'dl-041'), // heavy duty rim lock
          products.find(p => p.id === 'dl-044'), // deadbolt double cylinder
        ].filter(Boolean) as typeof products;
    }
  };

  const displayedProducts = getFilteredProducts();

  return (
    <div className="flex flex-col min-h-screen bg-white pb-16">
      {/* Hero Showcase Section */}
      <HeroCarousel />

      {/* Flagship Showroom Catalog (Tabbed Grid) - Positioned on top */}
      <section className="py-12 bg-slate-50 border-t border-b border-slate-100">
        <div className="container mx-auto max-w-7xl px-6">
          
          {/* Header - Centered */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              Featured Catalog
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Architectural Showroom
            </h2>
          </div>
          
          {/* Tabs selectors - Centered on top of the grid */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-200/50 p-1.5 rounded-full w-fit shadow-inner border border-slate-300/30">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === 'all' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveTab('smart')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === 'smart' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                Smart Access
              </button>
              <button
                onClick={() => setActiveTab('mortise')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === 'mortise' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                Mortise
              </button>
              <button
                onClick={() => setActiveTab('handles')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === 'handles' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                Levers & Knobs
              </button>
              <button
                onClick={() => setActiveTab('pipe')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === 'pipe' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                Pipe Locks
              </button>
              <button
                onClick={() => setActiveTab('padlocks')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeTab === 'padlocks' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                Padlocks
              </button>
            </div>
          </div>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 animate-fade-in">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View catalog action button */}
          <div className="flex justify-center">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-slate-355 text-xs font-bold text-slate-700 hover:text-orange-500 hover:border-orange-500 hover:bg-slate-100/50 transition-all group/catalog cursor-pointer"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover/catalog:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* Curated Bento Categories */}
      <HomeCards />
    </div>
  );
}


