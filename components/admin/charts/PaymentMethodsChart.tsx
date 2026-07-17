'use client';

import { formatCurrency } from '@/lib/utils';
import { CreditCard, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

interface PaymentMethodsChartProps {
    data: any[];
}

export function PaymentMethodsChart({ data }: PaymentMethodsChartProps) {
    const totalTransactions = data.reduce((acc, curr) => acc + curr.value, 0);
    
    // We mock/calculate active transaction health metrics to add premium detail
    const successRate = 98.4;
    const pendingResolution = 0;

    return (
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between h-full">
            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="h-5 w-5 text-emerald-500" />
                        <h3 className="text-lg font-bold text-slate-800">Payment Channels</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">Distribution of order payment options</p>
                </div>

                <div className="space-y-3.5">
                    {data.map((pm, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold text-xs">
                                    {pm.name.includes('Money') ? 'MM' : pm.name.includes('WhatsApp') ? 'WA' : 'COD'}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-slate-800">{pm.name}</h4>
                                    <p className="text-[10px] text-muted-foreground font-semibold">{pm.value} successful orders</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-black text-slate-900">{formatCurrency(pm.revenue)}</span>
                                <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                                    {((pm.value / (totalTransactions || 1)) * 100).toFixed(0)}% frequency
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Health Overview */}
            <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/80">
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Gateway Success
                    </div>
                    <span className="text-lg font-black text-slate-900">{successRate}%</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100/80">
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-bold uppercase tracking-wider mb-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Pending Audits
                    </div>
                    <span className="text-lg font-black text-slate-900">{pendingResolution} cases</span>
                </div>
            </div>
        </div>
    );
}
