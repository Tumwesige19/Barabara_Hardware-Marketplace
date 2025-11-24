import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const cards = [
    {
        title: 'Trade-in Your Tools',
        description: 'Get great value for your used equipment.',
        image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=600',
        link: '/products',
        linkText: 'Start Trading',
    },
    {
        title: 'Power Tools',
        description: 'High performance for professionals.',
        image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=600',
        link: '/products?category=power-tools',
        linkText: 'See More',
    },
    {
        title: 'Hand Tools',
        description: 'Precision and durability.',
        image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=600',
        link: '/products?category=hand-tools',
        linkText: 'Shop Now',
    },
    {
        title: 'Easy Returns',
        description: 'Hassle-free returns on all items.',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=600',
        link: '/about',
        linkText: 'Learn More',
    },
];

export function HomeCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 -mt-32 relative z-10 mb-12">
            {cards.map((card, index) => (
                <div key={index} className="bg-white p-6 flex flex-col h-[420px] shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-4 text-slate-900">{card.title}</h3>
                    <div className="flex-1 relative mb-4 overflow-hidden">
                        <img
                            src={card.image}
                            alt={card.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                    <Link href={card.link} className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm font-medium flex items-center">
                        {card.linkText}
                    </Link>
                </div>
            ))}
        </div>
    );
}
