'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a dummy submission handler
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formState);
    
    // Simulate a successful submission
    setSubmitStatus({
      submitted: true,
      success: true,
      message: 'Thank you! Your message has been sent successfully.'
    });
    
    // Reset form
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-amber-600">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-yellow-100 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Have questions, feedback, or suggestions? We'd love to hear from you! Fill out the form and we'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@spellingbeehelper.com</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Response time: Within 24-48 hours</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          {submitStatus.submitted && submitStatus.success ? (
            <div className="h-full flex flex-col justify-center">
              <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-green-700 mb-2">Message Sent!</h3>
                <p className="text-green-600">{submitStatus.message}</p>
                <button 
                  onClick={() => setSubmitStatus({ submitted: false, success: false, message: '' })}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Please select...</option>
                  <option value="feedback">Feedback</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="support">Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-amber-700 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">How accurate are the solutions provided?</h3>
            <p className="text-gray-700">Our solutions are based on comprehensive word lists designed to match the New York Times Spelling Bee puzzle as closely as possible.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">How often is the site updated?</h3>
            <p className="text-gray-700">We update our database daily to include the latest puzzle from the New York Times Spelling Bee.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Is this site affiliated with The New York Times?</h3>
            <p className="text-gray-700">No, Spelling Bee Helper is an independent fan site and is not affiliated with or endorsed by The New York Times Company.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">How can I report a missing word or other issue?</h3>
            <p className="text-gray-700">You can use the contact form on this page to report any issues or missing words. We appreciate your feedback!</p>
          </div>
        </div>
      </div>
    </div>
  );
} 