import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const books = [
  { id: 1, num: 1, sub: "Their Least Favorite", title: "VICTIM", icon: "♣", free: true },
  { id: 2, num: 2, sub: "The Silent", title: "WITNESS", icon: "♠", free: false },
  { id: 3, num: 3, sub: "The Hidden", title: "TRUTH", icon: "♥", free: false },
  { id: 4, num: 4, sub: "The Final", title: "VERDICT", icon: "♦", free: false },
];

interface BookCarouselProps {
  onBookClick?: (bookId: number) => void;
  onBuyClick?: () => void;
}

export function BookCarousel({ onBookClick, onBuyClick }: BookCarouselProps) {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [anim, setAnim] = useState(false);
  const [dir, setDir] = useState<'next' | 'prev' | null>(null);
  const [firstReveal, setFirstReveal] = useState(true);
  const [coverGone, setCoverGone] = useState(false);

  const go = (d: 'next' | 'prev') => {
    if (anim) return;
    setDir(d);
    setAnim(true);

    if (firstReveal) {
      setCoverGone(true);
      setTimeout(() => {
        setFirstReveal(false);
        setAnim(false);
        setDir(null);
      }, 600);
    } else {
      setPrevIdx(idx);
      setTimeout(() => {
        setIdx(i => d === 'next' ? (i + 1) % books.length : (i - 1 + books.length) % books.length);
        setTimeout(() => {
          setAnim(false);
          setDir(null);
        }, 500);
      }, 50);
    }
  };

  const b = books[idx];
  const prevB = books[prevIdx];

  const handleReadNow = () => {
    if (onBookClick) {
      onBookClick(b.id);
    }
  };

  return (
    <div className="wrap">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@400;600&display=swap');
        .wrap{min-height:100vh;background:#F5E6D3;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;font-family:'Playfair Display',serif}
        .title{font-size:26px;color:#8B4513;margin-bottom:6px;text-align:center}
        .subtitle{font-family:'Cormorant Garamond',serif;font-size:16px;color:#6B5B4F;margin-bottom:36px;text-align:center}
        .carousel{display:flex;align-items:center;gap:12px}
        .nav{width:36px;height:36px;border-radius:50%;background:transparent;border:2px solid #8B4513;color:#8B4513;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s;z-index:10}
        .nav:hover{background:#8B4513;color:#F5E6D3}

        .cards-wrapper{display:flex;align-items:center;position:relative}

        .side-card{
          width:50px;height:160px;
          background:#1B3A4B;
          border-radius:10px;
          border:3px solid #C9A227;
          box-shadow:0 4px 15px rgba(0,0,0,0.2);
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;
          position:relative;
          overflow:hidden;
        }
        .side-card::before{
          content:'';position:absolute;inset:4px;
          border:1px solid rgba(201,162,39,0.4);
          border-radius:6px;
          background:linear-gradient(180deg,#234E5C 0%,#1B3A4B 100%);
        }
        .side-card .mini-tent{font-size:18px;position:relative;z-index:1}
        .side-left{transform:rotate(-5deg);margin-right:-10px;z-index:1}
        .side-right{transform:rotate(5deg);margin-left:-10px;z-index:1}

        .stage{width:240px;height:360px;position:relative;z-index:5;flex-shrink:0;overflow:hidden;border-radius:14px}

        .book-card{
          position:absolute;
          left:0;top:0;
          width:240px;height:360px;
          background:linear-gradient(145deg,#FFFEF9,#F8F4EC);
          border-radius:14px;
          border:3px solid #C9A227;
          box-shadow:0 10px 40px rgba(139,69,19,0.15);
          display:flex;flex-direction:column;align-items:center;
          padding:24px 20px;
          box-sizing:border-box;
        }

        .book-card.current{z-index:2}
        .book-card.current.from-right{animation:slideInRight .5s ease-out forwards}
        .book-card.current.from-left{animation:slideInLeft .5s ease-out forwards}

        .book-card.prev{z-index:1}
        .book-card.prev.to-left{animation:slideOutLeft .5s ease-in forwards}
        .book-card.prev.to-right{animation:slideOutRight .5s ease-in forwards}

        @keyframes slideInRight{
          0%{transform:translateX(100%)}
          100%{transform:translateX(0)}
        }
        @keyframes slideInLeft{
          0%{transform:translateX(-100%)}
          100%{transform:translateX(0)}
        }
        @keyframes slideOutLeft{
          0%{transform:translateX(0)}
          100%{transform:translateX(-100%)}
        }
        @keyframes slideOutRight{
          0%{transform:translateX(0)}
          100%{transform:translateX(100%)}
        }

        .cover-card{
          position:absolute;
          width:240px;height:360px;
          left:0;top:0;
          background:#1B3A4B;
          border-radius:14px;
          border:4px solid #C9A227;
          box-shadow:0 8px 30px rgba(0,0,0,0.3);
          overflow:hidden;
          z-index:10;
        }
        .cover-inner{
          position:absolute;inset:8px;
          border:2px solid rgba(201,162,39,0.5);
          border-radius:8px;
          background:linear-gradient(180deg,#234E5C 0%,#1B3A4B 50%,#234E5C 100%);
          display:flex;align-items:center;justify-content:center;
        }
        .tent{font-size:50px;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3))}
        .corner{position:absolute;width:10px;height:10px;border:2px solid #A52A2A;border-radius:50%;background:#1B3A4B}
        .corner.tl{top:12px;left:12px}.corner.tr{top:12px;right:12px}.corner.bl{bottom:12px;left:12px}.corner.br{bottom:12px;right:12px}
        .star{position:absolute;color:rgba(201,162,39,0.6);font-size:12px}
        .star1{top:18%;left:18%}.star2{top:15%;right:22%}.star3{bottom:22%;left:15%}.star4{bottom:18%;right:18%}
        .decor{position:absolute;width:35px;height:2px;background:#A52A2A}
        .decor.top{top:18px;left:50%;transform:translateX(-50%)}.decor.bot{bottom:18px;left:50%;transform:translateX(-50%)}

        .cover-card.slide-away{animation:coverSlide .6s ease-out forwards}
        @keyframes coverSlide{
          0%{transform:translateX(0)}
          100%{transform:translateX(110%)}
        }

        .badge{position:absolute;top:14px;right:14px;background:linear-gradient(135deg,#2D5A3D,#1E3D29);color:#fff;padding:5px 12px;border-radius:16px;font-size:10px;font-weight:700;letter-spacing:1.5px;font-family:'Cormorant Garamond',serif}
        .icon{font-size:56px;color:#1B3A4B;margin:16px 0 20px}
        .num{font-family:'Cormorant Garamond',serif;font-size:11px;color:#8B7355;letter-spacing:3px;margin-bottom:6px}
        .num::before,.num::after{content:'◆';font-size:6px;margin:0 6px;vertical-align:middle;color:#C9A227}
        .sub{font-family:'Cormorant Garamond',serif;font-size:14px;color:#6B5B4F;font-style:italic;margin-bottom:2px}
        .ttl{font-size:26px;font-weight:700;color:#1B3A4B;letter-spacing:3px;margin-bottom:20px}
        .btn{width:100%;padding:14px;background:linear-gradient(135deg,#C9A227,#A68B1B);border:none;border-radius:8px;color:#fff;font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:600;cursor:pointer;margin-top:auto;transition:all .3s;box-shadow:0 4px 15px rgba(201,162,39,0.3)}
        .btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(201,162,39,0.5)}
        .dots{display:flex;gap:10px;margin-top:30px}
        .dot{width:8px;height:8px;border-radius:50%;background:#D4C4B0;border:none;cursor:pointer;transition:all .3s}
        .dot:hover{background:#C9A227}
        .dot.on{background:#8B4513;transform:scale(1.2)}
        .buy-section{margin-top:30px;text-align:center}
        .buy-btn{padding:12px 30px;background:linear-gradient(135deg,#1E90FF,#4169E1);color:#fff;border:none;border-radius:25px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 15px rgba(30,144,255,0.3);transition:all .3s;font-family:'Cormorant Garamond',serif}
        .buy-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(30,144,255,0.5)}
        .buy-text{font-size:12px;color:#666;margin-top:12px;font-style:italic}
      `}</style>

      <h2 className="title">Wanna learn how?</h2>
      <p className="subtitle">Explore our collection</p>

      <div className="carousel">
        <button className="nav" onClick={() => go('prev')}><ChevronLeft size={18}/></button>

        <div className="cards-wrapper">
          <div className="side-card side-left">
            <span className="mini-tent">🎪</span>
          </div>

          <div className="stage">
            {anim && !firstReveal && (
              <div className={`book-card prev ${dir === 'next' ? 'to-left' : 'to-right'}`}>
                {prevB.free && <span className="badge">FREE</span>}
                <div className="icon">{prevB.icon}</div>
                <div className="num">BOOK {prevB.num}</div>
                <div className="sub">{prevB.sub}</div>
                <div className="ttl">{prevB.title}</div>
                <button className="btn">Read Now →</button>
              </div>
            )}

            <div className={`book-card current ${anim && !firstReveal ? (dir === 'next' ? 'from-right' : 'from-left') : ''}`}>
              {b.free && <span className="badge">FREE</span>}
              <div className="icon">{b.icon}</div>
              <div className="num">BOOK {b.num}</div>
              <div className="sub">{b.sub}</div>
              <div className="ttl">{b.title}</div>
              <button className="btn" onClick={handleReadNow}>Read Now →</button>
            </div>

            {firstReveal && (
              <div className={`cover-card ${coverGone ? 'slide-away' : ''}`}>
                <div className="cover-inner">
                  <span className="star star1">✦</span>
                  <span className="star star2">✦</span>
                  <span className="star star3">✦</span>
                  <span className="star star4">✦</span>
                  <span className="tent">🎪</span>
                </div>
                <div className="corner tl"></div>
                <div className="corner tr"></div>
                <div className="corner bl"></div>
                <div className="corner br"></div>
                <div className="decor top"></div>
                <div className="decor bot"></div>
              </div>
            )}
          </div>

          <div className="side-card side-right">
            <span className="mini-tent">🎪</span>
          </div>
        </div>

        <button className="nav" onClick={() => go('next')}><ChevronRight size={18}/></button>
      </div>

      <div className="dots">
        {books.map((_, i) => (
          <button key={i} className={`dot ${i === idx ? 'on' : ''}`} onClick={() => !anim && i !== idx && go(i > idx ? 'next' : 'prev')}/>
        ))}
      </div>

      {onBuyClick && (
        <div className="buy-section">
          <button className="buy-btn" onClick={onBuyClick}>Get Full Membership →</button>
          <p className="buy-text">Unlock all 4 books + AI mentor + audiobooks</p>
        </div>
      )}
    </div>
  );
}
