'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { MapPin, Globe, Sparkles, Navigation } from 'lucide-react';

interface UgandaDistrictMapProps {
    data: any[];
}

export function UgandaDistrictMap({ data }: UgandaDistrictMapProps) {
    const [selectedDistrict, setSelectedDistrict] = useState<any>(data[0] || null);
    const totalSales = data.reduce((acc, curr) => acc + curr.value, 0);

    // Mock layout coordinates for hot spots on the stylized SVG map grid
    const mapCoordinates: any = {
        'Kampala': { x: 50, y: 55, color: '#f97316' },
        'Entebbe': { x: 48, y: 64, color: '#3b82f6' },
        'Wakiso': { x: 42, y: 51, color: '#10b981' },
        'Mukono': { x: 58, y: 53, color: '#a855f7' },
        'Other': { x: 52, y: 38, color: '#6b7280' }
    };

    return (
        <div className="bg-white p-6 rounded-xl border shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Map Column */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Globe className="h-5 w-5 text-indigo-500 animate-spin-slow" />
                            <h3 className="text-lg font-bold text-slate-800">Uganda Distribution Map</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">Geographical hot spots for hardware orders</p>
                    </div>
                </div>

                {/* Stylized Map Viewport */}
                <div className="relative h-[300px] bg-slate-950 rounded-2xl border border-slate-900 overflow-hidden flex items-center justify-center">
                    
                    {/* Glowing background grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                    <div className="absolute w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />

                    {/* Highly stylized SVG Abstract Uganda Map Outline */}
                    <svg className="w-full h-full max-h-[250px] text-slate-800/40 fill-none" viewBox="0 0 100 100">
                        {/* Abstract Polygon outline representing Uganda border */}
                        <polygon 
                            points="45,15 65,12 85,25 90,45 82,65 72,85 62,88 48,82 30,78 20,68 15,50 25,30 38,20" 
                            className="stroke-slate-800 stroke-[0.8] fill-slate-900/40"
                        />
                        {/* Lake Victoria Abstract representation */}
                        <path 
                            d="M 45,72 Q 55,68 62,75 T 75,70 Q 72,82 58,84 Z" 
                            className="fill-indigo-950/60 stroke-indigo-900/40 stroke-[0.5]"
                        />

                        {/* Interactive hotspot vectors */}
                        {data.map((dist, idx) => {
                            const coord = mapCoordinates[dist.name] || mapCoordinates['Other'];
                            const isSelected = selectedDistrict?.name === dist.name;

                            return (
                                <g 
                                    key={idx} 
                                    className="cursor-pointer group"
                                    onClick={() => setSelectedDistrict(dist)}
                                >
                                    {/* Pulse ring animation */}
                                    <circle 
                                        cx={coord.x} 
                                        cy={coord.y} 
                                        r={isSelected ? 6 : 4} 
                                        fill={coord.color} 
                                        opacity="0.3"
                                        className="animate-ping"
                                    />
                                    {/* Map point */}
                                    <circle 
                                        cx={coord.x} 
                                        cy={coord.y} 
                                        r={isSelected ? 3.5 : 2.5} 
                                        fill={coord.color} 
                                        className="transition-all duration-300 group-hover:scale-125"
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* HUD Overlay for selected point */}
                    {selectedDistrict && (
                        <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-xl p-3 text-white max-w-[200px] animate-fade-in">
                            <div className="flex items-center gap-1 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-0.5">
                                <Navigation className="h-3 w-3" />
                                Hotspot Active
                            </div>
                            <h4 className="text-xs font-black">{selectedDistrict.name}</h4>
                            <div className="text-[10px] text-slate-400 font-semibold mt-1">
                                {selectedDistrict.value} orders · <span className="text-white font-bold">{formatCurrency(selectedDistrict.revenue)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* List/Sidebar Column */}
            <div className="space-y-4 border-t lg:border-t-0 lg:border-l lg:pl-8 pt-6 lg:pt-0 flex flex-col justify-between">
                <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-3">District Breakdown</h4>
                    <div className="space-y-3">
                        {data.map((dist, idx) => {
                            const isSelected = selectedDistrict?.name === dist.name;
                            return (
                                <div 
                                    key={idx} 
                                    onClick={() => setSelectedDistrict(dist)}
                                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                        isSelected 
                                            ? 'bg-slate-900 text-white border-slate-800 shadow-md' 
                                            : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100/70'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <MapPin className={`h-4 w-4 shrink-0 ${isSelected ? 'text-orange-500' : 'text-slate-400'}`} />
                                        <span className="text-xs font-bold">{dist.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                                            {formatCurrency(dist.revenue)}
                                        </div>
                                        <div className={`text-[9px] font-semibold mt-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {dist.value} orders ({(dist.value / (totalSales || 1) * 100).toFixed(0)}%)
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-6 lg:mt-0 flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-indigo-500 shrink-0" />
                    <div>
                        <h4 className="text-xs font-black text-slate-800">Primary Core Zone</h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            Kampala area represents over <span className="font-semibold text-slate-700">70% of total revenue volume</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
