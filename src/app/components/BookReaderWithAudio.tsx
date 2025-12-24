import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, RotateCw, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';
import { useState } from 'react';
import vinylImage from '@/assets/vinyl-disc.svg';
import logoImage from '/images/logo.png';

interface BookReaderWithAudioProps {
  bookId: number;
  bookTitle: string;
  bookSymbol: string;
  pages: string[][];
  onBack: () => void;
  navigateToHome?: () => void;
}

export function BookReaderWithAudio({ bookId, bookTitle, bookSymbol, pages, onBack, navigateToHome }: BookReaderWithAudioProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const totalPages = pages.length;
  const currentContent = pages[currentPage];

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAF0E6] overflow-hidden font-sans relative">

      {/* 1. Header Bar - Standardized */}
      <div className="bg-[#8B0000] px-4 flex items-center shadow-md flex-shrink-0" style={{ height: '64px' }}>
        <button
          onClick={onBack}
          className="text-[#D4A017] hover:text-white transition-colors p-2"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex-1 flex justify-center">
          <div
            className="text-[#D4A017] text-center"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            <div className="text-sm font-semibold truncate max-w-[200px]">{bookTitle}</div>
          </div>
        </div>

        <button
          onClick={navigateToHome || onBack}
          className="hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <img src={logoImage} alt="Wishful Tinkering" className="h-9 w-auto" />
        </button>
      </div>

      {/* 2. Main Content Area */}
      <div
        className="flex-1 overflow-y-auto mt-[64px] pb-[130px] px-6 py-8"
      >
        <div className="max-w-2xl mx-auto space-y-6 text-[#1A1A1A]">
            {currentContent.map((paragraph, index) => {
              if (paragraph === '') return <div key={index} className="h-2" />;
              if (paragraph.startsWith('Chapter')) {
                return (
                  <h2 key={index} className="text-3xl text-[#654321] mb-6 font-serif leading-tight">
                    {paragraph}
                  </h2>
                );
              }
              if (paragraph.startsWith('•')) {
                return (
                  <p key={index} className="text-lg leading-relaxed pl-4 border-l-2 border-[#D4A74A]/30">
                    {paragraph}
                  </p>
                );
              }
              return (
                <p key={index} className="text-lg leading-relaxed font-serif text-gray-800">
                  {paragraph}
                </p>
              );
            })}
        </div>
      </div>

      {/* 3. Bottom Bar - Just Page Counter (Right) */}
      <div className="h-[50px] bg-white border-t border-gray-200 flex items-center justify-end px-4 absolute bottom-0 left-0 right-0 z-20">
        <span className="text-[#2C3E50] font-medium text-xs">
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* 4. Audio Player Overlay (Expandable) */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? '100%' : '70px',
          bottom: isExpanded ? '0px' : '50px'
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute left-0 right-0 bg-[#2C3E50] shadow-[0_-5px_20px_rgba(0,0,0,0.3)] z-30 overflow-hidden flex flex-col"
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {/* Collapsed State Content */}
        {!isExpanded ? (
          <div className="w-full h-full flex items-center justify-between px-4 cursor-pointer">
            <div className="flex items-center gap-3 overflow-hidden">
               {/* Mini Art */}
               <div className="w-10 h-10 bg-[#1E2B3A] rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">🎪</span>
               </div>
               <div className="flex flex-col overflow-hidden">
                  <span className="text-white text-sm font-medium truncate">Their Least Favorite Victim</span>
                  <span className="text-white/60 text-xs truncate">Tap to open player</span>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95"
               >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1"/>}
               </button>
            </div>
          </div>
        ) : (
          /* Expanded State Content - Full Screen Like BookReaderTabs */
          <div className="w-full h-full flex flex-col">
            {/* Top accent bar */}
            <div className="h-12 bg-[#8B0000] flex items-center justify-end px-4">
              <button
                onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                className="text-white/80 hover:text-white transition-all active:scale-95 p-2"
              >
                <ChevronDown size={28} />
              </button>
            </div>

            {/* Main Content - Centered */}
            <div className="flex-1 flex flex-col items-center justify-center px-8">
              {/* Large Rotating Disc - Centered */}
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{
                  duration: 8,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "linear"
                }}
                className="relative mb-10"
                style={{ width: '300px', height: '300px' }}
              >
                {/* Soft shadow behind disc */}
                <div
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{
                    background: 'radial-gradient(circle, rgba(139,0,0,0.3) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    transform: 'translateY(20px)',
                  }}
                />
                <img
                  src={vinylImage}
                  alt="Audio disc"
                  className="relative w-full h-full object-contain"
                />
              </motion.div>

              {/* Book Title & Info */}
              <div className="text-center mb-8">
                <h2
                  className="text-[#1A1A1A] text-2xl font-bold mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {bookTitle}
                </h2>
                <p
                  className="text-[#666] text-sm"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  Page {currentPage + 1} of {totalPages}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md mb-8">
                <div className="relative w-full bg-[#D4C8B8] rounded-full h-1 overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#D4A017] to-[#FFD700]"
                    initial={{ width: '0%' }}
                    animate={{ width: isPlaying ? '33%' : '33%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
                    style={{ left: '33%', marginLeft: '-8px' }}
                  />
                </div>
                <div className="flex justify-between text-[#888] text-xs" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  <span>0:00</span>
                  <span>2:30</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-12">
                <button
                  className="text-[#666] hover:text-[#1A1A1A] transition-all active:scale-95"
                >
                  <RotateCcw size={28} />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:scale-105 transition-all active:scale-95 shadow-xl"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
                >
                  {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
                </button>

                <button
                  className="text-[#666] hover:text-[#1A1A1A] transition-all active:scale-95"
                >
                  <RotateCw size={28} />
                </button>
              </div>
            </div>

            {/* Swipe down hint */}
            <div className="pb-6 text-center">
              <p className="text-[#999] text-xs" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Tap arrow to close
              </p>
            </div>
          </div>
        )}
      </motion.div>

    </div>
  );
}