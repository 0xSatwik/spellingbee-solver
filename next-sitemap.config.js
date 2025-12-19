/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sbsolver.online',
  generateRobotsTxt: false, // We'll create a custom robots.txt
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  
  // Define custom priorities and change frequencies for different routes
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }
    
    // Today's answers change daily
    if (path === '/today' || path === '/yesterday') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }
    
    // Solver and other main tools
    if (path === '/solver' || path === '/archive' || path === '/stats') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }
    
    // Articles page changes frequently
    if (path === '/articles') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }
    
    // Static pages change rarely
    if (path === '/about' || path === '/contact' || path === '/privacy') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }
    
    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
  
  // Additional paths to include
  additionalPaths: async (config) => {
    const result = []
    
    // You can add dynamic paths here in the future
    // For example, individual article pages when they exist
    
    return result
  },
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
