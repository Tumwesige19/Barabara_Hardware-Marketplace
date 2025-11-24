import { getAnalyticsData } from '@/app/actions';
import { RevenueChart } from '@/components/admin/charts/RevenueChart';
import { OrderStatusChart } from '@/components/admin/charts/OrderStatusChart';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function AnalyticsPage() {
    const { dailyStats, statusStats, slaPercentage } = await getAnalyticsData();

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/admin" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                    <p className="text-muted-foreground">Deep dive into your business performance.</p>
                </div>
            </div>

            {/* Phase 1: Heartbeat & Health */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Revenue & Orders Timeline (Big Chart) */}
                <div className="lg:col-span-2">
                    <RevenueChart data={dailyStats} />
                </div>

                {/* Operations Health Bar */}
                <div className="lg:col-span-1">
                    <OrderStatusChart data={statusStats} slaPercentage={slaPercentage} />
                </div>
            </div>

            {/* Placeholder for Phase 2 & 3 */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="h-[300px] rounded-xl border border-dashed flex items-center justify-center text-muted-foreground bg-muted/20">
                    Top Products & Categories (Phase 2)
                </div>
                <div className="h-[300px] rounded-xl border border-dashed flex items-center justify-center text-muted-foreground bg-muted/20">
                    Payment Methods & Issues (Phase 2)
                </div>
            </div>

            <div className="h-[400px] rounded-xl border border-dashed flex items-center justify-center text-muted-foreground bg-muted/20">
                Uganda District Map (Phase 3)
            </div>
        </div>
    );
}
