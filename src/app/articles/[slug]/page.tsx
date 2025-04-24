import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

// Sample articles data - in a real app, this would come from a CMS or database
const articles: Article[] = [
  {
    id: 'tips-for-beginners',
    title: 'Tips for Spelling Bee Beginners: How to Reach Genius Level',
    excerpt: 'New to the NYT Spelling Bee? Learn strategies to quickly improve your score and reach the coveted Genius level.',
    date: 'June 10, 2023',
    content: `
      <p>The New York Times Spelling Bee puzzle has become a daily ritual for word lovers everywhere. If you're new to the game, reaching the coveted "Genius" level can seem daunting at first. But with these strategies, you'll be well on your way to becoming a Spelling Bee expert.</p>
      
      <h2>Understand the Rules</h2>
      <p>The rules of Spelling Bee are simple but strict:</p>
      <ul>
        <li>Create words using only the provided letters</li>
        <li>Words must be at least 4 letters long</li>
        <li>Words must include the center letter</li>
        <li>Letters can be used multiple times</li>
        <li>No proper nouns, hyphenated words, or obscenities</li>
      </ul>
      
      <h2>Start with the Basics</h2>
      <p>When you first look at a puzzle, start with the most obvious words. Look for common prefixes (re-, un-, in-) and suffixes (-ing, -ed, -er) that can be formed with your letters. Finding these "easy" words builds momentum and confidence.</p>
      
      <h2>Hunt for Pangrams</h2>
      <p>A "pangram" is a word that uses all seven letters at least once. Every puzzle has at least one pangram, and finding it earns you bonus points. Think about common letter combinations that might use all your letters.</p>
      
      <h2>Use Word Patterns</h2>
      <p>Certain letter patterns appear frequently in English words. If you have these patterns available in your letter set, they can be gold mines:</p>
      <ul>
        <li>Consonant pairs: TH, SH, CH, CK, etc.</li>
        <li>Vowel pairs: EA, OU, IE, etc.</li>
        <li>Common endings: -ING, -ED, -ER, -EST, -LY</li>
      </ul>
      
      <h2>Take Breaks</h2>
      <p>When you feel stuck, take a break. Our brains continue processing information even when we're not actively thinking about a problem. Come back after a few hours, and new words often appear more obvious.</p>
      
      <h2>Think About Categories</h2>
      <p>Sometimes thinking in word categories can help. If your letters include "F" and "R," consider food-related words (FRUIT, FRIED). If you have "B" and "D," think about body parts (HAND, HEAD).</p>
      
      <h2>Practice Daily</h2>
      <p>Like any skill, Spelling Bee prowess improves with practice. Play every day, and you'll start to recognize patterns and develop strategies that work for your thinking style.</p>
      
      <h2>Use Our Solver as a Last Resort</h2>
      <p>When you've exhausted all your ideas and just want to see what you missed, our Spelling Bee Solver is here to help. It's a great learning tool - seeing words you missed can expand your vocabulary for future puzzles.</p>
      
      <p>With these tips, you'll be reaching "Genius" level in no time. Happy word hunting!</p>
    `,
  },
  {
    id: 'pangram-strategies',
    title: 'Pangram Hunting: Strategies for Finding All Letters',
    excerpt: 'Pangrams are the holy grail of Spelling Bee. Discover techniques to spot these elusive words that use all seven letters.',
    date: 'May 24, 2023',
    content: `
      <p>Pangrams - words that use all seven letters in the puzzle - are the ultimate achievement in Spelling Bee. They're worth bonus points and often give you a significant boost toward higher ranks. Here's how to find them more consistently.</p>
      
      <h2>Look for Long Words</h2>
      <p>Most pangrams are longer words, typically 7-10 letters. Focus on building longer words with your available letters.</p>
      
      <h2>Check for Common Pangram Types</h2>
      <p>Many pangrams fall into these categories:</p>
      <ul>
        <li>Compound words (SUNBAKED, HANDMADE)</li>
        <li>Words with prefixes or suffixes (UNLOCKED, PLAYABLE)</li>
        <li>Words with multiple syllables (DRAMATIC, PANORAMA)</li>
      </ul>
      
      <h2>Consider Letter Frequency</h2>
      <p>If rare letters like J, Q, X, or Z are in your puzzle, they often appear in a limited number of English words. Build around these rare letters first.</p>
      
      <h2>Think About Word Structure</h2>
      <p>Most English words follow predictable vowel-consonant patterns. Make sure your pangram candidate has enough vowels to be pronounceable (unless it's an unusual technical term).</p>
      
      <h2>Use Visualization Techniques</h2>
      <p>Sometimes rearranging the letters visually helps. Write them in a circle, or shuffle them on paper to see new combinations.</p>
      
      <p>Remember that every Spelling Bee puzzle contains at least one pangram, and some have multiple. Finding them all is one of the most satisfying aspects of the game!</p>
    `,
  },
  {
    id: 'history-of-spelling-bee',
    title: 'The History and Evolution of the NYT Spelling Bee',
    excerpt: 'From its humble beginnings to the digital phenomenon it is today, explore the fascinating history of the Spelling Bee puzzle.',
    date: 'April 15, 2023',
    content: `
      <p>The New York Times Spelling Bee has become one of the newspaper's most popular word games, but it has a relatively short history compared to the venerable Crossword puzzle.</p>
      
      <h2>The Beginning</h2>
      <p>Spelling Bee first appeared in The New York Times Magazine in 2014, created by puzzle editor Will Shortz. It was originally a print-only feature that appeared weekly.</p>
      
      <h2>Going Digital</h2>
      <p>In 2016, The Times introduced a digital version of Spelling Bee on its website, allowing players to interact with the puzzle directly. This marked the beginning of its rising popularity.</p>
      
      <h2>The Mobile App</h2>
      <p>The release of Spelling Bee on The New York Times Games app in 2018 dramatically expanded its audience. Mobile accessibility made it a daily ritual for word game enthusiasts.</p>
      
      <h2>Social Media Community</h2>
      <p>Around 2020, Spelling Bee developed a passionate community on social media. Twitter accounts like "Spelling Bee Forum" and "The Hivemind" became gathering places for players to discuss each day's puzzle.</p>
      
      <h2>Queen Bee and Achievement Levels</h2>
      <p>The introduction of achievement levels (Good Start, Moving Up, Good, Solid, Great, Amazing, Genius, and Queen Bee) gamified the experience and created more engagement as players strived to reach higher ranks.</p>
      
      <h2>Cultural Impact</h2>
      <p>Today, Spelling Bee has become a cultural touchstone, mentioned in podcasts, TV shows, and other media. It's often discussed alongside The Times' other word games like Wordle and the Crossword.</p>
      
      <p>As Spelling Bee continues to evolve, its community grows, establishing itself as a staple of modern word gaming culture.</p>
    `,
  },
  {
    id: 'common-patterns',
    title: 'Common Letter Patterns That Will Boost Your Score',
    excerpt: 'Certain letter combinations appear frequently in Spelling Bee. Learn these patterns to dramatically increase your word count.',
    date: 'March 8, 2023',
    content: `
      <p>Recognizing common letter patterns can significantly improve your Spelling Bee performance. These patterns appear across many puzzles and can help you systematically find more words.</p>
      
      <h2>Prefixes</h2>
      <p>Look for these common prefixes:</p>
      <ul>
        <li>RE- (REDO, REPLY, RETHINK)</li>
        <li>UN- (UNBOX, UNDO, UNLOCK)</li>
        <li>IN-/IM- (INPUT, IMPOSE, INTAKE)</li>
        <li>DIS- (DISMAY, DISOWN, DISARM)</li>
        <li>PRE- (PRESET, PREPAY, PREHEAT)</li>
      </ul>
      
      <h2>Suffixes</h2>
      <p>These endings can multiply your word count:</p>
      <ul>
        <li>-ING (PLAYING, RUNNING, SINGING)</li>
        <li>-ED (PLAYED, WALKED, TALKED)</li>
        <li>-ER (PLAYER, WALKER, TALKER)</li>
        <li>-EST (BIGGEST, FASTEST, TALLEST)</li>
        <li>-LY (SLOWLY, NICELY, KINDLY)</li>
      </ul>
      
      <h2>Consonant Pairs</h2>
      <p>Look for these pairs that appear in many English words:</p>
      <ul>
        <li>TH (THINK, BOTH, TEETH)</li>
        <li>CH (CHART, PINCH, CHIME)</li>
        <li>SH (SHAPE, HUSH, SHINE)</li>
        <li>CK (PICK, BACK, KICK)</li>
        <li>ST (STOP, FAST, STUNT)</li>
      </ul>
      
      <h2>Vowel Combinations</h2>
      <p>These vowel pairs can open up many possibilities:</p>
      <ul>
        <li>EA (EACH, BEAT, TEAM)</li>
        <li>AI (PAINT, HAIR, MAIL)</li>
        <li>OO (BOOK, FOOD, MOON)</li>
        <li>IE (PIECE, FIELD, TRIES)</li>
        <li>OU (SOUND, HOUSE, PROUD)</li>
      </ul>
      
      <h2>Word Families</h2>
      <p>Once you find a word, look for its "family" - variations using the same root:</p>
      <ul>
        <li>PLAY, PLAYED, PLAYER, PLAYING</li>
        <li>LIGHT, LIGHTER, LIGHTEST, LIGHTLY</li>
        <li>CARE, CAREFUL, CARING, CARELESS</li>
      </ul>
      
      <p>Keeping these patterns in mind can help you systematically work through the possibilities in any Spelling Bee puzzle.</p>
    `,
  },
  {
    id: 'hardest-puzzles',
    title: 'The 10 Most Challenging Spelling Bee Puzzles Ever',
    excerpt: 'Think you&apos;re a Spelling Bee expert? These notoriously difficult puzzles have stumped even the most dedicated players.',
    date: 'February 19, 2023',
    content: `
      <p>Even seasoned Spelling Bee players occasionally encounter a puzzle that seems impossible to crack. Here are ten of the most challenging Spelling Bee puzzles ever published by The New York Times.</p>
      
      <h2>1. The "AGILNTY" Puzzle (Center: G)</h2>
      <p>This puzzle was notorious for its obscure botanical terms and unusual word constructions. Its pangram, GALANTIY, stumped many players.</p>
      
      <h2>2. The "ACEITVY" Puzzle (Center: T)</h2>
      <p>With words like ACTIVITE and CATIVATE, this puzzle required knowledge of uncommon scientific vocabulary.</p>
      
      <h2>3. The "CEGILNU" Puzzle (Center: N)</h2>
      <p>This puzzle included several linguistic terms and medical vocabulary that aren&apos;t part of everyday language.</p>
      
      <h2>4. The "AEILRST" Puzzle (Center: A)</h2>
      <p>While these are common letters, the sheer number of possible combinations made this puzzle overwhelming. It had over 120 valid words!</p>
      
      <h2>5. The "CDENORW" Puzzle (Center: R)</h2>
      <p>This puzzle required players to find many words derived from Latin and Greek roots.</p>
      
      <h2>6. The "BEILNTY" Puzzle (Center: T)</h2>
      <p>Players struggled with the limited vowels in this puzzle, making word formation challenging.</p>
      
      <h2>7. The "ACEILNP" Puzzle (Center: L)</h2>
      <p>This puzzle included many technical and legal terms that aren&apos;t commonly used.</p>
      
      <h2>8. The "AEORSTY" Puzzle (Center: S)</h2>
      <p>Another puzzle with an extremely high word count that tested players&apos; endurance and vocabulary breadth.</p>
      
      <h2>9. The "AEFLRTX" Puzzle (Center: F)</h2>
      <p>The unusual combination of letters made word formation difficult, with several obscure scientific terms included.</p>
      
      <h2>10. The "DEGIORT" Puzzle (Center: D)</h2>
      <p>This puzzle featured many obscure geological and mathematical terms.</p>
      
      <p>These challenging puzzles remind us that even with strong vocabulary skills, Spelling Bee can still surprise and challenge us!</p>
    `,
  }
];

