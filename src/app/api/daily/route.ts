import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://spelling-bee-api.jumblesolver.workers.dev/');
    const apiData = response.data;
    
    // Transform the data to match the expected format in the frontend
    const transformedData = {
      date: apiData.date,
      center: apiData.centralLetter,
      letters: apiData.outerLetters,
      words: apiData.validWords,
      // We'll calculate pangrams in the frontend
    };
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching daily puzzle:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily puzzle' },
      { status: 500 }
    );
  }
} 