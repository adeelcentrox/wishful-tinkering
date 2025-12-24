import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { VinylAudioPlayer } from './VinylAudioPlayer';
import logoImage from '/images/logo.png';

interface BookReaderPageProps {
  bookId: number;
  onBack: () => void;
  navigateToHome?: () => void;
}

const bookContent: Record<number, { 
  title: string; 
  symbol: string; 
  color: string; 
  pages: string[][]; 
  hasAudio: boolean;
}> = {
  1: {
    title: 'Their Least Favorite Victim',
    symbol: '♣',
    color: '#1A1A1A',
    hasAudio: true,
    pages: [
      // Page 1 - Introduction
      [
        'You are not powerless. This is the first truth they don\'t want you to know.',
        '',
        'For too long, you may have felt trapped by circumstances, controlled by others, or forced into decisions that weren\'t truly your own. But understanding how manipulation works is the first step toward breaking free.',
        '',
        'In this book, we will explore:',
        '• How to recognize manipulation tactics',
        '• The psychology behind control',
        '• Practical steps to reclaim your autonomy',
        '• Building resilience against future attempts',
      ],
      // Page 2
      [
        'Your life should be your choice. Let\'s begin the journey of making that a reality.',
        '',
        'The methods of manipulation are often subtle. They operate beneath the surface of conscious awareness, working through suggestion, emotional triggers, and carefully crafted narratives.',
        '',
        'Manipulators know that direct force is clumsy and obvious. Instead, they prefer the art of influence—making you believe that their desires are actually your own.',
        '',
        'This is why awareness is your most powerful tool. Once you can see the mechanisms at work, they lose their power over you.',
      ],
      // Page 3
      [
        'Chapter 2: The Anatomy of Control',
        '',
        'Control requires three elements:',
        '• Access to your attention',
        '• Influence over your emotions', 
        '• The ability to shape your narrative',
        '',
        'When someone controls all three, they control your reality. Understanding this structure is the first step to dismantling it.',
      ]
    ]
  },
  2: {
    title: 'Their Least Favorite Witness',
    symbol: '♥',
    color: '#C41E3A',
    hasAudio: true,
    pages: [
      // Page 1
      [
        'Witnesses are dangerous to those who operate in deception. That\'s why silencing tactics exist.',
        '',
        'When you speak truth, you become a threat to systems built on lies. This book will teach you how to:',
        '',
        '• Stand firm in what you know to be true',
        '• Resist gaslighting and intimidation',
        '• Document and preserve evidence',
        '• Find your voice and use it effectively',
      ],
      // Page 2
      [
        'The truth may be uncomfortable, but it is always more powerful than lies.',
        '',
        'You are about to become their least favorite witness.',
        '',
        'Throughout history, those who bear witness to injustice have been targeted, discredited, and silenced. Not because they were wrong, but because they were right.',
        '',
        'Your testimony matters. Your observations are valid. Your experience is real.',
      ]
    ]
  },
  3: {
    title: 'Their Least Favorite Friend',
    symbol: '♠',
    color: '#1A1A1A',
    hasAudio: false,
    pages: [
      [
        'Coming Soon',
        '',
        'This book is currently in development.',
        '',
        'Book 3 will explore the nature of authentic friendship and how to build relationships based on mutual respect, honesty, and genuine connection.',
        '',
        'Stay tuned for updates!',
      ]
    ]
  },
  4: {
    title: 'Their Least Favorite Enemy',
    symbol: '♦',
    color: '#C41E3A',
    hasAudio: false,
    pages: [
      [
        'Coming Soon',
        '',
        'This book is currently in development.',
        '',
        'Book 4 will cover strategic resistance, principled opposition, and how to stand against systems of oppression without compromising your values.',
        '',
        'Stay tuned for updates!',
      ]
    ]
  }
};

