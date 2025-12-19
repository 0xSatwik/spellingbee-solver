import { Metadata } from 'next'
import PrivacyClient from './PrivacyClient'

export const metadata: Metadata = {
    title: 'Privacy Policy - SbSolver | NYT Spelling Bee Solver',
    description: 'Privacy Policy for SbSolver. Learn how we protect your data while you use our free NYT Spelling Bee solver and tools.',
    keywords: ['privacy policy', 'sbsolver privacy', 'data protection'],
    openGraph: {
        title: 'Privacy Policy - SbSolver',
        description: 'Privacy Policy for SbSolver - NYT Spelling Bee solver and tools',
        url: 'https://sbsolver.online/privacy',
        type: 'website',
    },
    alternates: {
        canonical: 'https://sbsolver.online/privacy',
    },
}

export default function PrivacyPage() {
    return <PrivacyClient />
}
