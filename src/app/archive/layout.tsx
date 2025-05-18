import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Spelling Bee Archive | SbAnswer.com",
  description: "Browse past NYT Spelling Bee puzzles, search by date, and view complete solutions and word lists.",
};

export default function ArchiveLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 