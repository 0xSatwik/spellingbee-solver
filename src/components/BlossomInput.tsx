'use client';

import { useState, useEffect } from 'react';

interface BlossomInputProps {
    onLettersChange: (centerLetter: string, outerLetters: string) => void;
    centerLetter?: string;
    outerLetters?: string;
}

export default function BlossomInput({ onLettersChange, centerLetter = '', outerLetters = '' }: BlossomInputProps) {
    const [letters, setLetters] = useState<string[]>(Array(7).fill(''));
    const [activeCell, setActiveCell] = useState<number>(0);
    const [keyboardActive, setKeyboardActive] = useState(true);

    // Sync internal state with props when they change (e.g. from autofill)
    useEffect(() => {
        const currentCenter = letters[0];
        const currentOuter = letters.slice(1).join('');

        if (centerLetter !== currentCenter || outerLetters !== currentOuter) {
            const newLetters = Array(7).fill('');
            newLetters[0] = centerLetter.toUpperCase();
            const outerArray = outerLetters.toUpperCase().split('');
            for (let i = 0; i < 6; i++) {
                newLetters[i + 1] = outerArray[i] || '';
            }
            setLetters(newLetters);
        }
    }, [centerLetter, outerLetters]);

    // Handle letter updates and callback to parent
    useEffect(() => {
        const currentCenter = letters[0];
        const currentOuter = letters.slice(1).join('');
        onLettersChange(currentCenter, currentOuter);
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

    // Handle keyboard input
    useEffect(() => {
        const handleKeyboardLetterInput = (index: number, value: string) => {
            const newLetters = [...letters];
            newLetters[index] = value;
            setLetters(newLetters);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!keyboardActive) return;

            const key = e.key.toUpperCase();

            if (/^[A-Z]$/.test(key)) {
                handleKeyboardLetterInput(activeCell, key);
                const nextIndex = (activeCell + 1) % 7;
                setActiveCell(nextIndex);
            }
            else if (e.key === 'Backspace') {
                handleKeyboardLetterInput(activeCell, '');
                const prevIndex = (activeCell - 1 + 7) % 7;
                setActiveCell(prevIndex);
            }
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
            {/* Blossom/Flower grid */}
            <div className="relative mx-auto w-72 h-72 mb-6">
                <div className="blossom">
                    {/* Center circle */}
                    <div
                        className={`petal center ${activeCell === 0 ? 'active' : ''}`}
                        onClick={() => handleCellClick(0)}
                    >
                        <div className="petal-content">{letters[0] || ''}</div>
                    </div>

                    {/* Top petal */}
                    <div
                        className={`petal top ${activeCell === 1 ? 'active' : ''}`}
                        onClick={() => handleCellClick(1)}
                    >
                        <div className="petal-content">{letters[1] || ''}</div>
                    </div>

                    {/* Top-right petal */}
                    <div
                        className={`petal top-right ${activeCell === 2 ? 'active' : ''}`}
                        onClick={() => handleCellClick(2)}
                    >
                        <div className="petal-content">{letters[2] || ''}</div>
                    </div>

                    {/* Bottom-right petal */}
                    <div
                        className={`petal bottom-right ${activeCell === 3 ? 'active' : ''}`}
                        onClick={() => handleCellClick(3)}
                    >
                        <div className="petal-content">{letters[3] || ''}</div>
                    </div>

                    {/* Bottom petal */}
                    <div
                        className={`petal bottom ${activeCell === 4 ? 'active' : ''}`}
                        onClick={() => handleCellClick(4)}
                    >
                        <div className="petal-content">{letters[4] || ''}</div>
                    </div>

                    {/* Bottom-left petal */}
                    <div
                        className={`petal bottom-left ${activeCell === 5 ? 'active' : ''}`}
                        onClick={() => handleCellClick(5)}
                    >
                        <div className="petal-content">{letters[5] || ''}</div>
                    </div>

                    {/* Top-left petal */}
                    <div
                        className={`petal top-left ${activeCell === 6 ? 'active' : ''}`}
                        onClick={() => handleCellClick(6)}
                    >
                        <div className="petal-content">{letters[6] || ''}</div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .blossom {
          position: relative;
          width: 300px;
          height: 300px;
          margin: 0 auto;
        }
        
        .petal {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
          box-shadow: 
            0 4px 6px -1px rgba(0, 0, 0, 0.1), 
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 2px 4px rgba(255, 255, 255, 0.8);
          user-select: none;
        }
        
        .petal:hover {
          background: linear-gradient(135deg, #ffffff 0%, #e5e7eb 100%);
          transform: scale(1.05);
          z-index: 5;
        }
        
        /* Center - circle */
        .petal.center {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #4A2511; /* Dark Brown */
          color: #FBBF24; /* Yellow */
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          border: 4px solid #ffffff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }
        
        .petal.center:hover {
          background: #5D3118;
          transform: translate(-50%, -50%) scale(1.05);
        }
        
        /* Petal shape - Leaf/Petal shape */
        .petal:not(.center) {
          width: 80px;
          height: 110px;
          /* Leaf shape using border-radius */
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          color: #374151;
          z-index: 10;
          border: 1px solid #1a1a1a; /* Dark border for visibility */
          
          /* Transform origin at the bottom center of the petal so they fan out */
          transform-origin: center 120%; 
          
          /* Positioning: Start all at center-top, then rotate */
          top: 7%; 
          left: calc(50% - 40px);
        }
        
        .petal:not(.center).active {
          background: #FEF3C7; /* Yellow-100 */
          border: 2px solid #F59E0B;
          box-shadow: 0 0 0 2px #FDE68A;
        }

        /* 
           Positions:
           We rotate the petals around the center.
           Since transform-origin is set to center 120% (approx where the center of the flower is),
           we just need to rotate them.
        */
        
        .petal.top {
          transform: rotate(0deg);
        }
        
        .petal.top-right {
          transform: rotate(60deg);
        }
        
        .petal.bottom-right {
          transform: rotate(120deg);
        }
        
        .petal.bottom {
          transform: rotate(180deg);
        }
        
        .petal.bottom-left {
          transform: rotate(240deg);
        }
        
        .petal.top-left {
          transform: rotate(300deg);
        }
        
        /* Counter-rotate text so it stays upright */
        .petal-content {
          transform: rotate(0deg);
        }
        .petal.top-right .petal-content { transform: rotate(-60deg); }
        .petal.bottom-right .petal-content { transform: rotate(-120deg); }
        .petal.bottom .petal-content { transform: rotate(-180deg); }
        .petal.bottom-left .petal-content { transform: rotate(-240deg); }
        .petal.top-left .petal-content { transform: rotate(-300deg); }

        /* Hover effects considering rotation */
        .petal:not(.center):hover {
          z-index: 15;
          /* We need to maintain rotation on hover, just scale up */
        }
        .petal.top:hover { transform: rotate(0deg) scale(1.05); }
        .petal.top-right:hover { transform: rotate(60deg) scale(1.05); }
        .petal.bottom-right:hover { transform: rotate(120deg) scale(1.05); }
        .petal.bottom:hover { transform: rotate(180deg) scale(1.05); }
        .petal.bottom-left:hover { transform: rotate(240deg) scale(1.05); }
        .petal.top-left:hover { transform: rotate(300deg) scale(1.05); }

      `}</style>

            <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">
                    Click on a petal to select it, then type a letter. The center (brown) circle is the required letter.
                </p>
                <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-4 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Clear All
                </button>
            </div>

            {/* On-screen keyboard */}
            <div className="grid grid-cols-7 gap-1 mb-4">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((letter) => (
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
                {['H', 'I', 'J', 'K', 'L', 'M', 'N'].map((letter) => (
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
                {['O', 'P', 'Q', 'R', 'S', 'T', 'U'].map((letter) => (
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
                {['V', 'W', 'X', 'Y', 'Z', '⌫', 'Tab'].map((key) => (
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
