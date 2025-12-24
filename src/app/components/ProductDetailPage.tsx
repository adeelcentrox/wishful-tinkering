import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingCart, Zap, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { useState } from 'react';
import logoImage from '/images/logo.png';

interface ProductDetailPageProps {
  productId: number;
  onBack: () => void;
  navigateToHome?: () => void;
}

const productDetails = {
  1: {
    title: '— The Live Laughing Package —',
    image: '🎩✨',
    basePrice: 199100,
    stock: 44,
    shortDescription: 'The ultimate coaching experience with unlimited access & exclusive content.',
    fullDescription: 'The ultimate coaching experience combining unlimited access, exclusive content, and transformative guidance. Get everything you need to protect yourself from manipulation.',
    perks: [
      { title: 'Unlimited Coaching', description: 'One-on-one sessions whenever you need them. Direct access to personalized guidance.', icon: '🎯' },
      { title: 'Movies/TV Shows', description: 'Exclusive video content library with psychological insights & case studies.', icon: '🎬' },
      { title: 'Book Clubs', description: 'Monthly deep-dive discussions on psychology, manipulation, and empowerment.', icon: '📖' },
      { title: 'Fail-Safe Formula', description: 'Proven frameworks to navigate difficult situations and maintain autonomy.', icon: '🔐' }
    ],
    ratings: [
      { stars: 5, discount: 0, label: '5 Star - Full Price' },
      { stars: 4, discount: 10, label: '4 Star - 10% Off' },
      { stars: 3, discount: 20, label: '3 Star - 20% Off' },
      { stars: 2, discount: 30, label: '2 Star - 30% Off' },
      { stars: 1, discount: 50, label: '1 Star - 50% Off' }
    ]
  },
  2: {
    title: 'Unlimited Coaching',
    image: '🎩🔥',
    basePrice: 56900,
    stock: 28,
    shortDescription: 'Direct access to coaching sessions without restrictions.',
    fullDescription: 'Direct access to coaching sessions without restrictions. Get the support you need, when you need it. Schedule as many sessions as you need throughout your membership.',
    perks: [
      { title: 'Unlimited Sessions', description: 'Schedule as many coaching calls as you need.', icon: '📞' },
      { title: 'Priority Scheduling', description: 'Get preferred time slots & emergency availability.', icon: '⏰' },
      { title: 'Custom Action Plans', description: 'Personalized strategies for your specific challenges.', icon: '📋' }
    ],
    ratings: [
      { stars: 5, discount: 0, label: '5 Star - Full Price' },
      { stars: 4, discount: 15, label: '4 Star - 15% Off' },
      { stars: 3, discount: 25, label: '3 Star - 25% Off' }
    ]
  },
  3: {
    title: '— Books For Brains —',
    image: '📚💥',
    basePrice: 12800,
    stock: 156,
    shortDescription: 'Complete digital library of all current and future books.',
    fullDescription: 'Complete digital library of all current and future books, plus exclusive bonus content. Immediate access to all published books plus future releases.',
    perks: [
      { title: 'All 4 Books', description: 'Immediate access to all published books plus future releases.', icon: '📚' },
      { title: 'Audio Versions', description: 'Professional narrations with immersive vinyl player experience.', icon: '🎧' },
      { title: 'Bonus Chapters', description: 'Exclusive content including extended chapters and case studies.', icon: '✨' }
    ],
    ratings: [
      { stars: 5, discount: 0, label: '5 Star - Full Price' },
      { stars: 4, discount: 10, label: '4 Star - 10% Off' }
    ]
  }
};

type TabType = 'overview' | 'perks' | 'rating';

