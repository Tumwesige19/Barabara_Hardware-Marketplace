import { getAnalyticsData } from '@/app/actions';
import { RevenueChart } from '@/components/admin/charts/RevenueChart';
import { OrderStatusChart } from '@/components/admin/charts/OrderStatusChart';
import { TopProductsChart } from '@/components/admin/charts/TopProductsChart';
import { PaymentMethodsChart } from '@/components/admin/charts/PaymentMethodsChart';
import { UgandaDistrictMap } from '@/components/admin/charts/UgandaDistrictMap';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function AnalyticsPage() {
    const { 
        dailyStats, 
        statusStats, 
        slaPercentage,
        topProducts,
        categoryStats,
        paymentStats,
        districtStats
    } = await getAnalyticsData();

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

            {/* Phase 2: Sales Channels & Products */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <TopProductsChart products={topProducts} categories={categoryStats} />
                </div>
                <div className="lg:col-span-1">
                    <PaymentMethodsChart data={paymentStats} />
                </div>
            </div>

            {/* Phase 3: Uganda District Map */}
            <UgandaDistrictMap data={districtStats} />
        </div>
    );
}
