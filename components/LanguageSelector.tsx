
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LANGUAGES } from '../types';

const RM_LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png";

const LanguageSelector: React.FC = () => {
  const navigate = useNavigate();

  // Filter out English from the main selector (remains in Settings)
  const standardLangs = LANGUAGES.filter(l => !l.isSpecial && l.code !== 'en');
  const specialLangs = LANGUAGES.filter(l => l.isSpecial);

  return (
    <div 
      className="w-full max-w-lg text-center backdrop-blur-3xl p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-[#bf953f]/30 shadow-[0_40px_120px_rgba(0,0,0,0.8)] relative overflow-hidden animate-fadeIn"
      style={{ backgroundColor: 'rgba(0, 0, 0, var(--ui-opacity, 0.6))' }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#bf953f] to-transparent"></div>
      
      <div className="mb-6 md:mb-10 flex flex-col items-center">
          <div className="flex items-center justify-center mb-6 md:mb-8 relative">
              <div className="absolute inset-0 bg-[#bf953f]/20 blur-[20px] md:blur-[30px] rounded-full scale-150"></div>
              <img 
                src={RM_LOGO} 
                alt="Real Madrid Official Logo" 
                className="w-24 h-24 md:w-40 md:h-40 object-contain relative z-10 filter drop-shadow-[0_0_15px_rgba(191,149,63,0.5)] transition-all duration-1000 hover:scale-110" 
              />
          </div>
          <div className="px-6 py-2 md:px-8 md:py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
             <p className="text-[10px] md:text-[12px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase gold-text-gradient">Walkers Madrid</p>
          </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        {standardLangs.map((lang) => (
          <button 
            key={lang.code} 
            onClick={() => navigate(`/watch?lang=${lang.code}`)} 
            className="w-full py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl black-gold-gradient border border-[#bf953f]/20 transition-all transform hover:scale-[1.02] hover:border-[#bf953f] flex items-center justify-center group relative overflow-hidden"
          >
            <span className="gold-text-gradient font-black text-lg md:text-xl tracking-[0.3em] md:tracking-[0.4em] z-10 uppercase">{lang.nativeName}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          </button>
        ))}

        {specialLangs.length > 0 && <div className="h-2"></div>}

        {specialLangs.map((lang) => (
          <button 
            key={lang.code} 
            onClick={() => navigate(`/watch?lang=${lang.code}`)} 
            className="w-full py-4 md:py-5 px-6 md:px-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#000000] border border-[#bf953f]/50 transition-all transform hover:scale-[1.05] hover:border-[#fcf6ba] flex items-center justify-center group relative overflow-hidden shadow-[0_0_30px_rgba(191,149,63,0.1)]"
          >
            <span className="gold-text-gradient font-black text-xl md:text-2xl tracking-[0.2em] z-10 uppercase italic">{lang.nativeName}</span>
            <div className="absolute inset-0 bg-[#bf953f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
