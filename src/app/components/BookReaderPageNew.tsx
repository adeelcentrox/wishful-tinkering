import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useState } from 'react';
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

export function BookReaderPageNew({ bookId, onBack, navigateToHome }: BookReaderPageProps) {
  const book = bookContent[bookId];
  const [currentPage, setCurrentPage] = useState(0);
  const [pageDirection, setPageDirection] = useState<'forward' | 'backward'>('forward');
  const [audioExpanded, setAudioExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  if (!book) {
    return null;
  }

  const totalPages = book.pages.length;
  const currentContent = book.pages[currentPage];

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setPageDirection('forward');
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setPageDirection('backward');
      setCurrentPage(prev => prev - 1);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="min-h-screen bg-[#FAF0E6] flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Header - Standardized */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#8B0000] px-4 flex items-center shadow-md flex-shrink-0"
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

      {/* Black Vinyl-Style Audio Player */}
      {book.hasAudio && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#FAF0E6] px-4 pb-4"
        >
          <button
            onClick={() => setAudioExpanded(!audioExpanded)}
            className="w-full bg-[#8B0000] text-[#D4A017] px-4 py-3 rounded-t-lg flex items-center justify-center hover:bg-[#A00000] transition-colors"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            <span className="text-sm font-medium">Tap for Audio Options</span>
          </button>

          <AnimatePresence>
            {audioExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-[#1A1A1A] rounded-b-lg"
              >
                <div className="px-6 py-6 space-y-4">
                  {/* Vinyl Record */}
                  <div className="flex justify-center">
                    <motion.div 
                      className="relative w-32 h-32"
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{ 
                        duration: 3, 
                        repeat: isPlaying ? Infinity : 0,
                        ease: "linear" 
                      }}
                    >
                      {/* Vinyl Disc */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black via-gray-900 to-black border-4 border-gray-800 shadow-2xl">
                        {/* Grooves */}
                        <div className="absolute inset-3 rounded-full border border-gray-700/30"></div>
                        <div className="absolute inset-6 rounded-full border border-gray-700/30"></div>
                        <div className="absolute inset-9 rounded-full border border-gray-700/30"></div>
                        
                        {/* Center Label */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 border-2 border-gray-400 shadow-inner flex items-center justify-center">
                            <div className="text-2xl">🎪</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Playback Controls - Black Background */}
                  <div className="bg-black/40 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => {}}
                        className="p-2 text-white/80 hover:text-white transition-colors"
                        aria-label="Back 10s"
                      >
                        <SkipBack size={20} />
                      </button>

                      <button
                        onClick={togglePlay}
                        className="p-4 bg-white rounded-full hover:bg-gray-100 transition-all active:scale-95 shadow-lg"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <Pause size={24} className="text-black" fill="currentColor" />
                        ) : (
                          <Play size={24} className="text-black" fill="currentColor" />
                        )}
                      </button>

                      <button
                        onClick={() => {}}
                        className="p-2 text-white/80 hover:text-white transition-colors"
                        aria-label="Forward 10s"
                      >
                        <SkipForward size={20} />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-white"
                          initial={{ width: '0%' }}
                          animate={{ width: isPlaying ? '45%' : `${audioProgress}%` }}
                          transition={{ duration: isPlaying ? 10 : 0.5 }}
                        />
                      </div>
                      <div className="flex justify-between text-white/60 text-xs" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        <span>00:00</span>
                        <span>16:43</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Kindle-Style Single Page View */}
      <div className="flex-1 overflow-hidden relative bg-[#FAF0E6]">
        <AnimatePresence mode="wait" custom={pageDirection}>
          <motion.div
            key={currentPage}
            custom={pageDirection}
            initial={{
              opacity: 0,
              x: pageDirection === 'forward' ? 20 : -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: pageDirection === 'forward' ? -20 : 20,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 overflow-y-auto px-6 py-8 lg:px-12 lg:py-12"
          >
            <div className="max-w-3xl mx-auto">
              {/* Clean Kindle-Style Content */}
              <div 
                className="text-[#1A1A1A] space-y-6"
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
                        className="text-2xl text-[#654321] mt-8 mb-6"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {paragraph}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('•')) {
                    return (
                      <p key={index} className="text-lg leading-relaxed pl-4 text-[#1A1A1A]">
                        {paragraph}
                      </p>
                    );
                  }
                  return (
                    <p key={index} className="text-lg leading-relaxed text-[#1A1A1A]">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal Navigation Arrows - Bottom Right */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 right-6 flex items-center gap-3"
      >
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className={`p-3 rounded-full transition-all shadow-lg ${ 
            currentPage === 0
              ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
              : 'bg-white text-[#1E3A5F] hover:bg-gray-50 active:scale-95'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className={`p-3 rounded-full transition-all shadow-lg ${
            currentPage === totalPages - 1
              ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
              : 'bg-white text-[#1E3A5F] hover:bg-gray-50 active:scale-95'
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={24} />
        </button>
      </motion.div>
    </div>
  );
}