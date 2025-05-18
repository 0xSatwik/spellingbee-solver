'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

// Interface for a complete puzzle with words
interface PuzzleWithWords {
  puzzle: Puzzle;
  words: Word[];
}

// Interface for search results
interface SearchResult {
  puzzle: Puzzle;
  words: Word[];
}

// Loading component to show while content is loading
function Loading() {
  return (
    <div className="flex justify-center items-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );
}

// The main component that uses useSearchParams
function ArchiveContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Search states
  const [puzzleId, setPuzzleId] = useState(searchParams.get('id') || '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Results states
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleWithWords | null>(null);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('search'); // 'search', 'puzzle', 'results'
  
  const API_BASE = 'https://spelling-bee-api.ronysamanta710.workers.dev';
  
  // Define the earliest date for the calendar (May 9, 2018)
  const minDate = new Date('2018-05-09');
  const maxDate = new Date(); // Today
  
  // Check if we have a puzzle ID in the URL params on load
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setPuzzleId(id);
      fetchPuzzleById(id);
    }
    
    const date = searchParams.get('date');
    if (date) {
      const dateObj = new Date(date);
      if (!isNaN(dateObj.getTime())) {
        setSelectedDate(dateObj);
        // Format date in ISO format for the API
        const isoDate = dateObj.toISOString().split('T')[0];
        searchByDate(isoDate);
      }
    }
  }, [searchParams]);
  
  // Helper function to format date for search
  const formatDateForSearch = (date: Date): string => {
    // Return ISO format YYYY-MM-DD for the API
    return date.toISOString().split('T')[0];
  };
  
  // Fetch puzzle by ID
  const fetchPuzzleById = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get puzzle details
      const puzzleRes = await fetch(`${API_BASE}/api/puzzle/${id}`);
      if (!puzzleRes.ok) {
        throw new Error(`Failed to fetch puzzle #${id}`);
      }
      
      const data = await puzzleRes.json();
      
      // Create SearchResult structure expected by our app
      // Wrap the puzzle and words in the structure we're using
      const puzzleWithWords: PuzzleWithWords = {
        puzzle: data.puzzle,
        words: data.words
      };
      
      setCurrentPuzzle(puzzleWithWords);
      setActiveTab('puzzle');
    } catch (err) {
      console.error('Error fetching puzzle:', err);
      setError('Failed to load puzzle. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Search by date
  const searchByDate = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${API_BASE}/api/search/date/${query}`);
      if (!res.ok) {
        throw new Error('Failed to search by date');
      }
      
      const data = await res.json();
      
      // Set the search results from the API
      setSearchResults(data.results);
      
      // If we have exactly one result, we can directly show it as the current puzzle
      if (data.results.length === 1) {
        const result = data.results[0];
        setCurrentPuzzle({
          puzzle: result.puzzle,
          words: result.words
        });
        setActiveTab('puzzle');
      } else if (data.results.length > 1) {
        setActiveTab('results');
      } else {
        setActiveTab('search');
        setError(`No puzzles found for the selected date. Try another date.`);
      }
      
    } catch (err) {
      console.error('Error searching by date:', err);
      setError('Failed to search puzzles by date.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle ID search
  const handleIdSearch = () => {
    if (puzzleId) {
      router.push(`/archive?id=${puzzleId}`);
      fetchPuzzleById(puzzleId);
    }
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      // Format date in ISO format for the API
      const isoDate = formatDateForSearch(date);
      router.push(`/archive?date=${isoDate}`);
      searchByDate(isoDate);
    }
  };
  
  // Group words by length for the current puzzle
  const wordsByLength = currentPuzzle?.words?.reduce((acc, word) => {
    const len = word.length;
    if (!acc[len]) acc[len] = [];
    acc[len].push(word);
    return acc;
  }, {} as Record<number, Word[]>) || {};
  
  // Sort lengths in descending order
  const lengths = Object.keys(wordsByLength).map(Number).sort((a, b) => b - a);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 px-2 py-4 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6 text-indigo-800">Spelling Bee Archive</h1>
        
        {/* Tabs */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => {
                setActiveTab('search');
                setError(null);
              }}
              className={`px-2 sm:px-4 py-2 rounded-md transition-all ${activeTab === 'search' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-gray-200'}`}
            >
              Search Archive
            </button>
            {currentPuzzle && (
              <button 
                onClick={() => {
                  setActiveTab('puzzle');
                  setError(null);
                }}
                className={`px-2 sm:px-4 py-2 rounded-md transition-all ${activeTab === 'puzzle' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-gray-200'}`}
              >
                Current Puzzle
              </button>
            )}
            {searchResults.length > 0 && (
              <button 
                onClick={() => {
                  setActiveTab('results');
                  setError(null);
                }}
                className={`px-2 sm:px-4 py-2 rounded-md transition-all ${activeTab === 'results' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-gray-200'}`}
              >
                Search Results
              </button>
            )}
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 shadow-sm flex items-start">
            <div className="mr-3 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">{error}</p>
              <p className="text-sm mt-1">
                Please try searching with a different date or puzzle ID. The Spelling Bee puzzle started on May 9, 2018, and some dates may not have puzzles.
              </p>
            </div>
          </div>
        )}
        
        {/* Search Form - Combined */}
        {activeTab === 'search' && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Puzzle ID Search */}
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg shadow-md transition-all hover:shadow-lg border border-indigo-100">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-indigo-800">Find by Puzzle ID</h2>
              <div className="mb-3">
                <label htmlFor="puzzleId" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Puzzle ID
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      id="puzzleId"
                      value={puzzleId}
                      onChange={(e) => setPuzzleId(e.target.value)}
                      min="1"
                      className="w-full p-2 pl-7 sm:p-3 sm:pl-8 border border-indigo-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                      placeholder="e.g. 1234"
                    />
                    <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                      #
                    </span>
                  </div>
                  <button
                    onClick={handleIdSearch}
                    className="bg-indigo-600 text-white py-2 px-3 sm:px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg flex items-center"
                    disabled={!puzzleId || loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </>
                    ) : (
                      <>Find</>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 italic">
                  Enter a puzzle ID to view the complete puzzle with all words.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Tip:</span> Recent puzzle IDs are around 2500+
                </p>
              </div>
            </div>
            
            {/* Calendar Picker */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg shadow-md transition-all hover:shadow-lg border border-purple-100">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-purple-800">Find by Date</h2>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date
                </label>
                {loading ? (
                  <div className="flex flex-col items-center py-6">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600 mb-3"></div>
                    <p className="text-purple-700">Loading puzzle data...</p>
                  </div>
                ) : (
                  <div className="calendar-container">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateSelect}
                      minDate={minDate}
                      maxDate={maxDate}
                      inline
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      yearDropdownItemNumber={8}
                      scrollableYearDropdown
                      calendarClassName="bg-white rounded-lg shadow-md border border-purple-200"
                      dayClassName={date => 
                        date.getTime() >= minDate.getTime() && date.getTime() <= maxDate.getTime()
                          ? "hover:bg-purple-200"
                          : "text-gray-300"
                      }
                    />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 italic">
                The calendar shows puzzles from May 9, 2018 to today. Select a date to view the puzzle.
              </p>
              {selectedDate && (
                <p className="mt-2 text-purple-700 font-medium">
                  Selected: {selectedDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Search Results */}
        {activeTab === 'results' && (
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-indigo-800">Search Results</h2>
            
            {searchResults.length > 0 ? (
              <>
                <p className="mb-4 text-gray-600">Found {searchResults.length} puzzles matching your search.</p>
                
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((result, index) => (
                    <div key={index} className="border border-indigo-100 rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-white to-indigo-50">
                      <h4 className="font-bold text-lg mb-2">
                        <Link href={`/archive?id=${result.puzzle.puzzle_id}`} className="text-indigo-600 hover:text-indigo-800 hover:underline">
                          Puzzle #{result.puzzle.puzzle_id}
                        </Link>
                      </h4>
                      <p className="mb-1"><span className="font-semibold">Date:</span> {new Date(result.puzzle.date).toLocaleDateString()}</p>
                      <p className="mb-1"><span className="font-semibold">Center:</span> {result.puzzle.letters}</p>
                      <p className="mb-1"><span className="font-semibold">Letters:</span> {result.puzzle.all_letters}</p>
                      <p className="mb-1"><span className="font-semibold">Words:</span> {result.puzzle.word_count}</p>
                      <p className="mb-2"><span className="font-semibold">Pangrams:</span> {result.puzzle.pangrams_count}</p>
                      
                      <button
                        onClick={() => {
                          // We already have the puzzle and words data, so we can set it directly
                          setCurrentPuzzle({
                            puzzle: result.puzzle,
                            words: result.words
                          });
                          setPuzzleId(String(result.puzzle.puzzle_id));
                          router.push(`/archive?id=${result.puzzle.puzzle_id}`);
                          setActiveTab('puzzle');
                        }}
                        className="text-sm bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-6 sm:py-8">
                <div className="inline-block p-4 sm:p-6 bg-indigo-50 rounded-lg shadow-sm">
                  <p className="text-lg text-indigo-800 mb-2">No puzzles found for the selected date</p>
                  <p className="text-gray-600">Try selecting a different date or searching by puzzle ID</p>
                  <button
                    onClick={() => setActiveTab('search')}
                    className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Back to Search
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Current Puzzle Display */}
        {activeTab === 'puzzle' && currentPuzzle && (
          <div className="mb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-indigo-800">
                Puzzle #{currentPuzzle.puzzle.puzzle_id} - {new Date(currentPuzzle.puzzle.date).toLocaleDateString()}
              </h2>
              
              <div className="flex justify-center items-center mb-6">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                  <div className="honeycomb">
                    {/* Center letter */}
                    <div className="hexagon center">
                      <div className="hexagon-content">{currentPuzzle.puzzle.letters}</div>
                    </div>
                    
                    {/* Top hexagon */}
                    <div className="hexagon top">
                      <div className="hexagon-content">{currentPuzzle.puzzle.all_letters[1]}</div>
                    </div>
                    
                    {/* Top-right hexagon */}
                    <div className="hexagon top-right">
                      <div className="hexagon-content">{currentPuzzle.puzzle.all_letters[2]}</div>
                    </div>
                    
                    {/* Bottom-right hexagon */}
                    <div className="hexagon bottom-right">
                      <div className="hexagon-content">{currentPuzzle.puzzle.all_letters[3]}</div>
                    </div>
                    
                    {/* Bottom hexagon */}
                    <div className="hexagon bottom">
                      <div className="hexagon-content">{currentPuzzle.puzzle.all_letters[4]}</div>
                    </div>
                    
                    {/* Bottom-left hexagon */}
                    <div className="hexagon bottom-left">
                      <div className="hexagon-content">{currentPuzzle.puzzle.all_letters[5]}</div>
                    </div>
                    
                    {/* Top-left hexagon */}
                    <div className="hexagon top-left">
                      <div className="hexagon-content">{currentPuzzle.puzzle.all_letters[6]}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-indigo-50 rounded-lg shadow-sm">
                <p className="mt-1">
                  <span className="font-semibold">Letters:</span> {currentPuzzle.puzzle.all_letters.split('').join(', ')}
                </p>
                <p className="mt-1">
                  <span className="font-semibold">Words:</span> {currentPuzzle.puzzle.word_count} • 
                  <span className="font-semibold ml-2">Pangrams:</span> {currentPuzzle.puzzle.pangrams_count}
                </p>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-800">Words</h3>
              
              {lengths.map(length => (
                <div key={length} className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 pl-2 border-l-4 border-indigo-500">{length}-letter words ({wordsByLength[length].length})</h4>
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
            background-color: #818CF8; /* indigo-400 */
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
            background-color: #6366F1; /* indigo-500 */
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
          
          /* Custom styles for DatePicker */
          :global(.react-datepicker) {
            font-family: inherit;
            border-radius: 0.5rem;
            overflow: hidden;
            border: none;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          :global(.react-datepicker__header) {
            background-color: #8B5CF6;
            color: white;
            border-bottom: none;
            padding-top: 0.8rem;
            padding-bottom: 0.8rem;
          }
          
          :global(.react-datepicker__day-name) {
            color: white;
            font-weight: 600;
          }
          
          :global(.react-datepicker__current-month) {
            color: white;
            font-weight: 600;
            margin-bottom: 0.8rem;
            font-size: 1.1rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
          
          :global(.react-datepicker__day--selected) {
            background-color: #8B5CF6 !important;
            color: white;
            border-radius: 50%;
          }
          
          :global(.react-datepicker__day:hover) {
            background-color: #C4B5FD;
            border-radius: 50%;
          }
          
          :global(.react-datepicker__navigation) {
            top: 1rem;
          }
          
          :global(.calendar-container) {
            display: flex;
            justify-content: center;
          }
          
          /* Styles for month and year dropdowns */
          :global(.react-datepicker__month-dropdown-container),
          :global(.react-datepicker__year-dropdown-container) {
            position: relative;
            display: inline-block;
            margin: 0 0.3rem;
            padding: 0.2rem 0;
          }
          
          :global(.react-datepicker__month-dropdown),
          :global(.react-datepicker__year-dropdown) {
            position: absolute;
            left: 0;
            top: 100%;
            background-color: white;
            border: 1px solid #E5E7EB;
            border-radius: 0.5rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            padding: 0.5rem 0;
            z-index: 99;
            width: auto;
            min-width: 120px;
            max-height: 200px;
            overflow-y: auto;
          }
          
          :global(.react-datepicker__year-dropdown) {
            height: 200px;
            overflow-y: auto;
            width: 100px;
          }
          
          /* Adjust the month options */
          :global(.react-datepicker__month-option),
          :global(.react-datepicker__year-option) {
            padding: 0.3rem 1rem;
            transition: background-color 0.2s;
            color: #1F2937; /* gray-800 - darker for better visibility */
            font-size: 0.9rem;
            text-align: center;
          }
          
          :global(.react-datepicker__month-option:hover),
          :global(.react-datepicker__year-option:hover) {
            background-color: #C4B5FD;
            color: #1F2937; /* Darker text on hover (gray-800) */
          }
          
          :global(.react-datepicker__month-option--selected),
          :global(.react-datepicker__year-option--selected) {
            background-color: #8B5CF6;
            color: white;
          }
          
          :global(.react-datepicker__month-option--selected_month),
          :global(.react-datepicker__year-option--selected_year) {
            font-weight: bold;
          }
          
          :global(.react-datepicker__month-select),
          :global(.react-datepicker__year-select) {
            padding: 0.3rem;
            border: 1px solid #E5E7EB;
            border-radius: 0.25rem;
          }
          
          /* Fix for the selected month/year text in dropdown button */
          :global(.react-datepicker__month-read-view--selected-month),
          :global(.react-datepicker__year-read-view--selected-year) {
            color: white; /* Make the selected month/year visible */
            font-weight: 600;
          }
          
          /* Fix for the dropdown button containers */
          :global(.react-datepicker__month-read-view),
          :global(.react-datepicker__year-read-view) {
            background-color: rgba(255, 255, 255, 0.3);
            padding: 0.3rem 0.6rem;
            border-radius: 0.25rem;
            border: 1px solid rgba(255, 255, 255, 0.8);
            cursor: pointer;
            display: inline-block;
          }
          
          /* Fix for the dropdown carets */
          :global(.react-datepicker__month-read-view--down-arrow),
          :global(.react-datepicker__year-read-view--down-arrow) {
            border-color: white transparent transparent;
            top: 8px;
            right: -2px;
          }
        `}</style>

        <div className="flex justify-center mt-6 sm:mt-8 space-x-2 sm:space-x-4">
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
            Today
          </Link>
          <Link 
            href="/yesterday" 
            className="px-3 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Yesterday
          </Link>
          <Link 
            href="/stats" 
            className="px-3 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Stats
          </Link>
        </div>
      </div>
    </div>
  );
}

// Main export that wraps the content in a Suspense boundary
export default function ArchivePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ArchiveContent />
    </Suspense>
  );
} 