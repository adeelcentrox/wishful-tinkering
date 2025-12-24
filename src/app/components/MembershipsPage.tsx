import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface MembershipsPageProps {
  onBack: () => void;
  onProductSelect: (productId: number) => void;
  navigateToHome?: () => void;
}

interface Membership {
  id: number;
  name: string;
  description: string;
  icon: string;
  price: string;
  priceNote: string;
  features: string[];
  isFeatured: boolean;
}

const memberships: Membership[] = [
  {
    id: 1,
    name: 'Books For Brains',
    description: 'Perfect starter package',
    icon: '📚',
    price: 'Rs.12,800',
    priceNote: 'One-time payment',
    features: [
      'All pages + unreleased',
      'Libraries access',
      'Audiobooks + AI Mentor'
    ],
    isFeatured: false
  },
  {
    id: 2,
    name: 'Unlimited Coaching',
    description: 'Personal guidance unlimited',
    icon: '❓',
    price: 'Rs.56,900',
    priceNote: 'One-time payment',
    features: [
      'Everything in Books package',
      'Unlimited 1-on-1 coaching',
      'Priority support access'
    ],
    isFeatured: true
  },
  {
    id: 3,
    name: 'The Live Laughing Package',
    description: 'Ultimate VIP experience',
    icon: '🎩',
    price: 'Rs.199,100',
    priceNote: 'One-time payment',
    features: [
      'Everything in Coaching',
      'Live interactive sessions',
      'VIP community + exclusive tools'
    ],
    isFeatured: false
  }
];

