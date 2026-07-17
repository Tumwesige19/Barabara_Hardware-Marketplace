import { MetadataRoute } from 'next';
import { products } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.barabara-hardware-marketplace.com';

    // Generate dynamic product sitemap URLs
    const productUrls = products.map(product => ({
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Static page sitemap entries
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cart`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/checkout`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        }
    ];

    return [...staticPages, ...productUrls];
}
