'use client';

import Link from 'next/link';

export default function AboutClient() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-amber-600">About Spelling Bee Solver</h1>

            <div className="space-y-8">
                <section className="bg-amber-50 p-6 rounded-xl border border-amber-100 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-amber-700">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Spelling Bee Solver was created with two main goals: to help word game enthusiasts find solutions to the New York Times Spelling Bee puzzle, and to provide free practice puzzles for those looking to improve their skills. We believe that word games are not just fun but also educational, helping to expand vocabulary and keep the mind sharp.
                    </p>
                </section>

                <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-amber-700">What We Offer</h2>
                    <ul className="list-disc pl-5 space-y-3 text-gray-700">
                        <li><strong>NYT Puzzle Solver:</strong> Our solver tool helps you discover all possible words for any NYT Spelling Bee puzzle.</li>
                        <li><strong>Daily NYT Solutions:</strong> Access today's and yesterday's NYT puzzle solutions quickly and easily.</li>
                        <li><strong>Free Practice Puzzles:</strong> Enjoy our exclusive Spelling Bee practice puzzles created specifically for our users.</li>
                        <li><strong>Archive:</strong> Browse through historical puzzles dating back to May 2018.</li>
                        <li><strong>Statistics:</strong> Explore interesting patterns and statistics about past puzzles.</li>
                        <li><strong>Educational Articles:</strong> Learn strategies and insights about the Spelling Bee puzzle.</li>
                    </ul>
                </section>

                <section className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-yellow-100 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-amber-700">Our Team</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Spelling Bee Solver is maintained by a small team of word game enthusiasts and developers who are passionate about creating useful tools for the Spelling Bee community. We continuously work to improve our tools and add new features based on user feedback.
                    </p>
                </section>

                <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-amber-700">Disclaimer</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Spelling Bee Solver is not affiliated with or endorsed by The New York Times Company. &quot;Spelling Bee&quot; is a trademark of The New York Times Company. This is an independent fan site created for educational and entertainment purposes. Our practice puzzles are original content created for users to enjoy and improve their skills.
                    </p>
                </section>

                <div className="text-center mt-10">
                    <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
