
import React, { useState, useEffect } from 'react';

const RM_LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png";

export const InitialLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Get connection speed (in Mbps) or default to 5
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const speed = connection?.downlink || 5; 
    
    // Calculate interval based on speed: higher speed = shorter interval
    // Range: 20ms (fast) to 200ms (slow)
    const baseInterval = Math.max(20, Math.min(200, 1000 / speed));

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for fade out
          }, 500);
          return 100;
        }
        
        // Random increment to look "natural"
        const increment = Math.random() * (speed > 5 ? 5 : 2) + 1;
        return Math.min(100, prev + increment);
      });
    }, baseInterval);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible && progress === 100) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-[#bf953f]/20 blur-[60px] rounded-full scale-150 animate-pulse"></div>
        <img 
          src={RM_LOGO} 
          alt="Loading..." 
          className="w-32 h-32 md:w-48 md:h-48 object-contain relative z-10 animate-pulse"
        />
      </div>

      <div className="w-64 md:w-96 flex flex-col items-center space-y-6">
        <div className="flex justify-between w-full mb-1">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] gold-text-gradient">Initializing</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bf953f]">{Math.floor(progress)}%</span>
        </div>
        
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative">
          <div 
            className="h-full gold-gradient shadow-[0_0_15px_rgba(191,149,63,0.5)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-[8px] font-black uppercase tracking-[0.6em] text-gray-500 animate-pulse">
          Walkers Madrid sanctuary
        </p>
      </div>
      
      {/* Network Speed Indicator */}
      <div className="absolute bottom-10 flex items-center gap-3 opacity-30">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        <span className="text-[7px] font-bold uppercase tracking-widest text-gray-400">Stream optimization active</span>
      </div>
    </div>
  );
};
