'use client';

import { useState, useEffect } from 'react';
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

export default function YesterdayPage() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchYesterdayPuzzle = async () => {
      try {
        const response = await fetch('https://spelling-bee-api.ronysamanta710.workers.dev/yesterday');
        if (!response.ok) {
          throw new Error('Failed to fetch yesterday\'s puzzle');
        }
        
        const data = await response.json();
        setPuzzle(data.puzzle);
        setWords(data.words);
      } catch (err) {
        console.error('Error fetching yesterday\'s puzzle:', err);
        setError('Failed to load yesterday\'s puzzle. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchYesterdayPuzzle();
  }, []);
  
  // Group words by length for better display
  const wordsByLength = words.reduce((acc, word) => {
    const len = word.length;
    if (!acc[len]) acc[len] = [];
    acc[len].push(word);
    return acc;
  }, {} as Record<number, Word[]>);
  
  // Sort lengths in descending order
  const lengths = Object.keys(wordsByLength).map(Number).sort((a, b) => b - a);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 px-2 py-4 sm:p-4">
        <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-4 sm:mb-6">Yesterday's Spelling Bee</h1>
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
        <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-4 sm:mb-6">Yesterday's Spelling Bee</h1>
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
      <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4 sm:mb-6">Yesterday's Spelling Bee</h1>
        
        {puzzle && (
          <div className="mb-6">
            <div className="text-center mb-4">
              <p className="text-xl font-semibold mb-2">Puzzle #{puzzle.puzzle_id} - {new Date(puzzle.date).toLocaleDateString()}</p>
              
              <div className="flex justify-center items-center mb-4">
                <div className="relative w-72 h-72">
                  <div className="honeycomb">
                    {/* Center letter - always the puzzle.letters */}
                    <div className="hexagon center">
                      <div className="hexagon-content">{puzzle.letters}</div>
                    </div>
                    
                    {/* Top hexagon */}
                    <div className="hexagon top">
                      <div className="hexagon-content">{puzzle.all_letters[1]}</div>
                    </div>
                    
                    {/* Top-right hexagon */}
                    <div className="hexagon top-right">
                      <div className="hexagon-content">{puzzle.all_letters[2]}</div>
                    </div>
                    
                    {/* Bottom-right hexagon */}
                    <div className="hexagon bottom-right">
                      <div className="hexagon-content">{puzzle.all_letters[3]}</div>
                    </div>
                    
                    {/* Bottom hexagon */}
                    <div className="hexagon bottom">
                      <div className="hexagon-content">{puzzle.all_letters[4]}</div>
                    </div>
                    
                    {/* Bottom-left hexagon */}
                    <div className="hexagon bottom-left">
                      <div className="hexagon-content">{puzzle.all_letters[5]}</div>
                    </div>
                    
                    {/* Top-left hexagon */}
                    <div className="hexagon top-left">
                      <div className="hexagon-content">{puzzle.all_letters[6]}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="mt-2">
                <span className="font-semibold">Letters:</span> {puzzle.letters}, {puzzle.all_letters.substring(1).split('').join(', ')}
              </p>
              <p className="mt-1">
                <span className="font-semibold">Words:</span> {puzzle.word_count} • 
                <span className="font-semibold ml-2">Pangrams:</span> {puzzle.pangrams_count}
              </p>
            </div>
            
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-3">Words</h2>
              
              {lengths.map(length => (
                <div key={length} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{length}-letter words ({wordsByLength[length].length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {wordsByLength[length].map(word => (
                      <div
                        key={word.word}
                        className={`px-3 py-1 rounded-full ${word.is_pangram ? 'bg-yellow-300' : 'bg-gray-200'}`}
                      >
                        {word.word}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
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
            background-color: #E5E7EB; /* gray-200 */
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
          }
          
          .hexagon.center {
            width: 70px;
            height: 70px;
            background-color: #FBBF24; /* yellow-400 */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
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
        
        <div className="flex justify-center space-x-3 sm:space-x-4 mt-6">
          <Link 
            href="/" 
            className="px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
          >
            Home
          </Link>
          <Link 
            href="/today" 
            className="px-3 py-2 sm:px-4 sm:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base"
          >
            Today
          </Link>
          <Link 
            href="/archive" 
            className="px-3 py-2 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
          >
            Archive
          </Link>
        </div>
      </div>
    </div>
  );
} 