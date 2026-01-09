'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Word {
  word: string;
  is_pangram: number; // Assuming 0 or 1 based on typical boolean representation in DB
  length: number;
}

interface PuzzleData {
  date: string;
  center: string;
  letters: string[];
  words: string[];
  pangrams: string[];
  totalPoints: number;
  hasPerfectPangram: boolean;
  perfectPangrams: string[];
}

export default function TodayPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [puzzleData, setPuzzleData] = useState<PuzzleData>({
    date: '',
    center: '',
    letters: [],
    words: [],
    pangrams: [],
    totalPoints: 0,
    hasPerfectPangram: false,
    perfectPangrams: [],
  });

  useEffect(() => {
    const fetchDailyPuzzle = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/today.json');
        const data = response.data;

        setPuzzleData({
          date: data.puzzle.date,
          center: data.puzzle.letters,
          letters: data.puzzle.all_letters.replace(data.puzzle.letters, '').split(''),
          words: data.words.map((w: Word) => w.word),
          pangrams: data.words.filter((w: Word) => w.is_pangram).map((w: Word) => w.word),
          totalPoints: data.totalPoints,
          hasPerfectPangram: data.hasPerfectPangram,
          perfectPangrams: data.perfectPangrams,
        });
      } catch (err) {
        console.error('Error fetching daily puzzle:', err);
        setError('Failed to load today\'s puzzle. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDailyPuzzle();
  }, []);

  // Group words by length
  const wordsByLength: Record<number, string[]> = {};
  puzzleData.words.forEach((word: string) => {
    const length = word.length;
    if (!wordsByLength[length]) {
      wordsByLength[length] = [];
    }
    wordsByLength[length].push(word);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 px-2 py-4 sm:p-4">
        <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-amber-600 mb-4">Today's NYT Spelling Bee Answers</h1>
          <p className="text-lg">Loading today&apos;s puzzle...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 px-2 py-4 sm:p-4">
        <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-amber-600 mb-4">Today's NYT Spelling Bee Answers</h1>
          <p className="text-red-500">{error}</p>
          <p className="mt-4">
            <Link href="/" className="text-amber-600 hover:text-amber-800 underline">
              Go back to the Solver tool
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 px-2 py-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Card with Gradient */}
        <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl overflow-hidden shadow-2xl mb-6 sm:mb-8">
          <div className="p-6 sm:p-8 md:p-10 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 drop-shadow-lg">
                  Today's Puzzle 🐝
                </h1>
                <p className="text-lg sm:text-xl text-yellow-100 font-medium">
                  {new Date(puzzleData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
                <div className="text-center">
                  <p className="text-yellow-100 text-sm mb-1">Total Points</p>
                  <p className="text-4xl sm:text-5xl font-black drop-shadow-lg">{puzzleData.totalPoints}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Honeycomb Letters Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Letters</h2>
              </div>
              <div className="p-6">
                <div className="flex justify-center items-center">
                  <div className="relative w-64 h-64">
                    <div className="honeycomb">
                      {/* Center letter */}
                      <div className="hexagon center">
                        <div className="hexagon-content">{puzzleData.center.toUpperCase()}</div>
                      </div>

                      {/* Surrounding hexagons */}
                      <div className="hexagon top">
                        <div className="hexagon-content">{puzzleData.letters[0]?.toUpperCase()}</div>
                      </div>
                      <div className="hexagon top-right">
                        <div className="hexagon-content">{puzzleData.letters[1]?.toUpperCase()}</div>
                      </div>
                      <div className="hexagon bottom-right">
                        <div className="hexagon-content">{puzzleData.letters[2]?.toUpperCase()}</div>
                      </div>
                      <div className="hexagon bottom">
                        <div className="hexagon-content">{puzzleData.letters[3]?.toUpperCase()}</div>
                      </div>
                      <div className="hexagon bottom-left">
                        <div className="hexagon-content">{puzzleData.letters[4]?.toUpperCase()}</div>
                      </div>
                      <div className="hexagon top-left">
                        <div className="hexagon-content">{puzzleData.letters[5]?.toUpperCase()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Words Count Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total Words</p>
                  <p className="text-5xl font-black">{puzzleData.words.length}</p>
                </div>
                <div className="bg-white/20 rounded-full p-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Pangrams Card */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm mb-1">Pangrams</p>
                  <p className="text-5xl font-black">{puzzleData.pangrams.length}</p>
                </div>
                <div className="bg-white/20 rounded-full p-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Perfect Pangrams Card */}
            {puzzleData.hasPerfectPangram && (
              <div className="sm:col-span-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-full p-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-100 text-sm mb-1">Perfect Pangram!</p>
                    <p className="text-2xl font-bold">{puzzleData.perfectPangrams.join(', ').toUpperCase()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pangrams Section */}
        {puzzleData.pangrams.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>⚡</span> Pangrams ({puzzleData.pangrams.length})
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                {puzzleData.pangrams.map((word, index) => (
                  <div
                    key={index}
                    className={`px-5 py-3 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-md ${puzzleData.perfectPangrams.includes(word)
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
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">All Words</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {Object.keys(wordsByLength)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map(length => (
                  <div key={length} className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 flex items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg">
                        {parseInt(length)}-letter words
                      </span>
                      <span className="text-gray-500 text-sm">({wordsByLength[parseInt(length)].length})</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {wordsByLength[parseInt(length)].map((word, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md ${puzzleData.pangrams.includes(word)
                            ? 'bg-gradient-to-r from-yellow-200 to-amber-300 text-amber-900'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                        >
                          {word}
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
            background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%);
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