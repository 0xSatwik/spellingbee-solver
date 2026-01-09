/**
 * Spelling Bee API Worker
 * This Cloudflare Worker provides access to Spelling Bee puzzle data
 */

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Create the router
class Router {
  constructor() {
    this.routes = [];
  }

  get(pattern, handler) {
    this.routes.push({ method: 'GET', pattern, handler });
    return this;
  }

  async handle(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Handle OPTIONS request for CORS
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Find matching route
    for (const route of this.routes) {
      if (route.method === method) {
        const match = path.match(new RegExp(`^${route.pattern}$`));
        if (match) {
          const params = match.slice(1);
          return await route.handler(request, env, params);
        }
      }
    }

    // No route matched
    return new Response('Not found', { status: 404 });
  }
}

// Helper function for JSON responses
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// Authentication helper function
function isAuthenticated(request, env) {
  const url = new URL(request.url);
  const apiKey = url.searchParams.get('key');
  
  // Check if the API key is valid
  return apiKey === env.APIKEY;
}

// Direct parser for the exact format provided by NYT
function parseNYTGameData(html) {
  try {
    // Look for the script tag with gameData
    const regex = /<script type="text\/javascript">window\.gameData = ({.*?}),?<\/script>/s;
    const match = html.match(regex);
    
    if (match && match[1]) {
      const gameDataStr = match[1];
      // Parse the data and extract today's puzzle
      const gameData = JSON.parse(gameDataStr);
      if (gameData && gameData.today) {
        return gameData.today;
      }
    }
    
    // If the specific format doesn't match, try a more generic approach
    const genericMatch = html.match(/window\.gameData\s*=\s*({.*?});/s);
    if (genericMatch && genericMatch[1]) {
      try {
        const gameData = JSON.parse(genericMatch[1]);
        if (gameData && gameData.today) {
          return gameData.today;
        }
      } catch (e) {
        console.error("Failed to parse generic match:", e);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing NYT game data:', error);
    return null;
  }
}

// Scraper functions for NYT Spelling Bee
async function scrapeNYTSpellingBee(env) {
  try {
    // Fetch the NYT Spelling Bee page
    const response = await fetch('https://www.nytimes.com/puzzles/spelling-bee');
    if (!response.ok) {
      throw new Error(`Failed to fetch NYT page: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Try to parse using our specialized parser
    const puzzleData = parseNYTGameData(html);
    
    if (!puzzleData) {
      // Fall back to direct extraction from html if provided in the example format
      const hardcodedMatch = html.match(/<script type="text\/javascript">window\.gameData = (\{"today":.*?\})<\/script>/s);
      if (hardcodedMatch && hardcodedMatch[1]) {
        try {
          const gameData = JSON.parse(hardcodedMatch[1]);
          return gameData.today;
        } catch (error) {
          console.error("Failed to parse hardcoded match:", error);
        }
      }
      
      throw new Error('Failed to extract puzzle data from NYT page');
    }
    
    return puzzleData;
  } catch (error) {
    console.error('Error scraping NYT Spelling Bee:', error);
    throw error;
  }
}

// Store puzzle data in the database using the format from our existing database
async function storePuzzleData(env, puzzleData) {
  try {
    // Get the next puzzle ID by finding the highest existing ID and incrementing
    const getLastPuzzleStmt = env.DB.prepare(`
      SELECT MAX(puzzle_id) as last_id FROM puzzles
    `);
    
    const lastPuzzleResult = await getLastPuzzleStmt.first();
    const nextPuzzleId = lastPuzzleResult && lastPuzzleResult.last_id ? lastPuzzleResult.last_id + 1 : 2567;
    
    // Format the date to be consistent with existing data
    let date = puzzleData.printDate;
    
    // Check if date is in ISO format (YYYY-MM-DD)
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      // Convert from ISO format to Month Day, Year format
      const dateObj = new Date(date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      date = dateObj.toLocaleDateString('en-US', options);
    }
    
    // Override with current date for new puzzles - this ensures today's puzzle always has today's date
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const todayFormatted = currentDate.toLocaleDateString('en-US', options);
    
    // Check if a puzzle for this date already exists
    const checkDateStmt = env.DB.prepare(`
      SELECT puzzle_id FROM puzzles WHERE date = ?
    `).bind(todayFormatted);
    
    const existingPuzzleDate = await checkDateStmt.first();
    if (existingPuzzleDate) {
      return { 
        success: false, 
        message: `A puzzle for today (${todayFormatted}) already exists with ID #${existingPuzzleDate.puzzle_id}` 
      };
    }
    
    // Use today's date instead of the puzzleData date
    date = todayFormatted;
    
    // Prepare other data
    const centerLetter = puzzleData.centerLetter.toUpperCase();
    
    // Make sure outerLetters is an array before joining
    let outerLetters = "";
    if (Array.isArray(puzzleData.outerLetters)) {
      outerLetters = puzzleData.outerLetters.join('').toUpperCase();
    } else if (typeof puzzleData.outerLetters === 'string') {
      outerLetters = puzzleData.outerLetters.toUpperCase();
    }
    
    // Make sure validLetters is an array before joining
    let allLetters = "";
    if (Array.isArray(puzzleData.validLetters)) {
      allLetters = puzzleData.validLetters.join('').toUpperCase();
    } else if (typeof puzzleData.validLetters === 'string') {
      allLetters = puzzleData.validLetters.toUpperCase();
    }
    
    const wordCount = puzzleData.answers ? puzzleData.answers.length : 0;
    const pangramsCount = puzzleData.pangrams ? puzzleData.pangrams.length : 0;
    
    // Insert puzzle data - Fix schema to match the database (removed outer_letters column)
    const insertPuzzleStmt = env.DB.prepare(`
      INSERT INTO puzzles (puzzle_id, date, letters, all_letters, word_count, pangrams_count)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      nextPuzzleId, // Use our calculated ID instead of puzzleData.id
      date,
      centerLetter,
      allLetters,
      wordCount,
      pangramsCount
    );
    
    await insertPuzzleStmt.run();
    
    // Insert words
    const insertedWords = [];
    
    if (Array.isArray(puzzleData.answers)) {
      for (const word of puzzleData.answers) {
        // Check if the word is a pangram
        const isPangram = Array.isArray(puzzleData.pangrams) && puzzleData.pangrams.includes(word) ? 1 : 0;
        const length = word.length;
        
        const insertWordStmt = env.DB.prepare(`
          INSERT INTO words (puzzle_id, word, is_pangram, length)
          VALUES (?, ?, ?, ?)
        `).bind(
          nextPuzzleId, // Use our calculated ID instead of puzzleData.id
          word.toLowerCase(), // Store words in lowercase for consistency
          isPangram,
          length
        );
        
        await insertWordStmt.run();
        insertedWords.push(word);
      }
    }
    
    return {
      success: true,
      puzzleId: nextPuzzleId,
      originalId: puzzleData.id,
      date,
      centerLetter,
      outerLetters: outerLetters, // Still include this in the response
      allLetters,
      wordCount,
      pangramsCount,
      wordsInserted: insertedWords.length
    };
  } catch (error) {
    console.error('Error storing puzzle data:', error);
    throw error;
  }
}

// Helper function to calculate puzzle enrichments (points, perfect pangrams)
function calculatePuzzleEnrichments(words) {
  let totalPoints = 0;
  const perfectPangrams = [];
  let hasPerfectPangram = false;

  if (Array.isArray(words)) {
    words.forEach(wordObj => {
      const { word, is_pangram, length } = wordObj;
      if (length === 4) {
        totalPoints += 1;
      } else if (length > 4) {
        totalPoints += length;
      }
      if (is_pangram) {
        totalPoints += 7; // Bonus for pangram
        if (length === 7) {
          hasPerfectPangram = true;
          perfectPangrams.push(word);
        }
      }
    });
  }

  return {
    totalPoints,
    hasPerfectPangram,
    perfectPangrams,
  };
}

// Create the router instance
const router = new Router();

// Root endpoint - API info
router.get('/', async (request, env) => {
  return jsonResponse({
    name: 'Spelling Bee API',
    version: '1.0.0',
    endpoints: [
      '/api/puzzles',
      '/api/puzzle/:id',
      '/api/mostCommonCenterLetters',
      '/api/puzzlesWithMostWords',
      '/api/puzzlesWithMostPangrams',
      '/api/allLettersFrequency',
      '/api/longestPangrams',
      '/api/search/date/:query',
      '/api/search/letter/:letter',
      '/api/search/id/:id',
      '/api/statistics',
      '/api/last/:count',
      '/api/searchWordle/:center_letter',
      '/api/update/nyt',
      '/api/delete/:id',
      '/today',      // Today's puzzle
      '/yesterday'   // Yesterday's puzzle
    ],
  });
});

// Get all puzzles with pagination
router.get('/api/puzzles', async (request, env) => {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const offset = parseInt(url.searchParams.get('offset') || '0');
  
  const stmt = env.DB.prepare(`
    SELECT puzzle_id, date, letters, all_letters, word_count, pangrams_count 
    FROM puzzles 
    ORDER BY puzzle_id DESC
    LIMIT ? OFFSET ?
  `).bind(limit, offset);
  
  const result = await stmt.all();
  
  return jsonResponse({
    puzzles: result.results,
    pagination: {
      limit,
      offset,
    }
  });
});

// Get puzzle by ID with words
router.get('/api/puzzle/([0-9]+)', async (request, env, params) => {
  const puzzleId = parseInt(params[0]);
  
  // Get puzzle details
  const puzzleStmt = env.DB.prepare(`
    SELECT * FROM puzzles WHERE puzzle_id = ?
  `).bind(puzzleId);
  
  const puzzleResult = await puzzleStmt.first();
  
  if (!puzzleResult) {
    return jsonResponse({ error: `Puzzle #${puzzleId} not found` }, 404);
  }
  
  // Get words for this puzzle
  const wordsStmt = env.DB.prepare(`
    SELECT word, is_pangram, length FROM words 
    WHERE puzzle_id = ?
    ORDER BY is_pangram DESC, length DESC, word
  `).bind(puzzleId);
  
  const wordsResult = await wordsStmt.all();
  const words = wordsResult.results || [];

  const enrichments = calculatePuzzleEnrichments(words);
  
  return jsonResponse({
    puzzle: puzzleResult,
    words: words,
    totalPoints: enrichments.totalPoints,
    hasPerfectPangram: enrichments.hasPerfectPangram,
    perfectPangrams: enrichments.perfectPangrams,
  });
});

// Most Common Center Letters
router.get('/api/mostCommonCenterLetters', async (request, env) => {
  const stmt = env.DB.prepare(`
    SELECT letters, COUNT(*) as count 
    FROM puzzles 
    GROUP BY letters 
    ORDER BY count DESC
    LIMIT 26
  `);
  
  const result = await stmt.all();
  
  return jsonResponse({
    centerLetterFrequency: result.results,
  });
});

// Puzzles with Most Words
router.get('/api/puzzlesWithMostWords', async (request, env) => {
  const limit = 10;
  
  const stmt = env.DB.prepare(`
    SELECT puzzle_id, date, word_count
    FROM puzzles
    ORDER BY word_count DESC
    LIMIT ?
  `).bind(limit);
  
  const result = await stmt.all();
  
  return jsonResponse({
    puzzlesWithMostWords: result.results,
  });
});

// Puzzles with Most Pangrams
router.get('/api/puzzlesWithMostPangrams', async (request, env) => {
  const limit = 10;
  
  const stmt = env.DB.prepare(`
    SELECT puzzle_id, date, pangrams_count
    FROM puzzles
    ORDER BY pangrams_count DESC
    LIMIT ?
  `).bind(limit);
  
  const result = await stmt.all();
  
  return jsonResponse({
    puzzlesWithMostPangrams: result.results,
  });
});

// All Letters Frequency
router.get('/api/allLettersFrequency', async (request, env) => {
  // Get all puzzles with their letters
  const stmt = env.DB.prepare(`
    SELECT all_letters FROM puzzles
  `);
  
  const result = await stmt.all();
  const puzzles = result.results;
  
  // Process the letters in JavaScript instead of using WITH clause
  const letterCounts = {};
  
  // Count each letter's frequency
  for (const puzzle of puzzles) {
    if (puzzle.all_letters) {
      for (let i = 0; i < puzzle.all_letters.length; i++) {
        const letter = puzzle.all_letters[i].toUpperCase();
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
      }
    }
  }
  
  // Convert to array and sort
  const letterFrequency = Object.keys(letterCounts).map(letter => ({
    letter: letter,
    count: letterCounts[letter]
  })).sort((a, b) => b.count - a.count);
  
  return jsonResponse({
    allLettersFrequency: letterFrequency,
  });
});

// Longest Pangrams
router.get('/api/longestPangrams', async (request, env) => {
  const limit = 10;
  
  const stmt = env.DB.prepare(`
    SELECT w.word, p.puzzle_id, p.date, LENGTH(w.word) as len
    FROM words w
    JOIN puzzles p ON w.puzzle_id = p.puzzle_id
    WHERE w.is_pangram = 1
    ORDER BY len DESC
    LIMIT ?
  `).bind(limit);
  
  const result = await stmt.all();
  
  return jsonResponse({
    longestPangrams: result.results,
  });
});

// Search by Date
router.get('/api/search/date/([^/]+)', async (request, env, params) => {
  const dateQuery = params[0];
  
  // Handle different date formats for searching
  let formattedQuery = dateQuery;
  let dateObj;
  
  // Try to parse the date query
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateQuery)) {
    // If ISO format (YYYY-MM-DD), convert to a Date object
    dateObj = new Date(dateQuery);
    if (!isNaN(dateObj.getTime())) {
      // Format for human-readable search
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      formattedQuery = dateObj.toLocaleDateString('en-US', options);
    }
  } else if (/^\d{4}-\d{2}$/.test(dateQuery)) {
    // If year-month format, search for that month
    const [year, month] = dateQuery.split('-');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    if (month >= 1 && month <= 12) {
      formattedQuery = `${monthNames[parseInt(month) - 1]} %, ${year}`;
    }
  } else if (/^\d{4}$/.test(dateQuery)) {
    // If just year, search for that year
    formattedQuery = `%, ${dateQuery}`;
  }
  
  // Use multiple LIKE clauses to increase chance of matches
  const stmt = env.DB.prepare(`
    SELECT puzzle_id, date, letters, all_letters, word_count, pangrams_count 
    FROM puzzles 
    WHERE date LIKE ? OR date LIKE ? OR date LIKE ?
    ORDER BY puzzle_id DESC
  `).bind(`%${dateQuery}%`, `%${formattedQuery}%`, `%${dateQuery.replace(/-/g, ' ')}%`);
  
  const result = await stmt.all();
  const puzzles = result.results;
  
  // Get words for each puzzle
  const puzzlesWithWords = [];
  
  for (const puzzle of puzzles) {
    const wordsStmt = env.DB.prepare(`
      SELECT word, is_pangram, length 
      FROM words 
      WHERE puzzle_id = ?
      ORDER BY is_pangram DESC, length DESC, word
    `).bind(puzzle.puzzle_id);
    
    const wordsResult = await wordsStmt.all();
    const words = wordsResult.results || [];
    const enrichments = calculatePuzzleEnrichments(words);
    
    puzzlesWithWords.push({
      puzzle: puzzle,
      words: words,
      totalPoints: enrichments.totalPoints,
      hasPerfectPangram: enrichments.hasPerfectPangram,
      perfectPangrams: enrichments.perfectPangrams,
    });
  }
  
  return jsonResponse({
    query: dateQuery,
    formattedQuery,
    results: puzzlesWithWords
  });
});

