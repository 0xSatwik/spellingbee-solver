import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Spelling Bee Articles & Tips | SbAnswer.com',
  description: 'Articles, tips, strategies, and analysis of the New York Times Spelling Bee word puzzle game.',
};

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

// Sample articles data - in a real app, this would come from a CMS or database
const articles: Article[] = [
  {
    id: 'tips-for-beginners',
    title: 'Tips for Spelling Bee Beginners: How to Reach Genius Level',
    excerpt: 'New to the NYT Spelling Bee? Learn strategies to quickly improve your score and reach the coveted Genius level.',
    date: 'June 10, 2023',
  },
  {
    id: 'pangram-strategies',
    title: 'Pangram Hunting: Strategies for Finding All Letters',
    excerpt: 'Pangrams are the holy grail of Spelling Bee. Discover techniques to spot these elusive words that use all seven letters.',
    date: 'May 24, 2023',
  },
  {
    id: 'history-of-spelling-bee',
    title: 'The History and Evolution of the NYT Spelling Bee',
    excerpt: 'From its humble beginnings to the digital phenomenon it is today, explore the fascinating history of the Spelling Bee puzzle.',
    date: 'April 15, 2023',
  },
  {
    id: 'common-patterns',
    title: 'Common Letter Patterns That Will Boost Your Score',
    excerpt: 'Certain letter combinations appear frequently in Spelling Bee. Learn these patterns to dramatically increase your word count.',
    date: 'March 8, 2023',
  },
  {
    id: 'hardest-puzzles',
    title: 'The 10 Most Challenging Spelling Bee Puzzles Ever',
    excerpt: 'Think you\'re a Spelling Bee expert? These notoriously difficult puzzles have stumped even the most dedicated players.',
    date: 'February 19, 2023',
  }
];

export default function ArticlesPage() {
  return (
    <div className="max-w-4xl mx-auto px-2 py-4 sm:pt-5">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Solver
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Spelling Bee Articles & Tips</h1>
      
      <div className="mb-8">
        <p className="text-lg mb-4">
          Explore our collection of articles about the NYT Spelling Bee puzzle. Find tips, strategies, 
          and insights to improve your gameplay and reach those elusive genius and queen bee levels.
        </p>
      </div>
      
      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg">
            <Link href={`/articles/${article.id}`} className="block">
              <p className="text-sm text-gray-500 mb-2">{article.date}</p>
              <h2 className="text-xl font-bold mb-2 hover:text-blue-600">{article.title}</h2>
              <p className="text-gray-700">{article.excerpt}</p>
              <p className="mt-4 text-blue-600 font-medium">Read more →</p>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-yellow-100 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Want more Spelling Bee content?</h2>
        <p className="mb-4">
          We're constantly adding new articles and tips. Check back regularly for the latest Spelling Bee strategies!
        </p>
      </div>
    </div>
  );
} 