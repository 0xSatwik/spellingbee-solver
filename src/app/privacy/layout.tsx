import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Privacy Policy | SbAnswer',
  description: 'Learn about how we collect, use, and protect your data at SbAnswer.com.'
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 