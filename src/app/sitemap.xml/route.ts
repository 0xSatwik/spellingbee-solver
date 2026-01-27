import { NextResponse } from 'next/server';

// Helper function to format date as "january-27-2026"
function formatDateForURL(date: Date): string {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
}

// Helper function to generate date array for last N days
function getLastNDays(n: number): Date[] {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date);
    }
    return dates;
}

// Helper function to generate sitemap XML
function generateSitemap(): string {
    const baseUrl = 'https://sbsolver.online';
    const now = new Date().toISOString();

    interface Route {
        path: string;
        priority: string;
        changefreq: string;
        lastmod?: string;
    }

    // Define static routes with their priorities and change frequencies
    const staticRoutes: Route[] = [
        { path: '/', priority: '1.0', changefreq: 'daily' },
        { path: '/today', priority: '1.0', changefreq: 'daily' },
        { path: '/solver', priority: '1.0', changefreq: 'weekly' },
        { path: '/yesterday', priority: '0.9', changefreq: 'daily' },
        { path: '/archive', priority: '0.8', changefreq: 'weekly' },
        { path: '/stats', priority: '0.8', changefreq: 'weekly' },
        { path: '/articles', priority: '0.7', changefreq: 'weekly' },
        { path: '/about', priority: '0.5', changefreq: 'monthly' },
        { path: '/contact', priority: '0.5', changefreq: 'monthly' },
        { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
    ];

    // Generate dynamic answer pages for last 100 days
    const last100Days = getLastNDays(100);
    const dynamicRoutes: Route[] = last100Days.map((date, index) => {
        let priority = '0.7'; // Default for older answers
        if (index === 0) {
            priority = '1.0'; // Today's answer
        } else if (index < 7) {
            priority = '0.9'; // Last week
        }

        return {
            path: `/answer-for-${formatDateForURL(date)}`,
            priority,
            changefreq: 'daily',
            lastmod: index === 0 ? now : date.toISOString()
        };
    });

    // Combine all routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const route of allRoutes) {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
        xml += `    <lastmod>${route.lastmod || now}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += '  </url>\n';
    }

    xml += '</urlset>';
    return xml;
}

export async function GET() {
    const sitemap = generateSitemap();

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
    });
}
