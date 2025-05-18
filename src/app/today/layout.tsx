import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Today's NYT Spelling Bee Answers | SbAnswer.com",
  description: "Find all solutions to today's New York Times Spelling Bee puzzle",
};

export default function TodayLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 