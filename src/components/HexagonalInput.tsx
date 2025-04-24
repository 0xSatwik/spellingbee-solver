'use client';

import { useState, useEffect } from 'react';

interface HexagonalInputProps {
  onLettersChange: (centerLetter: string, outerLetters: string) => void;
}

export default function HexagonalInput({ onLettersChange }: HexagonalInputProps) {
  const [letters, setLetters] = useState<string[]>(Array(7).fill(''));
  const [activeCell, setActiveCell] = useState<number>(0);
  const [keyboardActive, setKeyboardActive] = useState(true);

  // Handle letter updates and callback to parent
  useEffect(() => {
    const centerLetter = letters[0];
    const outerLetters = letters.slice(1).join('');
    onLettersChange(centerLetter, outerLetters);
  }, [letters, onLettersChange]);

  const handleCellClick = (index: number) => {
    setActiveCell(index);
    setKeyboardActive(true);
  };
  
  const handleLetterInput = (index: number, value: string) => {
    const newLetters = [...letters];
    newLetters[index] = value;
    setLetters(newLetters);
  };
  
  const handleClearAll = () => {
    setLetters(Array(7).fill(''));
    setActiveCell(0);
  };

  // Handle keyboard input with proper dependencies
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!keyboardActive) return;
      
      const key = e.key.toUpperCase();
      
      // Check if key is a letter
      if (/^[A-Z]$/.test(key)) {
        handleLetterInput(activeCell, key);
        // Move to next cell
        const nextIndex = (activeCell + 1) % 7;
        setActiveCell(nextIndex);
      } 
      // Backspace
      else if (e.key === 'Backspace') {
        handleLetterInput(activeCell, '');
        // Move to previous cell
        const prevIndex = (activeCell - 1 + 7) % 7;
        setActiveCell(prevIndex);
      }
      // Arrow keys
      else if (e.key === 'ArrowRight' || e.key === 'Tab') {
        e.preventDefault();
        const nextIndex = (activeCell + 1) % 7;
        setActiveCell(nextIndex);
      }
      else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (activeCell - 1 + 7) % 7;
        setActiveCell(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCell, keyboardActive, letters]);

  return (
    <div className="w-full max-w-xs mx-auto" onClick={() => setKeyboardActive(true)}>
      {/* Hexagonal grid */}
      <div className="relative mx-auto w-72 h-72 mb-6">
        <div className="honeycomb">
          {/* Center hexagon */}
          <div 
            className={`hexagon center ${activeCell === 0 ? 'active' : ''}`}
            onClick={() => handleCellClick(0)}
          >
            <div className="hexagon-content">{letters[0] || ''}</div>
          </div>
          
          {/* Top hexagon */}
          <div 
            className={`hexagon top ${activeCell === 1 ? 'active' : ''}`}
            onClick={() => handleCellClick(1)}
          >
            <div className="hexagon-content">{letters[1] || ''}</div>
          </div>
          
          {/* Top-right hexagon */}
          <div 
            className={`hexagon top-right ${activeCell === 2 ? 'active' : ''}`}
            onClick={() => handleCellClick(2)}
          >
            <div className="hexagon-content">{letters[2] || ''}</div>
          </div>
          
          {/* Bottom-right hexagon */}
          <div 
            className={`hexagon bottom-right ${activeCell === 3 ? 'active' : ''}`}
            onClick={() => handleCellClick(3)}
          >
            <div className="hexagon-content">{letters[3] || ''}</div>
          </div>
          
          {/* Bottom hexagon */}
          <div 
            className={`hexagon bottom ${activeCell === 4 ? 'active' : ''}`}
            onClick={() => handleCellClick(4)}
          >
            <div className="hexagon-content">{letters[4] || ''}</div>
          </div>
          
          {/* Bottom-left hexagon */}
          <div 
            className={`hexagon bottom-left ${activeCell === 5 ? 'active' : ''}`}
            onClick={() => handleCellClick(5)}
          >
            <div className="hexagon-content">{letters[5] || ''}</div>
          </div>
          
          {/* Top-left hexagon */}
          <div 
            className={`hexagon top-left ${activeCell === 6 ? 'active' : ''}`}
            onClick={() => handleCellClick(6)}
          >
            <div className="hexagon-content">{letters[6] || ''}</div>
          </div>
        </div>
      </div>

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
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .hexagon:hover {
          background-color: #D1D5DB; /* gray-300 */
        }
        
        .hexagon.active {
          background-color: #D1D5DB; /* gray-300 */
          box-shadow: 0 0 0 2px #9CA3AF; /* gray-400 */
        }
        
        .hexagon.center {
          width: 70px;
          height: 70px;
          background-color: #FBBF24; /* yellow-400 */
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
        
        .hexagon.center:hover {
          background-color: #F59E0B; /* yellow-500 */
        }
        
        .hexagon.center.active {
          background-color: #F59E0B; /* yellow-500 */
          box-shadow: 0 0 0 2px #D97706; /* yellow-600 */
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
          text-transform: uppercase;
        }
      `}</style>

      <div className="text-center mb-4">
        <p className="text-sm text-gray-600 mb-2">
          Click on a cell to select it, then type a letter. The center (yellow) cell is the required letter.
        </p>
        <button
          type="button"
          onClick={handleClearAll}
          className="px-4 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['A','B','C','D','E','F','G'].map((letter) => (
          <button
            key={letter}
            type="button"
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            onClick={() => {
              handleLetterInput(activeCell, letter);
              const nextIndex = (activeCell + 1) % 7;
              setActiveCell(nextIndex);
            }}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['H','I','J','K','L','M','N'].map((letter) => (
          <button
            key={letter}
            type="button"
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            onClick={() => {
              handleLetterInput(activeCell, letter);
              const nextIndex = (activeCell + 1) % 7;
              setActiveCell(nextIndex);
            }}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['O','P','Q','R','S','T','U'].map((letter) => (
          <button
            key={letter}
            type="button"
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            onClick={() => {
              handleLetterInput(activeCell, letter);
              const nextIndex = (activeCell + 1) % 7;
              setActiveCell(nextIndex);
            }}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['V','W','X','Y','Z','⌫','Tab'].map((key) => (
          <button
            key={key}
            type="button"
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
            onClick={() => {
              if (key === '⌫') {
                handleLetterInput(activeCell, '');
              } else if (key === 'Tab') {
                const nextIndex = (activeCell + 1) % 7;
                setActiveCell(nextIndex);
              } else {
                handleLetterInput(activeCell, key);
                const nextIndex = (activeCell + 1) % 7;
                setActiveCell(nextIndex);
              }
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
} 