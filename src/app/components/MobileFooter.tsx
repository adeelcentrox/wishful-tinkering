import { motion } from 'motion/react';

interface MobileFooterProps {
  onMembershipsClick?: () => void;
  onMenuClick?: () => void;
}

export function MobileFooter({ onMembershipsClick, onMenuClick }: MobileFooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="bg-[#8B0000] text-white px-4 py-3 text-center fixed bottom-0 left-0 right-0"
      style={{ minHeight: '60px' }}
    >
      <div className="flex flex-col justify-center h-full space-y-1">
        <div className="flex items-center justify-center gap-3 text-[12px] lg:text-[13px]">
          <button
            onClick={onMenuClick}
            className="hover:text-[#D4A017] transition-colors"
          >
            Menu
          </button>
          <span className="text-white/40">|</span>
          <button
            onClick={onMembershipsClick}
            className="hover:text-[#D4A017] transition-colors opacity-60"
          >
            🥥
          </button>
        </div>
        <p className="text-[10px] lg:text-[11px] text-white/70" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          © 2024 Wishful Tinkering
        </p>
      </div>
    </motion.footer>
  );
}