// Updated PageProps interface to match Next.js typing expectations
type PageProps = {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

export function generateMetadata({ params }: PageProps): Metadata {
  const article = articles.find(article => article.id === params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: `${article.title} | NYT Spelling Bee Solver`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: PageProps) {
  const article = articles.find(article => article.id === params.slug);
  
  if (!article) {
    notFound();
  }
  
  // Get other article IDs for navigation
  const articleIds = articles.map(a => a.id);
  const currentIndex = articleIds.indexOf(params.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articleIds.length - 1 ? articles[currentIndex + 1] : null;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/articles" className="text-blue-600 hover:underline">
          ← Back to Articles
        </Link>
      </div>
      
      <article className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-sm text-gray-500 mb-2">{article.date}</p>
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        <div 
          className="prose prose-lg max-w-none mt-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
      
      <div className="flex justify-between mb-8">
        {prevArticle && (
          <Link href={`/articles/${prevArticle.id}`} className="flex-1 bg-gray-100 p-4 rounded-lg mr-4 hover:bg-gray-200">
            <p className="text-sm font-medium">Previous Article</p>
            <p className="text-lg font-bold">{prevArticle.title}</p>
          </Link>
        )}
        
        {nextArticle && (
          <Link href={`/articles/${nextArticle.id}`} className="flex-1 bg-gray-100 p-4 rounded-lg ml-4 hover:bg-gray-200 text-right">
            <p className="text-sm font-medium">Next Article</p>
            <p className="text-lg font-bold">{nextArticle.title}</p>
          </Link>
        )}
      </div>
      
      <div className="bg-yellow-100 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-2">Try Our Spelling Bee Solver</h2>
        <p className="mb-4">
          Put your new knowledge to the test! Use our Spelling Bee Solver to find all possible words for today's puzzle.
        </p>
        <Link href="/" className="inline-block px-6 py-2 bg-yellow-400 text-gray-900 font-medium rounded-md hover:bg-yellow-500">
          Go to Solver
        </Link>
      </div>
    </div>
  );
} 