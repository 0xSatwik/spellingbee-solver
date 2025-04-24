import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "NYT Spelling Bee Solver | Find All Possible Words",
  description: "Daily NYT Spelling Bee solver - find all possible words including pangrams for today's NYT Spelling Bee puzzle",
  keywords: "spelling bee, nyt, new york times, spelling bee solver, pangrams, word game, puzzle solver",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex min-h-screen flex-col bg-gray-50">
          <header className="bg-gradient-to-r from-yellow-400 to-amber-500 p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
                NYT Spelling Bee Solver
              </h1>
              <div className="hidden md:flex space-x-4">
                <a href="/" className="text-white hover:text-yellow-100 font-medium transition">Home</a>
                <a href="/today" className="text-white hover:text-yellow-100 font-medium transition">Today's Answers</a>
                <a href="/articles" className="text-white hover:text-yellow-100 font-medium transition">Articles</a>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {children}
            </div>
          </main>
          <footer className="bg-gray-800 text-white p-6">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-3">NYT Spelling Bee Solver</h3>
                  <p className="text-gray-300 text-sm">
                    A powerful tool to find all possible words for the New York Times Spelling Bee puzzle.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/" className="text-gray-300 hover:text-yellow-300 text-sm transition">Home</a></li>
                    <li><a href="/today" className="text-gray-300 hover:text-yellow-300 text-sm transition">Today's Answers</a></li>
                    <li><a href="/articles" className="text-gray-300 hover:text-yellow-300 text-sm transition">Articles</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">Disclaimer</h3>
                  <p className="text-gray-300 text-sm">
                    This tool is not affiliated with The New York Times. It is created for educational and entertainment purposes.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} NYT Spelling Bee Solver. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
