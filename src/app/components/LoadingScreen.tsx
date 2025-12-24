import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-[#8B0000] z-50 flex flex-col items-center justify-center"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center relative shadow-2xl mb-6"
          >
            <div className="text-center">
              <div className="text-[#8B0000] font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>
                <div className="text-[14px] font-semibold">Wishful</div>
                <div className="text-[11px] -mt-1">TINKERING</div>
              </div>
              {/* Decorative stars */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-2 left-2 text-[#D4A017]"
              >
                ★
              </motion.div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-2 right-2 text-[#D4A017]"
              >
                ★
              </motion.div>
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[#D4A017] text-sm tracking-wider"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}