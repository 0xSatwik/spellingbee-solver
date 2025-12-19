'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/solver', label: 'Solver', icon: '🔍' },
    { href: '/today', label: "Today's Answers", icon: '📅' },
    { href: '/yesterday', label: 'Yesterday', icon: '⏮️' },
    { href: '/archive', label: 'Archive', icon: '📚' },
    { href: '/stats', label: 'Statistics', icon: '📊' },
    { href: '/articles', label: 'Articles', icon: '📝' },
    { href: '/about', label: 'About Us', icon: 'ℹ️' },
    { href: '/contact', label: 'Contact', icon: '✉️' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'
              }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
          ></span>
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-amber-500 via-yellow-500 to-orange-500 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="p-6 bg-white/10 backdrop-blur-sm border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform rotate-45">
                <span className="text-amber-600 font-black text-xl -rotate-45">SB</span>
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">SbSolver</h2>
                <p className="text-sm text-yellow-100">NYT Spelling Bee</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-all duration-200 group"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'slideIn 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-200">{item.icon}</span>
                  <span className="font-semibold group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Menu Footer */}
          <div className="p-6 bg-white/10 backdrop-blur-sm border-t border-white/20">
            <p className="text-white/80 text-sm text-center">
              Your ultimate NYT Spelling Bee resource
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}