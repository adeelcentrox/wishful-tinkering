import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { MobileFooter } from './MobileFooter';

interface PrivacyPolicyPageProps {
  onBack: () => void;
  navigateToHome?: () => void;
}

export function PrivacyPolicyPage({ onBack, navigateToHome }: PrivacyPolicyPageProps) {
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
              Privacy Policy
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
            Privacy Policy
          </h2>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>1. Information We Collect</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              We collect information you provide directly to us, including:
            </p>
            <ul className="text-gray-700 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Name and email address</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Account credentials</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>2. How We Use Your Information</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              We use the information we collect to:
            </p>
            <ul className="text-gray-700 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to comments and questions</li>
              <li>Monitor and analyze usage patterns</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>3. Data Sharing</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We do not sell your personal information. We may share your data only with:
            </p>
            <ul className="text-gray-700 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Service providers who assist in operating our platform</li>
              <li>Payment processors (in accordance with PCI-DSS standards)</li>
              <li>When required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>4. Cookies and Tracking</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We use cookies and similar technologies to improve user experience, analyze usage patterns, and deliver personalized content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>5. Your Rights</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              You have the right to:
            </p>
            <ul className="text-gray-700 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>6. Data Security</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>7. Contact Information</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              For privacy-related inquiries, please contact us at:
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
