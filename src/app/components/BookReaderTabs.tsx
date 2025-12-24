import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, BookOpen, List, RotateCcw, RotateCw } from 'lucide-react';
import vinylImage from '@/assets/vinyl-disc.svg';
import logoImage from '/images/logo.png';

interface BookReaderTabsProps {
  bookId: number;
  bookTitle: string;
  bookSymbol: string;
  pages: string[][];
  hasAudio?: boolean;
  onBack: () => void;
}

interface Chapter {
  id: number;
  title: string;
  startPage: number;
  pages: number;
}

export function BookReaderTabs({ bookId, bookTitle, bookSymbol, pages, hasAudio = false, onBack }: BookReaderTabsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioExpanded, setIsAudioExpanded] = useState(false);
  const [showChapterMenu, setShowChapterMenu] = useState(false);
  const [showPageJump, setShowPageJump] = useState(false);
  const [pageInput, setPageInput] = useState('');
  const [slideDirection, setSlideDirection] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const totalPages = pages.length;
  const currentContent = pages[currentPage];

  const chapters: Chapter[] = [
    { id: 0, title: 'Introduction', startPage: 1, pages: 6 },
    { id: 1, title: 'Chapter 1: The Setup', startPage: 7, pages: 12 },
    { id: 2, title: 'Chapter 2: Recognition', startPage: 19, pages: 10 },
    { id: 3, title: 'Chapter 3: Breaking Free', startPage: 29, pages: 14 },
    { id: 4, title: 'Chapter 4: Moving Forward', startPage: 43, pages: 8 },
  ];

  const findChapterFromPage = (page: number) => {
    let accumulated = 0;
    for (let i = 0; i < chapters.length; i++) {
      accumulated += chapters[i].pages;
      if (page < accumulated) return i;
    }
    return chapters.length - 1;
  };

  const currentChapter = findChapterFromPage(currentPage);
  const currentChapterData = chapters[currentChapter];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && !isAnimating) {
      animatePageChange(currentPage < page - 1 ? 'left' : 'right', () => setCurrentPage(page - 1));
    }
  };

  const handlePageJump = () => {
    const page = parseInt(pageInput);
    if (page >= 1 && page <= totalPages) {
      goToPage(page);
      setShowPageJump(false);
      setPageInput('');
    }
  };

  const goToChapter = (chapterIndex: number) => {
    if (!isAnimating) {
      animatePageChange(currentPage < chapters[chapterIndex].startPage - 1 ? 'left' : 'right', () => {
        setCurrentPage(chapters[chapterIndex].startPage - 1);
        setShowChapterMenu(false);
      });
    }
  };

  const animatePageChange = (direction: string, callback: () => void) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection(direction);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsAnimating(false);
        setSlideDirection('');
      }, 50);
    }, 300);
  };

  const goToPrevPage = () => {
    if (isAnimating) return;
    if (currentPage > 0) {
      animatePageChange('right', () => setCurrentPage(p => p - 1));
    }
  };

  const goToNextPage = () => {
    if (isAnimating) return;
    if (currentPage < totalPages - 1) {
      animatePageChange('left', () => setCurrentPage(p => p + 1));
    }
  };

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const getSlideVariants = () => {
    return {
      enter: (direction: string) => ({ x: direction === 'left' ? 100 : -100, opacity: 0 }),
      center: { x: 0, opacity: 1 },
      exit: (direction: string) => ({ x: direction === 'left' ? -100 : 100, opacity: 0 }),
    };
  };

  const renderPageContent = (content: string[]) => {
    return (
      <div className="text-gray-800 space-y-4" style={{ fontFamily: 'Georgia, serif', lineHeight: '1.8' }}>
        {content.map((paragraph, index) => {
          if (paragraph === '') return <div key={index} className="h-4" />;
          if (paragraph.startsWith('Chapter')) {
            return <h2 key={index} className="text-xl text-gray-900 mt-6 mb-4 font-semibold">{paragraph}</h2>;
          }
          if (paragraph.startsWith('•')) {
            return <p key={index} className="leading-relaxed pl-4 text-gray-700" style={{ fontSize: '18px' }}>{paragraph}</p>;
          }
          return <p key={index} className="leading-relaxed text-gray-800" style={{ fontSize: '18px', textAlign: 'justify' }}>{paragraph}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF0E6] flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="bg-[#8B0000] px-3 sm:px-4 flex items-center shadow-sm flex-shrink-0" style={{ height: '56px' }}>
        <button onClick={onBack} className="text-[#D4A017] hover:text-white transition-colors p-2" aria-label="Go back">
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="text-white text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            <div className="text-sm font-semibold truncate max-w-[180px]">{bookTitle}</div>
          </div>
        </div>
        <button onClick={onBack} className="hover:opacity-80 transition-opacity" aria-label="Go to home">
          <img src={logoImage} alt="Wishful Tinkering" className="h-8 w-auto" />
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-[#F5F1E8] px-2 py-2 flex items-center justify-between border-b border-gray-300 flex-shrink-0">
        <div className="relative">
          <button onClick={() => { setShowChapterMenu(!showChapterMenu); setShowPageJump(false); }} className="flex items-center gap-1.5 px-2 py-1.5 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
            <List size={14} className="text-gray-600" />
            <span className="text-xs font-medium text-gray-700 max-w-[100px] truncate">{currentChapterData.title.length > 12 ? currentChapterData.title.substring(0, 12) + '...' : currentChapterData.title}</span>
            <ChevronDown size={12} className="text-gray-400" />
          </button>
          {showChapterMenu && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-56 overflow-y-auto">
              {chapters.map((chapter) => (
                <button key={chapter.id} onClick={() => goToChapter(chapter.id)} className={`w-full px-3 py-2.5 text-left hover:bg-[#FAF0E6] transition-colors border-b border-gray-100 last:border-0 ${currentChapter === chapter.id ? 'bg-[#D4A017]/20 text-[#8B0000]' : 'text-gray-700'}`}>
                  <div className="font-medium text-xs">{chapter.title}</div>
                  <div className="text-[10px] text-gray-500">{chapter.pages} pages</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => { setShowPageJump(!showPageJump); setShowChapterMenu(false); }} className="flex items-center gap-1.5 px-2 py-1.5 bg-white rounded-md shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">
            <BookOpen size={14} className="text-gray-600" />
            <span className="text-xs font-medium text-gray-700">{currentPage + 1}/{totalPages}</span>
          </button>
          {showPageJump && (
            <div className="absolute top-full right-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-2.5">
              <div className="text-[10px] text-gray-500 mb-2">Jump to page (1-{totalPages})</div>
              <div className="flex gap-1.5">
                <input type="number" min="1" max={totalPages} value={pageInput} onChange={(e) => setPageInput(e.target.value)} placeholder="#" className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#D4A017]" onKeyPress={(e) => e.key === 'Enter' && handlePageJump()} />
                <button onClick={handlePageJump} className="px-2.5 py-1.5 bg-[#D4A017] text-white rounded text-xs font-medium hover:bg-[#C49316] transition-colors">Go</button>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {[1, Math.ceil(totalPages / 2), totalPages].map(p => (
                  <button key={p} onClick={() => { goToPage(p); setShowPageJump(false); }} className={`px-2 py-1 text-[10px] rounded ${currentPage + 1 === p ? 'bg-[#D4A017] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <div className="flex-1 overflow-hidden relative bg-[#FAF0E6]" onClick={() => { setShowChapterMenu(false); setShowPageJump(false); }}>
        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div key={currentPage} custom={slideDirection} variants={getSlideVariants()} initial="enter" animate="center" exit="exit" transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }} className="absolute inset-0 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6 pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-500 uppercase tracking-wider">{currentChapterData.title}</p>
              </div>
              {renderPageContent(currentContent)}
              <div className="text-center mt-8 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-400">Page {currentPage + 1} of {totalPages}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {isAudioExpanded && (
        <div className="absolute inset-x-0 bg-black z-20 flex flex-col overflow-hidden" style={{ top: '112px', bottom: '60px' }}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-amber-400/40 rounded-full pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
            <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 8, repeat: isPlaying ? Infinity : 0, ease: "linear" }} className="relative mb-6" style={{ width: '180px', height: '180px' }}>
              <img src={vinylImage} alt="Audio disc" className="relative w-full h-full object-contain" />
            </motion.div>
            <div className="text-center mb-4">
              <h2 className="text-white text-lg font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{bookTitle}</h2>
              <p className="text-white/60 text-sm">{currentChapterData.title}</p>
              <p className="text-white/60 text-xs mt-1">Page {currentPage + 1} of {totalPages}</p>
            </div>
            <div className="w-full max-w-sm mb-4">
              <div className="relative w-full bg-white/20 rounded-full h-1 overflow-hidden mb-2">
                <motion.div className="h-full bg-gradient-to-r from-[#D4A017] to-[#FFD700]" initial={{ width: '0%' }} animate={{ width: isPlaying ? '45%' : '45%' }} transition={{ duration: 0.3 }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform" style={{ left: '45%', marginLeft: '-6px' }} />
              </div>
              <div className="flex justify-between text-white/60 text-xs">
                <span>0:00</span>
                <span>3:45</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8">
              <button className="text-white/60 hover:text-white transition-all active:scale-95"><RotateCcw size={20} /></button>
              <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all active:scale-95 shadow-xl">{isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-0.5" />}</button>
              <button className="text-white/60 hover:text-white transition-all active:scale-95"><RotateCw size={20} /></button>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); setIsAudioExpanded(false); }} className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all active:scale-95"><ChevronDown size={20} /></button>
        </div>
      )}

      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-black px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center flex-shrink-0 border border-gray-700"><span className="text-[10px]">🎪</span></motion.div>
        <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0"><SkipBack size={16} /></button>
        <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">{isPlaying ? <Pause size={14} className="text-black" /> : <Play size={14} className="text-black ml-0.5" />}</button>
        <button className="text-gray-400 hover:text-white transition-colors flex-shrink-0"><SkipForward size={16} /></button>
        <div className="flex-1 mx-2">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[#D4A017] to-[#FFD700] rounded-full" initial={{ width: '0%' }} animate={{ width: isPlaying ? '15%' : '15%' }} />
          </div>
        </div>
        <span className="text-white text-[10px] flex-shrink-0">3:45</span>
        <button onClick={() => setIsAudioExpanded(!isAudioExpanded)} className="text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-1">{isAudioExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}</button>
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="bg-black px-4 py-2.5 flex items-center justify-between flex-shrink-0">
        <button onClick={goToPrevPage} disabled={!canGoPrev || isAnimating} className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors text-xs ${canGoPrev && !isAnimating ? 'bg-[#D4A017] text-black hover:bg-[#C49316]' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
          <ChevronLeft size={16} /><span>Prev</span>
        </button>
        <span className="text-white text-xs font-medium">{currentPage + 1}/{totalPages}</span>
        <button onClick={goToNextPage} disabled={!canGoNext || isAnimating} className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors text-xs ${canGoNext && !isAnimating ? 'bg-[#D4A017] text-black hover:bg-[#C49316]' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}>
          <span>Next</span><ChevronRight size={16} />
        </button>
      </motion.div>
    </div>
  );
}
