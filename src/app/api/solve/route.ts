import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// We'll use this to cache the word list to avoid fetching it on every request
let wordListCache: string[] | null = null;

// Fetch the word list from GitHub
async function fetchWordList(): Promise<string[]> {
  if (wordListCache) {
    return wordListCache;
  }
  
  try {
    const response = await axios.get<string[]>(
      'https://raw.githubusercontent.com/words/an-array-of-english-words/refs/heads/master/index.json'
    );
    
    const words = response.data;
    if (!Array.isArray(words)) {
      throw new Error('Invalid word list format');
    }
    
    wordListCache = words;
    return words;
  } catch (error) {
    console.error('Error fetching word list:', error);
    throw new Error('Failed to fetch word list');
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const centerLetter = searchParams.get('center')?.toLowerCase();
  const allLetters = searchParams.get('letters')?.toLowerCase();
  
  if (!centerLetter || !allLetters) {
    return NextResponse.json(
      { error: 'Missing required parameters: center, letters' }, 
      { status: 400 }
    );
  }
  
  // Make sure center letter is in allLetters
  if (!allLetters.includes(centerLetter)) {
    return NextResponse.json(
      { error: 'Center letter must be included in all letters' }, 
      { status: 400 }
    );
  }
  
  try {
    const wordList = await fetchWordList();
    
    // Filter words that:
    // 1. Are at least 4 letters long
    // 2. Contain the center letter
    // 3. Only contain letters from the allLetters set
    const validWords = wordList.filter((word: string) => {
      // Convert to lowercase
      const lowerWord = word.toLowerCase();
      
      // Must be at least 4 letters
      if (lowerWord.length < 4) {
        return false;
      }
      
      // Must contain the center letter
      if (!lowerWord.includes(centerLetter)) {
        return false;
      }
      
      // Must only contain letters from the allLetters set
      for (const letter of lowerWord) {
        if (!allLetters.includes(letter)) {
          return false;
        }
      }
      
      return true;
    });
    
    // Identify pangrams (words that use all letters)
    const pangrams = validWords.filter((word: string) => {
      const letterSet = new Set(word.toLowerCase());
      return Array.from(allLetters).every(letter => letterSet.has(letter));
    });
    
    // Group words by length
    const wordsByLength: Record<number, string[]> = {};
    validWords.forEach((word: string) => {
      const length = word.length;
      if (!wordsByLength[length]) {
        wordsByLength[length] = [];
      }
      wordsByLength[length].push(word);
    });
    
    // Sort words in each length group alphabetically
    Object.keys(wordsByLength).forEach(length => {
      wordsByLength[Number(length)].sort();
    });
    
    return NextResponse.json({
      pangrams,
      wordsByLength,
      totalCount: validWords.length
    });
  } catch (error) {
    console.error('Error solving puzzle:', error);
    return NextResponse.json(
      { error: 'Failed to solve puzzle' }, 
      { status: 500 }
    );
  }
} 