// Search by Letter
router.get('/api/search/letter/([A-Za-z])', async (request, env, params) => {
  const letter = params[0].toUpperCase();
  const url = new URL(request.url);
  const centerOnly = url.searchParams.get('centerOnly') === 'true';
  
  let stmt;
  
  if (centerOnly) {
    stmt = env.DB.prepare(`
      SELECT puzzle_id, date, letters, all_letters, word_count 
      FROM puzzles 
      WHERE letters = ? 
      ORDER BY puzzle_id DESC
    `).bind(letter);
  } else {
    stmt = env.DB.prepare(`
      SELECT puzzle_id, date, letters, all_letters, word_count 
      FROM puzzles 
      WHERE all_letters LIKE ? 
      ORDER BY puzzle_id DESC
    `).bind(`%${letter}%`);
  }
  
  const result = await stmt.all();
  
  return jsonResponse({
    letter,
    centerOnly,
    results: result.results,
  });
});

// NEW ENDPOINTS

// Search by ID
router.get('/api/search/id/([0-9]+)', async (request, env, params) => {
  const puzzleId = parseInt(params[0]);
  
  const stmt = env.DB.prepare(`
    SELECT puzzle_id, date, letters, all_letters, word_count, pangrams_count 
    FROM puzzles 
    WHERE puzzle_id = ? 
  `).bind(puzzleId);
  
  const result = await stmt.first();
  
  if (!result) {
    return jsonResponse({ error: `Puzzle #${puzzleId} not found` }, 404);
  }
  
  return jsonResponse({
    result
  });
});

