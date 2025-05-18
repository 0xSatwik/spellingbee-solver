'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // When opening the menu, prevent scrolling
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div>
      {/* Hamburger button */}
      <button 
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
      >
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Menu drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <span className="font-bold text-xl text-amber-600">Menu</span>
          <button 
            onClick={closeMenu}
            aria-label="Close menu"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-5">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="block py-2 px-4 text-gray-800 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/solver" 
                  className="block py-2 px-4 text-gray-800 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Solver
                </Link>
              </li>
              <li>
                <Link 
                  href="/today" 
                  className="block py-2 px-4 text-gray-800 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Today&apos;s Answers
                </Link>
              </li>
              <li>
                <Link 
                  href="/yesterday" 
                  className="block py-2 px-4 text-gray-800 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Yesterday
                </Link>
              </li>
              <li>
                <Link 
                  href="/archive" 
                  className="block py-2 px-4 text-gray-800 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Archive
                </Link>
              </li>
              <li>
                <Link 
                  href="/stats" 
                  className="block py-2 px-4 text-gray-800 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Stats
                </Link>
              </li>
              <li>
                <Link 
                  href="/articles" 
                  className="block py-2 px-4 text-gray-800 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
                  onClick={closeMenu}
                >
                  Articles
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
} 