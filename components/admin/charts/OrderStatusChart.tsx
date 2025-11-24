'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface OrderStatusChartProps {
    data: any[];
    slaPercentage: number;
}

export function OrderStatusChart({ data, slaPercentage }: OrderStatusChartProps) {
    const totalOrders = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="h-[400px] w-full bg-white p-4 rounded-xl border shadow-sm flex flex-col">
            <div className="mb-2">
                <h3 className="text-lg font-semibold">Order Health</h3>
                <p className="text-sm text-muted-foreground">Status Distribution</p>
            </div>

            <div className="flex-1 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value, entry: any) => (
                                <span className="text-sm text-gray-600 ml-1">{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mb-8">
                    <div className="text-3xl font-bold text-gray-900">{totalOrders}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total</div>
                </div>
            </div>

            {/* SLA Indicator */}
            <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <div className="text-sm font-medium text-gray-900">Delivery SLA</div>
                        <div className="text-xs text-muted-foreground">Target: 48 hours</div>
                    </div>
                    <div className={`text-xl font-bold ${slaPercentage >= 90 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {slaPercentage}%
                    </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-500 ${slaPercentage >= 90 ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${slaPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
