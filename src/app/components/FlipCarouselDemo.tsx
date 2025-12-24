import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useCallback } from 'react';

interface CardData {
  id: number;
  title: string;
  emoji: string;
}

const demoCards: CardData[] = [
  { id: 1, title: 'The Moon', emoji: '🌙' },
  { id: 2, title: 'The Star', emoji: '⭐' },
  { id: 3, title: 'The Sun', emoji: '☀️' },
  { id: 4, title: 'The World', emoji: '🌍' },
  { id: 5, title: 'The Fool', emoji: '🃏' },
];

function CardBack() {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #152A45 100%)',
        border: '3px solid #D4A017',
        boxShadow: 'inset 0 0 60px rgba(212, 160, 23, 0.1), 0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="absolute inset-2 rounded-xl"
        style={{
          border: '1px solid rgba(212, 160, 23, 0.4)',
          background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 160, 23, 0.03) 10px, rgba(212, 160, 23, 0.03) 20px)',
        }}
      />
      <div className="absolute top-3 left-3 text-amber-400/60 text-xl">✦</div>
      <div className="absolute top-3 right-3 text-amber-400/60 text-xl">✦</div>
      <div className="absolute bottom-3 left-3 text-amber-400/60 text-xl">✦</div>
      <div className="absolute bottom-3 right-3 text-amber-400/60 text-xl">✦</div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(212, 160, 23, 0.2) 0%, transparent 70%)',
            border: '2px solid rgba(212, 160, 23, 0.5)',
          }}
        >
          <span className="text-4xl">🎴</span>
        </div>
      </div>
    </div>
  );
}

function CardFront({ card }: { card: CardData }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6"
      style={{
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 100%)',
        border: '2px solid #D4A017',
        boxShadow: '0 15px 50px rgba(0,0,0,0.2), 0 0 30px rgba(212, 160, 23, 0.1)',
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="text-6xl mb-4">{card.emoji}</div>
      <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
      <div className="mt-4 text-sm text-gray-500">Card #{card.id}</div>
    </div>
  );
}

function FlipCard({
  card,
  position,
  isFlipped,
}: {
  card: CardData;
  position: 'left' | 'center' | 'right';
  isFlipped: boolean;
}) {
  const isCenter = position === 'center';
  const scale = isCenter ? 1 : 0.75;
  const opacity = isCenter ? 1 : 0.5;
  const xOffset = position === 'left' ? -100 : position === 'right' ? 100 : 0;
  const zIndex = isCenter ? 10 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -200 : position === 'right' ? 200 : 0, scale }}
      animate={{ opacity, x: xOffset, scale, z: isCenter ? 50 : 0 }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="flex-shrink-0 relative"
      style={{
        width: isCenter ? 240 : 180,
        height: isCenter ? 340 : 255,
        perspective: '2000px',
        zIndex,
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
          }}
        >
          <CardBack />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
          }}
        >
          <CardFront card={card} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FlipCarouselDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const maxIndex = demoCards.length - 1;

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsTransitioning(false), 1500);
  }, [isTransitioning, maxIndex]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setIsTransitioning(false), 1500);
  }, [isTransitioning]);

  const getVisibleCards = () => {
    const cards: { card: CardData; position: 'left' | 'center' | 'right'; isFlipped: boolean }[] = [];

    if (currentIndex === 0) {
      cards.push({ card: demoCards[0], position: 'center', isFlipped: true });
      if (demoCards[1]) cards.push({ card: demoCards[1], position: 'right', isFlipped: false });
    } else if (currentIndex === maxIndex) {
      if (demoCards[maxIndex - 1]) cards.push({ card: demoCards[maxIndex - 1], position: 'left', isFlipped: false });
      cards.push({ card: demoCards[maxIndex], position: 'center', isFlipped: true });
    } else {
      if (demoCards[currentIndex - 1]) cards.push({ card: demoCards[currentIndex - 1], position: 'left', isFlipped: false });
      cards.push({ card: demoCards[currentIndex], position: 'center', isFlipped: true });
      if (demoCards[currentIndex + 1]) cards.push({ card: demoCards[currentIndex + 1], position: 'right', isFlipped: false });
    }

    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Card Flip Animation Demo</h1>
      <p className="text-gray-400 mb-8 text-center">Center card reveals (flips to front), side cards stay hidden (show back)</p>

      <div className="flex items-center justify-center gap-4 overflow-hidden w-full max-w-2xl h-96 mb-8 relative">
        <AnimatePresence mode="popLayout">
          {visibleCards.map((item) => (
            <FlipCard
              key={`${item.card.id}-${item.position}-${currentIndex}`}
              card={item.card}
              position={item.position}
              isFlipped={item.isFlipped}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={goToPrev}
          disabled={currentIndex === 0 || isTransitioning}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={goToNext}
          disabled={currentIndex === maxIndex || isTransitioning}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Next →
        </button>
      </div>

      <div className="flex gap-2">
        {demoCards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrentIndex(index);
              setTimeout(() => setIsTransitioning(false), 1500);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width: currentIndex === index ? '10px' : '8px',
              height: currentIndex === index ? '10px' : '8px',
              background: currentIndex === index ? '#D4A017' : 'rgba(212, 160, 23, 0.3)',
              transform: currentIndex === index ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      <div className="mt-8 text-gray-400 text-sm text-center">
        <p>Animation: 1.2 seconds</p>
        <p className="mt-1">Use arrow buttons or dots to navigate</p>
      </div>
    </div>
  );
}