// Search Wordle using Spelling Bee puzzle center letter
router.get('/api/searchWordle/([A-Za-z])', async (request, env, params) => {
  const centerLetter = params[0].toUpperCase();
  
  // Find words that could be wordle answers containing the center letter
  const stmt = env.DB.prepare(`
    SELECT DISTINCT w.word
    FROM words w
    JOIN puzzles p ON w.puzzle_id = p.puzzle_id
    WHERE w.length = 5 
    AND w.word LIKE ?
    AND NOT w.is_pangram 
    ORDER BY w.word
  `).bind(`%${centerLetter}%`);
  
  const result = await stmt.all();
  
  return jsonResponse({
    centerLetter,
    possibleWordleWords: result.results,
  });
});

// Spelling Bee Statistics
router.get('/api/statistics', async (request, env) => {
  // Get total puzzles count
  const puzzleCountStmt = env.DB.prepare(`SELECT COUNT(*) as total FROM puzzles`);
  const puzzleCount = await puzzleCountStmt.first();
  
  // Get total words count
  const wordCountStmt = env.DB.prepare(`SELECT COUNT(*) as total FROM words`);
  const wordCount = await wordCountStmt.first();
  
  // Get total pangrams count
  const pangramCountStmt = env.DB.prepare(`SELECT COUNT(*) as total FROM words WHERE is_pangram = 1`);
  const pangramCount = await pangramCountStmt.first();
  
  // Get average words per puzzle
  const avgWordsStmt = env.DB.prepare(`SELECT AVG(word_count) as avg FROM puzzles`);
  const avgWords = await avgWordsStmt.first();
  
  // Get average pangrams per puzzle
  const avgPangramsStmt = env.DB.prepare(`SELECT AVG(pangrams_count) as avg FROM puzzles`);
  const avgPangrams = await avgPangramsStmt.first();
  
  // Get highest word count
  const maxWordsStmt = env.DB.prepare(`
    SELECT puzzle_id, date, word_count 
    FROM puzzles 
    ORDER BY word_count DESC 
    LIMIT 1
  `);
  const maxWords = await maxWordsStmt.first();
  
  // Get lowest word count
  const minWordsStmt = env.DB.prepare(`
    SELECT puzzle_id, date, word_count 
    FROM puzzles 
    ORDER BY word_count ASC 
    LIMIT 1
  `);
  const minWords = await minWordsStmt.first();
  
  return jsonResponse({
    totalPuzzles: puzzleCount?.total || 0,
    totalWords: wordCount?.total || 0,
    totalPangrams: pangramCount?.total || 0,
    averageWordsPerPuzzle: avgWords?.avg || 0,
    averagePangramsPerPuzzle: avgPangrams?.avg || 0,
    puzzleWithMostWords: maxWords,
    puzzleWithFewestWords: minWords
  });
});

