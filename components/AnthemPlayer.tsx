
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnthemPlayerProps {
  label: string;
}

const ANTHEM_URL = "https://cdn2.deliciousoranges.com/s3/get/music/20190613/Hala_Madrid_-_y_nada_mas_-_gimn_Reala_64993605.mp3";

export const AnthemPlayer: React.FC<AnthemPlayerProps> = ({ label }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Effect to handle smooth fade out when entering the live broadcast
  useEffect(() => {
    if (location.pathname === '/watch' && isPlaying && audioRef.current) {
      const audio = audioRef.current;
      
      // Clear any existing fade intervals
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          // Finish fade out
          audio.pause();
          setIsPlaying(false);
          audio.volume = 1; // Reset for future manual playback
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
        }
      }, 150); // Total fade duration ~3 seconds (20 steps * 150ms)
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [location.pathname]); // We react to route changes

  const togglePlay = () => {
    if (audioRef.current) {
      // If the user manually interacts while fading out, stop the fade
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        audioRef.current.volume = 1;
      }

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.warn("Playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-8 right-8 z-[4000] hidden md:flex items-center gap-4">
      <div 
        className={`flex items-center gap-4 px-6 py-3.5 rounded-full backdrop-blur-3xl border border-[#bf953f]/30 transition-all duration-500 shadow-2xl ${isPlaying ? 'bg-[#bf953f]/10' : 'bg-black/40 hover:bg-black/60'}`}
        style={{ backgroundColor: `rgba(0, 0, 0, var(--ui-opacity, 0.4))` }}
      >
        <audio ref={audioRef} src={ANTHEM_URL} loop />
        
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] gold-text-gradient mb-0.5">{label}</span>
          <div className="flex gap-0.5 h-3 items-end">
            {[1, 2, 3, 4, 5].map(i => (
              <div 
                key={i} 
                className={`w-0.5 gold-gradient rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1 opacity-20'}`}
                style={{ 
                  height: isPlaying ? `${Math.random() * 100}%` : '4px',
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s'
                }}
              ></div>
            ))}
          </div>
        </div>

        <button 
          onClick={togglePlay}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${isPlaying ? 'bg-white text-black scale-110' : 'bg-[#bf953f] text-black hover:scale-105 active:scale-95'}`}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
