import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ComingSoonModal } from './ComingSoonModal';

interface BookCardData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  symbol: string;
  suitColor: string;
  status: string;
  statusColor: string;
  chapterCount?: number;
  illustration: string;
}

interface BooksCarouselProps {
  onBookClick: (bookId: number) => void;
}

const cardsData: BookCardData[] = [
  {
    id: 0,
    title: 'Their Least Favorite',
    subtitle: 'VICTIM',
    description: 'Learn how manipulation works and break free from controlling dynamics.',
    symbol: '♣',
    suitColor: '#1a1a1a',
    status: 'FREE',
    statusColor: '#2C5F2E',
    chapterCount: 6,
    illustration: '♣'
  },
  {
    id: 1,
    title: 'Their Least Favorite',
    subtitle: 'WITNESS',
    description: 'Stand firm in truth and resist gaslighting tactics.',
    symbol: '♥',
    suitColor: '#8B0000',
    status: 'PREVIEW',
    statusColor: '#D4A017',
    chapterCount: 6,
    illustration: '♥'
  },
  {
    id: 2,
    title: 'Their Least Favorite',
    subtitle: 'FRIEND',
    description: 'Building authentic relationships based on mutual respect.',
    symbol: '♠',
    suitColor: '#1a1a1a',
    status: 'SOON',
    statusColor: '#9CA3AF',
    illustration: '♠'
  },
  {
    id: 3,
    title: 'Their Least Favorite',
    subtitle: 'ENEMY',
    description: 'Strategic resistance and principled opposition.',
    symbol: '♦',
    suitColor: '#8B0000',
    status: 'SOON',
    statusColor: '#9CA3AF',
    illustration: '♦'
  }
];

function TarotCardBack({ symbol, isAnimating }: { symbol: string; isAnimating?: boolean }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #152A45 100%)',
        border: '3px solid #D4A017',
        boxShadow: isAnimating
          ? 'inset 0 0 80px rgba(212, 160, 23, 0.15), 0 15px 50px rgba(0,0,0,0.4)'
          : 'inset 0 0 60px rgba(212, 160, 23, 0.1), 0 8px 32px rgba(0,0,0,0.3)'
      }}
    >
      <div
        className="absolute inset-2 rounded-xl"
        style={{
          border: '1px solid rgba(212, 160, 23, 0.4)',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 160, 23, 0.03) 10px, rgba(212, 160, 23, 0.03) 20px)'
        }}
      />

      <motion.div
        className="absolute top-3 left-3 text-amber-400/60 text-lg"
        animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute top-3 right-3 text-amber-400/60 text-lg"
        animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-3 left-3 text-amber-400/60 text-lg"
        animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.2 }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-3 right-3 text-amber-400/60 text-lg"
        animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.3 }}
      >
        ✦
      </motion.div>

      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-6"
        animate={{ opacity: isAnimating ? [0.3, 0.6, 0.3] : 0.3 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <span className="text-amber-400/30 text-xs">✦</span>
        <span className="text-amber-400/50 text-sm">✦</span>
        <span className="text-amber-400/30 text-xs">✦</span>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6"
        animate={{ opacity: isAnimating ? [0.3, 0.6, 0.3] : 0.3 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
      >
        <span className="text-amber-400/30 text-xs">✦</span>
        <span className="text-amber-400/50 text-sm">✦</span>
        <span className="text-amber-400/30 text-xs">✦</span>
      </motion.div>

      <div
        className="absolute top-1/2 left-3 right-3 h-px -translate-y-1/2"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212, 160, 23, 0.4), transparent)'
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <motion.div
            animate={isAnimating
              ? { rotate: [0, 10, -10, 5, -5, 0], scale: [1, 1.1, 1] }
              : { rotate: [0, 5, -5, 0] }
            }
            transition={{ duration: isAnimating ? 1.2 : 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(212, 160, 23, 0.2) 0%, transparent 70%)',
                border: '2px solid rgba(212, 160, 23, 0.5)'
              }}
            >
              <span className="text-3xl sm:text-4xl">🎪</span>
            </div>
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
              <span className="text-amber-400/60 text-xs">✦</span>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
              <span className="text-amber-400/60 text-xs">✦</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 flex flex-col gap-0.5">
        <span className="text-amber-400/20 text-xs">✼</span>
        <span className="text-amber-400/30 text-xs">✼</span>
        <span className="text-amber-400/20 text-xs">✼</span>
      </div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 flex flex-col gap-0.5">
        <span className="text-amber-400/20 text-xs">✼</span>
        <span className="text-amber-400/30 text-xs">✼</span>
        <span className="text-amber-400/20 text-xs">✼</span>
      </div>
    </div>
  );
}

