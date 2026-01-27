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
  icons: {
    icon: "/spelling-bee-solver.webp",
    shortcut: "/spelling-bee-solver.webp",
    apple: "/spelling-bee-solver.webp",
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
        url: "/sbsolver.webp",
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
    images: ["/sbsolver.webp"], // Same image as Open Graph
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
    "logo": "https://sbsolver.online/spelling-bee-solver.webp",
    "description": "The ultimate resource for NYT Spelling Bee solutions, tools, and practice puzzles.",
    "sameAs": [
      "https://www.facebook.com/sbsolver/",
      "https://www.reddit.com/r/sbsolver/",
      "https://www.pinterest.com/sbsolver/",
      "https://www.linkedin.com/company/sbsolver/",
      "https://t.me/sbsolver"
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
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.facebook.com/sbsolver/"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 flex items-center justify-center transform hover:scale-110 transition-all duration-200 shadow-lg"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.reddit.com/r/sbsolver/"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 flex items-center justify-center transform hover:scale-110 transition-all duration-200 shadow-lg"
                      aria-label="Reddit"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.71 0-1.35.282-1.82.737-2.03-1.428-4.79-2.345-7.83-2.479l1.41-6.635 4.62 1.054c.06.845.76 1.517 1.62 1.517 1.05 0 1.9-0.845 1.9-1.9s-0.85-1.9-1.9-1.9c-0.7 0-1.31.391-1.64 0.963l-4.99-1.139c-0.25-0.057-0.5 0.104-0.56 0.354l-1.57 7.38c-3.13 0.088-5.96 1.021-8.03 2.484-0.47-0.455-1.11-0.737-1.82-0.737-1.465 0-2.657 1.186-2.657 2.645 0 1.047 0.61 1.948 1.5 2.378-0.04 0.229-0.07 0.463-0.07 0.7 0 3.703 4.31 6.714 9.61 6.714s9.61-3.011 9.61-6.714c0-0.237-0.03-0.471-0.07-0.7 0.89-0.43 1.5-1.331 1.5-2.378zm-15.61 2.27c0-0.873 0.723-1.581 1.611-1.581s1.611 0.708 1.611 1.581c0 0.873-0.723 1.581-1.611 1.581s-1.611-0.708-1.611-1.581zm7.42 4.09c-0.79 0.782-2.22 1.137-3.81 1.137-1.59 0-3.02-0.355-3.81-1.137-0.19-0.188-0.19-0.493 0-0.686s0.5-0.193 0.69 0c0.59 0.584 1.83 0.875 3.12 0.875 1.29 0 2.53-0.291 3.12-0.875 0.19-0.193 0.5-0.193 0.69 0s0.19 0.498 0 0.686zm-0.21-2.509c-0.888 0-1.611-0.708-1.611-1.581 0-0.873 0.723-1.581 1.611-1.581s1.611 0.708 1.611 1.581c0 0.873-0.723 1.581-1.611 1.581z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.pinterest.com/sbsolver/"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 flex items-center justify-center transform hover:scale-110 transition-all duration-200 shadow-lg"
                      aria-label="Pinterest"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.72-.359-1.781c0-1.667.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.307.307 0 0 1 .074.272c-.094.387-.304 1.24-.344 1.403-.053.217-.175.263-.404.156-1.503-.699-2.442-2.9-2.442-4.661 0-3.793 2.757-7.277 7.948-7.277 4.173 0 7.414 2.974 7.414 6.948 0 4.145-2.613 7.485-6.242 7.485-1.219 0-2.364-.635-2.755-1.383 0 0-.604 2.298-.752 2.87-.272 1.04-.6 2.083-.9 3.111.83.255 1.714.393 2.631.393C18.677 24 24.03 18.633 24.03 12.013c0-6.62-5.353-11.987-11.983-11.987z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/sbsolver/"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center transform hover:scale-110 transition-all duration-200 shadow-lg"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href="https://t.me/sbsolver"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 flex items-center justify-center transform hover:scale-110 transition-all duration-200 shadow-lg"
                      aria-label="Telegram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.575-.531.767-.743.784-.461.042-.811-.301-1.259-.591-.702-.454-1.1-.736-1.781-1.182-.787-.514-.277-.797.171-1.261.117-.121 2.155-1.977 2.194-2.144.005-.021.01-.098-.036-.139-.046-.041-.113-.027-.162-.016-.069.015-1.168.741-3.291 2.171-.311.213-.593.318-.844.312-.276-.006-.807-.156-1.202-.284-.484-.157-.869-.241-.835-.509.017-.14.215-.284.591-.43 2.311-1.004 3.852-1.666 4.621-1.983 2.197-.905 2.654-1.06 2.951-1.065.065-.001.21.016.304.093.079.066.101.154.109.222.008.07.018.232.012.308z" />
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
