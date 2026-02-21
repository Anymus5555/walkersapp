
import React, { useEffect, useState } from 'react';

export interface ToastProps {
  id: string;
  title: string;
  message: string;
  icon?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, title, message, icon, duration = 6000, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(id), 500); // Wait for exit animation
  };

  return (
    <div 
      className={`
        group relative flex items-center gap-5 p-5 rounded-[2rem] 
        backdrop-blur-3xl border border-[#bf953f]/30 
        shadow-[0_25px_60px_rgba(0,0,0,0.6)] min-w-[320px] max-w-[420px]
        transition-all duration-500 hover:scale-[1.02] hover:border-[#bf953f]
        ${isClosing ? 'animate-slideOutLeft opacity-0' : 'animate-slideInSpring'}
      `}
      style={{ backgroundColor: 'rgba(0, 0, 0, var(--ui-opacity, 0.6))' }}
    >
      {/* Icon Section */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-[#bf953f]/20 blur-xl rounded-full group-hover:bg-[#bf953f]/40 transition-colors"></div>
        {icon ? (
          <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <img src={icon} alt="Icon" className="w-12 h-12 object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#bf953f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ) : (
          <div className="relative w-16 h-16 rounded-2xl bg-[#bf953f]/10 border border-[#bf953f]/30 flex items-center justify-center">
            <span className="text-2xl">🏆</span>
          </div>
        )}
      </div>

      {/* Text Section */}
      <div className="flex-1 pr-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] gold-text-gradient mb-1.5 drop-shadow-sm">
          {title}
        </h4>
        <p className="text-gray-200 text-sm font-bold leading-snug tracking-tight">
          {message}
        </p>
      </div>

      {/* Close Button */}
      <button 
        onClick={handleClose}
        className="absolute top-4 right-5 text-gray-500 hover:text-white transition-colors p-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Progress Bar Animation */}
      <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-[#bf953f] to-transparent w-full">
        <div 
          className="h-full bg-white/40 animate-toastProgress"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};