// Get last N puzzles with details
router.get('/api/last/([0-9]+)', async (request, env, params) => {
  const count = parseInt(params[0]);
  
  // Validate count
  if (count <= 0 || count > 100) {
    return jsonResponse({ 
      error: "Count must be between 1 and 100" 
    }, 400);
  }
  
  // Get the last N puzzles
  const puzzlesStmt = env.DB.prepare(`
    SELECT puzzle_id, date, letters, all_letters, word_count, pangrams_count 
    FROM puzzles 
    ORDER BY puzzle_id DESC
    LIMIT ?
  `).bind(count);
  
  const puzzlesResult = await puzzlesStmt.all();
  const puzzles = puzzlesResult.results;
  
  // Get words for each puzzle
  const puzzlesWithWords = [];
  
  for (const puzzle of puzzles) {
    const wordsStmt = env.DB.prepare(`
      SELECT word, is_pangram, length 
      FROM words 
      WHERE puzzle_id = ?
      ORDER BY is_pangram DESC, length DESC, word
    `).bind(puzzle.puzzle_id);
    
    const wordsResult = await wordsStmt.all();
    const words = wordsResult.results || [];
    const enrichments = calculatePuzzleEnrichments(words);
    
    puzzlesWithWords.push({
      ...puzzle,
      words: words,
      totalPoints: enrichments.totalPoints,
      hasPerfectPangram: enrichments.hasPerfectPangram,
      perfectPangrams: enrichments.perfectPangrams,
    });
  }
  
  return jsonResponse({
    count,
    puzzles: puzzlesWithWords
  });
});