export function MembershipsPage({ onBack, onProductSelect, navigateToHome }: MembershipsPageProps) {
  const handleSelect = (membership: Membership) => {
    onProductSelect(membership.id);
  };

  const handleBuyNow = (membership: Membership, e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`✨ Proceeding to checkout\n\n${membership.name}\nPrice: ${membership.price}\n\n🎉 Great choice!`);
  };

  const handleCompare = () => {
    alert('📊 Quick Comparison:\n\n' +
          '📚 Books For Brains - Rs.12,800\n' +
          '   → Best for self-learners\n\n' +
          '❓ Unlimited Coaching - Rs.56,900 ⭐\n' +
          '   → Best value with personal guidance\n\n' +
          '🎩 Live Laughing Package - Rs.199,100\n' +
          '   → Ultimate VIP experience');
  };

  const handleContact = () => {
    alert('💬 Have questions?\n\nContact us:\n📧 Email: support@wishful-tinkering.com\n📱 We\'re here to help!');
  };

  return (
    <>
      <style>{`
        .memberships-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #F5E6D3 0%, #E8D5B7 100%);
          display: flex;
          flex-direction: column;
          font-family: 'Georgia', serif;
          overflow: hidden;
        }

        .header {
          background: linear-gradient(135deg, #8B0000 0%, #DC143C 100%);
          padding: 12px 15px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          flex-shrink: 0;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          max-width: 400px;
          margin: 0 auto;
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
          line-height: 1.1;
          margin: 0 auto 6px;
        }

        .header-title {
          color: white;
          font-size: 20px;
          margin-bottom: 3px;
          font-weight: bold;
        }

        .header-subtitle {
          color: rgba(255,255,255,0.9);
          font-size: 11px;
          font-style: italic;
        }

        .main-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 15px 10px 10px;
          overflow: hidden;
        }

        .cards-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          padding: 0 5px;
        }

        .membership-card {
          background: white;
          border-radius: 15px;
          padding: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          display: flex;
          gap: 12px;
          align-items: stretch;
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .membership-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(180deg, #1E90FF 0%, #4169E1 100%);
        }

        .membership-card:active {
          transform: scale(0.98);
        }

        .membership-card.featured {
          border: 3px solid #DAA520;
          background: linear-gradient(135deg, #FFFEF0 0%, #FFF9E6 100%);
        }

        .membership-card.featured::before {
          background: linear-gradient(180deg, #DAA520 0%, #B8860B 100%);
          width: 6px;
        }

        .best-value-badge {
          position: absolute;
          top: -8px;
          right: 10px;
          background: linear-gradient(135deg, #DAA520 0%, #FFD700 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 9px;
          font-weight: bold;
          text-transform: uppercase;
          box-shadow: 0 2px 8px rgba(218,165,32,0.4);
          z-index: 1;
        }

        .card-icon-section {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 70px;
        }

        .card-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #1E90FF 0%, #4169E1 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          box-shadow: 0 4px 12px rgba(30,144,255,0.3);
          margin-bottom: 6px;
        }

        .card-rank {
          background: #333;
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: bold;
        }

        .card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-header {
          margin-bottom: 8px;
        }

        .card-title {
          font-size: 15px;
          color: #333;
          font-weight: bold;
          margin-bottom: 3px;
          line-height: 1.2;
        }

        .card-description {
          font-size: 10px;
          color: #666;
          font-style: italic;
        }

        .card-features {
          margin-bottom: 10px;
          flex: 1;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 5px;
          font-size: 10px;
          line-height: 1.4;
          color: #555;
        }

        .feature-icon {
          color: #1E90FF;
          margin-right: 5px;
          font-size: 11px;
          flex-shrink: 0;
        }

        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }

        .card-price {
          display: flex;
          flex-direction: column;
        }

        .price-amount {
          font-size: 18px;
          font-weight: bold;
          color: #8B0000;
          line-height: 1;
        }

        .price-note {
          font-size: 8px;
          color: #999;
          margin-top: 2px;
        }

        .card-cta {
          background: linear-gradient(135deg, #0000FF 0%, #4169E1 100%);
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 3px 10px rgba(0,0,255,0.3);
          transition: all 0.3s;
        }

        .card-cta:active {
          transform: scale(0.95);
        }

        .footer-actions {
          flex-shrink: 0;
          display: flex;
          gap: 8px;
          padding-top: 10px;
        }

        .footer-btn {
          flex: 1;
          background: white;
          border: 2px solid #8B0000;
          color: #8B0000;
          padding: 12px 10px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .footer-btn:active {
          background: #8B0000;
          color: white;
        }

        .footer-btn.primary {
          background: #DAA520;
          border-color: #DAA520;
          color: white;
        }

        .footer-btn.primary:active {
          background: #B8860B;
          border-color: #B8860B;
        }

        .trust-bar {
          display: flex;
          justify-content: space-around;
          padding: 8px 0;
          font-size: 9px;
          color: #666;
          text-align: center;
          flex-shrink: 0;
        }

        .trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }

        .trust-icon {
          font-size: 14px;
        }
      `}</style>

      <div className="memberships-page">
        <div className="header">
          <div className="logo">Wishful<br />Tinkering</div>
          <div className="header-title">Memberships</div>
          <div className="header-subtitle">Choose your perfect plan</div>
        </div>

        <div className="main-container">
          <div className="cards-container">
            {memberships.map((membership, index) => (
              <div
                key={membership.id}
                className={`membership-card ${membership.isFeatured ? 'featured' : ''}`}
                onClick={() => handleSelect(membership)}
              >
                {membership.isFeatured && (
                  <div className="best-value-badge">⭐ BEST VALUE</div>
                )}
                <div className="card-icon-section">
                  <div className="card-icon">{membership.icon}</div>
                  <div className="card-rank">{index + 1}</div>
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{membership.name}</h3>
                    <p className="card-description">{membership.description}</p>
                  </div>
                  <div className="card-features">
                    {membership.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="card-bottom">
                    <div className="card-price">
                      <span className="price-amount">{membership.price}</span>
                      <span className="price-note">{membership.priceNote}</span>
                    </div>
                    <button
                      className="card-cta"
                      onClick={(e) => handleBuyNow(membership, e)}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="trust-bar">
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span>Secure</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💯</span>
              <span>Guaranteed</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span>Instant Access</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🎯</span>
              <span>12 Left</span>
            </div>
          </div>

          <div className="footer-actions">
            <button className="footer-btn" onClick={handleCompare}>
              📊 Compare
            </button>
            <button className="footer-btn primary" onClick={handleContact}>
              💬 Questions?
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
