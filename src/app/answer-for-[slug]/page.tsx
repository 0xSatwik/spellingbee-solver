'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Word {
    word: string;
    is_pangram: number;
    length: number;
}

interface Puzzle {
    puzzle_id: number;
    date: string;
    letters: string;
    all_letters: string;
    word_count: number;
    pangrams_count: number;
}

interface PuzzleWithWords {
    puzzle: Puzzle;
    words: Word[];
    totalPoints: number;
    hasPerfectPangram: boolean;
    perfectPangrams: string[];
}

// Month names for parsing and formatting
const MONTHS = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
];

// Parse the slug to extract date components
function parseDateSlug(slug: string): { year: number; month: number; day: number } | null {
    // Try "month-dd-yyyy" format (canonical): december-30-2025
    const canonicalMatch = slug.match(/^([a-z]+)-(\d{1,2})-(\d{4})$/i);
    if (canonicalMatch) {
        const monthName = canonicalMatch[1].toLowerCase();
        const monthIndex = MONTHS.indexOf(monthName);
        if (monthIndex !== -1) {
            return {
                month: monthIndex + 1,
                day: parseInt(canonicalMatch[2], 10),
                year: parseInt(canonicalMatch[3], 10)
            };
        }
    }

    // Try "dd-mm-yyyy" format: 30-12-2025
    const ddmmyyyyMatch = slug.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (ddmmyyyyMatch) {
        const day = parseInt(ddmmyyyyMatch[1], 10);
        const month = parseInt(ddmmyyyyMatch[2], 10);
        const year = parseInt(ddmmyyyyMatch[3], 10);
        // Validation
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
            return { year, month, day };
        }
    }

    // Try "yyyy-mm-dd" format: 2025-12-30
    const yyyymmddMatch = slug.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (yyyymmddMatch) {
        return {
            year: parseInt(yyyymmddMatch[1], 10),
            month: parseInt(yyyymmddMatch[2], 10),
            day: parseInt(yyyymmddMatch[3], 10)
        };
    }

    return null;
}

// Format date to canonical slug: "december-30-2025"
function formatCanonicalSlug(year: number, month: number, day: number): string {
    const monthName = MONTHS[month - 1];
    return `${monthName}-${day}-${year}`;
}

// Check if the slug is in canonical format
function isCanonicalFormat(slug: string): boolean {
    const match = slug.match(/^([a-z]+)-(\d{1,2})-(\d{4})$/i);
    if (!match) return false;
    const monthName = match[1].toLowerCase();
    return MONTHS.includes(monthName);
}

