import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Play, Pause, RotateCcw, RotateCw } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VinylAudioPlayerProps {
  chapterTitle?: string;
  audioDuration?: string;
}

export function VinylAudioPlayer({ 
  chapterTitle = "Introduction", 
  audioDuration = "16:43" 
}: VinylAudioPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  // Parse duration to seconds
  const durationParts = audioDuration.split(':');
  const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < totalSeconds) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          setProgressPercent((newTime / totalSeconds) * 100);
          return newTime >= totalSeconds ? totalSeconds : newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, totalSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(currentTime + seconds, totalSeconds));
    setCurrentTime(newTime);
    setProgressPercent((newTime / totalSeconds) * 100);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    const newTime = Math.floor((percent / 100) * totalSeconds);
    setCurrentTime(newTime);
    setProgressPercent(percent);
  };

  return (
    <div className="w-full">
      {/* Collapsed State */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-[#8B0000] text-[#D4A017] py-3 px-4 flex items-center justify-between transition-colors hover:bg-[#6D0000]"
        style={{ fontFamily: 'Open Sans, sans-serif' }}
      >
        <span className="text-sm">
          {isExpanded ? 'Tap to Hide Audio Player' : 'Tap for Audio Options'}
        </span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </motion.button>

      {/* Expanded State */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-gradient-to-b from-[#8B0000] to-[#6D0000]"
          >
            <div className="p-6 pb-5">
              {/* Vinyl Record */}
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-48">
                  {/* Vinyl Disc */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{
                      duration: 3,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "linear"
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl"
                    style={{
                      boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.1)'
                    }}
                  >
                    {/* Grooves */}
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 rounded-full border border-gray-800/40"
                        style={{
                          margin: `${8 + i * 6}px`
                        }}
                      />
                    ))}
                    
                    {/* Center Label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A017] to-[#B8860B] flex items-center justify-center shadow-lg"
                        style={{
                          boxShadow: '0 0 20px rgba(212, 160, 23, 0.4)'
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">🎩</div>
                          <div className="text-xs text-[#1E3A5F]" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {chapterTitle.substring(0, 6)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spindle Hole */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black border border-gray-600" />
                  </motion.div>

                  {/* Tonearm Shadow (decorative) */}
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      className="absolute -right-4 top-1/4 w-1 h-24 bg-black/50 blur-sm rotate-45"
                    />
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Play/Pause and Skip Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleSkip(-10)}
                    className="bg-[#1E3A5F] text-[#D4A017] px-4 py-2 rounded-lg hover:bg-[#2C3E50] transition-colors flex items-center gap-2"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    <RotateCcw size={16} />
                    <span className="text-sm">-10s</span>
                  </button>

                  <button
                    onClick={handlePlayPause}
                    className="bg-[#D4A017] text-[#1E3A5F] px-8 py-3 rounded-lg hover:bg-[#C4900F] transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={20} fill="currentColor" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play size={20} fill="currentColor" />
                        <span>Play</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleSkip(10)}
                    className="bg-[#1E3A5F] text-[#D4A017] px-4 py-2 rounded-lg hover:bg-[#2C3E50] transition-colors flex items-center gap-2"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    <span className="text-sm">+10s</span>
                    <RotateCw size={16} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div 
                    onClick={handleProgressClick}
                    className="relative h-2 bg-black/30 rounded-full cursor-pointer overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#D4A017] rounded-full"
                      style={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.1 }}
                    />
                    {/* Scrubber Dot */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
                      style={{ left: `${progressPercent}%`, marginLeft: '-8px' }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>

                  {/* Time Display */}
                  <div className="flex justify-between text-[#D4A017] text-xs" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{audioDuration}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
