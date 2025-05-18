'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl font-bold text-yellow-600">404</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
 