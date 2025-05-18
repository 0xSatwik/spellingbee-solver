import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Spelling Bee Statistics | SbAnswer.com",
  description: "Statistical analysis of NYT Spelling Bee puzzles, including letter frequencies and trends.",
};

export default function StatsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 