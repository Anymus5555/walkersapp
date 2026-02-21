
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LANGUAGES } from '../types';

interface Team {
  name: string;
  logo: string;
}

interface Matchup {
  id: string;
  team1: Team;
  team2: Team;
  date: string;
  time: string;
  winnerPlaceholder?: string;
  isTBD?: boolean;
}

const SILVER_MATCHES: Matchup[] = [
  { 
    id: 's1', 
    team1: { name: 'Monaco', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50023.png' }, 
    team2: { name: 'Paris', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/52747.png' }, 
    date: '18 Feb', time: '00:00' 
  },
  { 
    id: 's2', 
    team1: { name: 'Galatasaray', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50067.png' }, 
    team2: { name: 'Juventus', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50139.png' }, 
    date: '17 Feb', time: '21:45' 
  },
  { 
    id: 's3', 
    team1: { name: 'Benfica', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50147.png' }, 
    team2: { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png' }, 
    date: '18 Feb', time: '00:00' 
  },
  { 
    id: 's4', 
    team1: { name: 'B. Dortmund', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/52758.png' }, 
    team2: { name: 'Atalanta', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/52816.png' }, 
    date: '18 Feb', time: '00:00' 
  },
];

const BLUE_MATCHES: Matchup[] = [
  { 
    id: 'b1', 
    team1: { name: 'Qarabağ', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/60641.png' }, 
    team2: { name: 'Newcastle', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/59324.png' }, 
    date: '18 Feb', time: '21:45' 
  },
  { 
    id: 'b2', 
    team1: { name: 'Club Brugge', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50043.png' }, 
    team2: { name: 'Atleti', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50124.png' }, 
    date: '19 Feb', time: '00:00' 
  },
  { 
    id: 'b3', 
    team1: { name: 'Bodø/Glimt', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50037.png' }, 
    team2: { name: 'Inter', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50138.png' }, 
    date: '19 Feb', time: '00:00' 
  },
  { 
    id: 'b4', 
    team1: { name: 'Olympiacos', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/2610.png' }, 
    team2: { name: 'Leverkusen', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50109.png' }, 
    date: '19 Feb', time: '00:00' 
  },
];

const MatchCard: React.FC<{ match: Matchup; pathColor?: string }> = ({ match, pathColor }) => (
  <div className="flex flex-col w-44 md:w-52 shrink-0">
    <div className="flex justify-between items-center px-2 py-1">
      <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{match.date}, {match.time}</span>
    </div>
    <div 
      className={`backdrop-blur-3xl border border-white/10 rounded-xl md:rounded-2xl p-3 shadow-lg transition-all duration-500 hover:border-[#bf953f]/40 relative overflow-hidden`}
      style={{ backgroundColor: 'rgba(0, 0, 0, var(--ui-opacity, 0.4))' }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <img src={match.team1.logo} className="w-full h-full object-contain" alt={match.team1.name} />
            </div>
            <span className={`text-[10px] md:text-xs font-black uppercase tracking-tight truncate max-w-[100px] ${match.team1.name === 'Real Madrid' ? 'gold-text-gradient' : 'text-gray-200'}`}>
              {match.team1.name}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <img src={match.team2.logo} className="w-full h-full object-contain" alt={match.team2.name} />
            </div>
            <span className={`text-[10px] md:text-xs font-black uppercase tracking-tight truncate max-w-[100px] ${match.team2.name === 'Real Madrid' ? 'gold-text-gradient' : 'text-gray-200'}`}>
              {match.team2.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TBDCard: React.FC<{ label?: string }> = ({ label = "TBD" }) => (
  <div className="flex flex-col w-44 md:w-52 shrink-0 opacity-40">
    <div className="flex justify-start px-2 py-1">
      <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
    <div 
      className="backdrop-blur-3xl border border-white/5 rounded-xl md:rounded-2xl p-3 shadow-md h-24 flex flex-col justify-center gap-3"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10"></div>
        <div className="h-2 w-16 bg-white/5 rounded"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10"></div>
        <div className="h-2 w-20 bg-white/5 rounded"></div>
      </div>
    </div>
  </div>
);

const ConnectorLine: React.FC<{ height: number; type: 'up' | 'down'; color: string; side: 'left' | 'right' }> = ({ height, type, color, side }) => {
  const isLeft = side === 'left';
  return (
    <div 
      className={`absolute top-1/2 -translate-y-1/2 flex items-center ${isLeft ? 'left-full' : 'right-full flex-row-reverse'}`}
      style={{ height: `${height}px`, width: '40px' }}
    >
      <div className="w-full h-[2px]" style={{ backgroundColor: color }}></div>
      <div 
        className={`h-full w-[2px] relative`}
        style={{ backgroundColor: color }}
      >
        <div 
          className="absolute w-[40px] h-[2px]"
          style={{ 
            backgroundColor: color, 
            top: type === 'up' ? '0' : '100%',
            [isLeft ? 'left' : 'right']: '0'
          }}
        ></div>
      </div>
    </div>
  );
};

const BracketPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const langCode = searchParams.get('lang') || 'en';
  const currentLang = LANGUAGES.find(l => l.code === langCode) || LANGUAGES[0];
  const t = currentLang.translations;

  return (
    <div className="w-full max-w-[1600px] mx-auto py-10 px-4 md:px-10 animate-fadeIn min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black gold-text-gradient uppercase tracking-[0.4em] mb-4">{t.uclBracket}</h1>
        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Knockout Phase • Season 2025/26</p>
      </div>

      <div className="flex flex-col items-center gap-24 relative pb-20 overflow-x-auto custom-scroll">
        
        {/* Tournament Tree Wrapper */}
        <div className="flex items-center justify-center min-w-[1200px] gap-8">
          
          {/* COLUMN 1: ROUND OF 16 */}
          <div className="flex flex-col gap-20">
            {/* Silver Path R16 */}
            <div className="flex flex-col gap-8">
              {SILVER_MATCHES.map((m, i) => (
                <div key={m.id} className="relative">
                  <MatchCard match={m} />
                  {/* Connectors to Round 2 */}
                  <div className={`absolute left-full top-1/2 -translate-y-1/2 w-10 h-[2px] bg-gray-600`}></div>
                  <div className={`absolute left-[calc(100%+38px)] w-[2px] bg-gray-600 ${i % 2 === 0 ? 'h-[100%] top-1/2' : 'h-[100%] bottom-1/2'}`}></div>
                </div>
              ))}
            </div>

            {/* Blue Path R16 */}
            <div className="flex flex-col gap-8">
              {BLUE_MATCHES.map((m, i) => (
                <div key={m.id} className="relative">
                  <MatchCard match={m} />
                  {/* Connectors to Round 2 */}
                  <div className={`absolute left-full top-1/2 -translate-y-1/2 w-10 h-[2px] bg-blue-600`}></div>
                  <div className={`absolute left-[calc(100%+38px)] w-[2px] bg-blue-600 ${i % 2 === 0 ? 'h-[100%] top-1/2' : 'h-[100%] bottom-1/2'}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: QUARTER-FINALS */}
          <div className="flex flex-col gap-[160px]">
            {/* Silver Path QF */}
            <div className="flex flex-col gap-[144px]">
              {[1, 2].map((i) => (
                <div key={`sqf-${i}`} className="relative">
                  <TBDCard label="Quarter-Final" />
                  <div className={`absolute left-full top-1/2 -translate-y-1/2 w-10 h-[2px] bg-gray-600`}></div>
                  <div className={`absolute left-[calc(100%+38px)] w-[2px] bg-gray-600 ${i % 2 !== 0 ? 'h-[150%] top-1/2' : 'h-[150%] bottom-1/2'}`}></div>
                </div>
              ))}
            </div>

            {/* Blue Path QF */}
            <div className="flex flex-col gap-[144px]">
              {[1, 2].map((i) => (
                <div key={`bqf-${i}`} className="relative">
                  <TBDCard label="Quarter-Final" />
                  <div className={`absolute left-full top-1/2 -translate-y-1/2 w-10 h-[2px] bg-blue-600`}></div>
                  <div className={`absolute left-[calc(100%+38px)] w-[2px] bg-blue-600 ${i % 2 !== 0 ? 'h-[150%] top-1/2' : 'h-[150%] bottom-1/2'}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: SEMI-FINALS */}
          <div className="flex flex-col gap-[360px]">
             {/* Silver Semi */}
             <div className="relative">
               <TBDCard label="Semi-Final" />
               <div className={`absolute left-full top-1/2 -translate-y-1/2 w-10 h-[2px] bg-gray-600`}></div>
               <div className={`absolute left-[calc(100%+38px)] w-[2px] bg-gray-600 h-[180%] top-1/2`}></div>
             </div>
             {/* Blue Semi */}
             <div className="relative">
               <TBDCard label="Semi-Final" />
               <div className={`absolute left-full top-1/2 -translate-y-1/2 w-10 h-[2px] bg-blue-600`}></div>
               <div className={`absolute left-[calc(100%+38px)] w-[2px] bg-blue-600 h-[180%] bottom-1/2`}></div>
             </div>
          </div>

          {/* COLUMN 4: FINAL & TROPHY */}
          <div className="flex flex-col items-center gap-12 ml-20">
             <div className="relative group">
                <div className="absolute inset-0 bg-[#bf953f]/20 blur-[80px] rounded-full scale-150 animate-pulse"></div>
                <img 
                  src="https://img.uefa.com/imgml/TP/trophies/ucl.png" 
                  className="w-48 h-64 md:w-64 md:h-80 object-contain filter drop-shadow-[0_0_30px_rgba(191,149,63,0.5)] transition-all duration-1000 group-hover:scale-110 relative z-10" 
                  alt="UCL Trophy" 
                />
             </div>
             <div className="relative z-10">
                <TBDCard label="Grand Final • Munich" />
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-10 h-[2px] gold-gradient opacity-40"></div>
             </div>
          </div>

        </div>

        {/* Legend Overlay (Fixed-ish at bottom) */}
        <div className="flex justify-center gap-16 border-t border-white/5 pt-12 w-full max-w-4xl opacity-70">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-[3px] bg-gray-500 rounded-full group-hover:w-16 transition-all duration-500"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 italic">Silver Path</span>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-[3px] bg-blue-600 rounded-full group-hover:w-16 transition-all duration-500"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic">Blue Path</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BracketPage;
