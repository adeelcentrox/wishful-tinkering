import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Lock } from 'lucide-react';
import { useState } from 'react';
import logoImage from '/images/logo.png';
import { MobileFooter } from './MobileFooter';
import { ComingSoonModal } from './ComingSoonModal';

interface MembershipsPageProps {
  onBack: () => void;
  onProductSelect: (productId: number) => void;
  navigateToHome?: () => void;
}

type Category = 'All' | 'Coaching' | 'Books';

interface Book {
  id: number;
  title: string;
  subtitle: string;
  symbol: string;
  suitColor: string;
  badge: {
    text: string;
    bgColor: string;
  };
  description: string;
  features: string[];
  price: string;
  buttonText: string;
  isLocked: boolean;
  category: 'Coaching' | 'Books';
}

const products: Book[] = [
  {
    id: 1,
    title: 'Coaching',
    subtitle: 'COACHING',
    symbol: '🎯',
    suitColor: '#8B0000',
    badge: {
      text: 'PREMIUM',
      bgColor: '#8B0000'
    },
    description: 'One-on-one coaching sessions to help you break free from manipulation and reclaim your personal power.',
    features: [
      '4 weekly sessions',
      'Personalized action plan',
      'Email support between calls',
      'Resource library access'
    ],
    price: '$199/month',
    buttonText: 'Get Started',
    isLocked: false,
    category: 'Coaching'
  },
  {
    id: 2,
    title: 'Complete Book Collection',
    subtitle: 'BRAINS',
    symbol: '📚',
    suitColor: '#1E3A5F',
    badge: {
      text: 'POPULAR',
      bgColor: '#1E3A5F'
    },
    description: 'Get access to all current and future books in the series. Read at your own pace.',
    features: [
      'All 4 books in series',
      'Audiobook versions included',
      'Future updates free',
      'Downloadable PDFs'
    ],
    price: '$49 one-time',
    buttonText: 'Get Access',
    isLocked: false,
    category: 'Books'
  },
  {
    id: 3,
    title: 'The Complete Bundle',
    subtitle: 'LAUGHING',
    symbol: '🎩',
    suitColor: '#D4A017',
    badge: {
      text: 'PREMIUM',
      bgColor: '#8B0000'
    },
    description: 'Everything we offer in one package. Books, coaching, and exclusive content.',
    features: [
      'All books + audiobooks',
      '4 coaching sessions',
      'Private community access',
      'Bonus workbooks'
    ],
    price: '$299 (Save $100)',
    buttonText: 'Get Bundle',
    isLocked: false,
    category: 'Books'
  },
  {
    id: 4,
    title: 'Sessions',
    subtitle: 'SESSIONS',
    symbol: '🏕️',
    suitColor: '#9CA3AF',
    badge: {
      text: 'COMING SOON',
      bgColor: '#9CA3AF'
    },
    description: '',
    features: [],
    price: '',
    buttonText: '',
    isLocked: true,
    category: 'Coaching'
  },
  {
    id: 5,
    title: 'Starter',
    subtitle: 'STARTER',
    symbol: '⭐',
    suitColor: '#9CA3AF',
    badge: {
      text: 'COMING SOON',
      bgColor: '#9CA3AF'
    },
    description: '',
    features: [],
    price: '',
    buttonText: '',
    isLocked: true,
    category: 'Books'
  }
];

