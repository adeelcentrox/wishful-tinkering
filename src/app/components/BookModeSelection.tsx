import { motion, AnimatePresence } from 'motion/react';
import { Book, Headphones, ArrowLeft } from 'lucide-react';
import logoImage from '/images/logo.png';

interface BookModeSelectionProps {
  bookId: number;
  bookTitle: string;
  bookSymbol: string;
  hasAudio: boolean;
  isComingSoon?: boolean;
  audioDuration?: string;
  onSelectMode: (mode: 'read-only' | 'read-listen') => void;
  onBack: () => void;
  navigateToHome?: () => void;
}

const BOOK_CONFIG: Record<number, { color: string; symbol: string; duration: string }> = {
  1: { color: '#1a1a1a', symbol: '♣', duration: '16:43' },
  2: { color: '#8B0000', symbol: '♥', duration: '24:18' },
  3: { color: '#1a1a1a', symbol: '♠', duration: '18:25' },
  4: { color: '#8B0000', symbol: '♦', duration: '21:12' }
};

export function BookModeSelection({
  bookId,
  bookTitle,
  bookSymbol,
  hasAudio,
  isComingSoon = false,
  audioDuration,
  onSelectMode,
  onBack,
  navigateToHome
}: BookModeSelectionProps) {
  const config = BOOK_CONFIG[bookId] || { color: '#1a1a1a', symbol: '♠', duration: '16:43' };
  const duration = audioDuration || config.duration;

  return (
    <div
      className="min-h-screen flex flex-col pb-[60px]"
      style={{
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F5F0E8 100%)',
        fontFamily: 'Open Sans, sans-serif'
      }}
    >
      {/* Header - 56px, No title text */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-[#8B0000] px-4 flex items-center justify-between"
        style={{ height: '56px', minHeight: '56px' }}
      >
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          onClick={onBack}
          className="text-white hover:opacity-70 transition-opacity p-2"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </motion.button>

        <button
          onClick={navigateToHome || onBack}
          className="hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-lg">🎪</span>
          </div>
        </button>
      </motion.header>

      {/* Book Identity Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="pt-12 pb-10 text-center px-6"
      >
        {/* Card Suit Icon with float animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          className="mb-4"
        >
          <motion.div
            animate={{
              y: [0, -4, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="text-5xl"
            style={{ color: config.color }}
          >
            {bookSymbol}
          </motion.div>
        </motion.div>

        {/* Book Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="text-2xl font-semibold mb-2 leading-tight"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#1a1a1a'
          }}
        >
          {bookTitle}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
          className="text-base"
          style={{ color: '#6B7280' }}
        >
          Choose your reading experience
        </motion.p>
      </motion.div>

      {/* Reading Mode Cards */}
      <div className="px-6 space-y-4 flex-1">
        <AnimatePresence mode="wait">
          {/* Read Only Card */}
          <motion.button
            key="read-only"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isComingSoon ? 0.5 : 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            onClick={() => !isComingSoon && onSelectMode('read-only')}
            disabled={isComingSoon}
            className="w-full bg-white rounded-2xl p-6 text-left relative overflow-hidden"
            style={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #E5E5E5',
              cursor: isComingSoon ? 'not-allowed' : 'pointer'
            }}
            whileHover={!isComingSoon ? {
              scale: 1.01,
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              borderColor: '#1E3A5F'
            } : {}}
            whileTap={!isComingSoon ? { scale: 0.99 } : {}}
          >
            <div className="flex items-start gap-4">
              {/* Icon Container */}
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: '56px',
                  height: '56px',
                  background: '#EEF2FF',
                  borderRadius: '12px'
                }}
              >
                <Book size={28} style={{ color: '#1E3A5F' }} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#1a1a1a'
                  }}
                >
                  Read Only
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: '#6B7280'
                  }}
                >
                  Pure Kindle-style reading experience. Clean, minimal, distraction-free.
                </p>
              </div>
            </div>

            {/* Lock Overlay for Coming Soon */}
            {isComingSoon && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/30">
                <span className="text-4xl">🔒</span>
              </div>
            )}
          </motion.button>

          {/* Read & Listen Card */}
          <motion.button
            key="read-listen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isComingSoon || !hasAudio ? 0.5 : 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.55, ease: 'easeOut' }}
            onClick={() => !isComingSoon && hasAudio && onSelectMode('read-listen')}
            disabled={isComingSoon || !hasAudio}
            className="w-full rounded-2xl p-6 text-left relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #8B0000 0%, #6B0000 100%)',
              boxShadow: '0 8px 30px rgba(139,0,0,0.3)',
              cursor: (isComingSoon || !hasAudio) ? 'not-allowed' : 'pointer'
            }}
            whileHover={(!isComingSoon && hasAudio) ? {
              scale: 1.01,
              boxShadow: '0 12px 40px rgba(139,0,0,0.4)'
            } : {}}
            whileTap={(!isComingSoon && hasAudio) ? { scale: 0.99 } : {}}
          >
            <div className="flex items-start gap-4">
              {/* Icon Container */}
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '12px'
                }}
              >
                <Headphones size={28} className="text-white" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-xl font-semibold mb-2 text-white"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  Read & Listen
                </h3>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: 'rgba(255,255,255,0.85)'
                  }}
                >
                  Full audiobook with spinning vinyl player. Read along while listening.
                </p>

                {/* Audio Info Row */}
                <div
                  className="inline-flex items-center gap-2"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '8px 12px'
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '50%'
                    }}
                  >
                    <span className="text-sm">🎵</span>
                  </div>
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: 'Open Sans, sans-serif',
                      color: 'rgba(255,255,255,0.9)'
                    }}
                  >
                    Narrated by Author • {duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Lock Overlay for Coming Soon */}
            {(isComingSoon || !hasAudio) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="text-4xl">🔒</span>
              </div>
            )}
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Helper Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8, ease: 'easeOut' }}
        className="text-center px-8 pt-8 pb-4 text-xs leading-relaxed"
        style={{ color: '#9CA3AF', fontFamily: 'Open Sans, sans-serif' }}
      >
        You can always switch between modes while reading by going back to this screen
      </motion.p>
    </div>
  );
}
