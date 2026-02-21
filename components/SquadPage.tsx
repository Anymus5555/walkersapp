
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LANGUAGES } from '../types';

interface Player {
  name: string;
  photo: string;
  position: string;
  nationality: string;
  stats: {
    goals: number;
    assists: number;
    apps: number;
    cleanSheets?: number;
  };
}

const SQUAD_DATA: Player[] = [
  { 
    name: 'Thibaut Courtois', 
    photo: 'https://img.uefa.com/imgml/TP/players/1/2025/cutoff/250011668.webp', 
    position: 'Goalkeeper', 
    nationality: 'Belgium', 
    stats: { goals: 0, assists: 0, apps: 0, cleanSheets: 0 } 
  },
  { 
    name: 'Kylian Mbappé', 
    photo: 'https://img.uefa.com/imgml/TP/players/1/2025/cutoff/250076574.webp', 
    position: 'Forward', 
    nationality: 'France', 
    stats: { goals: 0, assists: 0, apps: 0 } 
  },
  { 
    name: 'Vinícius Jr.', 
    photo: 'https://assets.realmadrid.com/is/image/realmadrid/2025%20VINICIUS_550x650?$Mobile$&fit=wrap&wid=420', 
    position: 'Forward', 
    nationality: 'Brazil', 
    stats: { goals: 0, assists: 0, apps: 0 } 
  },
  { 
    name: 'Jude Bellingham', 
    photo: 'https://img.uefa.com/imgml/TP/players/1/2025/cutoff/250128377.webp', 
    position: 'Midfielder', 
    nationality: 'England', 
    stats: { goals: 0, assists: 0, apps: 0 } 
  },
  { 
    name: 'Fede Valverde', 
    photo: 'https://img.uefa.com/imgml/TP/players/1/2026/cutoff/250101284.webp', 
    position: 'Midfielder', 
    nationality: 'Uruguay', 
    stats: { goals: 0, assists: 0, apps: 0 } 
  },
  { 
    name: 'Raúl Asencio', 
    photo: 'https://publish.realmadrid.com/content/dam/portals/realmadrid-com/es-es/sports/football/3kq9cckrnlogidldtdie2fkbl/players/raul-asencio/assets/ASENCIO_550x650_SinParche_v2.png', 
    position: 'Defender', 
    nationality: 'Spain', 
    stats: { goals: 0, assists: 0, apps: 0 } 
  },
  { 
    name: 'Antonio Rüdiger', 
    photo: 'https://img.uefa.com/imgml/TP/players/1/2026/cutoff/250028211.webp', 
    position: 'Defender', 
    nationality: 'Germany', 
    stats: { goals: 0, assists: 0, apps: 0 } 
  },
  { 
    name: 'Rodrygo Goes', 
    photo: 'https://assets.realmadrid.com/is/image/realmadrid/RODRYGO_550x650_SinParche?$Mobile$&fit=wrap&wid=420', 
    position: 'Forward', 
    nationality: 'Brazil', 
    stats: { goals:0, assists: 0, apps: 0 } 
  },
];

const SquadPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedPlayer(null);
  };

  return (
    <div className="w-full flex flex-col items-center py-2 md:py-6 animate-fadeIn">
      {/* Grid of Players with Restored Dark Overlays */}
      <div className="w-full max-w-[1600px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-10 gap-y-8 md:gap-y-16">
        {loading ? Array(8).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-4">
            <div className="aspect-[2/3] w-full rounded-[1.5rem] md:rounded-[3rem] bg-white/5 animate-pulse"></div>
            <div className="h-2 w-1/3 bg-white/5 rounded"></div>
            <div className="h-4 w-2/3 bg-white/5 rounded"></div>
          </div>
        )) : SQUAD_DATA.map((player, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedPlayer(player)}
            className="group cursor-pointer flex flex-col items-center transition-all duration-500 hover:-translate-y-2"
          >
            <div 
              className="relative w-full aspect-[2/3] rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-[#bf953f]/30 backdrop-blur-2xl transition-all duration-700 group-hover:border-[#bf953f] group-hover:shadow-[0_15px_40px_rgba(191,149,63,0.15)]"
              style={{ backgroundColor: 'rgba(0, 0, 0, var(--ui-opacity, 0.6))' }}
            >
               <div className="absolute top-3 left-4 md:top-6 md:left-8 z-20 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
                 <span className="text-[7px] md:text-[12px] font-black text-white uppercase tracking-widest truncate max-w-[80px] md:max-w-full block">
                   {player.name}
                 </span>
               </div>
               <img 
                 src={player.photo} 
                 alt={player.name} 
                 className="absolute inset-0 w-full h-full object-contain object-center transition-all duration-1000 group-hover:scale-105 z-10 p-5 md:p-12" 
                 loading="lazy"
               />
               {/* Darker Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-15"></div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-[6px] md:text-[9px] text-gray-400 uppercase font-black tracking-[0.2em] mb-1 group-hover:text-[#bf953f] transition-colors">
                {player.position}
              </p>
              <h3 className="text-[10px] md:text-lg font-black text-white tracking-widest uppercase transition-all duration-500 group-hover:scale-105">
                {player.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal with NO background shading (bg-transparent) for a floating effect */}
      {selectedPlayer && (
        <div 
          className="fixed inset-0 z-[1400] flex items-center justify-center p-4 sm:p-6 bg-transparent animate-fadeIn overflow-hidden"
          onClick={() => handleClose()}
        >
          {/* Subtle click-catcher to allow close on background but maintain 'float' */}
          <div className="absolute inset-0 z-[-1] bg-black/5" />

          <div 
            className="border border-[#bf953f]/30 rounded-[2.5rem] md:rounded-[3.5rem] w-full max-w-[1200px] max-h-[92dvh] md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative shadow-[0_40px_120px_rgba(0,0,0,1)] transition-all"
            style={{ backgroundColor: 'rgba(3, 3, 3, var(--ui-opacity, 0.6))' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={(e) => handleClose(e)}
              className="absolute top-5 right-5 md:top-10 md:right-10 z-[1500] text-gray-400 hover:text-white transition-all p-3 bg-black/50 md:bg-white/5 rounded-full backdrop-blur-md border border-white/10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Photo Section */}
            <div className="w-full md:w-[45%] h-[40vh] sm:h-[45vh] md:h-full bg-black/40 relative order-1 md:order-2 overflow-hidden flex items-center justify-center">
               <div className="relative z-10 w-full h-full flex items-center justify-center p-8 md:p-14">
                  <img 
                    src={selectedPlayer.photo} 
                    className="w-full h-full object-contain object-center scale-100 md:scale-110 transition-transform duration-1000" 
                    alt={selectedPlayer.name}
                  />
               </div>
               <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#030303] hidden md:block z-20 pointer-events-none"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent md:hidden z-20 pointer-events-none"></div>
            </div>

            {/* Info Section */}
            <div className="flex-1 p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col order-2 md:order-1 relative z-10 overflow-y-auto">
              <div className="mb-6 md:mb-12">
                <p className="text-[7px] sm:text-[9px] md:text-[12px] text-[#bf953f] font-black uppercase tracking-[0.6em] mb-2 md:mb-3">
                  REAL MADRID OFFICIAL SQUAD
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-[60px] font-black text-white leading-[1.1] tracking-tighter uppercase gold-text-gradient break-words">
                  {selectedPlayer.name.split(' ').map((part, idx) => (
                    <React.Fragment key={idx}>
                      {part} <br className="hidden md:block" />
                    </React.Fragment>
                  ))}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                <div className="bg-[#111] p-4 sm:p-6 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] border border-white/5">
                  <div className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-500 uppercase font-black mb-1 tracking-wider">POSITION</div>
                  <div className="text-[9px] sm:text-xs md:text-lg font-bold text-gray-200">{selectedPlayer.position}</div>
                </div>
                
                <div className="bg-[#111] p-4 sm:p-6 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] border border-white/5">
                  <div className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-500 uppercase font-black mb-1 tracking-wider">NATIONALITY</div>
                  <div className="text-[9px] sm:text-xs md:text-lg font-bold text-gray-200">{selectedPlayer.nationality}</div>
                </div>

                <div className="bg-[#111] p-4 sm:p-6 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] border border-white/5">
                  <div className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-500 uppercase font-black mb-1 tracking-wider">APPS</div>
                  <div className="text-xl sm:text-3xl md:text-5xl font-black text-white leading-none">{selectedPlayer.stats.apps}</div>
                </div>
                
                {selectedPlayer.position === 'Goalkeeper' ? (
                  <div className="bg-[#111] p-4 sm:p-6 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] border border-blue-500/10">
                    <div className="text-[6px] sm:text-[8px] md:text-[10px] text-blue-400 uppercase font-black mb-1 tracking-wider">CLEAN SHEETS</div>
                    <div className="text-xl sm:text-3xl md:text-5xl font-black text-blue-400 leading-none">{selectedPlayer.stats.cleanSheets}</div>
                  </div>
                ) : (
                  <div className="bg-[#111] p-4 sm:p-6 md:p-8 rounded-[1.2rem] md:rounded-[2.5rem] border border-green-500/10">
                    <div className="text-[6px] sm:text-[8px] md:text-[10px] text-green-400 uppercase font-black mb-1 tracking-wider">GOALS</div>
                    <div className="text-xl sm:text-3xl md:text-5xl font-black text-green-400 leading-none">{selectedPlayer.stats.goals}</div>
                  </div>
                )}
                
                <div className="col-span-2 bg-[#bf953f]/5 p-5 sm:p-7 md:p-10 rounded-[1.2rem] md:rounded-[2.5rem] border border-[#bf953f]/20">
                  <div className="text-[6px] sm:text-[8px] md:text-[10px] text-[#bf953f] uppercase font-black mb-1 tracking-wider">ASSISTS</div>
                  <div className="text-xl sm:text-4xl md:text-6xl font-black gold-text-gradient leading-none">{selectedPlayer.stats.assists}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SquadPage;
