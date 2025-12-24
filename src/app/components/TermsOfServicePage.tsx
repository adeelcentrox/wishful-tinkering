import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { MobileFooter } from './MobileFooter';

interface TermsOfServicePageProps {
  onBack: () => void;
  navigateToHome?: () => void;
}

export function TermsOfServicePage({ onBack, navigateToHome }: TermsOfServicePageProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const currentScrollY = contentRef.current.scrollTop;

        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    const contentElement = contentRef.current;
    contentElement?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      contentElement?.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-[#FAF0E6] flex flex-col" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-[#8B0000] text-white px-4 flex items-center justify-between sticky top-0 z-50 shadow-md"
            style={{ height: '56px' }}
          >
            <button onClick={onBack} className="text-[#D4A017] hover:text-white transition-colors p-1">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Terms of Service
            </h1>
            <button onClick={navigateToHome || onBack} className="hover:opacity-80 transition-opacity flex items-center">
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
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        ref={contentRef}
        className="flex-1 overflow-y-auto px-4 py-6"
      >
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-4">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#8B0000' }}>
            Terms of Service
          </h2>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>1. Introduction</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Welcome to Wishful Tinkering. By accessing or using our services, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>2. Services Description</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Wishful Tinkering provides digital books, coaching services, and related content. We reserve the right to modify or discontinue any service at any time.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>3. User Responsibilities</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              You are responsible for:
            </p>
            <ul className="text-gray-700 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Compliance with all applicable laws and regulations</li>
              <li>Not sharing access to paid content without authorization</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>4. Payment Terms</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Payment is due at the time of purchase. We reserve the right to modify pricing at any time. All fees are non-refundable except as specified in our Refund Policy.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>5. Intellectual Property</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              All content, including text, graphics, logos, and software, is owned by Wishful Tinkering and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without permission.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>6. Limitation of Liability</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Wishful Tinkering shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of our services.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>7. Governing Law</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Wishful Tinkering is established.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>8. Contact</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mt-2">
              Email: Info@Wishful-Tinkering.Com
            </p>
          </section>

          <section className="mb-6">
            <p className="text-gray-500 text-xs">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </motion.div>

      <MobileFooter onMenuClick={onBack} />
    </div>
  );
}
