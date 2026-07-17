'use client';

import { useState, useEffect, useRef } from 'react';
import { Bot, X, MessageSquare, Send, Sparkles, Loader2, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { products } from '@/lib/data';

interface Message {
    id: string;
    sender: 'user' | 'agent';
    text: string;
    timestamp: Date;
}

export function FloatingChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            sender: 'agent',
            text: "Hi! I'm Barabara's AI Locksmith Agent. 🤖 How can I help you choose the right architectural hardware, verify specifications, or guide you through lock installation today?",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voicesList, setVoicesList] = useState<SpeechSynthesisVoice[]>([]);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    // Asynchronously load speech voices (crucial for Chrome/Safari)
    useEffect(() => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        const updateVoices = () => {
            const list = window.speechSynthesis.getVoices();
            if (list.length > 0) {
                setVoicesList(list);
            }
        };

        updateVoices();
        
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = updateVoices;
        }
    }, []);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Initialize Speech Recognition API
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const rec = new SpeechRecognition();
                rec.continuous = false;
                rec.interimResults = false;
                rec.lang = 'en-US';

                rec.onstart = () => {
                    setIsListening(true);
                };

                rec.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    if (transcript.trim()) {
                        setInput(transcript);
                        handleSend(transcript, 'voice');
                    }
                };

                rec.onerror = (e: any) => {
                    console.error("Speech recognition error:", e.error);
                    setIsListening(false);
                };

                rec.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current = rec;
            }
        }

        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, []);

    // Text to Speech Function (Unified Cloud-Based Streaming Player)
    const speakText = (text: string) => {
        if (typeof window === 'undefined') return;

        // 1. Cancel/stop any currently playing speech audio
        if ((window as any).currentSpeechAudio) {
            try {
                (window as any).currentSpeechAudio.pause();
                (window as any).currentSpeechAudio = null;
            } catch (e) {
                console.error("Failed to stop previous speech:", e);
            }
        }

        // 2. Clean markdown formatting tokens for clean narration output
        const cleanText = text
            .replace(/\*\*/g, '') // remove bold markers
            .replace(/•/g, '')    // remove bullet points
            .replace(/-/g, ' ')   // replace dashes with spaces
            .replace(/\n/g, ' '); // replace linebreaks with spaces

        // 3. Google Translate TTS limits single requests to 200 characters.
        // We split the cleaned text into custom sentence/word chunks of max 150 chars.
        const chunks: string[] = [];
        const words = cleanText.split(' ');
        let currentChunk = '';

        words.forEach(word => {
            if ((currentChunk + ' ' + word).length > 150) {
                chunks.push(currentChunk.trim());
                currentChunk = word;
            } else {
                currentChunk = currentChunk ? currentChunk + ' ' + word : word;
            }
        });
        if (currentChunk) {
            chunks.push(currentChunk.trim());
        }

        // 4. Sequential chunk player utilizing the Audio onended hook
        let chunkIndex = 0;

        const playNextChunk = () => {
            if (chunkIndex >= chunks.length) {
                (window as any).currentSpeechAudio = null;
                return;
            }

            const chunkText = chunks[chunkIndex];
            // Request the high-quality Google British English (en-GB) female voice profile
            const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en-GB&client=tw-ob&q=${encodeURIComponent(chunkText)}`;
            
            const audio = new Audio(audioUrl);
            (window as any).currentSpeechAudio = audio;

            audio.onended = () => {
                chunkIndex++;
                playNextChunk();
            };

            audio.onerror = (e) => {
                console.error("TTS playback error for chunk:", chunkText, e);
                // Fail gracefully and attempt to speak next chunk
                chunkIndex++;
                playNextChunk();
            };

            // Set standard speed and sharp audio elements
            audio.play().catch(err => {
                console.warn("Audio autoplay blocked by browser sandbox:", err);
            });
        };

        playNextChunk();
    };

    // NLP reasoning engine to generate replies based on products in lib/data.ts
    const generateAiReply = (query: string): string => {
        const q = query.toLowerCase();

        // Intents
        const isSmart = q.includes('smart') || q.includes('fingerprint') || q.includes('biometric') || q.includes('wifi') || q.includes('face') || q.includes('doorbell');
        const isPipe = q.includes('pipe') || q.includes('80mm') || q.includes('gate') || q.includes('perimeter') || q.includes('outdoor');
        const isHeavyDuty = q.includes('heavy') || q.includes('security') || q.includes('strong') || q.includes('padlock') || q.includes('hardened');
        const isHandle = q.includes('handle') || q.includes('lever') || q.includes('knob') || q.includes('bedroom') || q.includes('bathroom') || q.includes('copper');
        const isMortise = q.includes('mortise') || q.includes('classic') || q.includes('silent') || q.includes('magnetic');
        const isPrice = q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('wholesale') || q.includes('ugx');

        if (isSmart) {
            return `We offer state-of-the-art smart locks! 
• **Electric Smart Handle** (UGX 500,000) for secure keyless fingerprint handle entries.
• **SecureHome WiFi Lock** (UGX 450,000) for remote app unlocking.
• **Premium Biometric Handle Lock** (UGX 700,000) for elite multi-credential codes.

Would you like to add any of these to your shopping cart?`;
        }

        if (isPipe) {
            return `For gate and fence pipe security, we have dedicated **80mm Pipe Locks** (priced at UGX 35,000 each):
• **Classic 80mm Door Pipe Lock** - Perfect for standard iron/steel gates.
• **Innerlee 80mm Pipe Lock** - High-grade key lock cylinders.
• **Compact 80mm Pipe Lock** - For narrow lockbox spaces.

These slide right into standard 80mm pipes!`;
        }

        if (isHeavyDuty) {
            return `For maximum physical defense, I suggest:
1. **Heavy Duty Steel Padlock** (UGX 60,000) – Cut-resistant hardened steel shackle.
2. **Disc Padlock** (UGX 55,000) – Bullet-proof round shield design.
3. **Double Cylinder Deadbolt** (UGX 40,000) – Two-sided key entry.`;
        }

        if (isHandle) {
            return `For interior doors, we showcase premium levers and handles:
• **Bespoke Half Handle Lockset** (UGX 65,000 complete / UGX 30,000 handle pair).
• **Stainless Steel Lever Handle** (UGX 42,000).
• **Square Rosette Minimalist Handle** (UGX 45,000).`;
        }

        if (isMortise) {
            return `Our premium mortise lock range includes:
• **Modern Black Mortise** (UGX 75,000) – Sleek matte finish.
• **Silent Magnetic Mortise** (UGX 80,000) – Features silent latch engagement.
• **Gold Plated Mortise Lock** (UGX 85,000) – Polished luxury brass.`;
        }

        if (isPrice) {
            return `Our catalog prices are listed in Ugandan Shillings (UGX). We also offer wholesale boxes (typically minimum 10-20 pieces) at discounted rates. Let me know which lock you are interested in and I will quote the wholesale price!`;
        }

        // Default fallback query matching
        const searchTerms = q.split(' ');
        const matched = products.filter(p => {
            const text = `${p.name} ${p.description} ${p.category}`.toLowerCase();
            return searchTerms.some(term => term.length > 2 && text.includes(term));
        }).slice(0, 2);

        if (matched.length > 0) {
            return `Based on inventory, I recommend the **${matched[0].name}** (${formatPrice(matched[0].price)}). ${matched[0].description} ${matched[1] ? `\n\nAlternatively, you can consider the **${matched[1].name}** (${formatPrice(matched[1].price)}).` : ''}`;
        }

        return `I'm here to guide your hardware purchases! Ask me about:
• 'Smart Fingerprint Locks'
• '80mm Gate Pipe Locks'
• 'Heavy Duty Steel Padlocks'
• 'Installation guides or wholesale prices'`;
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(price);
    };

    const handleSend = (textToSend: string, source: 'voice' | 'text' = 'text') => {
        if (!textToSend.trim()) return;

        const userMsg: Message = {
            id: `user-${Date.now()}`,
            sender: 'user',
            text: textToSend,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking and reply stream
        setTimeout(() => {
            const replyText = generateAiReply(textToSend);
            setIsTyping(false);
            
            const agentMsg: Message = {
                id: `agent-${Date.now()}`,
                sender: 'agent',
                text: replyText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, agentMsg]);
            
            // Speak out only if the customer asked via Voice Recognition
            if (source === 'voice') {
                speakText(replyText);
            }
        }, 850);
    };

    // Toggle Voice Recognition Listening
    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition (Speech-to-Text) is not supported in this browser. Please try Google Chrome or Safari.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            // Cancel voice synthesizer output to avoid talking into the microphone
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            recognitionRef.current.start();
        }
    };

    const handleQuickQuery = (queryText: string) => {
        handleSend(queryText, 'text');
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-600/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer border border-orange-400"
                aria-label="Open AI Assistant"
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageSquare className="h-6 w-6 fill-current" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-[380px] h-[500px] bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in">
                    
                    {/* Header */}
                    <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="relative h-9 w-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                                <Bot className="h-5 w-5 text-orange-500" />
                                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border border-slate-900 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1">
                                    AI Locksmith Agent
                                    <Sparkles className="h-3 w-3 text-orange-400" />
                                </h3>
                                <span className="text-[10px] text-slate-500 font-medium">Online • Speaks to voice inputs</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                            {/* WhatsApp Direct Chat Button */}
                            <a
                                href="https://wa.me/256755123456?text=Hello%20Barabara%20Hardware!%20I%20have%20an%20inquiry%20regarding%20some%20products."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all cursor-pointer bg-slate-950/30"
                                title="Chat on WhatsApp"
                            >
                                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.284 1.48 4.961 1.482 5.372 0 9.747-4.334 9.75-9.664.002-2.583-1.002-5.01-2.827-6.837-1.826-1.826-4.25-2.83-6.837-2.831-5.378 0-9.754 4.335-9.757 9.667-.001 1.838.497 3.568 1.442 5.093l-.953 3.484 3.585-.929zm11.366-6.86c-.328-.164-1.94-.959-2.241-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.384.246-.712.083-.328-.164-1.386-.51-2.64-1.627-.975-.87-1.633-1.944-1.825-2.272-.192-.329-.02-.507.144-.67.147-.147.328-.384.492-.575.164-.192.219-.328.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-.1011-2.438-.3-.727-.618-.713-.848-.713-.219-.002-.469-.002-.719-.002-.25 0-.656.094-.99.466-.334.372-1.275 1.247-1.275 3.041 0 1.795 1.309 3.524 1.49 3.771.182.247 2.578 3.937 6.244 5.521.872.376 1.553.6 2.082.768.877.279 1.676.24 2.306.146.702-.105 1.94-.795 2.214-1.56.274-.766.274-1.423.192-1.56-.082-.138-.301-.219-.63-.383z"/>
                                </svg>
                            </a>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-500 hover:text-slate-300 transition-colors p-1"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Message Log */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    {msg.sender === 'agent' && (
                                        <div className="flex flex-col gap-1.5 shrink-0 items-center">
                                            <div className="h-6 w-6 rounded bg-slate-900 flex items-center justify-center border border-slate-800">
                                                <Bot className="h-3.5 w-3.5 text-orange-500" />
                                            </div>
                                            {/* Micro-Speaker trigger to replay this individual block manually */}
                                            <button
                                                onClick={() => speakText(msg.text)}
                                                className="p-1 rounded bg-slate-900/60 hover:bg-slate-900 border border-slate-850 text-slate-500 hover:text-orange-400 transition-all cursor-pointer"
                                                title="Speak this response"
                                            >
                                                <Volume2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    )}
                                    <div
                                        className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                                            msg.sender === 'user'
                                                ? 'bg-orange-500 text-white rounded-tr-none'
                                                : 'bg-slate-900 text-slate-200 border border-slate-800/60 rounded-tl-none whitespace-pre-line'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex gap-2 max-w-[85%]">
                                    <div className="h-6 w-6 rounded bg-slate-900 flex items-center justify-center shrink-0 border border-slate-800">
                                        <Bot className="h-3.5 w-3.5 text-orange-500" />
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800/60 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1 text-slate-500 text-xs">
                                        <Loader2 className="h-3 w-3 animate-spin text-orange-500" />
                                        <span>AI Agent is typing...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Queries */}
                    <div className="px-4 py-2 bg-slate-900/40 border-t border-slate-900/60 flex flex-wrap gap-1.5 shrink-0">
                        <button
                            onClick={() => handleQuickQuery("Show smart locks")}
                            className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-[10px] text-slate-400 hover:text-orange-400 hover:border-orange-500/50 transition-colors cursor-pointer"
                        >
                            Smart Locks
                        </button>
                        <button
                            onClick={() => handleQuickQuery("What are 80mm pipe locks?")}
                            className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-[10px] text-slate-400 hover:text-orange-400 hover:border-orange-500/50 transition-colors cursor-pointer"
                        >
                            80mm Pipe Locks
                        </button>
                        <button
                            onClick={() => handleQuickQuery("Show heavy duty padlocks")}
                            className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-[10px] text-slate-400 hover:text-orange-400 hover:border-orange-500/50 transition-colors cursor-pointer"
                        >
                            Heavy Duty Locks
                        </button>
                    </div>

                    {/* Input Bar with Voice Transcription Mic */}
                    <div className="p-3 bg-slate-900 border-t border-slate-800">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend(input, 'text');
                            }}
                            className="flex items-center gap-2 bg-slate-950 border border-slate-850 focus-within:border-orange-500/80 rounded-xl px-3 py-1.5 transition-colors"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isListening ? "Listening to your voice..." : "Message AI Locksmith..."}
                                className="flex-1 bg-transparent border-0 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none"
                            />
                            
                            {/* Microphone / Speech-to-Text Button */}
                            <button
                                type="button"
                                onClick={toggleListening}
                                className={`h-7 w-7 rounded-lg border transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                                    isListening 
                                        ? 'bg-red-500/20 border-red-500/50 text-red-500 animate-pulse' 
                                        : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-200'
                                }`}
                                title={isListening ? "Stop listening" : "Speak instead of typing"}
                            >
                                {isListening ? (
                                    <MicOff className="h-3.5 w-3.5" />
                                ) : (
                                    <Mic className="h-3.5 w-3.5" />
                                )}
                            </button>

                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="h-7 w-7 rounded-lg bg-slate-900 hover:bg-orange-500 disabled:opacity-40 text-slate-400 hover:text-white transition-colors flex items-center justify-center shrink-0"
                            >
                                <Send className="h-3.5 w-3.5" />
                            </button>
                        </form>
                    </div>

                </div>
            )}
        </>
    );
}
