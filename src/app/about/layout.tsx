import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'About | SbAnswer',
  description: 'Learn about SbAnswer, the ultimate resource for NYT Spelling Bee puzzle enthusiasts.'
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 