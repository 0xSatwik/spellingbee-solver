'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// API response interfaces
interface CenterLetterFrequency {
  letters: string;
  count: number;
}

interface PuzzleWithWords {
  puzzle_id: number;
  date: string;
  word_count: number;
}

interface PuzzleWithPangrams {
  puzzle_id: number;
  date: string;
  pangrams_count: number;
}

interface LetterFrequency {
  letter: string;
  count: number;
}

interface Pangram {
  word: string;
  puzzle_id: number;
  date: string;
  len: number;
}

interface Statistics {
  totalPuzzles: number;
  totalWords: number;
  totalPangrams: number;
  averageWordsPerPuzzle: number;
  averagePangramsPerPuzzle: number;
  puzzleWithMostWords: PuzzleWithWords;
  puzzleWithFewestWords: PuzzleWithWords;
}

// Component for displaying statistics
export default function StatsPage() {
  const [centerLetters, setCenterLetters] = useState<CenterLetterFrequency[]>([]);
  const [puzzlesWithMostWords, setPuzzlesWithMostWords] = useState<PuzzleWithWords[]>([]);
  const [puzzlesWithMostPangrams, setPuzzlesWithMostPangrams] = useState<PuzzleWithPangrams[]>([]);
  const [letterFrequency, setLetterFrequency] = useState<LetterFrequency[]>([]);
  const [longestPangrams, setLongestPangrams] = useState<Pangram[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const API_BASE = 'https://spelling-bee-api.sbsolver.workers.dev';

        // Fetch all data concurrently
        const [
          centerLettersRes,
          mostWordsRes,
          mostPangramsRes,
          letterFreqRes,
          longestPangramsRes,
          statsRes
        ] = await Promise.all([
          fetch(`${API_BASE}/api/mostCommonCenterLetters`),
          fetch(`${API_BASE}/api/puzzlesWithMostWords`),
          fetch(`${API_BASE}/api/puzzlesWithMostPangrams`),
          fetch(`${API_BASE}/api/allLettersFrequency`),
          fetch(`${API_BASE}/api/longestPangrams`),
          fetch(`${API_BASE}/api/statistics`)
        ]);

        // Check if any requests failed
        if (!centerLettersRes.ok || !mostWordsRes.ok || !mostPangramsRes.ok ||
          !letterFreqRes.ok || !longestPangramsRes.ok || !statsRes.ok) {
          throw new Error('Failed to fetch one or more statistics');
        }

        // Parse all responses
        const [
          centerLettersData,
          mostWordsData,
          mostPangramsData,
          letterFreqData,
          longestPangramsData,
          statsData
        ] = await Promise.all([
          centerLettersRes.json(),
          mostWordsRes.json(),
          mostPangramsRes.json(),
          letterFreqRes.json(),
          longestPangramsRes.json(),
          statsRes.json()
        ]);

        // Handle API responses - extract arrays from various response formats
        const extractArray = (data: unknown, expectedKey?: string): unknown[] => {
          // If it's already an array, return it
          if (Array.isArray(data)) return data;

          // If data is an object
          if (data && typeof data === 'object') {
            // Try to find array in common property names
            if (expectedKey && Array.isArray((data as Record<string, unknown>)[expectedKey])) {
              return (data as Record<string, unknown>)[expectedKey] as unknown[];
            }
            if (Array.isArray((data as Record<string, unknown>).data)) {
              return (data as Record<string, unknown>).data as unknown[];
            }
            if (Array.isArray((data as Record<string, unknown>).results)) {
              return (data as Record<string, unknown>).results as unknown[];
            }

            // Check all object values for arrays
            const values = Object.values(data);
            const arrayValue = values.find(v => Array.isArray(v));
            if (arrayValue) return arrayValue as unknown[];
          }

          return [];
        };

        setCenterLetters(extractArray(centerLettersData, 'centerLetters') as CenterLetterFrequency[]);
        setPuzzlesWithMostWords(extractArray(mostWordsData, 'puzzlesWithMostWords') as PuzzleWithWords[]);
        setPuzzlesWithMostPangrams(extractArray(mostPangramsData, 'puzzlesWithMostPangrams') as PuzzleWithPangrams[]);
        setLetterFrequency(extractArray(letterFreqData, 'letterFrequency') as LetterFrequency[]);
        setLongestPangrams(extractArray(longestPangramsData, 'longestPangrams') as Pangram[]);
        setStatistics(statsData);

      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError('Failed to load statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 px-2 py-4 sm:p-6">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Puzzle Statistics 📊
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-cyan-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 px-2 py-4 sm:p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-black text-center mb-6 text-cyan-600">Puzzle Statistics 📊</h1>
          <div className="text-center text-red-500 p-6 bg-red-50 rounded-xl">{error}</div>
          <div className="text-center mt-6">
            <Link href="/" className="text-cyan-600 hover:text-cyan-800 underline font-semibold">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 px-2 py-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-3xl overflow-hidden shadow-2xl mb-6 sm:mb-8 p-6 sm:p-10 text-white text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 drop-shadow-lg">
            Puzzle Statistics 📊
          </h1>
          <p className="text-lg sm:text-xl text-cyan-100">
            Explore insights from thousands of Spelling Bee puzzles
          </p>
        </div>

        {/* Overview Statistics */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* Total Puzzles */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Total Puzzles</p>
                  <p className="text-4xl font-black">{statistics.totalPuzzles.toLocaleString()}</p>
                </div>
                <div className="bg-white/20 rounded-full p-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Words */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total Words</p>
                  <p className="text-4xl font-black">{statistics.totalWords.toLocaleString()}</p>
                </div>
                <div className="bg-white/20 rounded-full p-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Pangrams */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm mb-1">Total Pangrams</p>
                  <p className="text-4xl font-black">{statistics.totalPangrams.toLocaleString()}</p>
                </div>
                <div className="bg-white/20 rounded-full p-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Average Words per Puzzle */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl">
              <p className="text-green-100 text-sm mb-1">Avg Words/Puzzle</p>
              <p className="text-3xl font-black">{statistics.averageWordsPerPuzzle.toFixed(1)}</p>
            </div>

            {/* Average Pangrams per Puzzle */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl">
              <p className="text-pink-100 text-sm mb-1">Avg Pangrams/Puzzle</p>
              <p className="text-3xl font-black">{statistics.averagePangramsPerPuzzle.toFixed(2)}</p>
            </div>

            {/* Puzzle with Most Words */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl">
              <p className="text-teal-100 text-sm mb-1">Most Words in a Puzzle</p>
              <p className="text-3xl font-black mb-1">{statistics.puzzleWithMostWords.word_count} words</p>
              <p className="text-teal-100 text-xs mb-2">
                {new Date(statistics.puzzleWithMostWords.date).toLocaleDateString()} (#{statistics.puzzleWithMostWords.puzzle_id})
              </p>
              <Link
                href={`/archive?id=${statistics.puzzleWithMostWords.puzzle_id}`}
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg inline-block transition"
              >
                View Puzzle →
              </Link>
            </div>

            {/* Puzzle with Fewest Words */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <p className="text-indigo-100 text-sm mb-1">Fewest Words in a Puzzle</p>
              <p className="text-3xl font-black mb-1">{statistics.puzzleWithFewestWords.word_count} words</p>
              <p className="text-indigo-100 text-xs mb-2">
                {new Date(statistics.puzzleWithFewestWords.date).toLocaleDateString()} (#{statistics.puzzleWithFewestWords.puzzle_id})
              </p>
              <Link
                href={`/archive?id=${statistics.puzzleWithFewestWords.puzzle_id}`}
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg inline-block transition"
              >
                View Puzzle →
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Most Common Center Letters */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">🎯 Most Common Center Letters</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {centerLetters.slice(0, 12).map((item, index) => (
                  item && item.letters ? (
                    <div key={index} className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-200 shadow-md">
                      <div className="text-3xl font-black text-violet-700 mb-1">{item.letters.toUpperCase()}</div>
                      <div className="text-sm text-violet-600">{item.count} puzzles</div>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          </div>

          {/* Puzzles with Most Words */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">🏆 Puzzles with Most Words</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {puzzlesWithMostWords.slice(0, 10).map((puzzle, index) => (
                  puzzle && puzzle.date && puzzle.word_count ? (
                    <div key={index} className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{new Date(puzzle.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{puzzle.word_count} words</p>
                        </div>
                      </div>
                      <Link
                        href={`/archive?id=${puzzle.puzzle_id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View →
                      </Link>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          </div>

          {/* Puzzles with Most Pangrams */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">⚡ Puzzles with Most Pangrams</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {puzzlesWithMostPangrams.slice(0, 10).map((puzzle, index) => (
                  puzzle && puzzle.date && puzzle.pangrams_count ? (
                    <div key={index} className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{new Date(puzzle.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{puzzle.pangrams_count} pangrams</p>
                        </div>
                      </div>
                      <Link
                        href={`/archive?id=${puzzle.puzzle_id}`}
                        className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                      >
                        View →
                      </Link>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          </div>

          {/* Longest Pangrams */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">📏 Longest Pangrams</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {longestPangrams.slice(0, 10).map((pangram, index) => (
                  pangram && pangram.word && pangram.len ? (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-green-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                          {pangram.len} letters
                        </div>
                      </div>
                      <p className="text-xl font-bold text-gray-800 mb-1">{pangram.word}</p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{new Date(pangram.date).toLocaleDateString()}</span>
                        <Link
                          href={`/archive?id=${pangram.puzzle_id}`}
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          View Puzzle →
                        </Link>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Letter Frequency Chart */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">🔤 All Letters Frequency</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {letterFrequency.map((letter, index) => {
                if (!letter || !letter.letter || !letter.count) return null;
                const maxCount = Math.max(...letterFrequency.filter(l => l && l.count).map(l => l.count));
                const percentage = (letter.count / maxCount) * 100;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-4 mb-2 transform hover:scale-105 transition-all duration-200">
                      <div className="text-2xl font-black text-indigo-700 mb-1">{letter.letter.toUpperCase()}</div>
                      <div className="text-sm font-semibold text-indigo-600">{letter.count}</div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation */}
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
            📅 Today
          </Link>
          <Link
            href="/archive"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
          >
            📚 Archive
          </Link>
        </div>
      </div>
    </div>
  );
}