export default function AnswerPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const { slug } = use(params);

    const [puzzleData, setPuzzleData] = useState<PuzzleWithWords | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_BASE = 'https://spelling-bee-api.ronysamanta710.workers.dev';

    useEffect(() => {
        // Parse the date from slug
        const dateInfo = parseDateSlug(slug);

        if (!dateInfo) {
            setError('Invalid date format in URL');
            setLoading(false);
            return;
        }

        const { year, month, day } = dateInfo;

        // Check if we need to redirect to canonical format
        const canonicalSlug = formatCanonicalSlug(year, month, day);
        if (!isCanonicalFormat(slug) || slug.toLowerCase() !== canonicalSlug) {
            router.replace(`/answer-for-${canonicalSlug}`);
            return;
        }

        // Fetch puzzle by date
        const fetchPuzzle = async () => {
            try {
                const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const res = await fetch(`${API_BASE}/api/search/date/${isoDate}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch puzzle');
                }

                const data = await res.json();

                if (data.results && data.results.length > 0) {
                    setPuzzleData(data.results[0] as PuzzleWithWords);
                } else {
                    setError(`No puzzle found for ${MONTHS[month - 1]} ${day}, ${year}`);
                }
            } catch (err) {
                console.error('Error fetching puzzle:', err);
                setError('Failed to load puzzle. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPuzzle();
    }, [slug, router]);

    // Get formatted date for display
    const displayDate = puzzleData
        ? new Date(puzzleData.puzzle.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';

    // Group words by length
    const wordsByLength = puzzleData?.words?.reduce((acc, word) => {
        const len = word.length;
        if (!acc[len]) acc[len] = [];
        acc[len].push(word);
        return acc;
    }, {} as Record<number, Word[]>) || {};

    const lengths = Object.keys(wordsByLength).map(Number).sort((a, b) => b - a);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center p-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4 mx-auto"></div>
                    <p className="text-xl text-indigo-800">Loading puzzle...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center p-6">
                <div className="text-center max-w-md">
                    <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-lg shadow-md mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2">Puzzle Not Found</h2>
                        <p>{error}</p>
                    </div>
                    <Link
                        href="/archive"
                        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                        Browse Archive
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-2 py-3 sm:px-4">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm p-4 sm:p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-indigo-800">
                        NYT Spelling Bee Answer for {displayDate}
                    </h1>
                    <p className="text-gray-600 mb-2">Puzzle #{puzzleData?.puzzle.puzzle_id}</p>

                    <div className="flex justify-center items-center mb-6">
                        <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                            <div className="honeycomb">
                                {/* Center letter */}
                                <div className="hexagon center">
                                    <div className="hexagon-content">{puzzleData?.puzzle.letters}</div>
                                </div>

                                {/* Top hexagon */}
                                <div className="hexagon top">
                                    <div className="hexagon-content">{puzzleData?.puzzle.all_letters[1]}</div>
                                </div>

                                {/* Top-right hexagon */}
                                <div className="hexagon top-right">
                                    <div className="hexagon-content">{puzzleData?.puzzle.all_letters[2]}</div>
                                </div>

                                {/* Bottom-right hexagon */}
                                <div className="hexagon bottom-right">
                                    <div className="hexagon-content">{puzzleData?.puzzle.all_letters[3]}</div>
                                </div>

                                {/* Bottom hexagon */}
                                <div className="hexagon bottom">
                                    <div className="hexagon-content">{puzzleData?.puzzle.all_letters[4]}</div>
                                </div>

                                {/* Bottom-left hexagon */}
                                <div className="hexagon bottom-left">
                                    <div className="hexagon-content">{puzzleData?.puzzle.all_letters[5]}</div>
                                </div>

                                {/* Top-left hexagon */}
                                <div className="hexagon top-left">
                                    <div className="hexagon-content">{puzzleData?.puzzle.all_letters[6]}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-indigo-50 rounded-lg shadow-sm">
                        <p className="mt-1">
                            <span className="font-semibold">Letters:</span> {puzzleData?.puzzle.all_letters.split('').join(', ')}
                        </p>
                        <p className="mt-1">
                            <span className="font-semibold">Words:</span> {puzzleData?.puzzle.word_count} •
                            <span className="font-semibold ml-2">Pangrams:</span> {puzzleData?.puzzle.pangrams_count}
                        </p>
                        <p className="mt-1">
                            <span className="font-semibold">Total Points:</span> {puzzleData?.totalPoints}
                        </p>
                        {puzzleData?.hasPerfectPangram && puzzleData?.perfectPangrams.length > 0 && (
                            <p className="mt-1 text-green-600 font-semibold">
                                Perfect Pangram(s): {puzzleData.perfectPangrams.join(', ').toUpperCase()}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-800">All Words</h2>

                    {lengths.map(length => (
                        <div key={length} className="mb-6">
                            <h3 className="text-lg font-semibold mb-2 pl-2 border-l-4 border-indigo-500">{length}-letter words ({wordsByLength[length].length})</h3>
                            <div className="flex flex-wrap gap-2">
                                {wordsByLength[length].map((word, index) => (
                                    <div
                                        key={index}
                                        className={`px-2 sm:px-3 py-1 rounded-full shadow-sm ${word.is_pangram ? 'bg-yellow-300 font-semibold' : 'bg-gray-100'} hover:transform hover:scale-105 transition-transform`}
                                    >
                                        {word.word}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .honeycomb {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .hexagon {
          position: absolute;
          width: 60px;
          height: 60px;
          background-color: #E5E7EB;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          transition: all 0.3s ease;
          border: 2px solid white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        @media (min-width: 640px) {
          .hexagon {
            width: 70px;
            height: 70px;
            font-size: 28px;
          }
        }
        
        .hexagon:hover {
          transform: scale(1.1);
        }
        
        .hexagon.center {
          width: 70px;
          height: 70px;
          background-color: #818CF8;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          color: white;
        }

        @media (min-width: 640px) {
          .hexagon.center {
            width: 80px;
            height: 80px;
          }
        }
        
        .hexagon.center:hover {
          background-color: #6366F1;
          transform: translate(-50%, -50%) scale(1.1);
        }
        
        .hexagon.top {
          top: 10%;
          left: 50%;
          transform: translate(-50%, 0%);
        }
        
        .hexagon.top-right {
          top: 25%;
          right: 15%;
        }
        
        .hexagon.bottom-right {
          bottom: 25%;
          right: 15%;
        }
        
        .hexagon.bottom {
          bottom: 10%;
          left: 50%;
          transform: translate(-50%, 0%);
        }
        
        .hexagon.bottom-left {
          bottom: 25%;
          left: 15%;
        }
        
        .hexagon.top-left {
          top: 25%;
          left: 15%;
        }
      `}</style>

            <div className="flex justify-center mt-6 space-x-2 sm:space-x-4">
                <Link
                    href="/"
                    className="px-3 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                    Home
                </Link>
                <Link
                    href="/archive"
                    className="px-3 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                    Archive
                </Link>
                <Link
                    href="/today"
                    className="px-3 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                    Today
                </Link>
            </div>
        </div>
    );
}
