'use client';

export default function PrivacyClient() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
          Privacy <span className="text-amber-600">Policy</span>
        </h1>
        <p className="text-xl text-gray-600">
          Your privacy matters to us at SbSolver
        </p>
        <p className="text-sm text-gray-500 mt-2">Last Updated: December 2024</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200 space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">1. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed">
            SbSolver (sbsolver.online) is designed with your privacy in mind. We do not collect, store, or process any personal information from our users. Our NYT Spelling Bee solver and tools work entirely in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">2. Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We may use minimal cookies for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Analytics to understand how visitors use our site (anonymous data only)</li>
            <li>Session management for better user experience</li>
            <li>Remembering your preferences (stored locally)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">3. Third-Party Services</h2>
          <p className="text-gray-700 leading-relaxed">
            We may use third-party services such as Google Analytics to better understand our audience. These services may collect anonymized usage data. We do not share any personally identifiable information with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">4. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            Since we don't collect personal information, there is minimal data to secure. Any temporary data processed by our solver stays in your browser and is not transmitted to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">5. Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our service is available to all ages. We do not knowingly collect personal information from children or anyone else.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">6. Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">7. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
            <p className="text-gray-900 font-semibold mb-2">📧 Email</p>
            <a href="mailto:privacy@sbsolver.online" className="text-amber-600 hover:text-amber-700 font-semibold text-lg">
              privacy@sbsolver.online
            </a>
          </div>
        </section>

        <section className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
          <h3 className="text-xl font-bold mb-3 text-gray-900">📌 Note About NYT Affiliation</h3>
          <p className="text-gray-700 leading-relaxed">
            SbSolver is an independent website and is not affiliated with, endorsed by, or connected to The New York Times or the official NYT Spelling Bee game. "Spelling Bee" is a trademark of The New York Times Company.
          </p>
        </section>
      </div>
    </div>
  );
}