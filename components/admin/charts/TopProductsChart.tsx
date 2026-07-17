'use client';

import { formatCurrency } from '@/lib/utils';
import { Sparkles, Package } from 'lucide-react';

interface TopProductsChartProps {
    products: any[];
    categories: any[];
}

export function TopProductsChart({ products, categories }: TopProductsChartProps) {
    const totalProductSales = products.reduce((acc, curr) => acc + curr.quantity, 0);
    const maxQty = Math.max(...products.map(p => p.quantity), 1);

    return (
        <div className="bg-white p-6 rounded-xl border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Products */}
            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-5 w-5 text-orange-500" />
                        <h3 className="text-lg font-bold text-slate-800">Top Products</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Most sold items by quantity</p>
                </div>

                <div className="space-y-4">
                    {products.map((product, idx) => (
                        <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-700 truncate max-w-[200px]" title={product.name}>
                                    {idx + 1}. {product.name}
                                </span>
                                <span className="text-slate-900 font-extrabold shrink-0">
                                    {product.quantity} units · <span className="text-orange-500">{formatCurrency(product.revenue)}</span>
                                </span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div 
                                    className="bg-orange-500 h-2 rounded-full transition-all duration-700"
                                    style={{ width: `${(product.quantity / maxQty) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l md:pl-8 pt-6 md:pt-0">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Package className="h-5 w-5 text-indigo-500" />
                        <h3 className="text-lg font-bold text-slate-800">Category Distribution</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Sales weight per product group</p>
                </div>

                <div className="space-y-4">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:shadow-sm transition-all">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${
                                    idx % 2 === 0 ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                                }`}>
                                    {cat.name[0]}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-800">{cat.name}</h4>
                                    <p className="text-[10px] text-muted-foreground font-medium">{cat.value} items sold</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-black text-slate-900">{formatCurrency(cat.revenue)}</span>
                                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                                    {((cat.value / (totalProductSales || 1)) * 100).toFixed(0)}% contribution
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
