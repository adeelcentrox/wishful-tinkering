import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { MobileFooter } from './MobileFooter';

interface RefundPolicyPageProps {
  onBack: () => void;
  navigateToHome?: () => void;
}

export function RefundPolicyPage({ onBack, navigateToHome }: RefundPolicyPageProps) {
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
              Refund Policy
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
            Refund Policy
          </h2>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>1. Refund Eligibility</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              We want you to be completely satisfied with your purchase from Wishful Tinkering. If you are not satisfied, you may be eligible for a refund under the conditions outlined below.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>2. Digital Products</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              Due to the nature of digital products, refunds are handled as follows:
            </p>
            <ul className="text-gray-700 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li><strong>7-Day Satisfaction Guarantee:</strong> If you are not satisfied with a book purchase, you may request a refund within 7 days of purchase, provided you have not accessed more than 20% of the content.</li>
              <li><strong>Coaching Services:</strong> Refunds must be requested at least 24 hours before the scheduled session.</li>
              <li><strong>Bundles:</strong> Refunds are calculated based on the value of used components within the bundle.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>3. How to Request a Refund</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              To request a refund, please contact us at Info@Wishful-Tinkering.Com with:
            </p>
            <ul className="text-gray-700 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>Your order number</li>
              <li>The email address used for purchase</li>
              <li>The reason for your refund request</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>4. Processing Time</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Approved refunds will be processed within 5-10 business days. The refund will be credited to the original payment method used for the purchase.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>5. Exceptions</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-2">
              Refunds may not be available in the following cases:
            </p>
            <ul className="text-gray-700 text-sm leading-relaxed list-disc pl-5 space-y-1">
              <li>When a significant portion of the content has been consumed (more than 20%)</li>
              <li>For promotional or discounted items that were clearly marked as final sale</li>
              <li>After 30 days from the date of purchase</li>
              <li>For accounts that have violated our Terms of Service</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>6. Partial Refunds</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              In certain situations, we may offer partial refunds at our discretion. This includes cases where only part of the service was delivered or where technical issues prevented full access to the content.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: '#1E3A5F' }}>7. Contact Us</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              If you have any questions about our Refund Policy, please contact us at:
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
