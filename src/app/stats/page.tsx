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
        const API_BASE = 'https://spelling-bee-api.ronysamanta710.workers.dev';
        
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
        const centerLettersData = await centerLettersRes.json();
        const mostWordsData = await mostWordsRes.json();
        const mostPangramsData = await mostPangramsRes.json();
        const letterFreqData = await letterFreqRes.json();
        const longestPangramsData = await longestPangramsRes.json();
        const statsData = await statsRes.json();

        // Update state with fetched data
        setCenterLetters(centerLettersData.centerLetterFrequency);
        setPuzzlesWithMostWords(mostWordsData.puzzlesWithMostWords);
        setPuzzlesWithMostPangrams(mostPangramsData.puzzlesWithMostPangrams);
        setLetterFrequency(letterFreqData.allLettersFrequency);
        setLongestPangrams(longestPangramsData.longestPangrams);
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
      <div className="min-h-screen bg-gray-100 px-2 py-4 sm:p-4">
        <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            <span className="text-4xl">S</span>b<span className="text-4xl">A</span>nswer Statistics
          </h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 px-2 py-4 sm:p-4">
        <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">
            <span className="text-4xl">S</span>b<span className="text-4xl">A</span>nswer Statistics
          </h1>
          <div className="text-center text-red-500 p-4">{error}</div>
          <div className="text-center mt-4">
            <Link href="/" className="text-blue-500 hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-2 py-4 sm:p-4">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="text-4xl">S</span>b<span className="text-4xl">A</span>nswer Statistics
        </h1>

        {/* Overview Statistics */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h2 className="text-xl font-bold mb-4">Overall Stats</h2>
              <p className="mb-2"><span className="font-semibold">Total Puzzles:</span> {statistics.totalPuzzles.toLocaleString()}</p>
              <p className="mb-2"><span className="font-semibold">Total Words:</span> {statistics.totalWords.toLocaleString()}</p>
              <p className="mb-2"><span className="font-semibold">Total Pangrams:</span> {statistics.totalPangrams.toLocaleString()}</p>
              <p className="mb-2"><span className="font-semibold">Avg. Words/Puzzle:</span> {statistics.averageWordsPerPuzzle.toFixed(2)}</p>
              <p className="mb-2"><span className="font-semibold">Avg. Pangrams/Puzzle:</span> {statistics.averagePangramsPerPuzzle.toFixed(2)}</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h2 className="text-xl font-bold mb-4">Most Words</h2>
              <p className="mb-2">
                <span className="font-semibold">Puzzle #{statistics.puzzleWithMostWords.puzzle_id}</span> (
                {new Date(statistics.puzzleWithMostWords.date).toLocaleDateString()})
              </p>
              <p className="mb-2"><span className="font-semibold">Word Count:</span> {statistics.puzzleWithMostWords.word_count}</p>
              <Link 
                href={`/archive?id=${statistics.puzzleWithMostWords.puzzle_id}`}
                className="text-blue-500 hover:underline"
              >
                View Puzzle
              </Link>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h2 className="text-xl font-bold mb-4">Fewest Words</h2>
              <p className="mb-2">
                <span className="font-semibold">Puzzle #{statistics.puzzleWithFewestWords.puzzle_id}</span> (
                {new Date(statistics.puzzleWithFewestWords.date).toLocaleDateString()})
              </p>
              <p className="mb-2"><span className="font-semibold">Word Count:</span> {statistics.puzzleWithFewestWords.word_count}</p>
              <Link 
                href={`/archive?id=${statistics.puzzleWithFewestWords.puzzle_id}`}
                className="text-blue-500 hover:underline"
              >
                View Puzzle
              </Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Center Letter Frequency */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Most Common Center Letters</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Letter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {centerLetters.slice(0, 10).map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-2">{item.letters}</td>
                      <td className="px-6 py-2">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Letter Frequency */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">All Letters Frequency</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Letter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {letterFrequency.slice(0, 10).map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-2">{item.letter}</td>
                      <td className="px-6 py-2">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Puzzles with Most Words */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Puzzles with Most Words</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puzzle ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word Count</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {puzzlesWithMostWords.map((puzzle, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-2">
                        <Link href={`/archive?id=${puzzle.puzzle_id}`} className="text-blue-500 hover:underline">
                          #{puzzle.puzzle_id}
                        </Link>
                      </td>
                      <td className="px-6 py-2">{new Date(puzzle.date).toLocaleDateString()}</td>
                      <td className="px-6 py-2">{puzzle.word_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Puzzles with Most Pangrams */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Puzzles with Most Pangrams</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puzzle ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pangram Count</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {puzzlesWithMostPangrams.map((puzzle, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-2">
                        <Link href={`/archive?id=${puzzle.puzzle_id}`} className="text-blue-500 hover:underline">
                          #{puzzle.puzzle_id}
                        </Link>
                      </td>
                      <td className="px-6 py-2">{new Date(puzzle.date).toLocaleDateString()}</td>
                      <td className="px-6 py-2">{puzzle.pangrams_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Longest Pangrams */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Longest Pangrams</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puzzle ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {longestPangrams.map((pangram, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-2 font-medium">{pangram.word}</td>
                      <td className="px-6 py-2">{pangram.len}</td>
                      <td className="px-6 py-2">
                        <Link href={`/archive?id=${pangram.puzzle_id}`} className="text-blue-500 hover:underline">
                          #{pangram.puzzle_id}
                        </Link>
                      </td>
                      <td className="px-6 py-2">{new Date(pangram.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-0 mt-8 sm:mt-12 space-x-0 sm:space-x-4">
          <Link 
            href="/" 
            className="px-3 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Home
          </Link>
          <Link 
            href="/today" 
            className="px-3 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Today's Puzzle
          </Link>
          <Link 
            href="/yesterday" 
            className="px-3 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Yesterday
          </Link>
          <Link 
            href="/archive" 
            className="px-3 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Archive
          </Link>
        </div>
      </div>
    </div>
  );
} 