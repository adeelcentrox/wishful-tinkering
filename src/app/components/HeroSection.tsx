import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  symbol: string;
  color: string;
  coverColor: string;
}

const featuredBooks: Book[] = [
  { id: 1, title: 'Their Least Favorite Victim', symbol: '♣', color: '#1A1A1A', coverColor: '#2C3E50' },
  { id: 2, title: 'Their Least Favorite Witness', symbol: '♥', color: '#C41E3A', coverColor: '#C41E3A' },
  { id: 3, title: 'Their Least Favorite Friend', symbol: '♠', color: '#1A1A1A', coverColor: '#34495E' },
  { id: 4, title: 'Their Least Favorite Enemy', symbol: '♦', color: '#C41E3A', coverColor: '#8B0000' }
];

interface HeroSectionProps {
  onBookSelect: (bookId: number) => void;
}

export function HeroSection({ onBookSelect }: HeroSectionProps) {
  const [showBook, setShowBook] = useState(false);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  const handleBack = () => {
    setShowBook(false);
  };

  const handleBookClick = (bookId: number) => {
    onBookSelect(bookId);
  };

  const nextBook = () => {
    setCurrentBookIndex((prev) => (prev + 1) % featuredBooks.length);
  };

  return (
    <div
      className="bg-[#FAF0E6] px-5 py-6 xl:py-12 text-center relative overflow-hidden flex flex-col justify-center"
      style={{ minHeight: '280px' }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/4 text-[120px]">*</div>
        <div className="absolute bottom-0 right-1/4 text-[120px]">*</div>
      </div>

      <AnimatePresence mode="wait">
        {!showBook ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-1"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <div className="text-[#D4A017] text-[26px] xl:text-[32px] leading-tight font-semibold">
                We Protect People From Being
              </div>
              <div className="text-[#D4A017] text-[26px] xl:text-[32px] leading-tight font-semibold">
                Forced To Do{' '}
                <span className="underline decoration-2 underline-offset-4">ANYTHING.</span>
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-[#1A1A1A] text-[16px] xl:text-[18px] px-2"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              We've started by protecting them against liars and traitors.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-[#1A1A1A] text-[17px] xl:text-[19px] font-medium pt-1"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Wanna learn how?
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="book-card"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="relative z-10 flex flex-col items-center justify-center space-y-4"
            style={{ perspective: '1000px' }}
          >
            <motion.button
              onClick={handleBack}
              className="absolute top-0 left-0 xl:left-8 p-2 text-[#8B0000] hover:text-[#5C0000] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft size={24} />
            </motion.button>

            <motion.div
              key={currentBookIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBookClick(featuredBooks[currentBookIndex].id)}
                className="relative w-[140px] h-[210px] xl:w-[160px] xl:h-[240px] rounded-lg shadow-2xl overflow-hidden cursor-pointer mb-4"
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-between p-4"
                  style={{
                    background: `linear-gradient(135deg, ${featuredBooks[currentBookIndex].coverColor} 0%, ${featuredBooks[currentBookIndex].coverColor}dd 100%)`,
                  }}
                >
                  <div className="text-white/20 text-lg">+</div>

                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <div
                      className="text-4xl xl:text-5xl drop-shadow-lg"
                      style={{ color: featuredBooks[currentBookIndex].id === 1 || featuredBooks[currentBookIndex].id === 3 ? '#FFFFFF' : '#FFE5B4' }}
                    >
                      {featuredBooks[currentBookIndex].symbol}
                    </div>
                    <div className="w-10 h-[1px] bg-white/40"></div>
                    <h3
                      className="text-white text-[10px] xl:text-[12px] leading-tight font-semibold px-2"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      {featuredBooks[currentBookIndex].title}
                    </h3>
                  </div>

                  <div className="text-white/60 text-[8px] xl:text-[9px] tracking-widest uppercase" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    BOOK {featuredBooks[currentBookIndex].id}
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20"></div>
              </motion.div>

              <div className="flex items-center gap-4">
                <motion.button
                  onClick={nextBook}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#1E3A5F] text-white px-4 py-2 rounded-lg text-sm"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  Shuffle
                </motion.button>

                <motion.button
                  onClick={() => handleBookClick(featuredBooks[currentBookIndex].id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#D4A017] text-white px-6 py-2 rounded-lg text-sm font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  Read Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
