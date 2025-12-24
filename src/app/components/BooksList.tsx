import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  subtitle: string;
  symbol: string;
  color: string;
  status: string;
  chapters?: number;
}

const booksData: Book[] = [
  { id: 1, title: 'Their Least Favorite', subtitle: 'VICTIM', symbol: '♣', color: '#1A1A1A', status: 'FREE', chapters: 6 },
  { id: 2, title: 'Their Least Favorite', subtitle: 'WITNESS', symbol: '♥', color: '#8B0000', status: 'PREVIEW', chapters: 6 },
  { id: 3, title: 'Their Least Favorite', subtitle: 'FRIEND', symbol: '♠', color: '#1A1A1A', status: 'SOON' },
  { id: 4, title: 'Their Least Favorite', subtitle: 'ENEMY', symbol: '♦', color: '#8B0000', status: 'SOON' },
];

interface BooksListProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSelect: (bookId: number) => void;
}

export function BooksList({ isOpen, onClose, onBookSelect }: BooksListProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleBookClick = (book: Book) => {
    if (book.status === 'SOON') return;
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF0E6] z-50 shadow-2xl flex flex-col"
          >
            <div className="bg-[#8B0000] px-4 py-3 flex items-center justify-between">
              <h2 className="text-white font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Books
              </h2>
              <button onClick={onClose} className="text-white/80 hover:text-white p-1">
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {!selectedBook ? (
                <div className="space-y-3">
                  {booksData.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => handleBookClick(book)}
                      className={`relative ${book.status === 'SOON' ? 'opacity-60' : 'cursor-pointer'}`}
                    >
                      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center gap-4">
                        <div
                          className="w-12 h-16 rounded-lg flex items-center justify-center shadow-inner flex-shrink-0"
                          style={{ backgroundColor: book.color }}
                        >
                          <span className="text-white text-xl">{book.symbol}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 truncate" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            {book.title}
                          </p>
                          <p className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif', color: book.color }}>
                            {book.subtitle}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                book.status === 'FREE'
                                  ? 'bg-green-100 text-green-700'
                                  : book.status === 'PREVIEW'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                              style={{ fontFamily: 'Open Sans, sans-serif' }}
                            >
                              {book.status}
                            </span>
                            {book.chapters && (
                              <span className="text-xs text-gray-400" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                {book.chapters} chapters
                              </span>
                            )}
                          </div>
                        </div>
                        {book.status !== 'SOON' && (
                          <div className="text-gray-400">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <button
                    onClick={handleBack}
                    className="self-start mb-4 text-[#8B0000] flex items-center gap-1"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>

                  <div className="relative">
                    {[selectedBook, selectedBook, selectedBook].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: -20, rotate: i * -3 }}
                        animate={{ opacity: 1 - i * 0.2, y: i * 4, rotate: i * -3 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="absolute inset-0 w-48 h-72 rounded-xl shadow-2xl"
                        style={{
                          backgroundColor: selectedBook.color,
                          transformOrigin: 'center top',
                        }}
                      />
                    ))}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="relative w-48 h-72 rounded-xl shadow-2xl overflow-hidden flex flex-col items-center justify-between p-6 z-10"
                      style={{ backgroundColor: selectedBook.color }}
                    >
                      <div className="text-white/40 text-2xl">✦</div>
                      <div className="text-center">
                        <div className="text-white text-6xl mb-2">{selectedBook.symbol}</div>
                        <div className="w-12 h-px bg-white/30 mx-auto" />
                        <p className="text-white/80 text-sm mt-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                          {selectedBook.title}
                        </p>
                        <p className="text-white text-xl font-bold mt-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {selectedBook.subtitle}
                        </p>
                      </div>
                      <div className="text-white/60 text-xs tracking-widest" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        BOOK {selectedBook.id}
                      </div>
                    </motion.div>
                  </div>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    onClick={() => onBookSelect(selectedBook.id)}
                    className="mt-8 px-8 py-3 rounded-full text-white font-medium shadow-lg"
                    style={{ backgroundColor: '#D4A017', fontFamily: 'Open Sans, sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Now
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
