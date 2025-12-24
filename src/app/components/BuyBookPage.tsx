import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface BuyBookPageProps {
  onBack: () => void;
  navigateToHome: () => void;
}

interface RatingOption {
  stars: number;
  label: string;
  price: string;
}

const ratingOptions: RatingOption[] = [
  { stars: 5, label: '5 Star Rating (Permanent)', price: 'Rs.12,795.53' },
  { stars: 4, label: '4 Star Rating (Permanent)', price: 'Rs.11,373.81' },
  { stars: 3, label: '3 Star Rating (Permanent)', price: 'Rs.9,952.08' },
  { stars: 2, label: '2 Star Rating (Permanent)', price: 'Rs.8,530.35' },
  { stars: 1, label: '1 Star Rating (Permanent)', price: 'Rs.7,108.63' },
];

export function BuyBookPage({ onBack, navigateToHome }: BuyBookPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const selectRating = (index: number) => {
    setSelectedRating(index);
  };

  const renderStars = (count: number) => {
    return '★ '.repeat(count) + '☆ '.repeat(5 - count);
  };

  return (
    <>
      <style>{`
        .buy-page-container {
          min-height: 100vh;
          background: #F5E6D3;
          font-family: 'Georgia', serif;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #8B0000 0%, #DC143C 100%);
          padding: 10px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          flex-shrink: 0;
        }

        .back-btn {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 5px;
        }

        .logo {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          font-weight: bold;
          color: #8B0000;
          text-align: center;
          line-height: 1.1;
        }

        .stock-badge {
          background: #FFA500;
          color: white;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 11px;
          font-weight: bold;
        }

        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 12px;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .book-section {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          flex-shrink: 0;
        }

        .book-image {
          width: 70px;
          height: 90px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 35px;
          flex-shrink: 0;
        }

        .book-info {
          flex: 1;
        }

        .book-title {
          font-size: 18px;
          color: #1E90FF;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .book-subtitle {
          font-size: 10px;
          color: #666;
          margin-bottom: 8px;
        }

        .price-display {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .tax-note {
          font-size: 9px;
          color: #666;
        }

        .payment-notice {
          background: white;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 12px;
          font-size: 10px;
          line-height: 1.5;
          color: #666;
          flex-shrink: 0;
        }

        .payment-notice strong {
          color: #333;
          font-size: 14px;
          display: block;
          text-align: center;
          margin-bottom: 8px;
        }

        .expandable {
          background: white;
          border-radius: 8px;
          margin-bottom: 10px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          flex-shrink: 0;
        }

        .expand-header {
          padding: 10px 12px;
          background: linear-gradient(135deg, #1E90FF 0%, #4169E1 100%);
          color: white;
          font-size: 13px;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .expand-icon {
          transition: transform 0.3s;
        }

        .expand-icon.open {
          transform: rotate(180deg);
        }

        .expand-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .expand-content.open {
          max-height: 600px;
          overflow-y: auto;
        }

        .expand-body {
          padding: 10px 12px;
          font-size: 11px;
          line-height: 1.6;
          color: #333;
        }

        .expand-body ul {
          margin: 8px 0;
          padding-left: 18px;
        }

        .expand-body li {
          margin-bottom: 6px;
        }

        .highlight {
          color: #DAA520;
          font-weight: bold;
        }

        .highlight-red {
          color: #8B0000;
          font-weight: bold;
        }

        .membership-section {
          background: white;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          flex-shrink: 0;
        }

        .membership-section h3 {
          font-size: 14px;
          color: #333;
          margin-bottom: 4px;
        }

        .membership-section h4 {
          font-size: 12px;
          color: #333;
          margin: 12px 0 10px 0;
        }

        .rating-option {
          background: #f9f9f9;
          border: 2px solid #ddd;
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .rating-option.selected {
          border-color: #1E90FF;
          background: #E6F3FF;
        }

        .rating-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .rating-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .radio-circle {
          width: 16px;
          height: 16px;
          border: 2px solid #1E90FF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .radio-circle.selected::after {
          content: '';
          width: 8px;
          height: 8px;
          background: #1E90FF;
          border-radius: 50%;
        }

        .stars {
          color: #FFD700;
          font-size: 13px;
        }

        .rating-label {
          font-size: 12px;
          color: #333;
          font-weight: 600;
        }

        .rating-price {
          font-weight: bold;
          color: #333;
          font-size: 14px;
        }

        .rating-note {
          font-size: 10px;
          color: #666;
          font-style: italic;
          margin-left: 24px;
        }

        .cta-section {
          margin-top: auto;
          flex-shrink: 0;
          padding-top: 10px;
        }

        .quantity-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 10px;
        }

        .qty-btn {
          background: white;
          border: 2px solid #8B0000;
          color: #8B0000;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          font-weight: bold;
        }

        .qty-display {
          font-size: 22px;
          font-weight: bold;
          color: #333;
          min-width: 30px;
          text-align: center;
        }

        .buy-button {
          width: 100%;
          background: linear-gradient(135deg, #0000FF 0%, #4169E1 100%);
          color: white;
          border: none;
          padding: 14px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 10px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 12px rgba(0,0,255,0.3);
          margin-bottom: 8px;
        }

        .shop-pay-btn {
          width: 100%;
          background: #7B3FF2;
          color: white;
          border: none;
          padding: 12px;
          font-size: 13px;
          border-radius: 8px;
          cursor: pointer;
        }

        .trust-badge {
          text-align: center;
          font-size: 9px;
          color: #666;
          margin-top: 6px;
        }
      `}</style>

      <div className="buy-page-container">
        <div className="header">
          <button className="back-btn" onClick={onBack}>
            <ChevronLeft size={24} color="white" />
          </button>
          <div className="logo">Wishful<br />Tinkering</div>
          <div className="stock-badge">⚡ 12 LEFT</div>
        </div>

        <div className="main-content">
          <div className="book-section">
            <div className="book-image">📚</div>
            <div className="book-info">
              <div className="book-title">— Books For Brains —</div>
              <div className="price-display">Rs.12,800.00</div>
              <div className="tax-note">Tax included.</div>
            </div>
          </div>

          <div className="payment-notice">
            <strong>This Is A One Time Payment</strong>
            This item is a recurring or deferred purchase. By continuing, I agree to the cancellation policy and authorize you to charge my payment method at the prices, frequency and dates listed on this page until my order is fulfilled or I cancel, if permitted.
          </div>

          <div className="expandable">
            <div className="expand-header" onClick={() => toggleSection(0)}>
              <span>📖 The Offer</span>
              <span className={`expand-icon ${expandedSections[0] ? 'open' : ''}`}>▼</span>
            </div>
            <div className={`expand-content ${expandedSections[0] ? 'open' : ''}`}>
              <div className="expand-body">
                <p><strong>This Membership Will Allow You To View All Of The Pages On This Site.</strong></p>
                <p style={{ marginTop: '8px' }}>This Includes Both The Already Published And The Yet To Be Released (Even Before They're Fully Written). You'll Also Gain Access To The <span className="highlight">Libraries Of Books</span> Available At The Bottom Of Each Membership Chapter.</p>
              </div>
            </div>
          </div>

          <div className="expandable">
            <div className="expand-header" onClick={() => toggleSection(1)}>
              <span>📕 Book 2 Topics</span>
              <span className={`expand-icon ${expandedSections[1] ? 'open' : ''}`}>▼</span>
            </div>
            <div className={`expand-content ${expandedSections[1] ? 'open' : ''}`}>
              <div className="expand-body">
                <p><span className="highlight">Book 2</span> will soon cover topics on:</p>
                <ul>
                  <li>How To Avoid Deception While Chasing After YOUR Perfect Life</li>
                  <li>How To <span className="highlight-red">USE</span> Your Own Deception To <span className="highlight-red">BETTER</span> Your Life (Be Careful With This One)</li>
                  <li>The Secret To Avoiding Large Setbacks From Saboteurs (Even In Multi-year Long Plans)</li>
                  <li>A System For Finding Out What Your <span className="highlight-red">REAL</span> "Life's Dream" Is (Despite What Others Suggest)</li>
                  <li>How To Chase After Many Dreams At Once, Without Losing Time Or Potential On Any Of Them</li>
                  <li><strong>AND So Much More!</strong></li>
                </ul>
                <p style={{ marginTop: '8px' }}><span className="highlight">Books 3</span> and <span className="highlight">4</span> will come out soon after, and all of the information from <strong>ALL 4 BOOKS</strong> will be available during our coaching sessions, whether written on the site yet or not. In the meantime, we will be providing you with several different resources from trusted professionals in our field. Since we don't want to waste your money on benefits that don't exist yet.</p>
              </div>
            </div>
          </div>

          <div className="expandable">
            <div className="expand-header" onClick={() => toggleSection(2)}>
              <span>🤖 A.I. Magic Mentor</span>
              <span className={`expand-icon ${expandedSections[2] ? 'open' : ''}`}>▼</span>
            </div>
            <div className={`expand-content ${expandedSections[2] ? 'open' : ''}`}>
              <div className="expand-body">
                <p><strong>Plus, you obtain <span className="highlight">FULL</span> access to our <span className="highlight">A.I.</span> Magic Mentor</strong></p>
                <p style={{ marginTop: '8px' }}>This purchase allows the A.I. to:</p>
                <ul>
                  <li>Use ALL of our resources and information.</li>
                  <li>Use similar questions from others to help better analyze your needs (Though we cannot tell you who they are.)</li>
                  <li>And benefit you in a more productive, fully enabled way.</li>
                  <li>Plus, it's always available, unlike us.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="expandable">
            <div className="expand-header" onClick={() => toggleSection(3)}>
              <span>🎧 NEW AUDIOBOOK Versions</span>
              <span className={`expand-icon ${expandedSections[3] ? 'open' : ''}`}>▼</span>
            </div>
            <div className={`expand-content ${expandedSections[3] ? 'open' : ''}`}>
              <div className="expand-body">
                <p><strong>AND on <span className="highlight">December 9th</span>, You'll gain access to <span className="highlight-red">NEW AUDIOBOOK</span> versions for every chapter</strong> (YES, even the Early Access ones) for you to listen to solo, or read along with on the site.</p>
              </div>
            </div>
          </div>

          <div className="membership-section">
            <h3>Membership Length</h3>
            <h4>What Would You Rate This Offer:</h4>

            {ratingOptions.map((option, index) => (
              <div
                key={index}
                className={`rating-option ${selectedRating === index ? 'selected' : ''}`}
                onClick={() => selectRating(index)}
              >
                <div className="rating-header">
                  <div className="rating-left">
                    <div className={`radio-circle ${selectedRating === index ? 'selected' : ''}`}></div>
                    <span className="stars">{renderStars(option.stars)}</span>
                    <span className="rating-label">- {option.label}</span>
                  </div>
                  <span className="rating-price">{option.price}</span>
                </div>
                <div className="rating-note">Is this what you'd rate the offer?</div>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <div className="quantity-row">
              <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span className="qty-display">{quantity}</span>
              <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button
              className="buy-button"
              onClick={() => alert(`🎉 Adding ${quantity} item(s) to cart!\nPrice: ${ratingOptions[selectedRating].price}\n\nThank you!`)}
            >
              Add to Cart
            </button>

            <button className="shop-pay-btn">
              Buy with ShopPay
            </button>

            <div className="trust-badge">
              🔒 Secure Payment • Money-Back Guarantee
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
