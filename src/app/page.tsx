import Link from 'next/link'
import { Metadata } from 'next'
import SpellingBeeSolver from '@/components/SpellingBeeSolver'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'NYT Spelling Bee Solver | Find All Possible Words',
  description: 'Solve today\'s NYT Spelling Bee puzzle. Enter your letters and find all possible words including pangrams.',
}

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            NYT Spelling Bee <span className="text-yellow-500">Solver</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enter the center letter and surrounding letters from today's puzzle to instantly find all possible words.
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl overflow-hidden border border-yellow-100">
          <div className="md:flex">
            <div className="md:w-2/3 p-6 md:p-8">
              <SpellingBeeSolver />
            </div>
            <div className="hidden md:block md:w-1/3 bg-gradient-to-br from-yellow-400 to-amber-500 p-8 text-white">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Why Use Our Solver?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block mr-2">✓</span>
                    <span>Find all possible words instantly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2">✓</span>
                    <span>Highlights pangrams (words using all 7 letters)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2">✓</span>
                    <span>Organizes words by length for easy browsing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2">✓</span>
                    <span>Uses an extensive dictionary of English words</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">About NYT Spelling Bee</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <p className="mb-4 text-gray-600">
                Spelling Bee is a popular word puzzle game from The New York Times where players try to make words using only the provided letters. Each puzzle has a central letter that must be used in every word.
              </p>
              <p className="text-gray-600">
                A <span className="font-semibold text-yellow-600">"pangram"</span> is a word that uses all seven letters at least once. Finding all the pangrams is the ultimate challenge!
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center items-center">
              <div className="w-40 h-40 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">NYT</div>
                  <div className="text-sm font-medium text-yellow-800">SPELLING BEE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/today" className="group">
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl overflow-hidden shadow-sm border border-yellow-200 hover:shadow-md transition-all duration-300 h-full">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-yellow-800 group-hover:text-yellow-900">Today's Answers</h3>
                <p className="text-yellow-700">Get a complete list of all answers for today's NYT Spelling Bee puzzle, including pangrams.</p>
                <div className="mt-4 text-yellow-800 font-medium group-hover:translate-x-1 transition-transform duration-300">
                  View today's answers →
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/articles" className="group">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden shadow-sm border border-blue-200 hover:shadow-md transition-all duration-300 h-full">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-blue-800 group-hover:text-blue-900">Spelling Bee Articles</h3>
                <p className="text-blue-700">Read helpful tips, strategies, and analysis to improve your NYT Spelling Bee game.</p>
                <div className="mt-4 text-blue-800 font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Browse articles →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
