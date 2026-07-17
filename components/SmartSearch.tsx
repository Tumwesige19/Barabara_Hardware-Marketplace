'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ChevronRight, Sparkles, Bot, Loader2 } from 'lucide-react';
import { products } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

export function SmartSearch() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<typeof products>([]);
    const [aiMode, setAiMode] = useState(true);
    const [isThinking, setIsThinking] = useState(false);
    const [aiResponseText, setAiResponseText] = useState('');
    const [streamedText, setStreamedText] = useState('');
    
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const debouncingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // AI NLP Response generator based on inventory specifications
    const generateAiResponse = (searchQuery: string, matchedProducts: typeof products) => {
        const q = searchQuery.toLowerCase();
        
        const isSmart = q.includes('smart') || q.includes('fingerprint') || q.includes('biometric') || q.includes('wifi') || q.includes('face') || q.includes('digital') || q.includes('electric') || q.includes('electronic') || q.includes('phone') || q.includes('app');
        const isOutdoor = q.includes('gate') || q.includes('outdoor') || q.includes('weather') || q.includes('rain') || q.includes('waterproof') || q.includes('outside') || q.includes('rust');
        const isHeavyDuty = q.includes('heavy') || q.includes('security') || q.includes('strong') || q.includes('cut') || q.includes('safe') || q.includes('iron') || q.includes('steel') || q.includes('hardened') || q.includes('perimeter');
        const isHandle = q.includes('handle') || q.includes('lever') || q.includes('knob') || q.includes('bedroom') || q.includes('bathroom') || q.includes('pull') || q.includes('brass') || q.includes('copper');
        const isMortise = q.includes('mortise') || q.includes('classic') || q.includes('silent') || q.includes('indoor') || q.includes('euro');
        const isPadlock = q.includes('padlock') || q.includes('locker') || q.includes('gym') || q.includes('luggage') || q.includes('chain');
        const isPipe = q.includes('pipe') || q.includes('80mm') || q.includes('innerlee');

        let text = "";
        let recommended: typeof products = [];

        if (isSmart) {
            recommended = matchedProducts.filter(p => p.id === 'dl-002' || p.id === 'dl-060' || p.id === 'dl-061' || p.id === 'dl-006');
            if (recommended.length === 0) recommended = matchedProducts.slice(0, 2);
            text = `For smart biometric lock entry, I recommend the **${recommended[0]?.name || 'Electric Smart Handle'}** (UGX ${(recommended[0]?.price || 500000).toLocaleString()}) featuring high-accuracy fingerprint sensors. ${recommended[1] ? `Alternatively, look at the **${recommended[1].name}** which supports smart cards and PIN entries.` : ''}`;
        } else if (isPipe || isOutdoor) {
            recommended = matchedProducts.filter(p => p.id === 'dl-062' || p.id === 'dl-063' || p.id === 'dl-031' || p.id === 'dl-034');
            if (recommended.length === 0) recommended = matchedProducts.slice(0, 2);
            text = `For outdoor gate and perimeter security, I recommend our **${recommended[0]?.name || 'Classic 80mm Door Pipe Lock'}** (UGX ${(recommended[0]?.price || 35000).toLocaleString()}) which slides securely inside metal tube frames. ${recommended[1] ? `The waterproof **${recommended[1].name}** is another heavy-duty candidate.` : ''}`;
        } else if (isHeavyDuty) {
            recommended = matchedProducts.filter(p => p.id === 'dl-032' || p.id === 'dl-013' || p.id === 'dl-062' || p.id === 'dl-020');
            if (recommended.length === 0) recommended = matchedProducts.slice(0, 2);
            text = `If high physical resistance is required, I highly suggest the **${recommended[0]?.name || 'Heavy Duty Steel Padlock'}** (UGX ${(recommended[0]?.price || 60000).toLocaleString()}) featuring a cut-resistant hardened steel body. ${recommended[1] ? `The heavy **${recommended[1].name}** also provides maximum security.` : ''}`;
        } else if (isHandle) {
            recommended = matchedProducts.filter(p => p.id === 'dl-022' || p.id === 'dl-065' || p.id === 'dl-027');
            if (recommended.length === 0) recommended = matchedProducts.slice(0, 2);
            text = `For interior handle retrofits, the **${recommended[0]?.name || 'Bespoke Half Handle Lockset'}** (UGX ${(recommended[0]?.price || 65000).toLocaleString()}) offers elegant aesthetics and smooth lever operation. ${recommended[1] ? `We also have the **${recommended[1].name}** for modern rosette designs.` : ''}`;
        } else if (isMortise) {
            recommended = matchedProducts.filter(p => p.id === 'dl-013' || p.id === 'dl-015' || p.id === 'dl-014');
            if (recommended.length === 0) recommended = matchedProducts.slice(0, 2);
            text = `For mortise latch mechanisms, I recommend the **${recommended[0]?.name || 'Modern Black Mortise'}** (UGX ${(recommended[0]?.price || 75000).toLocaleString()}) or the **${recommended[1]?.name || 'Silent Magnetic Mortise'}** for noise-free latching.`;
        } else {
            recommended = matchedProducts.slice(0, 3);
            if (recommended.length > 0) {
                text = `I found some premium matches. The **${recommended[0].name}** (UGX ${recommended[0].price.toLocaleString()}) is our top suggestion. ${recommended[1] ? `You can also consider the **${recommended[1].name}** depending on your setup.` : ''}`;
            } else {
                text = `I couldn't find any items matching "${searchQuery}" in our luxury atelier. Try searching for "smart handles", "80mm pipe locks", or "hardened padlocks" and I'll find the perfect fit.`;
            }
        }

        return { text, products: recommended };
    };

    // Handle search query updates with debounced AI simulation
    useEffect(() => {
        if (debouncingTimeoutRef.current) clearTimeout(debouncingTimeoutRef.current);
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

        setStreamedText('');
        
        if (query.length > 0) {
            const searchTerms = query.toLowerCase().split(' ');
            const filtered = products.filter(product => {
                const productText = `${product.name} ${product.description} ${product.category} ${product.id}`.toLowerCase();
                return searchTerms.every(term => productText.includes(term));
            });

            setResults(filtered.slice(0, 5));
            setIsOpen(true);

            if (aiMode) {
                setIsThinking(true);
                debouncingTimeoutRef.current = setTimeout(() => {
                    const aiResult = generateAiResponse(query, filtered);
                    setIsThinking(false);
                    setAiResponseText(aiResult.text);
                    
                    // Stream response text word-by-word
                    let words = aiResult.text.split(' ');
                    let currentWordIndex = 0;
                    let currentStream = '';

                    typingIntervalRef.current = setInterval(() => {
                        if (currentWordIndex < words.length) {
                            currentStream += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
                            setStreamedText(currentStream);
                            currentWordIndex++;
                        } else {
                            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
                        }
                    }, 50); // Speed of streaming
                }, 600); // Wait 600ms after user finishes typing
            }
        } else {
            setResults([]);
            setIsOpen(false);
            setAiResponseText('');
            setStreamedText('');
        }

        return () => {
            if (debouncingTimeoutRef.current) clearTimeout(debouncingTimeoutRef.current);
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        };
    }, [query, aiMode]);

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
        <div ref={wrapperRef} className="relative flex flex-1 items-center h-10 max-w-2xl mx-auto">
            <div className="flex flex-1 items-center h-full rounded-full border border-slate-800/80 bg-slate-900/60 focus-within:border-orange-500/80 focus-within:bg-slate-950/80 focus-within:ring-2 focus-within:ring-orange-500/10 transition-all overflow-hidden relative">
                
                {/* Mode Indicator Badge */}
                <div className="absolute left-3 flex items-center pointer-events-none">
                    <Bot className={`h-4 w-4 transition-all duration-300 ${aiMode ? 'text-orange-500 animate-pulse' : 'text-slate-500'}`} />
                </div>

                <form onSubmit={handleSearch} className="flex flex-1 items-center h-full pl-9 pr-1">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.length > 0 && setIsOpen(true)}
                        placeholder={aiMode ? "Ask AI Locksmith (e.g. 'smart lock for outdoor gate')" : "Search for locks, handles, padlocks..."}
                        className="flex-1 h-full bg-transparent text-sm text-slate-100 focus:outline-none placeholder:text-slate-550"
                    />
                    
                    {query && (
                        <button
                            type="button"
                            onClick={() => { setQuery(''); setIsOpen(false); }}
                            className="p-1 text-slate-500 hover:text-slate-300 transition-colors mr-1"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                    
                    <button
                        type="submit"
                        className="h-8 w-8 rounded-full bg-slate-800 hover:bg-orange-500 text-slate-400 hover:text-white transition-all flex items-center justify-center shrink-0"
                    >
                        <Search className="h-4 w-4" />
                    </button>
                </form>
            </div>

            {/* Instant Preview Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800/80 z-50 overflow-hidden">
                    
                    {/* Header with AI Mode Toggle */}
                    <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-900/60 flex items-center justify-between">
                        <span>Search Agent Results</span>
                        <button 
                            onClick={() => setAiMode(!aiMode)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full border transition-all hover:bg-slate-900 cursor-pointer ${aiMode ? 'border-orange-500/50 text-orange-400' : 'border-slate-800 text-slate-400'}`}
                        >
                            <Sparkles className="h-3 w-3" />
                            <span>AI Assistant: {aiMode ? 'ON' : 'OFF'}</span>
                        </button>
                    </div>

                    {/* AI Agent Chat Bubble */}
                    {aiMode && (query.length > 0) && (
                        <div className="p-4 bg-gradient-to-r from-slate-900/50 to-orange-950/[0.08] border-b border-slate-900/60">
                            <div className="flex items-start gap-2.5">
                                <div className="h-7 w-7 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                                    <Bot className="h-4 w-4 text-orange-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                        AI Locksmith Agent
                                        {isThinking && (
                                            <span className="flex items-center gap-1 text-[9px] text-slate-500 lowercase font-medium">
                                                <Loader2 className="h-2.5 w-2.5 animate-spin text-orange-400" />
                                                analyzing atelier catalog...
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed font-normal min-h-[1.5rem]">
                                        {streamedText || (isThinking ? '' : '...')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Lists */}
                    <div className="py-2">
                        {results.length > 0 ? (
                            <>
                                <div className="px-4 pb-1 text-[9px] font-semibold text-slate-500 uppercase tracking-wider">
                                    Products found ({results.length})
                                </div>
                                {results.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.id}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-900/65 transition-colors group"
                                    >
                                        <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-900 overflow-hidden border border-slate-800/80">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium text-slate-200 truncate group-hover:text-orange-500 transition-colors">
                                                {product.name}
                                            </div>
                                            <div className="text-xs text-slate-500 truncate">
                                                {product.category.replace('-', ' ')}
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold text-orange-500">
                                            {formatCurrency(product.price)}
                                        </div>
                                    </Link>
                                ))}
                                <button
                                    onClick={() => handleSearch()}
                                    className="w-full text-left px-4 py-2.5 text-xs text-orange-400 hover:text-orange-300 hover:bg-slate-900/60 transition-colors flex items-center gap-1 border-t border-slate-900/60 mt-1"
                                >
                                    See all results for "{query}"
                                    <ChevronRight className="h-3 w-3" />
                                </button>
                            </>
                        ) : (
                            !isThinking && (
                                <div className="px-4 py-6 text-center text-xs text-slate-500">
                                    No products matching your search term.
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
