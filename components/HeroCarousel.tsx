'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const banners = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=1200',
        title: 'Trade-in Event',
        subtitle: 'Upgrade your toolkit today',
        link: '/products',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=1200',
        title: 'Professional Plumbing',
        subtitle: 'Essentials for every job',
        link: '/products?category=plumbing',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1200',
        title: 'Electrical Supplies',
        subtitle: 'Power up your projects',
        link: '/products?category=electrical',
    },
];

export function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const prev = () => setCurrent((curr) => (curr === 0 ? banners.length - 1 : curr - 1));
    const next = () => setCurrent((curr) => (curr + 1) % banners.length);

    return (
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-900">
            {/* Slides */}
            <div className="relative h-full w-full">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {/* Image Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${banner.image})` }}
                        />
                        {/* Gradient Overlay - Bottom Fade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#e3e6e6] via-transparent to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center pb-12">
                            <div className="text-center text-white drop-shadow-lg px-4">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h2>
                                <p className="text-xl md:text-2xl mb-8">{banner.subtitle}</p>
                                <Link
                                    href={banner.link}
                                    className="inline-block bg-[#febd69] text-slate-900 px-8 py-3 rounded-md font-bold hover:bg-[#f3a847] transition-colors"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/4 -translate-y-1/2 p-2 hover:bg-white/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
                <ChevronLeft className="h-8 w-8 text-white" />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/4 -translate-y-1/2 p-2 hover:bg-white/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
                <ChevronRight className="h-8 w-8 text-white" />
            </button>
        </div>
    );
}
