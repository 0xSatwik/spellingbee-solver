'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState('Something went wrong');
  
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    
    // Set a more descriptive error message if available
    if (error.message) {
      setErrorMessage(error.message);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops, Something Went Wrong</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        {errorMessage}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition"
        >
          Try Again
        </button>
        <Link 
          href="/" 
          className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
} 