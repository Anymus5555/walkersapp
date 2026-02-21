
import React, { useState, useEffect } from 'react';
import { Translations } from '../types';

export interface Match {
  opponent: string;
  opponentLogo: string;
  competition: string;
  date: string;
  isHome: boolean;
}

export interface TeamStats {
  competition: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

interface TableRow {
  position: number;
  team: string;
  logo: string;
  played: number;
  points: number;
}

const RM_LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png";

const STANDINGS: TableRow[] = [
   {position: 1, team: 'Real Madrid', logo: RM_LOGO, played: 24, points: 60 },
  { position: 2, team: 'Barcelona', logo: 'https://img.uefa.com/imgml/TP/teams/logos/240x240/50080.png', played: 24, points: 58 },
  { position: 4, team: 'Villarreal', logo: 'https://s.scr365.net/teams/2024/6/28/Q8NoaTIxz_36.png', played: 23, points: 45 },
  { position: 3, team: 'Atlético', logo: 'https://s.scr365.net/teams/2024/11/19/vd6VCOYZ6_3.png', played: 24, points: 45 },
  { position: 5, team: 'Betis', logo: 'https://s.scr365.net/teams/2024/6/28/mxmAX9_14.png', played: 24, points: 45 },
];

export const ScheduleSidebar: React.FC<{ loading: boolean; schedule: Match[]; translations: Translations }> = ({ loading, schedule, translations }) => {
  const formatLocalTime = (utcString: string) => {
    try {
      const date = new Date(utcString);
      return new Intl.DateTimeFormat(navigator.language, {
        day: '2-digit', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false
      }).format(date);
    } catch { return utcString; }
  };

  return (
    <div 
      className="backdrop-blur-3xl p-6 rounded-[2.5rem] border flex flex-col min-h-[450px] h-full shadow-2xl animate-fadeIn transition-all" 
      style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: 'rgba(0, 0, 0, var(--ui-opacity, 0.4))' }}
    >
      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] gold-text-gradient mb-6 border-b border-white/10 pb-4 text-center">
        {translations.matchSchedule}
      </h3>
      <div className="space-y-6 flex-1 flex flex-col justify-center">
        {loading ? [1,2,3,4].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>) : 
          schedule.map((match, i) => (
            <div key={i} className="group border-l-2 border-transparent pl-4 transition-all relative cursor-default" style={{ borderLeftColor: i === 0 ? 'var(--primary-gold)' : 'transparent' }}>
              <div className="flex justify-between items-start mb-3">
                <span 
                    className={`text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase`}
                    style={{ 
                        backgroundColor: match.competition.toLowerCase().includes('champions') ? 'rgba(37,99,235,0.2)' : 'rgba(var(--primary-gold-rgb), 0.2)',
                        color: match.competition.toLowerCase().includes('champions') ? '#60a5fa' : 'var(--primary-gold)'
                    }}
                >
                  {match.competition}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">{formatLocalTime(match.date)}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative group-hover:scale-110 transition-transform duration-500">
                  <img 
                    src={match.opponentLogo || RM_LOGO} 
                    alt={match.opponent} 
                    className="w-14 h-14 object-contain bg-white/5 rounded-2xl p-2 border border-white/10 shadow-lg"
                    onError={(e) => (e.currentTarget.src = RM_LOGO)}
                  />
                  <div 
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-black flex items-center justify-center text-[8px] font-black`}
                    style={{ backgroundColor: match.isHome ? 'var(--primary-gold)' : '#4b5563', color: match.isHome ? 'black' : 'white' }}
                  >
                    {match.isHome ? 'H' : 'A'}
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors truncate max-w-[120px]">
                      {match.opponent}
                    </div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">
                      {match.isHome ? 'vs Real Madrid' : '@ Real Madrid'}
                    </div>
                  </div>
                  {i === 0 && (
                    <div className="bg-green-500 text-black text-[9px] font-black px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)] border border-green-300 transform scale-100 group-hover:scale-[1.6] group-hover:-translate-x-4 transition-all duration-500 ease-out z-30 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                      WIN
                    </div>
                  )}
                
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export const StatsSidebar: React.FC<{ loading: boolean; stats: TeamStats[]; translations: Translations }> = ({ loading, stats, translations }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const TOTAL_SLIDES = stats.length + 1; // +1 for the Table slide

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 8000);
    return () => clearInterval(interval);
  }, [TOTAL_SLIDES]);

  const renderStats = (stat: TeamStats) => {
    const isUCL = stat.competition.toLowerCase().includes('champions');
    return (
      <div className="w-full">
        <div className="flex flex-col items-center mb-6">
          <div className={`text-sm font-black uppercase tracking-widest mb-2 transition-colors ${isUCL ? 'text-blue-400' : 'gold-text-gradient'}`}>
            {stat.competition}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
            <div className="text-[8px] text-gray-500 uppercase font-black mb-1">Played</div>
            <div className="text-xl font-bold">{stat.played}</div>
          </div>
          <div className={`p-4 rounded-2xl border transition-all ${isUCL ? 'bg-blue-500/10 border-blue-500/10 text-blue-400' : 'bg-green-500/10 border-green-500/10 text-green-400'}`}>
            <div className="text-[8px] uppercase font-black mb-1">Wins</div>
            <div className="text-xl font-bold">{stat.wins}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
            <div className="text-[8px] text-gray-500 uppercase font-black mb-1">Draws</div>
            <div className="text-xl font-bold">{stat.draws}</div>
          </div>
          <div className="bg-red-500/10 p-4 rounded-2xl border border-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
            <div className="text-[8px] uppercase font-black mb-1">Losses</div>
            <div className="text-xl font-bold">{stat.losses}</div>
          </div>
        </div>

        <div className="mt-8 p-5 bg-black/40 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-3">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-500 uppercase font-black">Goals Diff</span>
              <span className="text-[10px] text-gray-400">Score / Conceded</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black" style={{ color: isUCL ? '#60a5fa' : 'var(--secondary-gold)' }}>{stat.goalsFor}</span>
              <span className="text-xs text-gray-600 font-bold">/</span>
              <span className="text-xs font-bold text-gray-500">{stat.goalsAgainst}</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
             <div 
                className={`h-full transition-all duration-1000 ease-out ${isUCL ? 'bg-blue-500' : 'gold-gradient'}`} 
                style={{ width: `${(stat.goalsFor / (stat.goalsFor + stat.goalsAgainst || 1)) * 100}%` }}
             ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderTable = () => (
    <div className="w-full">
      <div className="flex flex-col items-center mb-6">
        <div className="text-sm font-black uppercase tracking-widest gold-text-gradient mb-2">
          LA LIGA TABLE
        </div>
      </div>
      
      <div className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-3 py-3 text-[8px] font-black uppercase text-gray-500">Pos</th>
              <th className="px-3 py-3 text-[8px] font-black uppercase text-gray-500">Team</th>
              <th className="px-3 py-3 text-[8px] font-black uppercase text-gray-500 text-center">P</th>
              <th className="px-3 py-3 text-[8px] font-black uppercase text-gray-500 text-right">Pts</th>
            </tr>
          </thead>
          <tbody>
            {STANDINGS.map((row) => {
              const isRM = row.team === 'Real Madrid';
              return (
                <tr 
                  key={row.position} 
                  className={`border-b border-white/5 transition-colors ${isRM ? 'bg-[#bf953f]/10' : 'hover:bg-white/5'}`}
                >
                  <td className={`px-3 py-3 text-[10px] font-bold ${isRM ? 'text-[#bf953f]' : 'text-gray-400'}`}>
                    {row.position}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <img src={row.logo} alt={row.team} className="w-5 h-5 object-contain" />
                      <span className={`text-[11px] font-black uppercase tracking-tight truncate max-w-[80px] ${isRM ? 'gold-text-gradient' : 'text-gray-200'}`}>
                        {row.team}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[10px] font-bold text-gray-400 text-center">
                    {row.played}
                  </td>
                  <td className={`px-3 py-3 text-[11px] font-black text-right ${isRM ? 'text-[#bf953f]' : 'text-white'}`}>
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div 
      className="backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/5 flex flex-col min-h-[450px] h-full relative overflow-hidden shadow-2xl animate-fadeIn transition-all" 
      style={{ backgroundColor: 'rgba(0, 0, 0, var(--ui-opacity, 0.4))' }}
    >
      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] gold-text-gradient mb-6 border-b border-white/10 pb-4 text-center">
        {translations.livePerformance}
      </h3>
      
      {/* Slider Indicators */}
      <div className="flex justify-center gap-2 mb-4">
        {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1 rounded-full transition-all duration-1000 ${idx === activeSlide ? 'w-8' : 'w-2 bg-white/10'}`}
            style={{ backgroundColor: idx === activeSlide ? (idx === 1 ? '#60a5fa' : 'var(--primary-gold)') : '' }}
          ></div>
        ))}
      </div>

      <div className="flex-1 relative flex flex-col justify-center overflow-hidden">
        {loading ? (
          <div className="space-y-4">{[1,2,3,4,5].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse"></div>)}</div>
        ) : (
          <div 
            key={activeSlide} 
            className="animate-slideIn w-full"
          >
            {activeSlide < stats.length ? renderStats(stats[activeSlide]) : renderTable()}
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-600">
          Real Madrid CF Performance Index
        </span>
      </div>
    </div>
  );
};