'use client';

import { useState } from 'react';
import axios from 'axios';
import HexagonalInput from './HexagonalInput';

interface SolverResults {
  pangrams: string[];
  wordsByLength: Record<number, string[]>;
  totalCount: number;
}

export default function SpellingBeeSolver() {
  const [centerLetter, setCenterLetter] = useState('');
  const [outerLetters, setOuterLetters] = useState('');
  const [results, setResults] = useState<SolverResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'hexagon'>('text');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!centerLetter) {
      setError('Center letter is required');
      return;
    }
    
    if (outerLetters.length < 6) {
      setError('You need to provide 6 outer letters');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const allLetters = centerLetter + outerLetters;
      const response = await axios.get('/api/solve', {
        params: {
          center: centerLetter.toLowerCase(),
          letters: allLetters.toLowerCase()
        }
      });
      
      setResults(response.data);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } catch (err) {
      setError('An error occurred while solving the puzzle. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCenterLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 1);
    setCenterLetter(value);
  };
  
  const handleOuterLettersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 6);
    setOuterLetters(value);
  };

  const handleHexagonInputChange = (center: string, outer: string) => {
    setCenterLetter(center);
    setOuterLetters(outer);
  };

  // Calculate total points (just an estimate for display purposes)
  const calculateTotalPoints = () => {
    if (!results) return 0;
    
    let points = 0;
    Object.entries(results.wordsByLength).forEach(([length, words]) => {
      // 1 point for 4-letter words, more for longer words
      const wordLength = Number(length);
      const pointsPerWord = wordLength === 4 ? 1 : wordLength;
      points += words.length * pointsPerWord;
    });
    
    // Add bonus for pangrams (typically 7 points in the real game)
    points += results.pangrams.length * 7;
    
    return points;
  };
  
  return (
    <div>
      <div className="mb-8 max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 bg-gray-200 rounded-full">
            <button
              type="button"
              className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                inputMode === 'text' 
                ? 'bg-white shadow text-gray-800 font-medium' 
                : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setInputMode('text')}
            >
              Text Input
            </button>
            <button
              type="button"
              className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                inputMode === 'hexagon' 
                ? 'bg-white shadow text-gray-800 font-medium' 
                : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setInputMode('hexagon')}
            >
              Hexagon Input
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="transition-all duration-300">
          {inputMode === 'text' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <label htmlFor="centerLetter" className="block text-sm font-medium text-gray-700 mb-2">
                  Center Letter (Required)
                </label>
                <input
                  type="text"
                  id="centerLetter"
                  value={centerLetter}
                  onChange={handleCenterLetterChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg text-center uppercase font-medium"
                  placeholder="Enter center letter"
                />
                <p className="mt-2 text-xs text-gray-500">This letter must be used in every word</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <label htmlFor="outerLetters" className="block text-sm font-medium text-gray-700 mb-2">
                  Outer Letters (6 letters required)
                </label>
                <input
                  type="text"
                  id="outerLetters"
                  value={outerLetters}
                  onChange={handleOuterLettersChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-lg text-center uppercase font-medium"
                  placeholder="Enter 6 outer letters"
                />
                <p className="mt-2 text-xs text-gray-500">These letters are optional for forming words</p>
              </div>
            </div>
          ) : (
            <div className="mb-6 transition-all duration-300">
              <HexagonalInput onLettersChange={handleHexagonInputChange} />
            </div>
          )}
          
          <div className="mt-8 text-center">
            <div className="inline-block relative">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-medium text-lg rounded-full hover:from-yellow-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Solving...
                  </div>
                ) : (
                  'Solve Puzzle'
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {(centerLetter || outerLetters) && (
            <div className="mt-6 p-3 bg-gray-50 rounded-lg text-center border border-gray-200">
              <p className="text-sm text-gray-700">
                Current puzzle: <span className="font-bold">{centerLetter ? centerLetter.toUpperCase() : '?'}</span> + <span className="font-medium">{outerLetters ? outerLetters.toUpperCase() : '??????'}</span>
              </p>
            </div>
          )}
        </form>
      </div>
      
      {results && (
        <div id="results-section" className="results mt-12 transition-all duration-500 animate-fadeIn">
          <div className="mb-8">
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-300 to-transparent mb-8"></div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-4 border border-yellow-200 shadow-sm h-full">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-1">{results.totalCount}</div>
                    <div className="text-yellow-800 text-sm font-medium">Total Words</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-4 border border-yellow-200 shadow-sm h-full">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-1">{results.pangrams.length}</div>
                    <div className="text-yellow-800 text-sm font-medium">Pangrams</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-4 border border-yellow-200 shadow-sm h-full">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-600 mb-1">{calculateTotalPoints()}</div>
                    <div className="text-yellow-800 text-sm font-medium">Estimated Points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {results.pangrams.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mr-2 text-white">
                  P
                </div>
                Pangrams ({results.pangrams.length})
              </h3>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex flex-wrap gap-2">
                  {results.pangrams.map((word) => (
                    <span 
                      key={word} 
                      className="inline-block px-4 py-2 bg-yellow-200 rounded-full text-sm font-medium text-yellow-800 shadow-sm transition-all hover:shadow hover:bg-yellow-300"
                    >
                      {word.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {Object.entries(results.wordsByLength)
            .sort(([lengthA], [lengthB]) => Number(lengthB) - Number(lengthA))
            .map(([length, words]) => (
              <div key={length} className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                  <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center mr-2 text-white text-sm">
                    {length}
                  </div>
                  {length}-letter words ({words.length})
                </h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex flex-wrap gap-2">
                    {words.map((word) => (
                      <span 
                        key={word} 
                        className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-800 transition-all hover:bg-gray-200"
                      >
                        {word.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
} 