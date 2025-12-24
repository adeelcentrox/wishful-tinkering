import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle?: string;
  bookSymbol?: string;
}

export function ComingSoonModal({ isOpen, onClose, bookTitle, bookSymbol }: ComingSoonModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setError('');
      setShowSuccess(false);
    }
  }, [isOpen]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X size={20} />
                </button>

                <div className="p-6">
                  {showSuccess ? (
                    <div className="text-center py-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="text-6xl mb-4"
                      >
                        🎉
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        You're on the list!
                      </h3>
                      <p className="text-gray-600 text-sm">
                        We'll notify you when this book is available.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">🔔</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Coming Soon!
                        </h3>
                        {bookTitle && (
                          <p className="text-gray-600 text-sm">
                            {bookSymbol && <span className="mr-1">{bookSymbol}</span>}
                            {bookTitle}
                          </p>
                        )}
                      </div>

                      <div className="mb-6">
                        <p className="text-center text-gray-700 text-sm mb-4">
                          Be the first to know when it's available.
                        </p>

                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail size={18} />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-colors text-sm ${
                              error
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-[#8B0000]'
                            }`}
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                          />
                        </div>
                        {error && (
                          <p className="text-red-500 text-xs mt-2">{error}</p>
                        )}
                      </div>

                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl font-bold text-white transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: '#8B0000',
                          fontFamily: 'Open Sans, sans-serif'
                        }}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12c0 2.534-.945 4.85-2.5 6.626V14c0-1.103.897-2 2-2h4c1.103 0 2 .897 2 2v1.291z"
                              />
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Notify Me'
                        )}
                      </button>

                      <p className="text-center text-gray-500 text-xs mt-4">
                        No spam, we promise! 🤞
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
