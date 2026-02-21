
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LANGUAGES } from '../types';

declare global {
  interface Window {
    Playerjs: any;
  }
}

type EventType = 'goal' | 'sub' | 'card-yellow' | 'card-red';

interface MatchEvent {
  minute: string;
  type: EventType;
  team: 'home' | 'away'; // home = opponent, away = Real Madrid (for the sake of this component)
  player1: string; // Scorrer or Player OUT
  player2?: string; // Assister or Player IN
}

interface MatchStats {
  possession: [number, number]; 
  shots: [number, number];
  shotsOnTarget: [number, number];
  xg: [number, number];
  passing: [number, number];
  fouls: [number, number];
  corners: [number, number];
}

interface BackupMatch {
  id: string;
  opponent: string;
  opponentLogo: string;
  competition: string;
  date: string;
  score: string;
  videoUrl: string;
  thumbnail: string;
  stats: MatchStats;
  events: MatchEvent[];
  gallery: string[];
}

const MATCHES_DATA: BackupMatch[] = [
  {
    id: '1',
    opponent: 'BENFICA',
    opponentLogo: 'https://s.scr365.net/teams/2024/6/28/2B6G6Im_64_203.png',
    competition: 'UEFA Champions League',
    date: '18:02:2026',
    score: '1-0',
    videoUrl: 'https://bl.rutube.ru/route/60fc7f8b37b1b2c0912b1aeb938c5c72.m3u8?guids=81caca04-8bc2-44dc-a98d-f78e8c26df64_1920x1080_6476689_D366699_B6330629A139645_F25A44100_avc1.640029_mp4a.40.2,ec5a02b0-380a-498e-85bd-60f3df670923_1280x720_3061357_D366699_B2915120A139645_F25A44100_avc1.640029_mp4a.40.2,a20457cc-0a93-469f-928b-8185f676e50f_848x480_1473519_D366699_B1338841A128006_F25A44100_avc1.4d401f_mp4a.40.2,d60f6adc-e1d5-42c3-a967-cbada7f652e1_640x360_1322333_D366699_B1253213A64019_F25A44100_avc1.42c01f_mp4a.40.2,3ff04986-69e4-43a0-9a0d-7cb68c9bca5f_424x240_748811_D366699_B679661A64019_F25A44100_avc1.42c01f_mp4a.40.2,1ab56215-0360-4d05-a166-4b456883b905_256x144_360834_D366699_B291665A64019_F25A44100_avc1.42c01f_mp4a.40.2&sign=iWF5jtIlnFkeWF9JyOYOGg&expire=1771419307&guarantee=6&scheme=https',
    thumbnail: 'https://img.youtube.com/vi/L9HUdrRTxts/maxresdefault.jpg',
    stats: {
        possession: [58, 42], shots: [16, 10], shotsOnTarget: [7, 3], xg: [1.11, 0.41], passing: [88, 80], fouls: [9, 6], corners: [7, 4]
    },
    events: [
      { minute: "90'+9", type: 'sub', team: 'away', player1: 'Dani CARVAJAL', player2: 'Alvaro FERNANDEZ' },
      { minute: "90'+4", type: 'sub', team: 'away', player1: 'Thiago Pitarch', player2: 'Eduardo CAMAVINGA' },
      { minute: "90'+2", type: 'card-yellow', team: 'home', player1: 'Georgiy SUDAKOV' },
      { minute: "87'", type: 'card-yellow', team: 'away', player1: 'Kylian MBAPPE' },
      { minute: "86'", type: 'sub', team: 'away', player1: 'Brahim DIAZ', player2: 'Arda GULER' },
      { minute: "81'", type: 'sub', team: 'home', player1: 'Dodi LUKEBAKIO', player2: 'Gianluca Prestianni' },
      { minute: "74'", type: 'sub', team: 'home', player1: 'Georgiy SUDAKOV', player2: 'Andreas SCHJELDERUP' }
    ],
    gallery: [
      "https://i.ytimg.com/vi/Mp82AcAWdlg/maxresdefault.jpg",
      "https://cdn.tuko.co.ke/images/1120/6af5da9ed462929d.jpeg?v=1",
      "https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2026-02/4b3172e3-02f1-4886-abd6-902fed79ad9c.png.webp?itok=1hDgBuI8",
      "https://www.aljazeera.com/wp-content/uploads/2026/02/GettyImages-2262179316-1771405623.jpg?resize=1200%2C675",
      "https://www.aljazeera.com/wp-content/uploads/2026/02/afp_6994d4ce5c3c-1771361486.jpg?w=770&resize=770%2C513&quality=80",
      "https://i2-prod.dailystar.co.uk/article36739604.ece/ALTERNATES/s1200e/1_SL-Benfica-v-Real-Madrid-CF-UEFA-Champions-League-202526-League-Knockout-Play-off-First-Leg.jpg",
      "https://assets.goal.com/images/v3/blt9a565549eb809601/crop/MM5DEMRYHA5DCMRYG45G433XMU5DAORYGQ======/GettyImages-2262180227.jpg",
      "https://img.championat.com/i/f/m/17713672661888105224.jpg",
      "https://ss.sport-express.ru/userfiles/materials/217/2175246/1180x665.jpg",
      "https://madridistanews.com/assets/admin/news/real-madrid-return-from-lisbon-with-goal-advantage.jpg"

    ]
  }
  
];

