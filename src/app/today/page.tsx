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
    <div className="min-h-screen bg-amber-50 p-5">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-amber-600 mb-6">Today&apos;s NYT Spelling Bee Answers</h1>
        
        <div className="mb-8">
          <p className="text-lg mb-2"><span className="font-semibold">Date:</span> {puzzleData.date}</p>
          <div className="flex gap-2 mb-6">
            <div className="h-12 w-12 flex items-center justify-center bg-yellow-400 text-white font-bold text-xl rounded-full">
              {puzzleData.center.toUpperCase()}
            </div>
            {puzzleData.letters.map((letter, index) => (
              <div key={index} className="h-12 w-12 flex items-center justify-center bg-gray-200 font-bold text-xl rounded-full">
                {letter.toUpperCase()}
              </div>
            ))}
          </div>
          <p className="text-lg"><span className="font-semibold">Total Words:</span> {puzzleData.words.length}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-amber-600 mb-4">Pangrams ({puzzleData.pangrams.length})</h2>
          <div className="flex flex-wrap gap-2">
            {puzzleData.pangrams.map((word, index) => (
              <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-amber-600 mb-4">Words by Length</h2>
          {Object.keys(wordsByLength)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map(length => (
              <div key={length} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{parseInt(length)}-letter words ({wordsByLength[parseInt(length)].length})</h3>
                <div className="flex flex-wrap gap-2">
                  {wordsByLength[parseInt(length)].map((word, index) => (
                    <span 
                      key={index} 
                      className={`px-3 py-1 rounded-full text-sm ${
                        puzzleData.pangrams.includes(word) 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <p className="mt-8">
          <Link href="/" className="text-amber-600 hover:text-amber-800 underline">
            Go back to the Solver tool
          </Link>
        </p>
      </div>
    </div>
  );
} 