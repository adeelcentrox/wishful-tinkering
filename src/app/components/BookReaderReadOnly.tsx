import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import logoImage from '/images/logo.png';

interface BookReaderReadOnlyProps {
  bookId: number;
  bookTitle: string;
  bookSymbol: string;
  pages: string[][];
  onBack: () => void;
  navigateToHome?: () => void;
}

export function BookReaderReadOnly({ bookId, bookTitle, bookSymbol, pages, onBack, navigateToHome }: BookReaderReadOnlyProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageDirection, setPageDirection] = useState<'forward' | 'backward'>('forward');

  const totalPages = pages.length;
  const currentContent = pages[currentPage];

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
      </motion.div>

      {/* Pure Kindle-Style Single Page View - Full Screen */}
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
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) handleNextPage();
              if (info.offset.x > 80) handlePreviousPage();
            }}
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
              ? 'bg-gray-300 text-gray-400 cursor-not-allowed opacity-50'
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
              ? 'bg-gray-300 text-gray-400 cursor-not-allowed opacity-50'
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
