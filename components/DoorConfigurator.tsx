'use client';

import { useState } from 'react';
import { Shield, Sparkles, RefreshCw, Key, Eye } from 'lucide-react';

interface DoorConfiguratorProps {
    productImage: string;
    productName: string;
}

export function DoorConfigurator({ productImage, productName }: DoorConfiguratorProps) {
    const [doorMaterial, setDoorMaterial] = useState<'mahogany' | 'oak' | 'steel' | 'glass'>('mahogany');
    const [lockState, setLockState] = useState<'locked' | 'verifying' | 'unlocked'>('locked');

    const doorStyles = {
        mahogany: {
            name: 'Modern Mahogany',
            bg: 'bg-amber-900 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3),rgba(0,0,0,0.8))]',
            texture: 'border-amber-950',
            grain: 'radial-gradient(circle, rgba(120,53,4,0.15) 10%, transparent 80%)'
        },
        oak: {
            name: 'Classic Oak',
            bg: 'bg-yellow-800 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2),rgba(0,0,0,0.75))]',
            texture: 'border-yellow-950',
            grain: 'radial-gradient(circle, rgba(180,83,9,0.15) 10%, transparent 80%)'
        },
        steel: {
            name: 'Industrial Dark Steel',
            bg: 'bg-slate-800 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),rgba(0,0,0,0.85))]',
            texture: 'border-slate-900',
            grain: 'linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%)'
        },
        glass: {
            name: 'Frosted Privacy Glass',
            bg: 'bg-teal-950 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),rgba(0,0,0,0.9))]',
            texture: 'border-teal-900/60',
            grain: 'radial-gradient(circle, rgba(204,251,241,0.05) 10%, transparent 80%)'
        }
    };

    const handleSimulate = () => {
        if (lockState !== 'locked') return;
        setLockState('verifying');
        setTimeout(() => {
            setLockState('unlocked');
            setTimeout(() => {
                setLockState('locked');
            }, 3000);
        }, 1500);
    };

    const activeDoor = doorStyles[doorMaterial];

    return (
        <div className="bg-slate-950 rounded-2xl border border-slate-900 p-6 space-y-6 shadow-2xl relative overflow-hidden text-white">
            {/* Visual ambient glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-900">
                <div>
                    <span className="text-orange-500 text-[10px] font-extrabold uppercase tracking-widest mb-1.5 flex items-center gap-1">
                        <Sparkles className="h-3 w-3 animate-pulse" />
                        Interactive Showcase
                    </span>
                    <h3 className="text-base font-black tracking-tight text-white">
                        Virtual Door Previewer
                    </h3>
                </div>
                
                {/* Selector */}
                <div className="flex flex-wrap gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                    {(Object.keys(doorStyles) as Array<keyof typeof doorStyles>).map((key) => (
                        <button
                            key={key}
                            onClick={() => setDoorMaterial(key)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                doorMaterial === key
                                    ? 'bg-slate-800 text-white shadow-md border border-slate-700/50'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            {doorStyles[key].name.split(' ')[1]}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                {/* Visual Simulation Display */}
                <div className="lg:col-span-3 flex justify-center">
                    <div className={`relative w-[220px] h-[340px] rounded-xl border-[6px] ${activeDoor.texture} shadow-2xl overflow-hidden transition-all duration-500 ${activeDoor.bg}`}>
                        
                        {/* Door panels details for premium realism */}
                        <div className="absolute inset-2 border border-black/10 rounded-md pointer-events-none" />
                        <div className="absolute inset-y-0 right-1.5 w-[3px] bg-black/15 pointer-events-none" />
                        <div className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-20 border border-black/5 rounded pointer-events-none" />
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-20 border border-black/5 rounded pointer-events-none" />
                        
                        {/* Smart Handle Lock overlaid dynamically */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-48 flex items-center justify-center transition-all duration-300">
                            <img
                                src={productImage}
                                alt={productName}
                                className={`w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)] transition-transform duration-500 ${
                                    lockState === 'unlocked' ? 'rotate-[15deg] scale-[1.03]' : ''
                                }`}
                            />

                            {/* LED Light Ring indicator */}
                            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-[2px] transition-all duration-300 flex items-center justify-center pointer-events-none shadow-[0_0_10px_currentColor]" style={{
                                color: lockState === 'locked' ? '#ef4444' : lockState === 'verifying' ? '#eab308' : '#22c55e',
                                borderColor: 'currentColor',
                                backgroundColor: lockState === 'verifying' ? 'rgba(234,179,8,0.1)' : 'transparent'
                            }}>
                                {lockState === 'verifying' && (
                                    <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                                )}
                            </div>
                        </div>

                        {/* Status alert Overlay */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-slate-950/80 border border-slate-800/80 rounded-full px-3 py-1 backdrop-blur-sm pointer-events-none">
                            <span className={`text-[8px] font-black uppercase tracking-widest ${
                                lockState === 'locked' ? 'text-red-400' : lockState === 'verifying' ? 'text-yellow-400' : 'text-emerald-400'
                            }`}>
                                {lockState === 'locked' ? '● Securely Locked' : lockState === 'verifying' ? '● Authorizing...' : '🔑 Access Granted'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Simulation Control Interface */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-200">Door material:</h4>
                        <p className="text-[10px] text-slate-500 font-semibold">{activeDoor.name}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-3.5 space-y-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                <Shield className="h-3.5 w-3.5 text-orange-500" />
                                Security Sandbox
                            </span>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                                See how the handle integrates on the door. Simulate verification to test biometric indicator behavior.
                            </p>
                        </div>

                        <button
                            onClick={handleSimulate}
                            disabled={lockState !== 'locked'}
                            className="w-full bg-slate-800 hover:bg-orange-500 disabled:bg-slate-900 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all border border-slate-700/50 hover:border-orange-400 disabled:border-slate-800/40 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            {lockState === 'locked' && (
                                <>
                                    <Key className="h-3.5 w-3.5" />
                                    Test Unlock Indicator
                                </>
                            )}
                            {lockState === 'verifying' && (
                                <>
                                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                    Verifying Fingerprint...
                                </>
                            )}
                            {lockState === 'unlocked' && (
                                <>
                                    <Eye className="h-3.5 w-3.5" />
                                    Door Handle Rotated!
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
