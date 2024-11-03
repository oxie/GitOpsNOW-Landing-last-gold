import React, { useState } from 'react';
import { Send, CheckCircle, XCircle, Loader } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setStatus('loading');

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Get Started</h2>
          <p className="text-slate-300 text-center mb-12">
            Ready to transform your business? Let's discuss how we can help.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all group-hover:border-gold-400/50"
                  required
                />
              </div>
              <div className="group">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all group-hover:border-gold-400/50"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all group-hover:border-gold-400/50"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 focus:ring-2 focus:ring-gold-400 focus:border-transparent outline-none transition-all group-hover:border-gold-400/50"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-4 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                status === 'loading'
                  ? 'bg-slate-700 cursor-not-allowed'
                  : 'bg-gold-500 hover:bg-gold-600 hover:transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {status === 'loading' && (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Sending...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Message Sent!</span>
                </>
              )}
              {status === 'error' && (
                <>
                  <XCircle className="h-5 w-5" />
                  <span>Error Sending</span>
                </>
              )}
              {status === 'idle' && (
                <>
                  <span>Send Message</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="text-center text-gold-400 bg-gold-500/10 rounded-lg p-4 animate-fade-in">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="text-center text-red-400 bg-red-500/10 rounded-lg p-4 animate-fade-in">
                There was an error sending your message. Please try again later.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}