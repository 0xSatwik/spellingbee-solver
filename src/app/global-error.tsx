'use client';

import { Poppins } from "next/font/google";
import Link from 'next/link';
import { useEffect } from "react";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"] 
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error occurred:', error);
  }, [error]);
  
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex min-h-screen flex-col bg-gray-50">
          <header className="bg-gradient-to-r from-yellow-400 to-amber-500 p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <div className="relative px-1 py-1 flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-200 rotate-45 mr-2 flex items-center justify-center">
                    <span className="text-amber-600 font-bold text-sm md:text-base -rotate-45">SB</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                    <span className="text-3xl md:text-5xl font-black relative z-10">S</span>
                    <span className="relative z-10">b</span>
                    <span className="text-3xl md:text-5xl font-black relative z-10">A</span>
                    <span className="relative z-10">nswer</span>
                  </div>
                </div>
              </Link>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Something Went Wrong</h1>
                <p className="text-gray-600 mb-6 max-w-md">
                  We're sorry, but there was an error loading this page. Our team has been notified.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition"
                  >
                    Try Again
                  </button>
                  <Link 
                    href="/" 
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
                  >
                    Go Back Home
                  </Link>
                </div>
              </div>
            </div>
          </main>
          <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-6">
            <div className="container mx-auto px-4 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-yellow-300 rotate-45 mr-2 flex items-center justify-center">
                  <span className="text-amber-600 font-bold text-xs -rotate-45">SB</span>
                </div>
                <h3 className="text-lg font-bold">
                  <span className="text-xl">S</span>b<span className="text-xl">A</span>nswer
                </h3>
              </div>
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SbAnswer.com. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 