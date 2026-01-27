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

// Helper function to generate RSS feed
function generateRSSFeed(): string {
    const baseUrl = 'https://sbsolver.online';
    const now = new Date();

    // Get last 20 days for feed items
    const last20Days = getLastNDays(20);

    // Build RSS 2.0 XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
    xml += '  <channel>\n';
    xml += '    <title>Spelling Bee Solver - Daily Answers</title>\n';
    xml += '    <link>https://sbsolver.online</link>\n';
    xml += '    <description>Daily NYT Spelling Bee puzzle answers and solutions</description>\n';
    xml += '    <language>en-us</language>\n';
    xml += `    <lastBuildDate>${now.toUTCString()}</lastBuildDate>\n`;
    xml += '    <atom:link href="https://sbsolver.online/feed.xml" rel="self" type="application/rss+xml" />\n';

    for (const date of last20Days) {
        const urlDate = formatDateForURL(date);
        const displayDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        xml += '    <item>\n';
        xml += `      <title>Spelling Bee Answer for ${displayDate}</title>\n`;
        xml += `      <link>${baseUrl}/answer-for-${urlDate}</link>\n`;
        xml += `      <description>Find the complete solution and word list for NYT Spelling Bee puzzle on ${displayDate}</description>\n`;
        xml += `      <pubDate>${date.toUTCString()}</pubDate>\n`;
        xml += `      <guid isPermaLink="true">${baseUrl}/answer-for-${urlDate}</guid>\n`;
        xml += '    </item>\n';
    }

    xml += '  </channel>\n';
    xml += '</rss>';
    return xml;
}

export async function GET() {
    const feed = generateRSSFeed();

    return new NextResponse(feed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        },
    });
}