// Manual update endpoint - trigger scraping manually with authentication
router.get('/api/update/nyt', async (request, env) => {
  // Check authentication
  if (!isAuthenticated(request, env)) {
    return jsonResponse({
      success: false,
      error: 'Unauthorized access. Valid API key is required.'
    }, 401);
  }
  
  try {
    const puzzleData = await scrapeNYTSpellingBee(env);
    
    // Override date with current date to avoid future date issues
    const currentDate = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const todayFormatted = currentDate.toLocaleDateString('en-US', dateOptions);
    console.log(`Using current date for puzzle: ${todayFormatted}`);
    puzzleData.printDate = todayFormatted;
    
    const result = await storePuzzleData(env, puzzleData);
    
    return jsonResponse(result);
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error.message
    }, 500);
  }
});

// Delete a puzzle by ID with authentication
router.get('/api/delete/([0-9]+)', async (request, env, params) => {
  // Check authentication
  if (!isAuthenticated(request, env)) {
    return jsonResponse({
      success: false,
      error: 'Unauthorized access. Valid API key is required.'
    }, 401);
  }
  
  try {
    const puzzleId = parseInt(params[0]);
    
    // First check if the puzzle exists
    const checkStmt = env.DB.prepare(`
      SELECT puzzle_id FROM puzzles WHERE puzzle_id = ?
    `).bind(puzzleId);
    
    const existingPuzzle = await checkStmt.first();
    if (!existingPuzzle) {
      return jsonResponse({ 
        success: false, 
        message: `Puzzle #${puzzleId} does not exist` 
      }, 404);
    }
    
    // Delete associated words first (foreign key constraint)
    const deleteWordsStmt = env.DB.prepare(`
      DELETE FROM words WHERE puzzle_id = ?
    `).bind(puzzleId);
    
    await deleteWordsStmt.run();
    
    // Then delete the puzzle
    const deletePuzzleStmt = env.DB.prepare(`
      DELETE FROM puzzles WHERE puzzle_id = ?
    `).bind(puzzleId);
    
    await deletePuzzleStmt.run();
    
    return jsonResponse({
      success: true,
      message: `Puzzle #${puzzleId} and all its words have been deleted`,
      puzzleId
    });
  } catch (error) {
    console.error('Error deleting puzzle:', error);
    return jsonResponse({
      success: false,
      error: error.message
    }, 500);
  }
});