const StatRow: React.FC<{ label: string, values: [number, number], isPercentage?: boolean }> = ({ label, values, isPercentage }) => {
    const total = values[0] + values[1];
    const leftWidth = (values[0] / total) * 100;
    return (
        <div className="flex flex-col gap-1.5 group mb-4 last:mb-0 w-full">
            <div className="flex justify-between items-baseline px-1">
                <span className="text-lg md:text-xl font-black text-white">{values[0]}{isPercentage ? '%' : ''}</span>
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-[#bf953f] transition-colors">{label}</span>
                <span className="text-lg md:text-xl font-black text-gray-400">{values[1]}{isPercentage ? '%' : ''}</span>
            </div>
            <div className="w-full h-[2px] md:h-[3px] bg-white/5 rounded-full overflow-hidden flex relative">
                <div className="h-full gold-gradient transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(191,149,63,0.3)]" style={{ width: `${leftWidth}%` }}></div>
                <div className="h-full bg-white/10 transition-all duration-1000 ease-out" style={{ width: `${100 - leftWidth}%` }}></div>
            </div>
        </div>
    );
};

const OverviewModal: React.FC<{ match: BackupMatch, onClose: () => void }> = ({ match, onClose }) => {
  return (
    <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn" onClick={onClose}>
      <div className="bg-[#0a0a0a] border border-[#bf953f]/30 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,1)] relative flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="p-10 border-b border-white/5 text-center bg-black/40">
           <h2 className="text-sm font-black text-[#bf953f] uppercase tracking-[0.6em] mb-8">OVERVIEW</h2>
           <div className="flex justify-center items-center gap-10">
              <div className="flex flex-col items-center">
                 <img src={match.opponentLogo} className="w-16 h-16 object-contain mb-3" alt="Opponent" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{match.opponent}</span>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-4xl font-black text-white">{match.score.split('-')[0]}</span>
                 <span className="text-xl font-black text-blue-500">•</span>
                 <span className="text-4xl font-black text-white">{match.score.split('-')[1]}</span>
              </div>
              <div className="flex flex-col items-center">
                 <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" className="w-16 h-16 object-contain mb-3" alt="RM" />
                 <span className="text-[10px] font-black uppercase tracking-widest gold-text-gradient">Real Madrid</span>
              </div>
           </div>
           <div className="mt-8">
              <span className="bg-blue-600 px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Full Time</span>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scroll p-10 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-blue-600/40 -translate-x-1/2"></div>
            <div className="flex justify-center mb-12 relative z-10">
               <div className="bg-[#1a1a1a] border border-white/10 px-8 py-2 rounded-lg flex items-center gap-3 shadow-xl">
                  <span className="text-xl">🏁</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">End Second Half</span>
               </div>
            </div>
            <div className="space-y-12">
               {match.events.map((ev, idx) => (
                  <div key={idx} className="relative flex items-center justify-center">
                      <div className="absolute left-1/2 -translate-x-1/2 bg-[#0a0a0a] px-3 z-10">
                         <span className="text-[11px] font-black text-white tracking-tighter">{ev.minute}</span>
                      </div>
                      <div className={`w-1/2 flex items-center px-6 ${ev.team === 'home' ? 'justify-end pr-10' : 'opacity-0'}`}>
                         {ev.team === 'home' && (
                            <div className="flex items-center gap-3 text-right">
                               <div className="flex flex-col">
                                  <span className="text-xs font-black text-white uppercase tracking-tight">{ev.player2 || ev.player1}</span>
                                  {ev.player2 && <span className="text-[9px] font-bold text-gray-500 italic truncate max-w-[120px]">{ev.player1}</span>}
                               </div>
                               <div className="w-6 h-6 flex items-center justify-center">
                                  {ev.type === 'sub' && <span className="text-red-500 font-bold">→</span>}
                                  {ev.type === 'goal' && <span>⚽</span>}
                                  {ev.type === 'card-yellow' && <div className="w-3 h-4 bg-yellow-400 rounded-sm"></div>}
                               </div>
                            </div>
                         )}
                      </div>
                      <div className={`w-1/2 flex items-center px-6 ${ev.team === 'away' ? 'justify-start pl-10' : 'opacity-0'}`}>
                         {ev.team === 'away' && (
                            <div className="flex items-center gap-3 text-left">
                               <div className="w-6 h-6 flex items-center justify-center">
                                  {ev.type === 'sub' && <span className="text-green-500 font-bold">←</span>}
                                  {ev.type === 'goal' && <span>⚽</span>}
                                  {ev.type === 'card-yellow' && <div className="w-3 h-4 bg-yellow-400 rounded-sm"></div>}
                               </div>
                               <div className="flex flex-col">
                                  <span className="text-xs font-black text-white uppercase tracking-tight">{ev.player2 || ev.player1}</span>
                                  {ev.player2 && <span className="text-[9px] font-bold text-gray-500 italic truncate max-w-[120px]">{ev.player1}</span>}
                               </div>
                            </div>
                         )}
                      </div>
                  </div>
               ))}
            </div>
        </div>
        <button onClick={onClose} className="p-8 border-t border-white/5 text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 hover:text-white transition-colors">
          CLOSE OVERVIEW
        </button>
      </div>
    </div>
  );
};

const MatchPhotoGallery: React.FC<{ photos: string[] }> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos.length, isPaused]);

  const handleInteraction = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <div className="w-full mt-6 relative group overflow-hidden rounded-[3rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.8)] animate-fadeIn">
      <div className="aspect-[16/10] relative cursor-pointer" onClick={() => { setCurrentIndex((prev) => (prev + 1) % photos.length); handleInteraction(); }}>
        {photos.map((photo, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
          >
            <img src={photo} className="w-full h-full object-cover" alt={`Match Moment ${idx + 1}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent"></div>
          </div>
        ))}

        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end z-10">
           <div className="flex flex-col gap-2 animate-slideIn">
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.6em] text-[#bf953f] drop-shadow-lg">Match Highlights</span>
              <h4 className="text-white font-black text-2xl md:text-4xl uppercase tracking-[0.1em] drop-shadow-[0_4px_15px_rgba(0,0,0,1)]">GALLERY VIEW</h4>
           </div>
           
           <div className="flex gap-3 bg-black/60 backdrop-blur-xl px-6 py-3.5 rounded-full border border-white/10 shadow-2xl">
              {photos.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); handleInteraction(); }}
                  className={`h-2 rounded-full transition-all duration-700 ${idx === currentIndex ? 'w-12 bg-[#bf953f] shadow-[0_0_15px_rgba(191,149,63,0.8)]' : 'w-2 bg-white/20 hover:bg-white/50'}`}
                />
              ))}
           </div>
        </div>

        <div className="absolute top-8 left-10 bg-black/70 backdrop-blur-xl px-5 py-2 rounded-full border border-white/5 z-20 shadow-xl">
           <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <span className="text-white">{currentIndex + 1}</span> / {photos.length}
           </span>
        </div>
      </div>
    </div>
  );
};

const BackupGamesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const langCode = searchParams.get('lang') || 'ru';
  const currentLang = LANGUAGES.find(l => l.code === langCode) || LANGUAGES[1];
  const t = currentLang.translations;

  const [activeMatch, setActiveMatch] = useState(MATCHES_DATA[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverview, setShowOverview] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (window.Playerjs) {
        playerRef.current = new window.Playerjs({
          id: "player-highlights",
          file: activeMatch.videoUrl,
          poster: activeMatch.thumbnail,
          autoplay: 0
        });
        setIsLoading(false);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeMatch.id]);

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4 animate-fadeIn">
      {showOverview && <OverviewModal match={activeMatch} onClose={() => setShowOverview(false)} />}
      
      <div className="mb-16 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-black gold-text-gradient uppercase tracking-[0.3em] mb-12 text-center drop-shadow-2xl">{t.matchStats}</h1>
        
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-8">
                <div className="w-full relative rounded-[2.5rem] overflow-hidden bg-black shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/5 group">
                   {isLoading && <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-black z-50"><div className="w-10 h-10 border-2 border-[#bf953f]/20 border-t-[#bf953f] rounded-full animate-spin"></div></div>}
                   <div id="player-highlights" className="pjs-container"></div>
                </div>
                
                <div className="p-10 md:p-14 rounded-[3.5rem] backdrop-blur-3xl border border-white/5 bg-black/40 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-40"></div>
                    
                    <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-10 px-4">
                        <div className="flex flex-col items-center gap-4 group">
                             <div className="relative">
                               <div className="absolute inset-0 bg-white/10 blur-xl rounded-full scale-150 group-hover:bg-[#bf953f]/20 transition-all"></div>
                               <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10" alt="RM" />
                             </div>
                             <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white">Madrid</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <span className="text-6xl md:text-7xl font-black gold-text-gradient tracking-tighter mb-3">{activeMatch.score}</span>
                            <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl">
                               <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.5em]">Full Time</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center gap-4 group">
                             <div className="relative">
                               <div className="absolute inset-0 bg-white/5 blur-xl rounded-full scale-150 group-hover:bg-white/10 transition-all"></div>
                               <img src={activeMatch.opponentLogo} className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10" alt={activeMatch.opponent} />
                             </div>
                             <span className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-500">{activeMatch.opponent.split(' ')[0]}</span>
                        </div>
                    </div>
                    
                    <button 
                      onClick={() => setShowOverview(true)}
                      className="w-full py-6 rounded-[1.5rem] bg-black/30 border border-[#bf953f]/30 text-[12px] font-black uppercase tracking-[0.7em] gold-text-gradient hover:bg-[#bf953f]/10 transition-all active:scale-[0.98] shadow-xl"
                    >
                      VIEW OVERVIEW
                    </button>
                </div>

                {activeMatch.gallery && activeMatch.gallery.length > 0 && (
                   <MatchPhotoGallery photos={activeMatch.gallery} />
                )}
            </div>

            <div className="p-8 md:p-12 rounded-[3.5rem] backdrop-blur-3xl border border-[#bf953f]/20 bg-black/40 shadow-2xl relative min-h-full">
                <div className="mb-8 md:mb-10">
                   <h3 className="text-[10px] md:text-xs font-black text-[#bf953f] uppercase tracking-[0.5em] mb-4 text-center">In-Depth Analysis</h3>
                   <div className="w-10 h-[2px] gold-gradient mx-auto rounded-full opacity-60"></div>
                </div>
                <div className="flex flex-col gap-4 md:gap-6">
                    <StatRow label={t.possession} values={activeMatch.stats.possession} isPercentage />
                    <StatRow label={t.expectedGoals} values={activeMatch.stats.xg} />
                    <StatRow label={t.shots} values={activeMatch.stats.shots} />
                    <StatRow label={t.shotsOnTarget} values={activeMatch.stats.shotsOnTarget} />
                    <StatRow label={t.passing} values={activeMatch.stats.passing} isPercentage />
                    <StatRow label={t.corners} values={activeMatch.stats.corners} />
                    <StatRow label={t.fouls} values={activeMatch.stats.fouls} />
                </div>
                
                <div className="mt-16 md:mt-24 opacity-10 flex justify-center grayscale select-none pointer-events-none">
                   <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png" className="w-24 md:w-32 brightness-200" alt="RM Logo Watermark" />
                </div>
            </div>
        </div>
      </div>

      {/* MATCH SELECTOR SLIDER SECTION - ULTRA COMPACT VERSION */}
      <div className="mt-20 w-full overflow-hidden">
        <div className="flex gap-3 md:gap-5 overflow-x-auto custom-scroll pb-6 px-4 snap-x snap-mandatory">
          {MATCHES_DATA.map((match) => (
            <div 
              key={match.id} 
              onClick={() => { setActiveMatch(match); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`
                flex-none w-[240px] md:w-[320px] snap-center
                group relative backdrop-blur-3xl border rounded-[2rem] p-4 md:p-6
                transition-all duration-700 cursor-pointer 
                flex flex-col justify-between h-[120px] md:h-[150px]
                ${activeMatch.id === match.id 
                  ? 'border-[#bf953f] bg-[#bf953f]/10 shadow-[0_0_20px_rgba(191,149,63,0.1)]' 
                  : 'border-white/5 bg-black/20 hover:border-white/20'
                }
              `}
            >
              {/* Top Row: Competition and Score */}
              <div className="flex justify-between items-start">
                  <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] transition-colors ${activeMatch.id === match.id ? 'text-[#bf953f]' : 'text-gray-500 group-hover:text-[#bf953f]'}`}>
                    {match.competition}
                  </span>
                  <span className="text-[9px] md:text-[10px] font-black text-white tracking-widest bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                    {match.score}
                  </span>
              </div>

              {/* Bottom Row: Logo, Name, Date */}
              <div className="flex items-center gap-3 md:gap-5 mt-auto">
                  <div className="relative">
                    <div className={`absolute inset-0 blur-md rounded-full transition-all duration-500 ${activeMatch.id === match.id ? 'bg-[#bf953f]/15' : 'bg-white/5'}`}></div>
                    <img src={match.opponentLogo} className="w-8 h-8 md:w-12 md:h-12 object-contain relative z-10 transition-transform group-hover:scale-110" alt={match.opponent} />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-sm md:text-lg font-black text-white uppercase tracking-tight group-hover:gold-text-gradient transition-all truncate max-w-[120px] md:max-w-full">
                        {match.opponent}
                      </span>
                      <span className="text-[7px] md:text-[8px] font-bold text-gray-600 uppercase tracking-widest">
                        {match.date}
                      </span>
                  </div>
              </div>

              {/* Selection Indicator Line */}
              {activeMatch.id === match.id && (
                <div className="absolute bottom-0 left-6 right-6 h-[1.5px] gold-gradient rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackupGamesPage;
