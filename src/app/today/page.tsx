'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface PuzzleData {
  date: string;
  center: string;
  letters: string[];
  words: string[];
  pangrams: string[];
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
  });

  useEffect(() => {
    const fetchDailyPuzzle = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/daily');
        const data = response.data;
        
        // The first word is always the pangram
        const pangrams = data.words.filter((word: string) => 
          new Set([...word]).size === data.letters.length + 1
        );
        
        setPuzzleData({
          date: data.date,
          center: data.center,
          letters: data.letters,
          words: data.words,
          pangrams: pangrams,
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
      <div className="min-h-screen bg-amber-50 p-5">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-amber-600 mb-6">Today's NYT Spelling Bee Answers</h1>
          <p className="text-lg">Loading today&apos;s puzzle...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-amber-50 p-5">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-amber-600 mb-6">Today's NYT Spelling Bee Answers</h1>
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Today's Spelling Bee</h1>
        
        <div className="mb-8">
          <div className="text-center mb-6">
            <p className="text-xl font-semibold mb-2">Date: {puzzleData.date}</p>
            
            <div className="flex justify-center items-center mb-6">
              <div className="relative w-72 h-72">
                <div className="honeycomb">
                  {/* Center letter */}
                  <div className="hexagon center">
                    <div className="hexagon-content">{puzzleData.center.toUpperCase()}</div>
                  </div>
                  
                  {/* Top hexagon */}
                  <div className="hexagon top">
                    <div className="hexagon-content">{puzzleData.letters[0]?.toUpperCase()}</div>
                  </div>
                  
                  {/* Top-right hexagon */}
                  <div className="hexagon top-right">
                    <div className="hexagon-content">{puzzleData.letters[1]?.toUpperCase()}</div>
                  </div>
                  
                  {/* Bottom-right hexagon */}
                  <div className="hexagon bottom-right">
                    <div className="hexagon-content">{puzzleData.letters[2]?.toUpperCase()}</div>
                  </div>
                  
                  {/* Bottom hexagon */}
                  <div className="hexagon bottom">
                    <div className="hexagon-content">{puzzleData.letters[3]?.toUpperCase()}</div>
                  </div>
                  
                  {/* Bottom-left hexagon */}
                  <div className="hexagon bottom-left">
                    <div className="hexagon-content">{puzzleData.letters[4]?.toUpperCase()}</div>
                  </div>
                  
                  {/* Top-left hexagon */}
                  <div className="hexagon top-left">
                    <div className="hexagon-content">{puzzleData.letters[5]?.toUpperCase()}</div>
                  </div>
            </div>
              </div>
            </div>
            
            <p className="mt-2">
              <span className="font-semibold">Letters:</span> {puzzleData.center.toUpperCase()}, {puzzleData.letters.map(l => l.toUpperCase()).join(', ')}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Words:</span> {puzzleData.words.length} • 
              <span className="font-semibold ml-2">Pangrams:</span> {puzzleData.pangrams.length}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Pangrams ({puzzleData.pangrams.length})</h2>
          <div className="flex flex-wrap gap-2">
            {puzzleData.pangrams.map((word, index) => (
              <span key={index} className="bg-yellow-300 px-3 py-1 rounded-full">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Words by Length</h2>
          {Object.keys(wordsByLength)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map(length => (
              <div key={length} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{parseInt(length)}-letter words ({wordsByLength[parseInt(length)].length})</h3>
                <div className="flex flex-wrap gap-2">
                  {wordsByLength[parseInt(length)].map((word, index) => (
                    <span 
                      key={index} 
                      className={`px-3 py-1 rounded-full ${
                        puzzleData.pangrams.includes(word) 
                          ? 'bg-yellow-300' 
                          : 'bg-gray-200'
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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

        <div className="flex justify-center mt-8 space-x-4">
          <Link 
            href="/" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/solver" 
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Solver
          </Link>
          <Link 
            href="/yesterday" 
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Yesterday's Puzzle
          </Link>
          <Link 
            href="/archive" 
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Puzzle Archive
          </Link>
          <Link 
            href="/stats" 
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Statistics
          </Link>
        </div>
      </div>
    </div>
  );
} 