// Get today's puzzle
router.get('/today', async (request, env) => {
  try {
    // Get the puzzle with the highest puzzle_id (most recent)
    const puzzleStmt = env.DB.prepare(`
      SELECT * FROM puzzles 
      ORDER BY puzzle_id DESC
      LIMIT 1
    `);
    
    const puzzleResult = await puzzleStmt.first();
    
    if (!puzzleResult) {
      return jsonResponse({ error: 'No puzzles found' }, 404);
    }
    
    // Get words for this puzzle
    const wordsStmt = env.DB.prepare(`
      SELECT word, is_pangram, length FROM words 
      WHERE puzzle_id = ?
      ORDER BY is_pangram DESC, length DESC, word
    `).bind(puzzleResult.puzzle_id);
    
    const wordsResult = await wordsStmt.all();
    const words = wordsResult.results || [];

    const enrichments = calculatePuzzleEnrichments(words);
    
    return jsonResponse({
      puzzle: puzzleResult,
      words: words,
      totalPoints: enrichments.totalPoints,
      hasPerfectPangram: enrichments.hasPerfectPangram,
      perfectPangrams: enrichments.perfectPangrams,
    });
  } catch (error) {
    console.error('Error fetching today\'s puzzle:', error);
    return jsonResponse({
      success: false,
      error: error.message
    }, 500);
  }
});

