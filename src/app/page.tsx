"use client";

import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-3/5 text-white mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Spelling Bee <span className="relative inline-block">
                    Solutions
                    <span className="absolute bottom-1 left-0 w-full h-2 bg-white opacity-30"></span>
                  </span>
                </h1>
                <p className="text-xl mb-6 text-yellow-50">
                  Get answers to NYT Spelling Bee puzzles, use our solving tools, and improve your skills with our free practice puzzles.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/solver" className="bg-amber-900 text-white hover:bg-amber-950 font-medium rounded-lg px-6 py-3 text-center transition-colors duration-300 shadow-md hover:shadow-lg">
                    NYT Solver
                  </Link>
                  <Link href="/today" className="bg-white text-yellow-600 hover:bg-yellow-50 font-medium rounded-lg px-6 py-3 text-center transition-colors duration-300 shadow-md hover:shadow-lg">
                    Today's Answers
                  </Link>
                </div>
              </div>
              <div className="md:w-2/5 flex justify-center">
                <div className="relative w-64 h-64">
                  {/* Honeycomb background pattern */}
                  <div className="absolute inset-0 honeycomb-pattern opacity-20"></div>
                  {/* Main circular element */}
                  <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-4 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-white mb-1">SbA</div>
                      <div className="text-lg font-medium text-yellow-800">SbAnswer.com</div>
                    </div>
                  </div>
                  {/* Floating letter tiles */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center transform rotate-12 animate-float">
                    <span className="text-yellow-600 font-bold text-xl">A</span>
                  </div>
                  <div className="absolute -bottom-4 left-5 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center transform -rotate-6 animate-float-delay">
                    <span className="text-yellow-600 font-bold text-xl">B</span>
                  </div>
                  <div className="absolute top-10 -left-4 w-11 h-11 bg-white rounded-lg shadow-md flex items-center justify-center transform rotate-3 animate-float-slow">
                    <span className="text-yellow-600 font-bold text-xl">S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* NYT Solutions Section */}
      <section className="mb-12 bg-gradient-to-r from-amber-50 to-yellow-100 p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-3">Today's NYT Spelling Bee Solutions</h2>
            <p className="text-gray-700 mb-4">
              Get instant access to all solutions for today's New York Times Spelling Bee puzzle, including pangrams, point values, and more.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/today" className="bg-amber-500 text-white hover:bg-amber-600 font-medium rounded-lg px-6 py-2 text-center transition-colors">
                Today's Answers
              </Link>
              <Link href="/yesterday" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-lg px-6 py-2 text-center transition-colors">
                Yesterday's Answers
              </Link>
            </div>
          </div>
          <div className="flex md:w-1/3 justify-center">
            <div className="honeycomb">
              {/* Sample honeycomb preview of today's puzzle */}
              <div className="hexagon center">
                <div className="hexagon-content">S</div>
              </div>
              <div className="hexagon top">
                <div className="hexagon-content">E</div>
              </div>
              <div className="hexagon top-right">
                <div className="hexagon-content">L</div>
              </div>
              <div className="hexagon bottom-right">
                <div className="hexagon-content">P</div>
              </div>
              <div className="hexagon bottom">
                <div className="hexagon-content">A</div>
              </div>
              <div className="hexagon bottom-left">
                <div className="hexagon-content">Y</div>
              </div>
              <div className="hexagon top-left">
                <div className="hexagon-content">R</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tools Grid */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Our <span className="text-yellow-500">Spelling Bee</span> Tools
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/solver" className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-amber-200">
            <div className="p-5 flex items-center">
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-amber-700">NYT Solver</h3>
            </div>
          </Link>
          
          <Link href="/today" className="flex flex-col h-full bg-gradient-to-br from-green-50 to-green-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-green-200">
            <div className="p-5 flex items-center">
              <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-700">NYT Today</h3>
            </div>
          </Link>
          
          <Link href="/yesterday" className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-purple-200">
            <div className="p-5 flex items-center">
              <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-purple-700">NYT Yesterday</h3>
            </div>
          </Link>
          
          <Link href="/play" className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200">
            <div className="p-5 flex items-center">
              <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-blue-700">Practice Spelling Bee</h3>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Practice Section */}
      <section className="mb-12 bg-blue-50 p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-3">Free Practice Puzzles</h2>
            <p className="text-gray-700 mb-4">
              Improve your Spelling Bee skills with our free practice puzzles. Create words using the given letters, with each word containing the center letter.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/play" className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-lg px-6 py-2 text-center transition-colors">
                Practice Now
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-blue-200 rounded-full"></div>
              <div className="absolute inset-2 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">Practice</div>
                  <div className="text-sm text-blue-600">Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Spelling Bee Section */}
      <section className="mb-12">
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-yellow-200 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="hexagon-large">
                    <div className="hexagon-content-large text-5xl font-bold text-amber-500">Bee</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">About SbAnswer</h2>
              <p className="text-gray-700 mb-4">
                SbAnswer is your premier resource for NYT Spelling Bee solutions. Our site provides comprehensive answers and tools to help you solve the daily New York Times Spelling Bee puzzles.
              </p>
              <p className="text-gray-700 mb-4">
                Each puzzle features seven letters arranged in a honeycomb pattern, with one letter in the center. Players must create words using these letters, with each word containing the center letter.
              </p>
              <p className="text-gray-700">
                While our primary focus is on providing NYT puzzle solutions and solving tools, we also offer free practice puzzles to help you improve your skills and enjoy the Spelling Bee experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Highlights */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Why Choose <span className="text-yellow-500">SbAnswer</span>?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Complete NYT Solutions</h3>
            <p className="text-gray-600">
              Get all possible answers for any NYT Spelling Bee puzzle, including pangrams, point values, and difficulty levels.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Powerful Solver Tool</h3>
            <p className="text-gray-600">
              Our advanced solver helps you find all valid words for any NYT Spelling Bee puzzle, including those elusive pangrams that might be hard to spot.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Free Practice Mode</h3>
            <p className="text-gray-600">
              Improve your skills with our free practice puzzles, designed to help you become better at solving the daily NYT Spelling Bee.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section>
        <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Solve?</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Get solutions to today's NYT Spelling Bee puzzle or use our solver to help with any challenge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/today" className="bg-white text-amber-600 hover:bg-gray-100 font-medium rounded-lg px-8 py-3 text-lg transition-colors shadow-md">
              Today's Answers
            </Link>
            <Link href="/solver" className="bg-amber-800 text-white hover:bg-amber-900 font-medium rounded-lg px-8 py-3 text-lg transition-colors shadow-md">
              Use NYT Solver
            </Link>
          </div>
        </div>
      </section>
      
      {/* Custom styles for hexagon elements */}
      <style jsx>{`
        .honeycomb {
          position: relative;
          width: 160px;
          height: 160px;
        }
        
        .hexagon {
          position: absolute;
          width: 50px;
          height: 50px;
          background-color: #E5E7EB;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          transition: all 0.3s ease;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .hexagon.center {
          width: 60px;
          height: 60px;
          background-color: #F59E0B;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          color: white;
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
        
        .hexagon-content {
          transform: translateY(2px);
        }
        
        .hexagon-large {
          width: 120px;
          height: 120px;
          background-color: white;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .hexagon-content-large {
          transform: translateY(4px);
        }
        
        .honeycomb-pattern {
          background-image: radial-gradient(#FCD34D 10%, transparent 11%), 
                           radial-gradient(#FCD34D 10%, transparent 11%);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }
        
        /* Animation for floating letter tiles */
        @keyframes float {
          0% { transform: translateY(0) rotate(12deg); }
          50% { transform: translateY(-8px) rotate(10deg); }
          100% { transform: translateY(0) rotate(12deg); }
        }
        
        @keyframes float-delay {
          0% { transform: translateY(0) rotate(-6deg); }
          60% { transform: translateY(-10px) rotate(-8deg); }
          100% { transform: translateY(0) rotate(-6deg); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0) rotate(3deg); }
          40% { transform: translateY(-6px) rotate(5deg); }
          100% { transform: translateY(0) rotate(3deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 4s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
