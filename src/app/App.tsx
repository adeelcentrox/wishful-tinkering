import { useState, useEffect } from 'react';
import { MobileHeader } from './components/MobileHeader';
import { TaglineBanner } from './components/TaglineBanner';
import { BookCarousel } from './components/BookCarousel';
import { MobileFooter } from './components/MobileFooter';
import { BookReaderPage } from './components/BookReaderPage';
import { ContactPage } from './components/ContactPage';
import { MembershipsPage } from './components/MembershipsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { MobileMenu } from './components/MobileMenu';
import { LoadingScreen } from './components/LoadingScreen';
import { BookModeSelection } from './components/BookModeSelection';
import { BookReaderReadOnly } from './components/BookReaderReadOnly';
import { BookReaderWithAudio } from './components/BookReaderWithAudio';
import { BookReaderTabs } from './components/BookReaderTabs';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { RefundPolicyPage } from './components/RefundPolicyPage';

type Page = 'home' | 'reader' | 'mode-selection' | 'read-only' | 'read-listen' | 'contact' | 'memberships' | 'product' | 'terms' | 'privacy' | 'refund';

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
      [
        'Your life should be your choice. Let\'s begin the journey of making that a reality.',
        '',
        'The methods of manipulation are often subtle. They operate beneath the surface of conscious awareness, working through suggestion, emotional triggers, and carefully crafted narratives.',
        '',
        'Manipulators know that direct force is clumsy and obvious. Instead, they prefer the art of influence—making you believe that their desires are actually your own.',
        '',
        'This is why awareness is your most powerful tool. Once you can see the mechanisms at work, they lose their power over you.',
      ],
      [
        'Chapter 2: The Anatomy of Control',
        '',
        'Control requires three elements:',
        '• Access to your attention',
        '• Influence over your emotions', 
        '• The ability to shape your narrative',
        '',
        'When someone controls all three, they control your reality. Understanding this structure is the first step to dismantling it.',
      ],
      [
        'Chapter 3: Breaking Free from Emotional Manipulation',
        '',
        'Emotional manipulators exploit your feelings to gain power over you. They may use guilt, fear, or obligation as weapons.',
        '',
        'Common tactics include:',
        '• Love bombing followed by withdrawal',
        '• Creating artificial urgency or crisis',
        '• Playing the victim to avoid accountability',
        '• Using your compassion against you',
        '',
        'Recognition is the first line of defense.',
      ],
      [
        'Chapter 4: Reclaiming Your Decision-Making Power',
        '',
        'True autonomy means making choices based on your values, not someone else\'s agenda.',
        '',
        'Start by asking yourself:',
        '• Does this decision align with my values?',
        '• Am I choosing this freely or under pressure?',
        '• What am I afraid will happen if I say no?',
        '',
        'Your "no" is just as powerful as your "yes." In fact, sometimes it\'s even more important.',
      ],
      [
        'Chapter 5: Building Your Defense System',
        '',
        'Now that you understand the tactics, it\'s time to build your resilience.',
        '',
        'Key strategies:',
        '• Set and maintain clear boundaries',
        '• Trust your instincts and feelings',
        '• Build a support network of trusted people',
        '• Practice self-validation',
        '• Document patterns of behavior',
        '',
        'You are stronger than you know. Your journey to freedom has already begun.',
      ]
    ]
  },
  2: {
    title: 'Their Least Favorite Witness',
    symbol: '♥',
    color: '#C41E3A',
    hasAudio: true,
    pages: [
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
      [
        'The truth may be uncomfortable, but it is always more powerful than lies.',
        '',
        'You are about to become their least favorite witness.',
        '',
        'Throughout history, those who bear witness to injustice have been targeted, discredited, and silenced. Not because they were wrong, but because they were right.',
        '',
        'Your testimony matters. Your observations are valid. Your experience is real.',
      ],
      [
        'Chapter 2: The Gaslighting Playbook',
        '',
        'Gaslighting is the systematic denial of your reality. It makes you question your own memory, perception, and sanity.',
        '',
        'Warning signs:',
        '• They deny things you know happened',
        '• They tell you you\'re "too sensitive"',
        '• They rewrite history to fit their narrative',
        '• They accuse you of doing what they\'re doing',
        '',
        'Trust your observations. Your reality is valid.',
      ],
      [
        'Chapter 3: Documenting Truth',
        '',
        'Evidence is your ally. When someone tries to rewrite history, documentation speaks louder than their denials.',
        '',
        'Document strategically:',
        '• Keep a private journal with dates and details',
        '• Save messages and communications',
        '• Note witnesses who were present',
        '• Record patterns, not just individual incidents',
        '',
        'The truth has a way of revealing itself when properly preserved.',
      ],
      [
        'Chapter 4: Speaking Up Without Fear',
        '',
        'Finding your voice is an act of courage. It doesn\'t mean you won\'t feel afraid—it means you\'ll speak anyway.',
        '',
        'Remember:',
        '• Your story belongs to you',
        '• You don\'t need permission to tell the truth',
        '• Silence protects abusers, not victims',
        '• Your voice can help others who are still silent',
        '',
        'The truth will set you free, even when it\'s difficult to speak.',
      ],
      [
        'Chapter 5: Standing Firm in Your Truth',
        '',
        'Others may try to convince you to stay quiet "for everyone\'s sake." But whose sake, really?',
        '',
        'Stay grounded:',
        '• Connect with others who believe you',
        '• Remember why your testimony matters',
        '• Don\'t let pressure erase your experience',
        '• Your truth is not up for negotiation',
        '',
        'You are their least favorite witness because you refuse to be silenced. And that makes all the difference.',
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedBookId, setSelectedBookId] = useState<number>(1);
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBookClick = (bookId: number) => {
    setSelectedBookId(bookId);
    setCurrentPage('mode-selection');
  };

  const handleModeSelection = (mode: 'read-only' | 'read-listen') => {
    setCurrentPage(mode);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };


  const handleBackToModeSelection = () => {
    setCurrentPage('mode-selection');
  };

  const handleBackToMemberships = () => {
    setCurrentPage('memberships');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuNavigation = (page: 'home' | 'contact' | 'reader' | 'terms' | 'privacy' | 'refund', bookId?: number) => {
    if (page === 'reader' && bookId) {
      setSelectedBookId(bookId);
      setCurrentPage('mode-selection');
    } else if (page === 'contact') {
      setCurrentPage('contact');
    } else if (page === 'terms') {
      setCurrentPage('terms');
    } else if (page === 'privacy') {
      setCurrentPage('privacy');
    } else if (page === 'refund') {
      setCurrentPage('refund');
    } else {
      setCurrentPage('home');
    }
  };

  const handleMembershipsClick = () => {
    setCurrentPage('memberships');
  };

  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
  };

  const handleHeaderNavigation = (page: 'home' | 'contact') => {
    if (page === 'contact') {
      setCurrentPage('contact');
    } else {
      setCurrentPage('home');
    }
  };

  // Get current book data
  const currentBook = bookContent[selectedBookId];

  // Render different pages based on state
  if (currentPage === 'product') {
    return <ProductDetailPage productId={selectedProductId} onBack={handleBackToMemberships} navigateToHome={handleBackToHome} />;
  }

  if (currentPage === 'memberships') {
    return <MembershipsPage onBack={handleBackToHome} onProductSelect={handleProductSelect} navigateToHome={handleBackToHome} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onBack={handleBackToHome} navigateToHome={handleBackToHome} />;
  }

  if (currentPage === 'terms') {
    return <TermsOfServicePage onBack={handleBackToHome} navigateToHome={handleBackToHome} />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicyPage onBack={handleBackToHome} navigateToHome={handleBackToHome} />;
  }

  if (currentPage === 'refund') {
    return <RefundPolicyPage onBack={handleBackToHome} navigateToHome={handleBackToHome} />;
  }


  if (currentPage === 'mode-selection' && currentBook) {
    return (
      <BookModeSelection
        bookTitle={currentBook.title}
        bookSymbol={currentBook.symbol}
        hasAudio={currentBook.hasAudio}
        onSelectMode={(mode) => {
          if (mode === 'read-only') {
            setCurrentPage('read-only');
          } else {
            setCurrentPage('read-listen');
          }
        }}
        onBack={handleBackToHome}
        navigateToHome={handleBackToHome}
      />
    );
  }

  if (currentPage === 'read-only' && currentBook) {
    return (
      <BookReaderTabs
        bookId={selectedBookId}
        bookTitle={currentBook.title}
        bookSymbol={currentBook.symbol}
        pages={currentBook.pages}
        hasAudio={false}
        onBack={handleBackToModeSelection}
      />
    );
  }

  if (currentPage === 'read-listen' && currentBook) {
    return (
      <BookReaderTabs
        bookId={selectedBookId}
        bookTitle={currentBook.title}
        bookSymbol={currentBook.symbol}
        pages={currentBook.pages}
        hasAudio={true}
        onBack={handleBackToModeSelection}
      />
    );
  }

  if (currentPage === 'reader') {
    return <BookReaderPage bookId={selectedBookId} onBack={handleBackToModeSelection} navigateToHome={handleBackToHome} />;
  }

  // Home page - Mobile First (375x812 viewport)
  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div
        className="min-h-screen bg-[#FAF0E6] flex flex-col overflow-hidden"
        style={{
          fontFamily: 'Open Sans, sans-serif',
          maxWidth: '100vw'
        }}
      >
        <div className="h-screen flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
          <MobileHeader onMenuToggle={handleMenuToggle} onNavigate={handleHeaderNavigation} />
          <TaglineBanner />
          <BookCarousel onBookClick={handleBookClick} />
          <MobileFooter onMembershipsClick={handleMembershipsClick} onMenuClick={handleMenuToggle} />
        </div>
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
          onNavigate={handleMenuNavigation}
        />
      </div>
    </>
  );
}