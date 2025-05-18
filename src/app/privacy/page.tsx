'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-amber-600">Privacy Policy</h1>
      
      <div className="space-y-8 text-gray-700">
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">Introduction</h2>
          <p className="leading-relaxed">
            At SbAnswer, we respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you about how we look after your personal data when you visit our website, use our NYT Spelling Bee solver, or practice with our free Spelling Bee puzzles.
          </p>
          <p className="mt-3 leading-relaxed">
            This policy was last updated on {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}.
          </p>
        </section>

        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">Information We Collect</h2>
          <p className="leading-relaxed">
            We may collect and process the following data about you:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>Information you provide by filling in forms on our website</li>
            <li>Information collected automatically about your visit (through cookies and similar technologies)</li>
            <li>Technical information, including your IP address, browser type and version</li>
            <li>Information about your visit, including the full URL clickstream to, through and from our site</li>
            <li>Data related to your practice puzzle performance (if you use our free practice puzzles)</li>
          </ul>
        </section>
        
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">How We Use Your Information</h2>
          <p className="leading-relaxed">
            We use the information we collect in various ways, including:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-2">
            <li>Provide, operate, and maintain our website and services</li>
            <li>Provide NYT Spelling Bee solutions and free practice puzzles</li>
            <li>Improve, personalize, and expand our website experience</li>
            <li>Understand and analyze how you use our website and features</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you to provide updates and other information</li>
          </ul>
        </section>
        
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">Cookies</h2>
          <p className="leading-relaxed">
            SbAnswer uses cookies to improve your experience on our website. Cookies are small text files that are placed on your computer or mobile device when you browse websites. We use both session cookies and persistent cookies.
          </p>
          <p className="mt-3 leading-relaxed">
            Most web browsers allow control of cookies through browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="http://www.allaboutcookies.org" className="text-amber-600 hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
          </p>
        </section>
        
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">Third-Party Services</h2>
          <p className="leading-relaxed">
            We may use third-party services, such as Google Analytics, to help us understand website usage. These services may collect information sent by your browser as part of a web page request, including your IP address or cookies.
          </p>
        </section>
        
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">Practice Puzzle Data</h2>
          <p className="leading-relaxed">
            If you choose to use our free practice puzzles, we may collect data about your performance and progress to help improve your experience. This data is used solely to enhance our services and provide you with a better practice environment.
          </p>
        </section>
        
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">Data Security</h2>
          <p className="leading-relaxed">
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, altered, disclosed, or accessed without authorization. We also allow access to your personal data only to those employees and partners who have a business need to know.
          </p>
        </section>
        
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.
          </p>
        </section>
        
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us through our <a href="/contact" className="text-amber-600 hover:underline">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
} 