export function BookReaderPage({ bookId, onBack, navigateToHome }: BookReaderPageProps) {
  const book = bookContent[bookId];
  const [currentPage, setCurrentPage] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [lastReadPage] = useState(0); // Simulating last read position

  if (!book) {
    return null;
  }

  const totalPages = book.pages.length;
  const currentContent = book.pages[currentPage];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentPage < totalPages - 1) {
      setSwipeDirection('left');
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setSwipeDirection(null);
      }, 300);
    } else if (direction === 'right' && currentPage > 0) {
      setSwipeDirection('right');
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setSwipeDirection(null);
      }, 300);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#FAF0E6] flex flex-col" style={{ height: '100vh', maxHeight: '100vh' }}>
      {/* Header - Deep Red */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#8B0000] text-white px-4 flex items-center shadow-md flex-shrink-0"
        style={{ height: '64px' }}
      >
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
            <div className="text-sm font-semibold truncate max-w-[200px]">{book?.title}</div>
          </div>
        </div>

        <button
          onClick={navigateToHome || onBack}
          className="hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <img src={logoImage} alt="Wishful Tinkering" className="h-9 w-auto" />
        </button>
      </motion.div>

      {/* Page Navigation Dropdown - Compact */}
      <div className="bg-[#F5F5DC] px-4 py-2 border-b border-[#8B0000]/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <label
            htmlFor="page-select"
            className="text-[#1E3A5F] text-xs whitespace-nowrap font-medium"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            JUMP TO:
          </label>
          <select
            id="page-select"
            value={currentPage}
            onChange={(e) => handlePageSelect(Number(e.target.value))}
            className="flex-1 bg-white border border-[#1E3A5F]/20 rounded px-2 py-1.5 text-[#1E3A5F] text-xs focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            {book.pages.map((_, index) => (
              <option key={index} value={index}>
                Page {index + 1} {index === lastReadPage && '(Last read)'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audio Player Toggle */}
      {book.hasAudio && (
        <VinylAudioPlayer chapterTitle="Introduction" audioDuration="16:43" />
      )}

      {/* eBook Content Area with Page Turn Animation */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={
              swipeDirection === 'left' 
                ? { x: '100%', rotateY: -30 }
                : swipeDirection === 'right'
                ? { x: '-100%', rotateY: 30 }
                : { opacity: 0 }
            }
            animate={{ x: 0, rotateY: 0, opacity: 1 }}
            exit={
              swipeDirection === 'left'
                ? { x: '-100%', rotateY: 30, opacity: 0 }
                : swipeDirection === 'right'
                ? { x: '100%', rotateY: -30, opacity: 0 }
                : { opacity: 0 }
            }
            transition={{ 
              duration: 0.5, 
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="absolute inset-0 overflow-y-auto px-6 py-6"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) handleSwipe('left');
              if (info.offset.x > 50) handleSwipe('right');
            }}
          >
            {/* Page Indicator & Bookmark */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <p 
                className="text-[#1E3A5F] text-sm"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Page {currentPage + 1}
              </p>
              {currentPage === lastReadPage && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-[#D4A017]"
                  title="Your last position"
                >
                  <Bookmark size={18} fill="currentColor" />
                </motion.div>
              )}
            </div>

            {/* Content */}
            <div className="max-w-xl mx-auto">
              <div 
                className="bg-white rounded-lg shadow-lg p-6 space-y-4"
                style={{
                  boxShadow: swipeDirection 
                    ? '0 20px 60px rgba(0,0,0,0.3)' 
                    : '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <div 
                  className="text-[#1A1A1A] space-y-4"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  {currentContent.map((paragraph, index) => {
                    if (paragraph === '') {
                      return <div key={index} className="h-3" />;
                    }
                    if (paragraph.startsWith('Chapter')) {
                      return (
                        <h2 
                          key={index}
                          className="text-xl text-[#8B0000] mt-6 mb-4"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {paragraph}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('•')) {
                      return (
                        <p key={index} className="text-[15px] leading-relaxed pl-4 text-[#1A1A1A]/90">
                          {paragraph}
                        </p>
                      );
                    }
                    return (
                      <p key={index} className="text-[15px] leading-relaxed text-[#1A1A1A]/90">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Page Turn Instructions */}
              <div className="text-center mt-6 text-[#1E3A5F]/60 text-xs" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Swipe left for next page, swipe right for previous
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page Navigation Buttons (Mobile Friendly) */}
      <div className="bg-[#F5F5DC] px-4 py-3 flex items-center justify-between border-t border-[#8B0000]/10">
        <button
          onClick={() => handleSwipe('right')}
          disabled={currentPage === 0}
          className={`px-6 py-2 rounded-lg transition-colors ${
            currentPage === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#1E3A5F] text-[#D4A017] hover:bg-[#2C3E50]'
          }`}
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          ← Previous
        </button>

        <span className="text-[#1E3A5F] text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={() => handleSwipe('left')}
          disabled={currentPage === totalPages - 1}
          className={`px-6 py-2 rounded-lg transition-colors ${
            currentPage === totalPages - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#1E3A5F] text-[#D4A017] hover:bg-[#2C3E50]'
          }`}
          style={{ fontFamily: 'Open Sans, sans-serif' }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}