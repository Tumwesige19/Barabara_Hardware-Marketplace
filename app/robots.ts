import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/admin/:path*', '/api/:path*'],
        },
        sitemap: 'https://www.barabara-hardware-marketplace.com/sitemap.xml',
    };
}
