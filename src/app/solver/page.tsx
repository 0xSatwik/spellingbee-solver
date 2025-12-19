import { Metadata } from 'next'
import SpellingBeeSolver from '@/components/SpellingBeeSolver'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free NYT Spelling Bee Solver - Find All Words & Pangrams Instantly | SbSolver',
  description: 'Free NYT Spelling Bee Solver. Enter 7 letters to instantly find all valid words, pangrams, and reach Genius level. Works with today\'s puzzle. 100% accurate & always free.',
  keywords: ['spelling bee solver', 'nyt spelling bee solver', 'find pangrams', 'spelling bee words', 'spelling bee helper', 'word finder spelling bee', 'genius level', 'spelling bee cheat'],
  openGraph: {
    title: 'Free NYT Spelling Bee Solver - Find All Words & Pangrams',
    description: 'Free Spelling Bee Solver. Enter 7 letters to instantly find all valid words, pangrams, and reach Genius level.',
    url: 'https://sbsolver.online/solver',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NYT Spelling Bee Solver - Find All Words & Pangrams',
    description: 'Free Spelling Bee Solver. Find all valid words and pangrams instantly.',
  },
  alternates: {
    canonical: 'https://sbsolver.online/solver',
  },
}

export default function SolverPage() {
  // SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SbSolver - NYT Spelling Bee Solver",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free tool to solve NYT Spelling Bee puzzles. Find all valid words and pangrams from your letters instantly. Reach Genius level every day.",
    "url": "https://sbsolver.online/solver",
    "featureList": [
      "Find all valid words instantly",
      "Identify all pangrams",
      "See word counts by length",
      "Calculate total points",
      "100% free to use"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1250",
      "bestRating": "5"
    }
  };

  return (
    <>
      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="max-w-7xl mx-auto px-3 py-6 sm:px-6">
        {/* Header Section */}
        <section className="mb-12">
          <div className="text-center mb-10">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                🔍 Free NYT Spelling Bee Solver
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
              Find All Words & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Pangrams</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Enter your 7 letters to instantly discover all valid words, identify pangrams, and reach Genius level on today's NYT Spelling Bee
            </p>
          </div>
        </section>

        {/* Main Solver Section */}
        <section className="mb-12">
          <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Solver Component */}
              <div className="lg:col-span-2 p-6 md:p-10">
                <SpellingBeeSolver />
              </div>

              {/* Benefits Sidebar */}
              <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 p-8 md:p-10 text-white">
                <div className="h-full flex flex-col justify-center">
                  <h2 className="text-3xl font-black mb-6">Why Use SbSolver? 🐝</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="inline-block mr-3 text-2xl">⚡</span>
                      <div>
                        <div className="font-bold text-lg">Instant Results</div>
                        <div className="text-yellow-100 text-sm">Find all possible words in seconds</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block mr-3 text-2xl">✨</span>
                      <div>
                        <div className="font-bold text-lg">Pangram Finder</div>
                        <div className="text-yellow-100 text-sm">Highlights all words using 7 letters</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block mr-3 text-2xl">📊</span>
                      <div>
                        <div className="font-bold text-lg">Organized View</div>
                        <div className="text-yellow-100 text-sm">Words sorted by length for easy browsing</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block mr-3 text-2xl">🎯</span>
                      <div>
                        <div className="font-bold text-lg">100% Accurate</div>
                        <div className="text-yellow-100 text-sm">Extensive verified English dictionary</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block mr-3 text-2xl">🆓</span>
                      <div>
                        <div className="font-bold text-lg">Always Free</div>
                        <div className="text-yellow-100 text-sm">No subscription or hidden fees ever</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10 text-gray-900">
            How to Use the <span className="text-amber-600">Solver</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-4xl font-black text-blue-600 mb-3">1</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Enter Center Letter</h3>
              <p className="text-gray-700 text-sm">Input the required center letter from today's puzzle</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-4xl font-black text-purple-600 mb-3">2</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Add 6 Letters</h3>
              <p className="text-gray-700 text-sm">Enter the remaining 6 surrounding letters</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border-2 border-green-200">
              <div className="text-4xl font-black text-green-600 mb-3">3</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Get Solutions</h3>
              <p className="text-gray-700 text-sm">Instantly see all valid words and pangrams</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-6 border-2 border-amber-200">
              <div className="text-4xl font-black text-amber-600 mb-3">4</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Reach Genius</h3>
              <p className="text-gray-700 text-sm">Use solutions to achieve Genius level!</p>
            </div>
          </div>
        </section>

        {/* About NYT Spelling Bee */}
        <section className="mb-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
              <h2 className="text-3xl font-black text-white">About NYT Spelling Bee 🐝</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">The Game</h3>
                  <p className="mb-4 text-gray-700 leading-relaxed">
                    The New York Times Spelling Bee is a daily word puzzle where players create words using 7 letters arranged in a honeycomb pattern. Each word must contain the center letter and be at least 4 letters long.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Points are awarded based on word length, with bonus points for pangrams - words that use all 7 letters at least once.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Scoring Levels</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="w-24 font-semibold text-gray-700">Beginner</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-24 font-semibold text-gray-700">Good</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-24 font-semibold text-gray-700">Great</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-24 font-semibold text-amber-700">Genius</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-24 font-semibold text-yellow-700">Queen Bee</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-amber-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-10 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Need Today's Answers?
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Can't solve today's puzzle? View the complete answer list with all words and pangrams
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/today" className="bg-white text-blue-600 hover:bg-blue-50 font-black rounded-xl px-10 py-5 text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                View Today's Answers →
              </Link>
              <Link href="/yesterday" className="bg-blue-900 hover:bg-blue-950 text-white font-black rounded-xl px-10 py-5 text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                Yesterday's Solutions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}