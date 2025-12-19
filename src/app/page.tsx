"use client";

import Link from 'next/link'
import FAQ from '@/components/FAQ'

export default function Home() {
  // WebPage Schema with updated branding
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "SbSolver - NYT Spelling Bee Solver & Daily Answers",
    "description": "Free NYT Spelling Bee solver, daily answers, and practice puzzles. Get today's solutions, find all words and pangrams, improve your skills with our powerful tools.",
    "url": "https://sbsolver.online",
    "mainEntity": {
      "@type": "WebApplication",
      "name": "SbSolver - NYT Spelling Bee Solver",
      "applicationCategory": "GameApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Daily NYT Spelling Bee answers",
        "Puzzle solver with all possible words",
        "Pangram finder",
        "Historical puzzle archive",
        "Free practice mode"
      ]
    }
  };

  // FAQ data for homepage
  const faqItems = [
    {
      question: "What is the NYT Spelling Bee puzzle?",
      answer: "The NYT Spelling Bee is a daily word puzzle published by The New York Times. Players create words using seven letters arranged in a honeycomb pattern, with each word containing the center letter. The goal is to find as many valid words as possible to reach the maximum score and achieve Genius level."
    },
    {
      question: "How does SbSolver's Spelling Bee Solver work?",
      answer: "Our free Spelling Bee Solver analyzes the seven letters you provide and uses a comprehensive dictionary to find all valid words instantly. Simply enter your letters (with the center letter marked), and the solver displays all possible words, including pangrams that use all seven letters, helping you reach Genius level."
    },
    {
      question: "What is a pangram in Spelling Bee?",
      answer: "A pangram is a word that uses all seven letters from the puzzle at least once. Pangrams award bonus points (7 extra points) and are often the most challenging words to find. A perfect pangram uses each letter exactly once. Our solver clearly marks pangrams to help you identify them quickly."
    },
    {
      question: "Can I practice Spelling Bee for free on SbSolver?",
      answer: "Yes! SbSolver offers completely free practice puzzles that work just like the NYT Spelling Bee. You can play unlimited practice games to improve your vocabulary, learn new word patterns, and develop better strategies without any subscription or payment."
    },
    {
      question: "How often are the NYT Spelling Bee answers updated on SbSolver?",
      answer: "We update our answers daily as soon as the new NYT Spelling Bee puzzle is released (typically at 3 AM ET). You can always find today's answers, yesterday's solutions, and browse our complete archive of past puzzles with full word lists and pangrams."
    },
    {
      question: "Is SbSolver affiliated with The New York Times?",
      answer: "No, SbSolver (sbsolver.online) is an independent, free resource created by Spelling Bee enthusiasts. We are not affiliated with, endorsed by, or connected to The New York Times or the official NYT Spelling Bee game. Spelling Bee is a trademark of The New York Times Company."
    }
  ];

  return (
    <>
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="max-w-7xl mx-auto px-3 py-4 sm:px-6">
        {/* Hero Section - Premium Design */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-3xl overflow-hidden shadow-2xl">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-3/5 text-white">
                  <div className="inline-block mb-4">
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                      🐝 #1 Free NYT Spelling Bee Tool
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                    NYT Spelling Bee <br />
                    <span className="relative inline-block">
                      Solver & Answers
                      <span className="absolute -bottom-2 left-0 w-full h-3 bg-white/30 -skew-x-12"></span>
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-yellow-50 leading-relaxed">
                    Get instant solutions, find all words & pangrams, and master today's NYT Spelling Bee puzzle for free!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/solver"
                      className="group bg-white text-amber-600 hover:bg-yellow-50 font-bold rounded-xl px-8 py-4 text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                    >
                      <span className="flex items-center gap-2">
                        🔍 Use Solver Now
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </Link>
                    <Link
                      href="/today"
                      className="bg-amber-900 hover:bg-amber-950 text-white font-bold rounded-xl px-8 py-4 text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                    >
                      📅 Today's Answers
                    </Link>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-black">Free</div>
                      <div className="text-sm text-yellow-100">Always</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black">Daily</div>
                      <div className="text-sm text-yellow-100">Updates</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black">100%</div>
                      <div className="text-sm text-yellow-100">Accurate</div>
                    </div>
                  </div>
                </div>

                {/* Animated Honeycomb Visual */}
                <div className="md:w-2/5 flex justify-center">
                  <div className="relative w-72 h-72">
                    <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="absolute inset-8 bg-white rounded-full shadow-2xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-black text-amber-600 mb-2">Sb</div>
                        <div className="text-xl font-bold text-yellow-600">Solver</div>
                        <div className="text-sm text-gray-600 mt-1">sbsolver.online</div>
                      </div>
                    </div>
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 animate-bounce">
                      <span className="text-3xl font-black text-amber-600">A</span>
                    </div>
                    <div className="absolute -bottom-6 left-4 w-14 h-14 bg-yellow-300 rounded-2xl shadow-xl flex items-center justify-center transform -rotate-6 animate-bounce" style={{ animationDelay: '0.2s' }}>
                      <span className="text-2xl font-black text-white">🐝</span>
                    </div>
                    <div className="absolute top-12 -left-6 w-12 h-12 bg-orange-400 rounded-2xl shadow-xl flex items-center justify-center transform rotate-3 animate-bounce" style={{ animationDelay: '0.4s' }}>
                      <span className="text-2xl font-black text-white">S</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Cards - Modern Grid */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10 text-gray-900">
            Free NYT Spelling Bee <span className="text-amber-600">Tools & Solutions</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Solver Card */}
            <Link href="/solver" className="group">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                <div className="bg-white/20 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-2">Puzzle Solver</h3>
                <p className="text-yellow-100 text-sm">Find all valid words & pangrams instantly</p>
              </div>
            </Link>

            {/* Today Card */}
            <Link href="/today" className="group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                <div className="bg-white/20 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-2">Today's Answers</h3>
                <p className="text-green-100 text-sm">Complete solution for today's puzzle</p>
              </div>
            </Link>

            {/* Yesterday Card */}
            <Link href="/yesterday" className="group">
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                <div className="bg-white/20 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-2">Yesterday</h3>
                <p className="text-purple-100 text-sm">Previous puzzle solutions</p>
              </div>
            </Link>

            {/* Archive Card */}
            <Link href="/archive" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                <div className="bg-white/20 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black mb-2">Puzzle Archive</h3>
                <p className="text-blue-100 text-sm">Access past puzzles & solutions</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
              <h2 className="text-3xl font-black text-white text-center">Why Choose SbSolver?</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
                    <span className="text-3xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Instant Results</h3>
                  <p className="text-gray-600">Get all possible words and pangrams in seconds with our lightning-fast solver</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">100% Accurate</h3>
                  <p className="text-gray-600">Updated daily with verified solutions matching the official NYT puzzle</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Always Free</h3>
                  <p className="text-gray-600">No subscription, no hidden fees - completely free Spelling Bee help forever</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats & Insights */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Puzzle Statistics & Insights</h2>
              <p className="text-xl text-cyan-100">Explore patterns, trends, and records from thousands of puzzles</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black mb-2">2000+</div>
                <div className="text-cyan-100">Puzzles Solved</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black mb-2">50K+</div>
                <div className="text-cyan-100">Words Found</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black mb-2">Daily</div>
                <div className="text-cyan-100">Updates</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black mb-2">Free</div>
                <div className="text-cyan-100">Forever</div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/stats" className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl px-8 py-4 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                View Full Statistics →
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-gray-900">
            How to Use <span className="text-amber-600">SbSolver</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-8 border-2 border-amber-200 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 mt-4">Enter Letters</h3>
                <p className="text-gray-700">Input the 7 letters from today's NYT Spelling Bee puzzle, marking the center letter</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border-2 border-green-200 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 mt-4">Get Solutions</h3>
                <p className="text-gray-700">Instantly receive all valid words, pangrams, and point values for the puzzle</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border-2 border-blue-200 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 mt-4">Reach Genius</h3>
                <p className="text-gray-700">Use our solutions to achieve Genius level and find all hidden words & pangrams</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <FAQ items={faqItems} />
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Ready to Solve Today's NYT Spelling Bee?
            </h2>
            <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Join thousands of players using SbSolver to find all words, discover pangrams, and reach Genius level every day!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/solver" className="bg-white text-amber-600 hover:bg-yellow-50 font-black rounded-xl px-10 py-5 text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                Start Solving Now →
              </Link>
              <Link href="/today" className="bg-amber-900 hover:bg-amber-950 text-white font-black rounded-xl px-10 py-5 text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                View Today's Answers
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
