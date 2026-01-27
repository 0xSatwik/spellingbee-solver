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

                <section className="bg-amber-50 p-6 rounded-xl border border-amber-100 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-amber-700 text-center">Connect With Us</h2>
                    <p className="text-gray-700 leading-relaxed text-center mb-6">
                        Stay updated with the latest hints, strategies, and community discussions!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://www.facebook.com/sbsolver/"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center transform group-hover:scale-110 transition-all duration-200 shadow-md">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-amber-700">Facebook</span>
                        </a>
                        <a
                            href="https://www.reddit.com/r/sbsolver/"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center transform group-hover:scale-110 transition-all duration-200 shadow-md">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.71 0-1.35.282-1.82.737-2.03-1.428-4.79-2.345-7.83-2.479l1.41-6.635 4.62 1.054c.06.845.76 1.517 1.62 1.517 1.05 0 1.9-0.845 1.9-1.9s-0.85-1.9-1.9-1.9c-0.7 0-1.31.391-1.64 0.963l-4.99-1.139c-0.25-0.057-0.5 0.104-0.56 0.354l-1.57 7.38c-3.13 0.088-5.96 1.021-8.03 2.484-0.47-0.455-1.11-0.737-1.82-0.737-1.465 0-2.657 1.186-2.657 2.645 0 1.047 0.61 1.948 1.5 2.378-0.04 0.229-0.07 0.463-0.07 0.7 0 3.703 4.31 6.714 9.61 6.714s9.61-3.011 9.61-6.714c0-0.237-0.03-0.471-0.07-0.7 0.89-0.43 1.5-1.331 1.5-2.378zm-15.61 2.27c0-0.873 0.723-1.581 1.611-1.581s1.611 0.708 1.611 1.581c0 0.873-0.723 1.581-1.611 1.581s-1.611-0.708-1.611-1.581zm7.42 4.09c-0.79 0.782-2.22 1.137-3.81 1.137-1.59 0-3.02-0.355-3.81-1.137-0.19-0.188-0.19-0.493 0-0.686s0.5-0.193 0.69 0c0.59 0.584 1.83 0.875 3.12 0.875 1.29 0 2.53-0.291 3.12-0.875 0.19-0.193 0.5-0.193 0.69 0s0.19 0.498 0 0.686zm-0.21-2.509c-0.888 0-1.611-0.708-1.611-1.581 0-0.873 0.723-1.581 1.611-1.581s1.611 0.708 1.611 1.581c0 0.873-0.723 1.581-1.611 1.581z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-amber-700">Reddit</span>
                        </a>
                        <a
                            href="https://www.pinterest.com/sbsolver/"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center transform group-hover:scale-110 transition-all duration-200 shadow-md">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.72-.359-1.781c0-1.667.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.307.307 0 0 1 .074.272c-.094.387-.304 1.24-.344 1.403-.053.217-.175.263-.404.156-1.503-.699-2.442-2.9-2.442-4.661 0-3.793 2.757-7.277 7.948-7.277 4.173 0 7.414 2.974 7.414 6.948 0 4.145-2.613 7.485-6.242 7.485-1.219 0-2.364-.635-2.755-1.383 0 0-.604 2.298-.752 2.87-.272 1.04-.6 2.083-.9 3.111.83.255 1.714.393 2.631.393C18.677 24 24.03 18.633 24.03 12.013c0-6.62-5.353-11.987-11.983-11.987z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-amber-700">Pinterest</span>
                        </a>
                        <a
                            href="https://www.linkedin.com/company/sbsolver/"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center transform group-hover:scale-110 transition-all duration-200 shadow-md">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-amber-700">LinkedIn</span>
                        </a>
                        <a
                            href="https://t.me/sbsolver"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center transform group-hover:scale-110 transition-all duration-200 shadow-md">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.441-.168.575-.531.767-.743.784-.461.042-.811-.301-1.259-.591-.702-.454-1.1-.736-1.781-1.182-.787-.514-.277-.797.171-1.261.117-.121 2.155-1.977 2.194-2.144.005-.021.01-.098-.036-.139-.046-.041-.113-.027-.162-.016-.069.015-1.168.741-3.291 2.171-.311.213-.593.318-.844.312-.276-.006-.807-.156-1.202-.284-.484-.157-.869-.241-.835-.509.017-.14.215-.284.591-.43 2.311-1.004 3.852-1.666 4.621-1.983 2.197-.905 2.654-1.06 2.951-1.065.065-.001.21.016.304.093.079.066.101.154.109.222.008.07.018.232.012.308z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-amber-700">Telegram</span>
                        </a>
                    </div>
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