// Get yesterday's puzzle
router.get('/yesterday', async (request, env) => {
  try {
    // Get the puzzle with the second highest puzzle_id
    // This ensures we get the second most recent one regardless of date format
    const puzzleStmt = env.DB.prepare(`
      SELECT * FROM puzzles 
      ORDER BY puzzle_id DESC
      LIMIT 1 OFFSET 1
    `);
    
    const puzzleResult = await puzzleStmt.first();
    
    if (!puzzleResult) {
      return jsonResponse({ error: 'Yesterday\'s puzzle not found' }, 404);
    }
    
    // Get words for this puzzle
    const wordsStmt = env.DB.prepare(`
      SELECT word, is_pangram, length FROM words 
      WHERE puzzle_id = ?
      ORDER BY is_pangram DESC, length DESC, word
    `).bind(puzzleResult.puzzle_id);
    
    const wordsResult = await wordsStmt.all();
    const words = wordsResult.results || [];

    const enrichments = calculatePuzzleEnrichments(words);
    
    return jsonResponse({
      puzzle: puzzleResult,
      words: words,
      totalPoints: enrichments.totalPoints,
      hasPerfectPangram: enrichments.hasPerfectPangram,
      perfectPangrams: enrichments.perfectPangrams,
    });
  } catch (error) {
    console.error('Error fetching yesterday\'s puzzle:', error);
    return jsonResponse({
      success: false,
      error: error.message
    }, 500);
  }
});

// Main fetch handler and scheduled handler
export default {
  // Handle HTTP requests
  async fetch(request, env, ctx) {
    return router.handle(request, env);
  },
  
  // Scheduled task - runs at 07:01 UTC (12:31 IST) every day
  async scheduled(event, env, ctx) {
    try {
      console.log('Running scheduled NYT Spelling Bee update');
      
      // Scrape the latest puzzle
      const puzzleData = await scrapeNYTSpellingBee(env);
      
      // Validate puzzle data has required fields
      if (!puzzleData || !puzzleData.printDate) {
        throw new Error('Invalid puzzle data: Missing date information');
      }
      
      // Check date format and log it
      console.log(`Raw date from NYT: ${puzzleData.printDate}`);
      
      // Always override date with current date to avoid future date issues
      const currentDate = new Date();
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const todayFormatted = currentDate.toLocaleDateString('en-US', dateOptions);
      console.log(`Using current date for puzzle: ${todayFormatted}`);
      puzzleData.printDate = todayFormatted;
      
      // Store the puzzle data
      const result = await storePuzzleData(env, puzzleData);
      
      console.log('Scheduled update result:', result);
      
      return result;
    } catch (error) {
      console.error('Error in scheduled task:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}; 