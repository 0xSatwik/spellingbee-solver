import { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
    title: 'Contact SbSolver - NYT Spelling Bee Help & Support',
    description: 'Contact SbSolver for support, suggestions, or feedback about our NYT Spelling Bee solver and tools. We\'re here to help!',
    keywords: ['contact sbsolver', 'spelling bee help', 'support', 'feedback'],
    openGraph: {
        title: 'Contact SbSolver - NYT Spelling Bee Help & Support',
        description: 'Get in touch with SbSolver for support, suggestions, or feedback.',
        url: 'https://sbsolver.online/contact',
        type: 'website',
    },
    alternates: {
        canonical: 'https://sbsolver.online/contact',
    },
}

export default function ContactPage() {
    // ContactPage Schema
    const contactPageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact SbSolver",
        "description": "Contact page for SbSolver - NYT Spelling Bee solver and tools",
        "url": "https://sbsolver.online/contact"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            <ContactClient />
        </>
    )
}
