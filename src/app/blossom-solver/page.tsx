import { Metadata } from 'next'
import BlossomSolver from '@/components/BlossomSolver'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Free Blossom Word Game Solver - Find All Words Instantly | SbSolver',
    description: 'Free Blossom Word Game Solver. Enter 7 letters to instantly find all valid words, pangrams, and maximize your score. Works with today\'s puzzle. 100% accurate & always free.',
    keywords: ['blossom solver', 'blossom word game solver', 'find pangrams', 'blossom words', 'blossom helper', 'word finder blossom', 'blossom cheat'],
    openGraph: {
        title: 'Free Blossom Word Game Solver - Find All Words',
        description: 'Free Blossom Solver. Enter 7 letters to instantly find all valid words and pangrams.',
        url: 'https://sbsolver.online/blossom-solver',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Blossom Word Game Solver - Find All Words',
        description: 'Free Blossom Solver. Find all valid words and pangrams instantly.',
    },
    alternates: {
        canonical: 'https://sbsolver.online/blossom-solver',
    },
}

export default function BlossomSolverPage() {
    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "SbSolver - Blossom Word Game Solver",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Free tool to solve Blossom word game puzzles. Find all valid words and pangrams from your letters instantly.",
        "url": "https://sbsolver.online/blossom-solver",
        "featureList": [
            "Find all valid words instantly",
            "Identify all pangrams",
            "See word counts by length",
            "Calculate total points",
            "100% free to use"
        ],
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
                            <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                                🌸 Free Blossom Word Game Solver
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">
                            Find All Words & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">Pangrams</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Enter your 7 letters to instantly discover all valid words, identify pangrams, and maximize your Blossom score
                        </p>
                    </div>
                </section>

                {/* Main Solver Section */}
                <section className="mb-12">
                    <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            {/* Solver Component */}
                            <div className="lg:col-span-2 p-6 md:p-10">
                                <BlossomSolver />
                            </div>

                            {/* Benefits Sidebar */}
                            <div className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 p-8 md:p-10 text-white">
                                <div className="h-full flex flex-col justify-center">
                                    <h2 className="text-3xl font-black mb-6">Why Use SbSolver? 🌸</h2>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <span className="inline-block mr-3 text-2xl">⚡</span>
                                            <div>
                                                <div className="font-bold text-lg">Instant Results</div>
                                                <div className="text-pink-100 text-sm">Find all possible words in seconds</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block mr-3 text-2xl">✨</span>
                                            <div>
                                                <div className="font-bold text-lg">Pangram Finder</div>
                                                <div className="text-pink-100 text-sm">Highlights all words using 7 letters</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block mr-3 text-2xl">📊</span>
                                            <div>
                                                <div className="font-bold text-lg">Organized View</div>
                                                <div className="text-pink-100 text-sm">Words sorted by length for easy browsing</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block mr-3 text-2xl">🎯</span>
                                            <div>
                                                <div className="font-bold text-lg">100% Accurate</div>
                                                <div className="text-pink-100 text-sm">Extensive verified English dictionary</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block mr-3 text-2xl">🆓</span>
                                            <div>
                                                <div className="font-bold text-lg">Always Free</div>
                                                <div className="text-pink-100 text-sm">No subscription or hidden fees ever</div>
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
                        How to Use the <span className="text-pink-600">Solver</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-6 border-2 border-pink-200">
                            <div className="text-4xl font-black text-pink-600 mb-3">1</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">Enter Center Letter</h3>
                            <p className="text-gray-700 text-sm">Input the required center letter from today's puzzle</p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-50 to-red-100 rounded-2xl p-6 border-2 border-rose-200">
                            <div className="text-4xl font-black text-rose-600 mb-3">2</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">Add 6 Petals</h3>
                            <p className="text-gray-700 text-sm">Enter the remaining 6 petal letters</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border-2 border-green-200">
                            <div className="text-4xl font-black text-green-600 mb-3">3</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">Get Solutions</h3>
                            <p className="text-gray-700 text-sm">Instantly see all valid words and pangrams</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-6 border-2 border-amber-200">
                            <div className="text-4xl font-black text-amber-600 mb-3">4</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900">Maximize Score</h3>
                            <p className="text-gray-700 text-sm">Use solutions to get the highest score!</p>
                        </div>
                    </div>
                </section>

                {/* Quick Links Section */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl p-10 text-center shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                            Also Play NYT Spelling Bee?
                        </h2>
                        <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                            Check out our original Spelling Bee solver for NYT's daily puzzle
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/solver" className="bg-white text-pink-600 hover:bg-pink-50 font-black rounded-xl px-10 py-5 text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                                NYT Spelling Bee Solver →
                            </Link>
                            <Link href="/today" className="bg-pink-900 hover:bg-pink-950 text-white font-black rounded-xl px-10 py-5 text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                                Today's NYT Answers
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
