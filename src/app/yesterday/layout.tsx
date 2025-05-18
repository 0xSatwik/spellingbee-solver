import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Yesterday's Spelling Bee Answers | SbAnswer.com",
  description: "Solutions for yesterday's New York Times Spelling Bee puzzle with all answers and pangrams.",
};

export default function YesterdayLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 