function PlayingCard({ book, index, onSelect, onLockedClick }: { book: Book; index: number; onSelect: () => void; onLockedClick: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    if (book.isLocked) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
      onLockedClick();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, x: isShaking ? [0, -8, 8, -8, 8, 0] : 0 }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.15 },
        y: { duration: 0.6, delay: index * 0.15, ease: 'easeOut' },
        x: isShaking ? { duration: 0.3 } : {}
      }}
      className="relative"
      style={{ perspective: '1500px' }}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          height: '280px',
          minHeight: '280px',
          cursor: book.isLocked ? 'not-allowed' : 'pointer'
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* FRONT OF CARD */}
        <div
          className="absolute inset-0 rounded-2xl shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            background: book.isLocked
              ? 'linear-gradient(135deg, #F5F5F5 0%, #E5E5E5 100%)'
              : 'linear-gradient(135deg, #FFFEF9 0%, #FFF8E7 100%)',
            border: book.isLocked ? '2px solid #CCCCCC' : '2px solid #1E3A5F',
            boxShadow: book.isLocked
              ? '0 8px 30px rgba(0,0,0,0.05)'
              : '0 8px 30px rgba(0,0,0,0.08)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: book.isLocked ? 0.6 : 1
          }}
        >
          {/* Top Corner */}
          <div className="flex justify-between items-start">
            <div className="text-left">
              <div
                className="font-bold leading-none"
                style={{
                  color: book.isLocked ? '#999999' : book.suitColor,
                  fontSize: '40px',
                  lineHeight: 1
                }}
              >
                {book.symbol}
              </div>
              <div
                className="text-xs font-bold mt-1 tracking-wider"
                style={{
                  color: book.isLocked ? '#999999' : book.suitColor,
                  fontFamily: 'Open Sans, sans-serif'
                }}
              >
                {book.subtitle}
              </div>
            </div>

            <motion.div
              className="px-3 py-1.5 rounded-full text-[10px] font-bold text-white tracking-wide"
              style={{
                backgroundColor: book.badge.bgColor,
                fontFamily: 'Open Sans, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {book.badge.text}
            </motion.div>
          </div>

          {/* Center - Large Watermark Symbol */}
          <div className="flex items-center justify-center">
            <motion.div
              className="font-bold"
              style={{
                fontSize: '100px',
                color: book.isLocked ? 'rgba(200,200,200,0.3)' : `${book.suitColor}15`,
                lineHeight: 1
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {book.symbol}
            </motion.div>
          </div>

          {/* Bottom Corner */}
          <div className="flex justify-between items-end">
            <div className="text-xs text-gray-400" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {!book.isLocked && 'Tap to flip'}
            </div>
            <div className="text-right">
              <div
                className="font-bold leading-none"
                style={{
                  color: book.isLocked ? '#999999' : book.suitColor,
                  fontSize: '20px'
                }}
              >
                🎪
              </div>
            </div>
          </div>

          {/* Lock Overlay */}
          {book.isLocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 rounded-full p-3 shadow-lg">
                <Lock size={28} className="text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* BACK OF CARD */}
        <div
          className="absolute inset-0 rounded-2xl shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #FAF7F2 0%, #F5F1E8 100%)',
            border: '2px solid #1E3A5F',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-1">
              <div
                className="font-bold"
                style={{
                  color: book.suitColor,
                  fontSize: '28px'
                }}
              >
                {book.symbol}
              </div>
            </div>

            <h2
              className="text-xs text-gray-500 mb-0.5 tracking-wide"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              {book.title}
            </h2>
            <h3
              className="text-xl font-bold mb-3"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: book.suitColor
              }}
            >
              {book.subtitle}
            </h3>

            {/* Gold Divider */}
            <div
              className="h-0.5 rounded-full mb-3"
              style={{
                width: '60px',
                backgroundColor: '#D4A017'
              }}
            />

            {/* Description */}
            <p
              className="text-sm leading-relaxed text-gray-700 mb-3"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {book.description}
            </p>

            {/* Features List */}
            <div className="space-y-1.5 mb-3">
              {book.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 font-bold" style={{ fontFamily: 'Open Sans, sans-serif' }}>✓</span>
                  <span className="text-xs text-gray-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & Button */}
          <div>
            <div className="text-center mb-3">
              <div
                className="text-2xl font-bold"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#D4A017'
                }}
              >
                {book.price}
              </div>
            </div>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="w-full py-3 rounded-xl font-bold text-white shadow-lg"
              style={{
                backgroundColor: '#D4A017',
                fontFamily: 'Open Sans, sans-serif'
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              {book.buttonText}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MembershipsPage({ onBack, onProductSelect, navigateToHome }: MembershipsPageProps) {
  const [activeTab, setActiveTab] = useState<Category>('All');
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);
  const [selectedLockedProduct, setSelectedLockedProduct] = useState<Book | null>(null);

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter(p => p.category === activeTab);

  const tabs: Category[] = ['All', 'Coaching', 'Books'];

  const handleLockedClick = (product: Book) => {
    setSelectedLockedProduct(product);
    setIsComingSoonModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF0E6] flex flex-col pb-[60px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-[#8B0000] text-white px-4"
        style={{ height: '56px', minHeight: '56px' }}
      >
        <div className="h-full flex items-center max-w-lg mx-auto">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            onClick={onBack}
            className="text-[#D4A017] hover:text-white transition-colors p-2"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </motion.button>

          <div className="flex-1 text-center px-2">
            <h1 className="text-lg font-bold flex items-center justify-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <motion.span
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={16} className="text-[#D4A017]" />
              </motion.span>
              <span>MEMBERSHIPS</span>
              <motion.span
                animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles size={16} className="text-[#D4A017]" />
              </motion.span>
            </h1>
          </div>

          <button
            onClick={navigateToHome || onBack}
            className="hover:opacity-80 transition-opacity"
            aria-label="Go to home"
          >
            <img src={logoImage} alt="Wishful Tinkering" className="h-8 w-auto" />
          </button>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="px-4 pt-4 pb-3 text-center text-sm text-[#1E3A5F] italic"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Unlock Your Full Potential
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="px-4 pb-4"
      >
        <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-lg mx-auto">
          {tabs.map((tab, idx) => (
            <motion.button
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + (idx * 0.1), ease: 'easeOut' }}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-[#1E3A5F] text-white shadow-md'
                  : 'bg-white text-[#1E3A5F] border border-[#1E3A5F]/30'
              }`}
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Products - Vertical Card Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="flex-1 overflow-y-auto px-4 pb-4"
      >
        <div className="max-w-lg mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={`${activeTab}-${product.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  opacity: { duration: 0.4 },
                  y: { duration: 0.5, ease: 'easeOut' },
                  layout: { duration: 0.4 }
                }}
              >
                <PlayingCard
                  book={product}
                  index={index}
                  onSelect={() => onProductSelect(product.id)}
                  onLockedClick={() => handleLockedClick(product)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <MobileFooter onMenuClick={onBack} />

      <ComingSoonModal
        isOpen={isComingSoonModalOpen}
        onClose={() => setIsComingSoonModalOpen(false)}
        bookTitle={selectedLockedProduct?.title}
        bookSymbol={selectedLockedProduct?.symbol}
      />
    </div>
  );
}
