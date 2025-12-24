import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: 'home' | 'contact' | 'reader' | 'terms' | 'privacy' | 'refund', bookId?: number) => void;
}

const menuItems = [
  { label: 'HOME', action: 'home' as const },
  { label: 'CONTACT', action: 'contact' as const },
  { label: 'BOOKS', action: 'reader' as const },
];

const footerLinks = [
  { icon: '📄', label: 'Terms of Service', action: 'terms' as const },
  { icon: '🔒', label: 'Privacy Policy', action: 'privacy' as const },
  { icon: '💰', label: 'Refund Policy', action: 'refund' as const },
];

export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const handleNavigation = (page: 'home' | 'contact' | 'reader' | 'terms' | 'privacy' | 'refund', bookId?: number) => {
    onClose();
    setTimeout(() => {
      onNavigate?.(page, bookId);
    }, 100);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[998]"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 h-screen w-[85%] max-w-[350px] bg-[#1a1a1a] z-[999] shadow-2xl flex flex-col"
          >
            <style>{`
              .menu-title-text {
                font-family: 'Georgia', serif;
                letter-spacing: 4px;
              }
              .menu-link {
                font-family: 'Georgia', serif;
                letter-spacing: 4px;
                text-transform: uppercase;
              }
              .menu-link:hover {
                padding-left: 15px;
                color: #DAA520;
              }
              .menu-link::before {
                content: '';
                position: absolute;
                left: -30px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 2px;
                background: #DAA520;
                transition: width 0.3s;
              }
              .menu-link:hover::before {
                width: 20px;
              }
              .footer-link:hover {
                padding-left: 8px;
              }
              .close-btn:hover {
                transform: rotate(90deg);
              }
            `}</style>

            <div className="px-6 py-5 bg-[#0d0d0d] flex justify-between items-center border-b border-[#333]">
              <div className="flex items-center gap-3">
                <span className="text-white text-xl">←</span>
                <span className="menu-title-text text-white text-base font-bold">MENU</span>
              </div>
              <motion.button
                onClick={onClose}
                className="bg-transparent border-none text-white text-3xl leading-none cursor-pointer"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                ✕
              </motion.button>
            </div>

            <div className="flex-1 px-8 py-10 overflow-y-auto">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                  onClick={() => handleNavigation(item.action)}
                  className="menu-link relative text-white text-xl py-6 border-b border-[#2a2a2a] transition-all duration-300 block w-full text-left cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="px-6 py-8 bg-[#0d0d0d] border-t border-[#333]">
              <div className="space-y-1">
                {footerLinks.map((link, index) => (
                  <motion.button
                    key={link.action}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                    onClick={() => handleNavigation(link.action)}
                    className="footer-link flex items-center gap-3 text-[#999] text-sm py-3 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-lg w-6 text-center">{link.icon}</span>
                    <span>{link.label}</span>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="text-center mt-8 pt-5 border-t border-[#2a2a2a]"
              >
                <div className="text-3xl mb-2">🎪</div>
                <p className="text-[#666] text-xs tracking-wide">© 2024 Wishful Tinkering</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
