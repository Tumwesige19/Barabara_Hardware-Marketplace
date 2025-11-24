import { products } from '@/lib/data';
import { HeroCarousel } from '@/components/HeroCarousel';
import { HomeCards } from '@/components/HomeCards';
import { ProductRow } from '@/components/ProductRow';

export default function Home() {
  // Group products for rows
  const powerTools = products.filter(p => p.category === 'power-tools');
  const handTools = products.filter(p => p.category === 'hand-tools');
  const plumbing = products.filter(p => p.category === 'plumbing');
  const electrical = products.filter(p => p.category === 'electrical');
  const doorLocks = products.filter(p => p.category === 'door-locks');

  return (
    <div className="flex flex-col min-h-screen pb-8">
      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Main Content - Overlapping the Hero */}
      <div className="container mx-auto max-w-[1500px]">
        <HomeCards />

        {/* Product Rows */}
        <div className="flex flex-col gap-4">
          <ProductRow title="Best Sellers in Power Tools" products={powerTools} />
          <ProductRow title="Hand Tools for Every Job" products={handTools} />
          <ProductRow title="Plumbing Essentials" products={plumbing} />
          <ProductRow title="Electrical Supplies" products={electrical} />
          <ProductRow title="Secure Your Home with Door Locks" products={doorLocks} />
          <ProductRow title="More to Explore" products={products} />
        </div>
      </div>
    </div>
  );
}

