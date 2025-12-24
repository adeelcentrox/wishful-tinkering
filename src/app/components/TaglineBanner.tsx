import { motion } from 'motion/react';

export function TaglineBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="bg-gradient-to-r from-[#D4A017] to-[#DAA520] px-4 py-3 text-center"
      style={{ minHeight: '50px' }}
    >
      <p 
        className="text-[#1A1A1A] tracking-[0.15em] text-[13px] lg:text-[14px] uppercase"
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        BECAUSE <span className="font-semibold">"YOUR LIFE"</span> SHOULD BE{' '}
        <span className="font-semibold">"YOUR CHOICE."</span>
      </p>
    </motion.div>
  );
}