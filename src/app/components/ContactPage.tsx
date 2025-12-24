import { motion } from 'motion/react';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { MobileFooter } from './MobileFooter';

interface ContactPageProps {
  onBack: () => void;
  navigateToHome?: () => void;
}

export function ContactPage({ onBack, navigateToHome }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBackToHome = () => {
    navigateToHome?.() || onBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FAF0E6] flex flex-col"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      {/* Header - Standardized */}
      <div className="bg-[#8B0000] px-4 flex items-center shadow-md" style={{ height: '64px' }}>
        <button
          onClick={onBack}
          className="text-[#D4A017] hover:text-white transition-colors p-2"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex-1" />

        <button
          onClick={navigateToHome || onBack}
          className="hover:opacity-80 transition-opacity flex items-center"
          aria-label="Go to home"
        >
          <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center relative shadow-lg flex-shrink-0">
            <div className="text-center">
              <div className="text-[#8B0000] font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>
                <div className="text-[9px] font-semibold leading-tight">Wishful</div>
                <div className="text-[7px] -mt-0.5 leading-tight">TINKERING</div>
              </div>
              <div className="absolute top-0.5 left-0.5 text-[#D4A017] text-[8px]">★</div>
              <div className="absolute top-0.5 right-0.5 text-[#D4A017] text-[8px]">★</div>
            </div>
          </div>
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {/* Intro Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8B0000] rounded-full mb-4">
              <Mail className="text-[#D4A017]" size={32} />
            </div>
            <h2 
              className="text-[#1E3A5F] text-2xl mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Get In Touch
            </h2>
            <p className="text-[#1E3A5F]/80 text-[15px] leading-relaxed">
              Have questions about the books? Want to share your thoughts? 
              I'd love to hear from you!
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-6 space-y-5"
          >
            {/* Name Field */}
            <div>
              <label 
                htmlFor="name"
                className="block text-[#1E3A5F] mb-2"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#1E3A5F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all"
                placeholder="Enter your name"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              />
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email"
                className="block text-[#1E3A5F] mb-2"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[#1E3A5F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all"
                placeholder="your.email@example.com"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              />
            </div>

            {/* Message Field */}
            <div>
              <label 
                htmlFor="message"
                className="block text-[#1E3A5F] mb-2"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-[#1E3A5F]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all resize-none"
                placeholder="Tell me what's on your mind..."
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitted}
              className={`w-full py-4 rounded-lg transition-all duration-300 ${
                submitted 
                  ? 'bg-green-600 text-white'
                  : 'bg-[#8B0000] text-[#D4A017] hover:bg-[#6D0000] hover:shadow-lg'
              }`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {submitted ? (
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Message Sent!
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-600 text-sm"
              >
                Thank you! I'll get back to you soon.
              </motion.p>
            )}
          </motion.form>

          {/* Additional Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p 
              className="text-[#D4A017] text-sm italic"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              "Your Life, Your Choice"
            </p>
          </motion.div>
        </div>
      </div>

      <MobileFooter onMenuClick={handleBackToHome} />
    </motion.div>
  );
}
