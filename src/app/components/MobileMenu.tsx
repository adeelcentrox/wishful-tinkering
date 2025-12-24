import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, ArrowRight, TentTree } from 'lucide-react';
import { useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: 'home' | 'contact' | 'reader' | 'terms' | 'privacy' | 'refund', bookId?: number) => void;
}

const menuItems = [
  { label: 'HOME', action: 'home' as const },
  { label: 'CONTACT', action: 'contact' as const },
];

const books = [
  {
    id: 1,
    number: '01',
    title: 'Victim',
    status: 'FREE',
    available: true
  },
  {
    id: 2,
    number: '02',
    title: 'Witness',
    status: 'Preview',
    available: true
  },
  {
    id: 3,
    number: '03',
    title: 'Friend',
    status: 'Soon',
    available: false
  },
  {
    id: 4,
    number: '04',
    title: 'Enemy',
    status: 'Soon',
    available: false
  }
];

const footerLinks = [
  { icon: 'square', label: 'Terms of Service', action: 'terms' as const },
  { icon: 'shield', label: 'Privacy Policy', action: 'privacy' as const },
  { icon: 'diamond', label: 'Refund Policy', action: 'refund' as const },
];

const footerIcons: Record<string, JSX.Element> = {
  square: <span className="text-[#999] text-sm">□</span>,
  shield: <span className="text-[#999] text-sm">◎</span>,
  diamond: <span className="text-[#999] text-sm">◇</span>,
};

export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const [shakeBook, setShakeBook] = useState<number | null>(null);

  const handleNavigation = (page: 'home' | 'contact' | 'reader' | 'terms' | 'privacy' | 'refund', bookId?: number) => {
    onClose();
    setTimeout(() => {
      onNavigate?.(page, bookId);
    }, 100);
  };

  const handleBookClick = (book: typeof books[0]) => {
    if (!book.available) {
      setShakeBook(book.id);
      setTimeout(() => setShakeBook(null), 500);
    } else {
      handleNavigation('reader', book.id);
    }
  };

  const staggerChildren = 0.05;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-[#1a1a1a] z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="px-6 pt-6 pb-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <ArrowLeft size={18} />
                    <span className="text-sm tracking-wider">MENU</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="h-px bg-[#D4A017]/40" />
              </motion.div>

              <div className="flex-1 px-6 pb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="space-y-6 mb-8"
                >
                  {menuItems.map((item, index) => (
                    <button
                      key={item.action}
                      onClick={() => handleNavigation(item.action)}
                      className="text-white hover:text-[#D4A017] transition-colors block w-full text-left cursor-pointer"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '16px',
                        letterSpacing: '0.25em',
                        fontWeight: 400,
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="h-px bg-white/10 mb-8"
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h3
                    className="text-white mb-5"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '16px',
                      letterSpacing: '0.25em',
                      fontWeight: 400,
                    }}
                  >
                    BOOKS
                  </h3>

                  <div className="space-y-1">
                    {books.map((book, index) => (
                      <motion.button
                        key={book.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + index * staggerChildren, duration: 0.3 }}
                        onClick={() => handleBookClick(book)}
                        disabled={!book.available}
                        className={`w-full text-left py-3 px-3 rounded transition-all flex items-center justify-between ${
                          book.available
                            ? 'hover:bg-white/5 cursor-pointer active:scale-[0.98]'
                            : 'cursor-default'
                        }`}
                        animate={shakeBook === book.id ? {
                          x: [0, -8, 8, -8, 8, 0]
                        } : {}}
                        transition={shakeBook === book.id ? {
                          duration: 0.4,
                          ease: 'easeInOut'
                        } : {}}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="text-[#666] font-mono text-sm"
                            style={{ fontFamily: 'Open Sans, sans-serif', minWidth: '24px' }}
                          >
                            {book.number}
                          </span>
                          <span
                            className={book.available ? 'text-white' : 'text-[#666]'}
                            style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '15px' }}
                          >
                            {book.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-medium ${
                              book.status === 'FREE' ? 'text-[#D4A017]' :
                              book.status === 'Preview' ? 'text-[#D4A017]' :
                              'text-[#666]'
                            }`}
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                          >
                            {book.status}
                          </span>
                          {book.available && (
                            <ArrowRight size={14} className="text-[#D4A017]" />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                  className="h-px bg-white/10 mb-6"
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  {footerLinks.map((link, index) => (
                    <button
                      key={link.action}
                      onClick={() => handleNavigation(link.action)}
                      className="text-[#999] hover:text-white text-left transition-colors block w-full text-sm flex items-center gap-3 cursor-pointer"
                      style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px' }}
                    >
                      {footerIcons[link.icon]}
                      {link.label}
                    </button>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="px-6 pb-8 pt-6 text-center space-y-2"
              >
                <div className="flex justify-center">
                  <TentTree size={28} className="text-[#666]" />
                </div>
                <p
                  className="text-[#666] text-xs tracking-wide"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  © 2024 Wishful Tinkering
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