function MagicIllustration({ illustration, suitColor, isFlipped }: { illustration: string; suitColor: string; isFlipped: boolean }) {
  const getIcon = (symbol: string) => {
    switch(symbol) {
      case '♣': return '♣';
      case '♥': return '♥';
      case '♠': return '♠';
      case '♦': return '♦';
      default: return symbol;
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{
          background: `${suitColor}20`,
        }}
        animate={{
          scale: isFlipped ? [1.3, 1.7, 1.3] : [1.2, 1.5, 1.2],
          opacity: isFlipped ? [0.4, 0.6, 0.4] : [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {isFlipped && (
        <>
          <motion.div
            className="absolute top-0 right-0 text-xs"
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            +
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 text-xs"
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5], rotate: [0, -15, 15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            +
          </motion.div>
          <motion.div
            className="absolute top-1/4 left-0 text-xs"
            animate={{ x: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            +
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-0 text-xs"
            animate={{ x: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            +
          </motion.div>
        </>
      )}

      <motion.div
        className="text-5xl sm:text-6xl md:text-7xl relative z-10"
        animate={isFlipped ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ color: suitColor }}
      >
        {getIcon(illustration)}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-xs opacity-30">♠</div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-xs opacity-30">♥</div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 text-xs opacity-30">♣</div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-xs opacity-30">♦</div>
      </motion.div>
    </div>
  );
}

function FlipCard({
  card,
  position,
  screenWidth,
  onReadNow,
  onCardClick,
  isTransitioning
}: {
  card: BookCardData;
  position: 'left' | 'center' | 'right';
  screenWidth: number;
  onReadNow?: () => void;
  onCardClick?: () => void;
  isTransitioning?: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prevCardId = useRef(card.id);

  const isCenter = position === 'center';
  const isComingSoon = card.status === 'SOON';

  useEffect(() => {
    if (prevCardId.current !== card.id) {
      setIsFlipped(false);
      setHasAnimated(false);
      prevCardId.current = card.id;
    }
  }, [card.id]);

  useEffect(() => {
    if (isCenter && !hasAnimated) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
        setHasAnimated(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (!isCenter && isFlipped) {
      setIsFlipped(false);
    }
  }, [isCenter, hasAnimated]);

  const getCardSize = () => {
    const vw = screenWidth;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 812;

    const maxCardWidth = Math.min(vw * 0.65, 280);
    const maxCardHeight = Math.min(vh * 0.5, 380);

    if (vw < 340) {
      return isCenter
        ? { width: maxCardWidth, height: maxCardHeight, scale: 1 }
        : { width: maxCardWidth * 0.7, height: maxCardHeight * 0.7, scale: 0.75 };
    } else if (vw < 375) {
      return isCenter
        ? { width: maxCardWidth, height: maxCardHeight, scale: 1 }
        : { width: maxCardWidth * 0.75, height: maxCardHeight * 0.75, scale: 0.78 };
    } else if (vw < 414) {
      return isCenter
        ? { width: maxCardWidth, height: maxCardHeight, scale: 1 }
        : { width: maxCardWidth * 0.78, height: maxCardHeight * 0.78, scale: 0.8 };
    }
    return isCenter
      ? { width: maxCardWidth, height: maxCardHeight, scale: 1 }
      : { width: maxCardWidth * 0.8, height: maxCardHeight * 0.8, scale: 0.82 };
  };

  const cardSize = getCardSize();
  const opacity = isCenter ? 1 : 0.5;
  const xOffset = position === 'left' ? -35 : position === 'right' ? 35 : 0;
  const zOffset = isCenter ? 50 : 0;
  const zIndex = isCenter ? 10 : 1;
  const isClickable = isCenter;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: position === 'left' ? -150 : position === 'right' ? 150 : 0,
        scale: cardSize.scale,
        rotateY: position === 'right' ? 30 : 0
      }}
      animate={{
        opacity,
        x: xOffset,
        scale: cardSize.scale,
        rotateY: 0,
        z: zOffset
      }}
      transition={{
        opacity: { duration: 0.5, ease: 'easeOut' },
        x: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
        scale: { duration: 0.6, ease: 'easeOut' },
        rotateY: { duration: 0.8, ease: 'easeOut' }
      }}
      className="flex-shrink-0 relative cursor-pointer"
      style={{
        width: cardSize.width,
        height: cardSize.height,
        perspective: '2000px',
        zIndex
      }}
      onClick={isClickable ? (isComingSoon ? onCardClick : onReadNow) : undefined}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1]
        }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden'
          }}
        >
          <TarotCardBack symbol={card.symbol} isAnimating={isTransitioning} />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 100%)',
            borderRadius: '16px',
            boxShadow: isFlipped
              ? '0 15px 50px rgba(0,0,0,0.2), 0 0 30px rgba(212, 160, 23, 0.1)'
              : '0 12px 40px rgba(0,0,0,0.15)',
            border: '2px solid #D4A017',
            padding: isCenter ? '16px' : '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div className="flex justify-between items-start">
            <div
              className="font-bold"
              style={{
                color: card.suitColor,
                fontFamily: 'Georgia, serif',
                fontSize: isCenter ? '24px' : '18px'
              }}
            >
              {card.symbol}
            </div>
            <div
              className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-bold text-white text-xs"
              style={{
                backgroundColor: card.statusColor,
                fontFamily: 'Open Sans, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              {card.status}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center py-2 sm:py-4">
            <MagicIllustration illustration={card.illustration} suitColor={card.suitColor} isFlipped={isFlipped} />
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <span style={{ color: card.suitColor, opacity: 0.5, fontSize: '10px' }}>{card.symbol}</span>
              <span className="text-xs tracking-widest" style={{ color: '#6B7280', fontFamily: 'Open Sans, sans-serif' }}>
                BOOK {card.id + 1}
              </span>
              <span style={{ color: card.suitColor, opacity: 0.5, fontSize: '10px' }}>{card.symbol}</span>
            </div>

            <h3
              className="text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: '#6B7280'
              }}
            >
              {card.title}
            </h3>
            <h2
              className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: card.suitColor
              }}
            >
              {card.subtitle}
            </h2>

            {card.chapterCount && !isComingSoon ? (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onReadNow?.();
                }}
                className="w-full py-2 sm:py-3 rounded-xl font-bold text-white shadow-lg"
                style={{
                  backgroundColor: '#D4A017',
                  fontFamily: 'Open Sans, sans-serif'
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                Read Now →
              </motion.button>
            ) : isComingSoon ? (
              <div className="w-full py-2 sm:py-3 rounded-xl font-semibold text-center"
                style={{
                  backgroundColor: 'rgba(156, 163, 175, 0.2)',
                  color: '#9CA3AF',
                  fontFamily: 'Open Sans, sans-serif'
                }}
              >
                Notify Me
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BooksCarousel({ onBookClick }: BooksCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 375);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<BookCardData | null>(null);

  const maxIndex = cardsData.length - 1;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [isTransitioning, maxIndex]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [isTransitioning]);

  const goToIndex = useCallback((index: number) => {
    if (isTransitioning || index < 0 || index > maxIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [isTransitioning, maxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setAutoAdvanceEnabled(false);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  const handleReadNow = () => {
    if (cardsData[currentIndex].chapterCount) {
      onBookClick(currentIndex);
    }
  };

  const handleComingSoonClick = () => {
    setSelectedCard(cardsData[currentIndex]);
    setShowComingSoonModal(true);
  };

  useEffect(() => {
    if (!autoAdvanceEnabled) return;

    const interval = setInterval(() => {
      if (currentIndex < maxIndex) {
        goToNext();
      } else {
        setIsTransitioning(true);
        setCurrentIndex(0);
        setTimeout(() => setIsTransitioning(false), 1200);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, goToNext, autoAdvanceEnabled]);

  const getVisibleCards = () => {
    const cards: { card: BookCardData; position: 'left' | 'center' | 'right' }[] = [];

    if (currentIndex === 0) {
      cards.push({ card: cardsData[0], position: 'center' });
      if (cardsData[1]) cards.push({ card: cardsData[1], position: 'right' });
    } else if (currentIndex === maxIndex) {
      if (cardsData[maxIndex - 1]) cards.push({ card: cardsData[maxIndex - 1], position: 'left' });
      cards.push({ card: cardsData[maxIndex], position: 'center' });
    } else {
      if (cardsData[currentIndex - 1]) cards.push({ card: cardsData[currentIndex - 1], position: 'left' });
      cards.push({ card: cardsData[currentIndex], position: 'center' });
      if (cardsData[currentIndex + 1]) cards.push({ card: cardsData[currentIndex + 1], position: 'right' });
    }

    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="bg-[#FAF0E6] py-4 sm:py-6 flex-1 overflow-hidden flex flex-col"
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        <div className="flex-1 flex items-center justify-center relative px-2 sm:px-4">
          <div
            className="flex items-center justify-center gap-2 sm:gap-4 overflow-hidden w-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <AnimatePresence mode="popLayout">
              {visibleCards.map((item) => (
                <FlipCard
                  key={`${item.card.id}-${item.position}-${currentIndex}`}
                  card={item.card}
                  position={item.position}
                  screenWidth={screenWidth}
                  isTransitioning={isTransitioning}
                  onReadNow={item.position === 'center' && item.card.chapterCount ? handleReadNow : undefined}
                  onCardClick={item.position === 'center' && !item.card.chapterCount ? handleComingSoonClick : undefined}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
          {cardsData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToIndex(index)}
              className="rounded-full transition-all duration-300"
              style={{
                width: currentIndex === index ? '8px' : '6px',
                height: currentIndex === index ? '8px' : '6px',
                background: currentIndex === index ? '#8B0000' : 'rgba(139, 0, 0, 0.3)',
                transform: currentIndex === index ? 'scale(1.4)' : 'scale(1)'
              }}
              aria-label={`Go to card ${index + 1}`}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        {currentIndex === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="text-center text-xs mt-2 sm:mt-3 text-gray-500 px-4"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            Swipe or tap to explore →
          </motion.p>
        )}
      </motion.div>

      <ComingSoonModal
        isOpen={showComingSoonModal}
        onClose={() => setShowComingSoonModal(false)}
        bookTitle={selectedCard?.title}
        bookSymbol={selectedCard?.symbol}
      />
    </>
  );
}
