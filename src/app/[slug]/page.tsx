'use client';

import { useState, useEffect, use } from 'react';
import { useRouter, notFound } from 'next/navigation';
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

function parseDateSlug(datePart: string): { year: number; month: number; day: number } | null {
    // Try "month-dd-yyyy" format (canonical): december-30-2025
    const canonicalMatch = datePart.match(/^([a-z]+)-(\d{1,2})-(\d{4})$/i);
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
    const ddmmyyyyMatch = datePart.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (ddmmyyyyMatch) {
        const day = parseInt(ddmmyyyyMatch[1], 10);
        const month = parseInt(ddmmyyyyMatch[2], 10);
        const year = parseInt(ddmmyyyyMatch[3], 10);
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
            return { year, month, day };
        }
    }

    // Try "yyyy-mm-dd" format: 2025-12-30
    const yyyymmddMatch = datePart.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (yyyymmddMatch) {
        return {
            year: parseInt(yyyymmddMatch[1], 10),
            month: parseInt(yyyymmddMatch[2], 10),
            day: parseInt(yyyymmddMatch[3], 10)
        };
    }

    return null;
}

function formatCanonicalSlug(year: number, month: number, day: number): string {
    const monthName = MONTHS[month - 1];
    return `${monthName}-${day}-${year}`;
}

