'use client';

export default function ContactClient() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
          Contact <span className="text-amber-600">SbSolver</span>
        </h1>
        <p className="text-xl text-gray-600">
          We'd love to hear from you! Get in touch with questions, feedback, or suggestions.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-6 border-2 border-amber-200">
            <div className="text-3xl mb-3">📧</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Email Us</h3>
            <p className="text-gray-700 mb-2">For general inquiries and support</p>
            <a href="mailto:contact@sbsolver.online" className="text-amber-600 hover:text-amber-700 font-semibold">
              contact@sbsolver.online
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border-2 border-blue-200">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Feedback</h3>
            <p className="text-gray-700 mb-2">Help us improve SbSolver</p>
            <a href="mailto:feedback@sbsolver.online" className="text-blue-600 hover:text-blue-700 font-semibold">
              feedback@sbsolver.online
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-100 rounded-2xl p-8 border-2 border-purple-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">🤝 Partner With Us</h3>
          <p className="text-gray-700 mb-4">
            Interested in collaboration, advertising, or partnership opportunities? We're always open to discussing ways we can work together.
          </p>
          <a href="mailto:partnerships@sbsolver.online" className="text-purple-600 hover:text-purple-700 font-semibold text-lg">
            partnerships@sbsolver.online →
          </a>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>We typically respond within 24-48 hours</p>
        </div>
      </div>
    </div>
  );
}
