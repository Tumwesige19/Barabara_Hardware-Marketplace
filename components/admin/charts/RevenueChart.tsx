'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface RevenueChartProps {
    data: any[];
}

export function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="h-[400px] w-full bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Revenue & Orders Timeline</h3>
                    <p className="text-sm text-muted-foreground">Last 30 Days Performance</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary"></div>
                        <span>Revenue</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span>Orders</span>
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#131921" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#131921" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                        dy={10}
                        minTickGap={30}
                    />
                    <YAxis
                        yAxisId="left"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                        tickFormatter={(value) => `UGX ${(value / 1000000).toFixed(1)}M`}
                        dx={-10}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#666' }}
                        dx={10}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        formatter={(value: any, name: string) => [
                            name === 'revenue' ? formatCurrency(value) : value,
                            name === 'revenue' ? 'Revenue' : 'Orders'
                        ]}
                    />
                    <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#131921"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="orders"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
