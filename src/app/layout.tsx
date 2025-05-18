import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import MobileMenu from "@/components/MobileMenu";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "SbAnswer | NYT Spelling Bee Tools & Resources",
  description: "The ultimate resource for NYT Spelling Bee enthusiasts. Access our solver, today's answers, tips, articles, and more.",
  keywords: "spelling bee, nyt, new york times, spelling bee solver, pangrams, word game, puzzle solver",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex min-h-screen flex-col bg-gray-50">
          <header className="bg-gradient-to-r from-yellow-400 to-amber-500 p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
              <Link href="/" className="flex items-center group">
                <div className="relative px-1 py-1 flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-200 rotate-45 mr-2 transform transition-transform group-hover:rotate-[225deg] duration-500 flex items-center justify-center">
                    <span className="text-amber-600 font-bold text-sm md:text-base -rotate-45 transform transition-transform group-hover:rotate-[135deg] duration-500">SB</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-md transition-colors">
                    <span className="text-3xl md:text-5xl font-black relative z-10">S</span>
                    <span className="relative z-10">b</span>
                    <span className="text-3xl md:text-5xl font-black relative z-10">A</span>
                    <span className="relative z-10">nswer</span>
                    <span className="absolute -top-1 -right-2 w-3 h-3 bg-yellow-200 rounded-full animate-pulse"></span>
                  </div>
                  <span className="block h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </div>
              </Link>
              
              {/* Desktop Navigation - hidden on mobile */}
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-white hover:text-yellow-100 font-medium transition">Home</Link>
                <Link href="/solver" className="text-white hover:text-yellow-100 font-medium transition">Solver</Link>
                <Link href="/today" className="text-white hover:text-yellow-100 font-medium transition">Today&apos;s Answers</Link>
                <Link href="/yesterday" className="text-white hover:text-yellow-100 font-medium transition">Yesterday</Link>
                <Link href="/archive" className="text-white hover:text-yellow-100 font-medium transition">Archive</Link>
                <Link href="/stats" className="text-white hover:text-yellow-100 font-medium transition">Stats</Link>
                <Link href="/articles" className="text-white hover:text-yellow-100 font-medium transition">Articles</Link>
              </div>
              
              {/* Mobile Menu Button - only visible on mobile */}
              <div className="md:hidden">
                <MobileMenu />
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {children}
            </div>
          </main>
          <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-yellow-300 rotate-45 mr-3 flex items-center justify-center">
                      <span className="text-amber-600 font-bold text-sm -rotate-45">SB</span>
                    </div>
                    <h3 className="text-xl font-bold">
                      <span className="text-2xl">S</span>b<span className="text-2xl">A</span>nswer
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Your ultimate resource for the Spelling Bee puzzle with tools, solutions, and strategies.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-yellow-300 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-yellow-300 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-300 hover:text-yellow-300 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-6.7c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2 1.2.54 1.2 1.2-.54 1.2-1.2 1.2zM17 17h-2v-3c0-.77-.22-1.3-1-1.3-.77 0-1 .53-1 1.3v3h-2V9h2v1.2c.13-.12.62-.8 2-.8 1.57 0 2 1.25 2 2.5V17z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Main Tools</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/solver" className="text-gray-300 hover:text-yellow-300 hover:underline text-sm transition">Solver</Link>
                    <Link href="/today" className="text-gray-300 hover:text-yellow-300 hover:underline text-sm transition">Today&apos;s Answers</Link>
                    <Link href="/yesterday" className="text-gray-300 hover:text-yellow-300 hover:underline text-sm transition">Yesterday</Link>
                    <Link href="/archive" className="text-gray-300 hover:text-yellow-300 hover:underline text-sm transition">Archive</Link>
                    <Link href="/stats" className="text-gray-300 hover:text-yellow-300 hover:underline text-sm transition">Stats</Link>
                    <Link href="/articles" className="text-gray-300 hover:text-yellow-300 hover:underline text-sm transition">Articles</Link>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Company</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/about" className="text-gray-300 hover:text-yellow-300 hover:underline text-sm transition">About Us</Link>
                    <Link href="/privacy" className="text-gray-300 hover:text-yellow-300 hover:underline text-sm transition">Privacy Policy</Link>
                    <Link href="/contact" className="text-gray-300 hover:text-yellow-300 hover:underline text-sm transition">Contact Us</Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-700 text-center">
                <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SbAnswer.com. All rights reserved.</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center">
                <span className="h-px w-10 bg-yellow-400"></span>
                <span className="mx-3 text-yellow-400">•</span>
                <span className="h-px w-10 bg-yellow-400"></span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
