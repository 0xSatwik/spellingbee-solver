import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sbsolver.online'),
  title: {
    default: "Spelling Bee Solver | NYT Answers, Tools & Resources",
    template: "%s | Spelling Bee Solver"
  },
  description: "The ultimate free resource for NYT Spelling Bee enthusiasts. Get today's answers, use our powerful solver, access historical puzzles, and improve your skills with practice mode.",
  keywords: [
    "spelling bee",
    "nyt spelling bee",
    "new york times spelling bee",
    "spelling bee solver",
    "spelling bee answers",
    "spelling bee today",
    "pangrams",
    "word game",
    "puzzle solver",
    "spelling bee hints",
    "spelling bee archive",
    "daily spelling bee",
    "free spelling bee solver"
  ],
  authors: [{ name: "Spelling Bee Solver Team" }],
  creator: "Spelling Bee Solver",
  publisher: "Spelling Bee Solver",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sbsolver.online",
    siteName: "Spelling Bee Solver - NYT Solutions & Tools",
    title: "Spelling Bee Solver | NYT Answers, Tools & Resources",
    description: "The ultimate free resource for NYT Spelling Bee enthusiasts. Get today's answers, use our powerful solver, and improve your skills.",
    images: [
      {
        url: "/og-image.png", // You can create this image later
        width: 1200,
        height: 630,
        alt: "Spelling Bee Solver - NYT Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Spelling Bee Solver | NYT Answers & Tools",
    description: "The ultimate free resource for NYT Spelling Bee enthusiasts. Get today's answers, use our powerful solver, and improve your skills.",
    images: ["/og-image.png"], // Same image as Open Graph
    creator: "@sbanswer", // Update with actual Twitter handle if available
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', // Replace with actual code from Google Search Console
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Spelling Bee Solver",
    "url": "https://sbsolver.online",
    "logo": "https://sbsolver.online/logo.png",
    "description": "The ultimate resource for NYT Spelling Bee solutions, tools, and practice puzzles.",
    "sameAs": [
      // Add your social media URLs here when available
      "https://facebook.com/sbanswer",
      "https://twitter.com/sbanswer"
    ]
  };

  // WebSite Schema with Search Action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Spelling Bee Solver",
    "url": "https://sbsolver.online",
    "description": "NYT Spelling Bee solver, answers, and tools",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://sbsolver.online/solver?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FMYSSNL9S2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FMYSSNL9S2');
          `}
        </Script>
      </head>
      <body className={poppins.className} suppressHydrationWarning>
        <div className="flex min-h-screen flex-col bg-gray-50">
          {/* Enhanced Header */}
          <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 shadow-lg">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16 md:h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center group">
                  <div className="relative flex items-center gap-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform rotate-45 transition-all duration-500 group-hover:rotate-[405deg] group-hover:scale-110">
                      <span className="text-amber-600 font-black text-lg md:text-xl -rotate-45 transform transition-transform duration-500 group-hover:-rotate-[405deg]">SB</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl md:text-3xl font-black text-white drop-shadow-lg tracking-tight">
                        SbSolver
                      </span>
                      <span className="text-xs text-yellow-100 -mt-1 font-medium">NYT Spelling Bee</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                  <Link href="/" className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium hover:scale-105 transform">
                    Home
                  </Link>
                  <Link href="/solver" className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium hover:scale-105 transform">
                    Solver
                  </Link>
                  <Link href="/today" className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium hover:scale-105 transform">
                    Today
                  </Link>
                  <Link href="/yesterday" className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium hover:scale-105 transform">
                    Yesterday
                  </Link>
                  <Link href="/archive" className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium hover:scale-105 transform">
                    Archive
                  </Link>
                  <Link href="/stats" className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium hover:scale-105 transform">
                    Stats
                  </Link>
                  <Link href="/articles" className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 font-medium hover:scale-105 transform">
                    Articles
                  </Link>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <MobileMenu />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content with proper padding to prevent overlapping */}
          <main className="flex-grow pt-4 pb-8">
            {children}
          </main>
          <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
            <div className="container mx-auto px-4 py-12">
              {/* Top Section with decorative element */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-400"></span>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-yellow-400 rounded-xl rotate-45 flex items-center justify-center shadow-lg">
                      <span className="text-gray-900 font-black text-lg -rotate-45">SB</span>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-black text-white">SbSolver</div>
                      <div className="text-sm text-yellow-400 -mt-1">NYT Spelling Bee</div>
                    </div>
                  </div>
                  <span className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-400"></span>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
                  Your ultimate resource for NYT Spelling Bee with powerful tools, daily solutions, and expert strategies to help you reach Genius level!
                </p>
              </div>

              {/* Main Footer Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-yellow-400">🚀 Quick Tools</h3>
                  <div className="space-y-2">
                    <Link href="/solver" className="block text-gray-300 hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 text-sm">
                      🔍 Puzzle Solver
                    </Link>
                    <Link href="/today" className="block text-gray-300 hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 text-sm">
                      📅 Today's Answers
                    </Link>
                    <Link href="/yesterday" className="block text-gray-300 hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 text-sm">
                      ⏮️ Yesterday's Puzzle
                    </Link>
                    <Link href="/archive" className="block text-gray-300 hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 text-sm">
                      📚 Puzzle Archive
                    </Link>
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-yellow-400">📖 Resources</h3>
                  <div className="space-y-2">
                    <Link href="/stats" className="block text-gray-300 hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 text-sm">
                      📊 Statistics & Insights
                    </Link>
                    <Link href="/articles" className="block text-gray-300 hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 text-sm">
                      📝 Tips & Strategies
                    </Link>
                    <Link href="/about" className="block text-gray-300 hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 text-sm">
                      ℹ️ About Us
                    </Link>
                    <Link href="/contact" className="block text-gray-300 hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 text-sm">
                      ✉️ Contact Support
                    </Link>
                  </div>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-yellow-400">⚖️ Legal</h3>
                  <div className="space-y-2">
                    <Link href="/privacy" className="block text-gray-300 hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 text-sm">
                      🔒 Privacy Policy
                    </Link>
                    <p className="text-gray-400 text-xs leading-relaxed mt-4">
                      Not affiliated with The New York Times. "Spelling Bee" is a trademark of The New York Times Company.
                    </p>
                  </div>
                </div>

                {/* Connect */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-yellow-400">🔗 Connect</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Follow us for updates, tips, and daily puzzle insights!
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 flex items-center justify-center transform hover:scale-110 transition-all duration-200 shadow-lg"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 flex items-center justify-center transform hover:scale-110 transition-all duration-200 shadow-lg"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center transform hover:scale-110 transition-all duration-200 shadow-lg"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="border-t border-gray-700 pt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-gray-400 text-sm text-center sm:text-left">
                    © {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">sbsolver.online</span>. All rights reserved.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Made with</span>
                    <span className="text-red-500 animate-pulse">❤️</span>
                    <span>for Spelling Bee fans</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html >
  );
}