export function ProductDetailPage({ productId, onBack, navigateToHome }: ProductDetailPageProps) {
  const product = productDetails[productId as keyof typeof productDetails];
  const [selectedRating, setSelectedRating] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedPerk, setExpandedPerk] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return null;
  }

  const selectedDiscount = product.ratings[selectedRating]?.discount || 0;
  const finalPrice = product.basePrice * (1 - selectedDiscount / 100);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="h-screen bg-[#FAF0E6] flex flex-col" style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
      {/* Header - Standardized */}
      <div className="bg-[#8B0000] px-4 flex items-center shadow-md flex-shrink-0" style={{ height: '64px' }}>
        <button
          onClick={onBack}
          className="text-[#D4A017] hover:text-white transition-colors p-2"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex-1" />

        <button
          onClick={navigateToHome || onBack}
          className="hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <img src={logoImage} alt="Wishful Tinkering" className="h-9 w-auto" />
        </button>
      </div>

      {/* Main Content - ZERO SCROLL Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Section - Product Card (Fixed Height) */}
        <div className="flex-shrink-0 bg-white border-b border-[#1E3A5F]/10">
          <div className="flex">
            {/* Product Image - Left */}
            <div className="w-1/3 bg-gradient-to-br from-[#8B0000] to-[#6D0000] p-3 flex items-center justify-center min-h-[100px]">
              <div className="text-4xl">{product.image}</div>
            </div>

            {/* Product Info - Right */}
            <div className="flex-1 p-2 flex flex-col justify-between">
              <div>
                <h1 className="text-[#D4A017] text-sm font-semibold leading-tight mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {product.title}
                </h1>
                <p className="text-[#1E3A5F] text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Rs.{finalPrice.toLocaleString()}
                </p>
                {selectedDiscount > 0 && (
                  <p className="text-[#8B0000] text-xs line-through">
                    Rs.{product.basePrice.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 text-[10px] text-[#1E3A5F]/60">
                <Info size={10} />
                <span>{product.stock} left in stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Buy Buttons - Always Visible (Fixed) */}
        <div className="flex-shrink-0 px-3 py-2 bg-[#FAF0E6] border-b border-[#1E3A5F]/10">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#1E3A5F] text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 active:scale-98 transition-transform"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <ShoppingCart size={16} />
              {addedToCart ? 'Added!' : 'Add to Cart'}
            </button>
            <button
              className="flex-1 bg-[#D4A017] text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 active:scale-98 transition-transform"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <Zap size={16} />
              Buy Now
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex-shrink-0 flex border-b border-[#1E3A5F]/10 bg-white">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-[#8B0000]/5'
                : 'text-[#1E3A5F]/60 hover:text-[#1E3A5F]'
            }`}
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('perks')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'perks'
                ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-[#8B0000]/5'
                : 'text-[#1E3A5F]/60 hover:text-[#1E3A5F]'
            }`}
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            What's Included
          </button>
          <button
            onClick={() => setActiveTab('rating')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              activeTab === 'rating'
                ? 'text-[#8B0000] border-b-2 border-[#8B0000] bg-[#8B0000]/5'
                : 'text-[#1E3A5F]/60 hover:text-[#1E3A5F]'
            }`}
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            Save More
          </button>
        </div>

        {/* Tab Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-4"
              >
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h2 className="text-[#1E3A5F] font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    About This Package
                  </h2>
                  <p className="text-[#1E3A5F]/80 text-sm leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {product.shortDescription}
                  </p>

                  <details className="mt-3 group">
                    <summary className="cursor-pointer list-none flex items-center gap-2 text-[#8B0000] text-sm font-medium">
                      <ChevronDown className="group-open:rotate-180 transition-transform" size={16} />
                      Read full description
                    </summary>
                    <p className="mt-2 text-[#1E3A5F]/70 text-sm leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {product.fullDescription}
                    </p>
                  </details>
                </div>

                {productId === 1 && (
                  <div className="bg-[#D4A017]/10 rounded-lg p-3 mt-3 border border-[#D4A017]/20">
                    <p className="text-[#1E3A5F]/70 text-xs text-center italic" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      Books 3 and 4 are coming soon and will be included at no extra cost.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'perks' && (
              <motion.div
                key="perks"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-3 space-y-2"
              >
                {product.perks.map((perk, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setExpandedPerk(expandedPerk === index ? null : index)}
                      className="w-full p-3 flex items-center gap-3 text-left"
                    >
                      <span className="text-2xl flex-shrink-0">{perk.icon}</span>
                      <span className="flex-1 text-[#1E3A5F] font-medium text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {perk.title}
                      </span>
                      {expandedPerk === index ? (
                        <ChevronUp className="text-[#D4A017] flex-shrink-0" size={18} />
                      ) : (
                        <ChevronDown className="text-[#D4A017] flex-shrink-0" size={18} />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedPerk === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-3 pb-3 text-[#1E3A5F]/70 text-sm pl-11" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                            {perk.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'rating' && (
              <motion.div
                key="rating"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="p-4"
              >
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h2 className="text-[#1E3A5F] font-semibold mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                    How Would You Rate This Offer?
                  </h2>
                  <p className="text-[#1E3A5F]/60 text-xs text-center mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Lower your rating = bigger discount
                  </p>

                  <div className="space-y-2">
                    {product.ratings.map((rating, index) => (
                      <label
                        key={index}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedRating === index
                            ? 'bg-[#8B0000]/10 border-2 border-[#8B0000]'
                            : 'bg-[#FAF0E6] hover:bg-[#F5F5DC] border-2 border-transparent'
                        }`}
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={selectedRating === index}
                          onChange={() => setSelectedRating(index)}
                          className="w-4 h-4 text-[#8B0000] focus:ring-[#8B0000] flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[#D4A017] text-sm">
                              {'★'.repeat(rating.stars)}{'☆'.repeat(5 - rating.stars)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[#1E3A5F] text-xs font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                              {rating.label}
                            </span>
                            {rating.discount > 0 && (
                              <span className="text-[#8B0000] text-xs font-bold" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                                Save Rs.{(product.basePrice * rating.discount / 100).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {selectedRating > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-[#D4A017]/10 rounded-lg border border-[#D4A017]/20 text-center"
                    >
                      <p className="text-[#1E3A5F] font-semibold" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        Your Price: Rs.{finalPrice.toLocaleString()}
                      </p>
                      <p className="text-[#8B0000] text-xs" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        You save Rs.{(product.basePrice - finalPrice).toLocaleString()}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