function isCanonicalFormat(datePart: string): boolean {
    const match = datePart.match(/^([a-z]+)-(\d{1,2})-(\d{4})$/i);
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
    const [isValidRoute, setIsValidRoute] = useState(true);

    const API_BASE = 'https://spelling-bee-api.sbsolver.workers.dev';

    useEffect(() => {
        if (!slug.startsWith('answer-for-')) {
            setIsValidRoute(false);
            setLoading(false);
            return;
        }

        const datePart = slug.replace('answer-for-', '');
        const dateInfo = parseDateSlug(datePart);

        if (!dateInfo) {
            setError('Invalid date format in URL');
            setLoading(false);
            return;
        }

        const { year, month, day } = dateInfo;
        const canonicalDatePart = formatCanonicalSlug(year, month, day);
        const expectedSlug = `answer-for-${canonicalDatePart}`;

        if (!isCanonicalFormat(datePart) || slug.toLowerCase() !== expectedSlug) {
            router.replace(`/${expectedSlug}`);
            return;
        }

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

    if (!isValidRoute) {
        return notFound();
    }

    // Group words by length
    const wordsByLength = puzzleData?.words?.reduce((acc, word) => {
        const len = word.length;
        if (!acc[len]) acc[len] = [];
        acc[len].push(word);
        return acc;
    }, {} as Record<number, Word[]>) || {};

    const lengths = Object.keys(wordsByLength).map(Number).sort((a, b) => b - a);

    // Get pangrams for highlighting
    const pangrams = puzzleData?.words?.filter(w => w.is_pangram).map(w => w.word) || [];

    // Display date
    const displayDate = puzzleData?.puzzle?.date
        ? new Date(puzzleData.puzzle.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 px-2 py-4 sm:p-6">
                <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
                    <h1 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        NYT Spelling Bee Answer 📅
                    </h1>
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-teal-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 px-2 py-4 sm:p-6">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
                    <h1 className="text-4xl font-black text-center mb-6 text-teal-600">NYT Spelling Bee Answer 📅</h1>
                    <div className="text-center text-red-500 p-6 bg-red-50 rounded-xl">{error}</div>
                    <div className="text-center mt-6">
                        <Link href="/archive" className="text-teal-600 hover:text-teal-800 underline font-semibold">
                            Browse Archive
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 px-2 py-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Card with Gradient */}
                <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 rounded-3xl overflow-hidden shadow-2xl mb-6 sm:mb-8">
                    <div className="p-6 sm:p-8 md:p-10 text-white">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 drop-shadow-lg">
                                    Puzzle Answer 📅
                                </h1>
                                <p className="text-lg sm:text-xl text-cyan-100 font-medium">
                                    {displayDate}
                                </p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                                <div className="text-center">
                                    <p className="text-cyan-100 text-sm mb-1">Total Points</p>
                                    <p className="text-4xl sm:text-5xl font-black drop-shadow-lg">{puzzleData?.totalPoints || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Honeycomb Letters Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full">
                            <div className="bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-4">
                                <h2 className="text-2xl font-bold text-white">Letters</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-center items-center">
                                    <div className="relative w-64 h-64">
                                        <div className="honeycomb">
                                            {/* Center letter */}
                                            <div className="hexagon center">
                                                <div className="hexagon-content">{puzzleData?.puzzle?.letters?.toUpperCase()}</div>
                                            </div>

                                            {/* Surrounding hexagons */}
                                            {puzzleData?.puzzle?.all_letters?.replace(puzzleData.puzzle.letters, '').split('').map((letter, index) => {
                                                const positions = ['top', 'top-right', 'bottom-right', 'bottom', 'bottom-left', 'top-left'];
                                                return (
                                                    <div key={index} className={`hexagon ${positions[index]}`}>
                                                        <div className="hexagon-content">{letter.toUpperCase()}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Words Count Card */}
                        <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-cyan-100 text-sm mb-1">Total Words</p>
                                    <p className="text-5xl font-black">{puzzleData?.words?.length || 0}</p>
                                </div>
                                <div className="bg-white/20 rounded-full p-4">
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Pangrams Card */}
                        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-yellow-100 text-sm mb-1">Pangrams</p>
                                    <p className="text-5xl font-black">{pangrams.length}</p>
                                </div>
                                <div className="bg-white/20 rounded-full p-4">
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Perfect Pangrams Card */}
                        {puzzleData?.hasPerfectPangram && (
                            <div className="sm:col-span-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-white/20 rounded-full p-4">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-emerald-100 text-sm mb-1">Perfect Pangram!</p>
                                        <p className="text-2xl font-bold">{puzzleData?.perfectPangrams?.join(', ').toUpperCase()}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pangrams Section */}
                {pangrams.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-6">
                        <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <span>⚡</span> Pangrams ({pangrams.length})
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-wrap gap-3">
                                {pangrams.map((word, index) => (
                                    <div
                                        key={index}
                                        className={`px-5 py-3 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-md ${puzzleData?.perfectPangrams?.includes(word)
                                            ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                                            : 'bg-gradient-to-r from-yellow-300 to-amber-400 text-amber-900'
                                            }`}
                                    >
                                        {word}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Words by Length */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-6">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4">
                        <h2 className="text-2xl font-bold text-white">All Words</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            {lengths.map(length => (
                                <div key={length} className="border-l-4 border-teal-500 pl-4">
                                    <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-2">
                                        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-lg">
                                            {length}-letter words
                                        </span>
                                        <span className="text-gray-500 text-sm">({wordsByLength[length].length})</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {wordsByLength[length].map((word, index) => (
                                            <span
                                                key={index}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md ${word.is_pangram
                                                    ? 'bg-gradient-to-r from-yellow-200 to-amber-300 text-amber-900'
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {word.word}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                    >
                        🏠 Home
                    </Link>
                    <Link
                        href="/today"
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                    >
                        🐝 Today
                    </Link>
                    <Link
                        href="/yesterday"
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                    >
                        ⏮️ Yesterday
                    </Link>
                    <Link
                        href="/archive"
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                    >
                        📚 Archive
                    </Link>
                </div>

                <style jsx>{`
                    .honeycomb {
                        position: relative;
                        width: 100%;
                        height: 100%;
                    }

                    .hexagon {
                        position: absolute;
                        width: 58px;
                        height: 58px;
                        background: linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%);
                        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 22px;
                        font-weight: bold;
                        transition: all 0.3s ease;
                        border: 2px solid white;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        cursor: pointer;
                    }

                    .hexagon:hover {
                        transform: scale(1.1);
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
                    }

                    .hexagon.center {
                        width: 68px;
                        height: 68px;
                        background: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%);
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 1;
                        color: white;
                        font-size: 26px;
                    }

                    .hexagon.center:hover {
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
            </div>
        </div>
    );
}
