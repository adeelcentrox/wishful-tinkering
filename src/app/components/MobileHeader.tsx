import { Menu } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileHeaderProps {
  onMenuClick?: () => void;
  onMenuToggle?: () => void;
  onNavigate?: (page: 'home' | 'contact') => void;
}

export function MobileHeader({ onMenuClick, onMenuToggle, onNavigate }: MobileHeaderProps) {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#8B0000] px-4 lg:px-8 py-3 flex items-center justify-between"
      style={{ height: '56px' }}
    >
      {/* Hamburger Menu - Only on Mobile - LEFT SIDE */}
      <button 
        onClick={onMenuToggle || onMenuClick}
        className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all active:scale-95"
        aria-label="Menu"
      >
        <div className="flex flex-col gap-1.5 w-7">
          <div className="h-0.5 w-full bg-white rounded-full transition-all" />
          <div className="h-0.5 w-full bg-white rounded-full transition-all" />
          <div className="h-0.5 w-full bg-white rounded-full transition-all" />
        </div>
      </button>

      {/* Desktop Navigation - Hidden on Mobile */}
      <nav className="hidden lg:flex items-center gap-6">
        <button
          onClick={() => onNavigate?.('home')}
          className="text-white hover:text-[#D4A017] transition-colors"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate?.('contact')}
          className="text-white hover:text-[#D4A017] transition-colors"
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          Contact Me
        </button>
      </nav>

      <button
        onClick={() => onNavigate?.('home')}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity lg:order-first"
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
    </motion.header>
  );
}