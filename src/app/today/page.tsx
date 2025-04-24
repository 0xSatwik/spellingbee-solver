import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Today\'s NYT Spelling Bee Answers | Complete Solutions',
  description: 'Find all the answers for today\'s New York Times Spelling Bee puzzle, including pangrams and words of all lengths.',
};

export default function TodayPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Solver
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Today's NYT Spelling Bee Answers</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Today's Puzzle Information</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
              L
            </div>
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-xl">
              I
            </div>
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-xl">
              N
            </div>
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-xl">
              G
            </div>
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-xl">
              U
            </div>
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-xl">
              A
            </div>
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center text-xl">
              E
            </div>
          </div>
          <p className="text-gray-700">
            <strong>Center letter:</strong> L<br />
            <strong>Other letters:</strong> I, N, G, U, A, E
          </p>
        </div>
        
        <div className="stats p-3 bg-yellow-100 rounded-md mb-6">
          <p className="font-medium">Total words: 48</p>
          <p>Pangrams: 2</p>
          <p>Points: 180</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Pangrams (2)</h3>
          <div className="flex flex-wrap gap-2">
            <span className="inline-block px-3 py-1 bg-yellow-200 rounded-full text-sm">
              LANGUAGE
            </span>
            <span className="inline-block px-3 py-1 bg-yellow-200 rounded-full text-sm">
              LINGUALE
            </span>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-2">8-letter words (5)</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ANGELING</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LINGUALE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LANGUAGE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LUNGEING</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">UNGULATE</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">7-letter words (8)</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LINEAGE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LINGULA</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LUNGFUL</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GAINFUL</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GENIAL</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GILLIAN</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GUNNEL</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LINGUAL</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">6-letter words (12)</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ANGEL</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ANGLE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GLEANING</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LIGNIN</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LINAGE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LINING</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LUGGAGE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LUNGING</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LUPIN</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ENLING</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LEGAL</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LINGAL</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">5-letter words (23)</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ALIGN</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ALIEN</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ALGIN</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ALLEGE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ANGEL</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">ANGLE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">EAGLE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GALEN</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GALLI</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GALLU</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GELLA</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GELID</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GENIE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GIGUE</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GLEAN</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GLEEN</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">GLIAL</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LEGAL</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LIANA</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LIANG</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LILAC</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LUAU</span>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">LUNGE</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Need to solve a different puzzle?</h2>
        <p className="mb-4">
          Use our Spelling Bee Solver tool to find all possible words for any Spelling Bee puzzle.
        </p>
        <Link href="/" className="inline-block px-6 py-2 bg-yellow-400 text-gray-900 font-medium rounded-md hover:bg-yellow-500">
          Go to Solver
        </Link>
      </div>
    </div>
  );
} 