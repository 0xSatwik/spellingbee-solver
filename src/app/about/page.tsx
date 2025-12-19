import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | Spelling Bee Solver - NYT Solutions',
  description: 'Learn about Spelling Bee Solver, the premier resource for NYT Spelling Bee solutions, solver tools, practice puzzles, and strategies. Our mission and team.',
  keywords: ['about sbanswer', 'spelling bee resource', 'word game tools', 'nyt spelling bee help'],
  openGraph: {
    title: 'About Us | Spelling Bee Solver',
    description: 'Learn about Spelling Bee Solver, the premier resource for NYT Spelling Bee solutions and tools',
    url: 'https://sbsolver.online/about',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'About Spelling Bee Solver',
    description: 'Your premier NYT Spelling Bee resource',
  },
  alternates: {
    canonical: 'https://sbsolver.online/about',
  },
};

// AboutPage Schema
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Spelling Bee Solver",
  "description": "About Spelling Bee Solver - Free NYT Spelling Bee solver, solutions, and practice puzzles",
  "url": "https://sbsolver.online/about"
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutClient />
    </>
  );
}