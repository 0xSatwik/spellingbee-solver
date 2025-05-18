import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | SbAnswer',
  description: 'Get in touch with the SbAnswer team for feedback, suggestions, or support.'
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
} 