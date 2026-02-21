
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ScheduleSidebar, StatsSidebar, Match, TeamStats } from './Sidebars';
import { LANGUAGES } from '../types';
import { Toast, ToastProps } from './Toast';
import { AnthemPlayer } from './AnthemPlayer';

const SECURITY_CONFIG = {
  enableDebuggerLoop: true,
  disableRightClick: true,
  disableDevKeys: true,
  blockPrintScreen: true,
  detectDevToolsDock: true,
  protectionMessage: "Access Restricted: Security violation detected."
};

const TOAST_MESSAGES: Record<string, { title: string; message: string }> = {
  ru: { title: 'С возвращением!', message: ' Игра против {opponent}! Не пропустите прямую трансляцию!' },
  en: { title: 'Welcome Back!', message: ' Match against {opponent}! Watch it live here!' },
  hy: { title: 'Բարի վերադարձ', message: 'Բաց մի՛ թողեք  խաղը  ընդդեմ {opponent}-ի:' }
};

const NOTIFICATION_LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png";

const NOTIFICATION_SETTINGS = {
  welcomeDelay: 1500,
  displayDuration: 8000,
  useOpponentLogo: true,
};

const MATCH_DATA: Match[] = [
  { opponent: 'Benfica', opponentLogo: 'https://s.scr365.net/teams/2024/6/28/TPPrxvRf_64_13.png', competition: 'Champions league', date: '2026-02-17T19:59:00Z', isHome: false },
  {opponent: 'Club Atlético Osasuna', opponentLogo: 'https://s.scr365.net/teams/2025/3/27/m5RuA8nME_64_114.png', competition: 'La Liga', date: '2026-02-21T17:30:00Z', isHome: false },
  { opponent: 'Benfica', opponentLogo: 'https://s.scr365.net/teams/2024/6/28/TPPrxvRf_64_13.png', competition: 'Champions league', date: '2026-02-08T19:59:00Z', isHome: true },
  { opponent: 'Getafe Club de Fútbol', opponentLogo: 'https://s.scr365.net/teams/2024/6/28/pZkIk7JT_64_230.png', competition: 'La Liga', date: '2026-02-25T19:59:00Z', isHome: true },
  { opponent: 'Real Club Celta de Vigo', opponentLogo: 'https://s.scr365.net/teams/2024/6/28/nXreavLR3_64_259.png', competition: 'La Liga', date: '2026-03-02T19:59:00Z', isHome: false },
    { opponent: 'Elche Club de Fútbol', opponentLogo: 'https://s.scr365.net/teams/2023/7/28/xAfpod_7227.png', competition: 'La Liga', date: '2026-03-15T18:00:00Z', isHome: true }
];

const PERFORMANCE_STATS: TeamStats[] = [
   { competition: 'La Liga', played: 24, wins: 19, draws: 3, losses: 2, goalsFor: 53, goalsAgainst: 19 },
   { competition: 'Champions League', played: 9, wins: 6, draws: 0, losses: 3, goalsFor: 22, goalsAgainst: 12 }
];

const BACKGROUNDS = [
  { name: 'Bernabéu', url: 'https://wallpapercave.com/wp/wp11012453.jpg' },
  { name: 'Champions league', url: 'https://wallpapercave.com/wp/wp12501318.jpg' },
  { name: 'La Liga Field', url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Stadium Crowd', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop' },
  { name: 'La Liga', url: 'https://wallpapercave.com/wp/wp11050049.jpg' },
  { name: 'Stadium Dark', url: 'https://wallpapercave.com/wp/wp13995932.png' }
];

const PLAYER_LIST = ['Thibaut Courtois', 'Kylian Mbappé', 'Vinícius Jr.', 'Jude Bellingham', 'Fede Valverde', 'Antonio Rüdiger', 'Rodrygo Goes', 'Dani Carvajal'];

const COLOR_SCHEMES = [
  { name: 'Classic Gold', primary: '#bf953f', secondary: '#fcf6ba', accent: '#aa771c' },
  { name: 'Royal Silver', primary: '#C0C0C0', secondary: '#E8E8E8', accent: '#707070' },
  { name: 'Champagne', primary: '#f7e7ce', secondary: '#ffffff', accent: '#d4af37' },
  { name: 'Elite Blue', primary: '#1e3a8a', secondary: '#60a5fa', accent: '#1d4ed8' }
];

const TimeDisplay: React.FC<{ uiOpacity: number }> = ({ uiOpacity }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const formatDate = () => {
    return time.toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase();
  };

  return (
    <div 
      className="fixed top-8 left-1/2 -translate-x-1/2 z-[4000] hidden sm:flex items-center gap-4 px-8 py-3.5 rounded-full backdrop-blur-3xl border border-white/10 shadow-2xl transition-all duration-700 hover:border-[#bf953f]/40 whitespace-nowrap"
      style={{ backgroundColor: `rgba(0, 0, 0, ${uiOpacity})` }}
    >
      <div className="flex flex-col items-start leading-none">
        <span className="text-[16px] font-black gold-text-gradient tracking-[0.1em] mb-1">
          {formatTime()}
        </span>
        <span className="text-[8px] font-black text-gray-500 tracking-[0.3em] uppercase">
          {formatDate()}
        </span>
      </div>
      <div className="w-[1px] h-7 bg-white/10 mx-2"></div>
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Live Node</span>
        </div>
      </div>
    </div>
  );
};

const ContactButton: React.FC<{ icon: string; label: string; url: string }> = ({ icon, label, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group no-underline">
    <span className="text-2xl">{icon}</span>
    <span className="text-sm font-black uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">{label}</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-gray-500 group-hover:text-[#bf953f] transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
    </svg>
  </a>
);

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedule, setSchedule] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'about' | 'aboutSite' | 'contacts' | 'privacy' | 'settings' | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<Omit<ToastProps, 'onClose'>[]>([]);
  const [isTampered, setIsTampered] = useState(false);
  const [resetStage, setResetStage] = useState(0); 
  
  const [bgColor, setBgColor] = useState(() => localStorage.getItem('app-bg') || BACKGROUNDS[0].url);
  const [colorSchemeIndex, setColorSchemeIndex] = useState(() => parseInt(localStorage.getItem('app-theme') || '0'));
  const [favPlayer, setFavPlayer] = useState(() => localStorage.getItem('app-fav-player') || PLAYER_LIST[1]);
  const [uiOpacity, setUiOpacity] = useState(() => parseFloat(localStorage.getItem('app-ui-opacity') || '0.4'));

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const isHomePage = location.pathname === '/';
  const isSquadPage = location.pathname === '/squad';
  
  const initialLangCode = searchParams.get('lang') || localStorage.getItem('app-lang') || 'ru';
  const currentLang = LANGUAGES.find(l => l.code === initialLangCode) || LANGUAGES.find(l => l.code === 'ru') || LANGUAGES[0];
  const t = currentLang.translations;

  const handleClearCache = useCallback(() => {
    if (resetStage === 0) {
      setResetStage(1);
      setTimeout(() => setResetStage(0), 3000); 
    } else {
      localStorage.clear();
      window.location.reload();
    }
  }, [resetStage]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const addToast = (title: string, message: string, icon?: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, title, message, icon, duration }]);
  };

  useEffect(() => {
    let debugInterval: any;
    if (SECURITY_CONFIG.enableDebuggerLoop) {
      debugInterval = setInterval(() => {
        (function() {
          const start = Date.now();
          debugger;
          if (Date.now() - start > 100) console.clear();
        })();
      }, 200);
    }
    const handleContextMenu = (e: MouseEvent) => { if (SECURITY_CONFIG.disableRightClick) e.preventDefault(); };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!SECURITY_CONFIG.disableDevKeys) return;
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && e.key === 'u')) e.preventDefault();
      if (e.key === 'PrintScreen' || (e.key === 'p' && e.ctrlKey)) {
        if (SECURITY_CONFIG.blockPrintScreen) { navigator.clipboard.writeText("Protected."); e.preventDefault(); }
      }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(debugInterval);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!searchParams.has('lang')) {
      const params = new URLSearchParams(searchParams);
      params.set('lang', currentLang.code);
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [location.pathname, currentLang.code, navigate, searchParams]);

  useEffect(() => {
    const scheme = COLOR_SCHEMES[colorSchemeIndex];
    document.documentElement.style.setProperty('--primary-gold', scheme.primary);
    document.documentElement.style.setProperty('--secondary-gold', scheme.secondary);
    document.documentElement.style.setProperty('--accent-gold', scheme.accent);
    document.documentElement.style.setProperty('--ui-opacity', uiOpacity.toString());
  }, [colorSchemeIndex, uiOpacity]);

  useEffect(() => {
    setSchedule(MATCH_DATA);
    setLoading(false);
    const welcomeTimer = setTimeout(() => {
      const now = new Date().getTime();
      const upcomingMatches = MATCH_DATA.filter(m => new Date(m.date).getTime() > now - (2 * 60 * 60 * 1000));
      const featuredMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : MATCH_DATA[MATCH_DATA.length - 1]; 
      const config = TOAST_MESSAGES[currentLang.code] || TOAST_MESSAGES.en;
      const finalMessage = config.message.replace('{opponent}', featuredMatch.opponent);
      const finalLogo = NOTIFICATION_SETTINGS.useOpponentLogo ? featuredMatch.opponentLogo : NOTIFICATION_LOGO;
      addToast(config.title, finalMessage, finalLogo, NOTIFICATION_SETTINGS.displayDuration);
    }, NOTIFICATION_SETTINGS.welcomeDelay);
    return () => clearTimeout(welcomeTimer);
  }, [currentLang.code]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleUpdateLanguage = (code: string) => {
    localStorage.setItem('app-lang', code);
    const params = new URLSearchParams(searchParams);
    params.set('lang', code);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const renderContentWithBulletPoints = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.trim().toLowerCase().includes('hala madrid')) {
        return (
          <p key={i} className="text-center mt-12 md:mt-16 font-black uppercase tracking-[0.5em] gold-text-gradient text-lg md:text-2xl italic animate-fadeIn">
            {line.trim()}
          </p>
        );
      }
      return (
        <p key={i} className="mb-4 leading-relaxed font-medium text-gray-200 text-sm md:text-lg">
          {line.trim()}
        </p>
      );
    });
  };

  if (isTampered) return <div className="fixed inset-0 bg-black flex items-center justify-center text-[#bf953f] font-black uppercase tracking-widest">{SECURITY_CONFIG.protectionMessage}</div>;

  return (
    <div className={`flex-1 flex flex-col animate-fadeIn relative min-h-[100dvh] w-full overflow-x-hidden p-4 md:p-8 stadium-bg`} style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${bgColor})` }}>
      {/* Burger Button & Menu - STATIC / FIXED POSITION */}
      <div className="fixed top-8 left-8 z-[5000]" ref={menuRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="w-14 h-14 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden"
          style={{ backgroundColor: `rgba(0,0,0, ${uiOpacity})` }}
        >
          <div className="flex flex-col gap-1.5 items-center justify-center">
            <div className={`w-6 h-[2.5px] bg-[#bf953f] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></div>
            <div className={`w-6 h-[2.5px] bg-[#bf953f] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-6 h-[2.5px] bg-[#bf953f] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></div>
          </div>
        </button>

        {/* Popup Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 mt-4 w-72 backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.8)] animate-slideInSpring overflow-hidden" style={{ backgroundColor: `rgba(10,10,10, ${Math.min(0.95, uiOpacity + 0.4)})` }}>
            <div className="flex flex-col gap-1">
              <Link to={`/?lang=${currentLang.code}`} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group">
                <svg className="w-5 h-5 text-[#bf953f] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-all">{t.home}</span>
              </Link>
              <Link to={`/squad?lang=${currentLang.code}`} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group">
                <svg className="w-5 h-5 text-[#bf953f] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-all">{t.squad}</span>
              </Link>
              <Link to={`/backup?lang=${currentLang.code}`} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group">
                <svg className="w-5 h-5 text-[#bf953f] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /><circle cx="12" cy="12" r="10" strokeOpacity="0.1" /></svg>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-all">{t.brightMoments}</span>
              </Link>
              <button onClick={() => { setActiveModal('settings'); setIsMenuOpen(false); }} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group text-left w-full">
                <svg className="w-5 h-5 text-[#bf953f] group-hover:rotate-90 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-all">{t.settings}</span>
              </button>
              <div className="h-[1px] bg-white/10 my-4 mx-2"></div>
              <button onClick={() => { setActiveModal('contacts'); setIsMenuOpen(false); }} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group text-left w-full">
                <svg className="w-5 h-5 text-[#bf953f] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-all">{t.contacts}</span>
              </button>
              <button onClick={() => { setActiveModal('about'); setIsMenuOpen(false); }} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group text-left w-full">
                <svg className="w-5 h-5 text-[#bf953f] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-all">{t.aboutUs}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast container */}
      <div className="fixed top-28 left-8 z-[3000] flex flex-col gap-5 max-w-[450px]">
        {toasts.map((toast) => (<Toast key={toast.id} {...toast} onClose={removeToast} />))}
      </div>

      <TimeDisplay uiOpacity={uiOpacity} />
      <AnthemPlayer label={t.anthem} />

      {/* Spacing for top fixed UI components */}
      <div className="pt-24 md:pt-16"></div>

      <div className={`flex-1 w-full relative z-10 ${isHomePage ? 'max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start xl:items-center' : 'flex justify-center items-start'}`}>
        {isHomePage && <div className="xl:col-span-3 order-2 xl:order-1 h-fit"><ScheduleSidebar loading={loading} schedule={schedule} translations={t} /></div>}
        <div className={`${isHomePage ? 'xl:col-span-6 order-1 xl:order-2' : 'w-full'} flex flex-col items-center justify-center h-full`}>{children}</div>
        {isHomePage && <div className="xl:col-span-3 order-3 h-fit"><StatsSidebar loading={loading} stats={PERFORMANCE_STATS} translations={t} /></div>}
      </div>

      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[1000] flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-full pointer-events-none shadow-xl transition-all" style={{ backgroundColor: `rgba(0, 0, 0, ${uiOpacity})` }}>
          <div className="w-2 h-2 rounded-full gold-gradient animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white">{favPlayer}</span>
        </div>
      </div>

      <footer className="w-full mt-auto py-8 text-center border-t border-white/5 z-10">
        <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 opacity-60 hover:opacity-100 transition-opacity duration-500">{t.copyright}</p>
      </footer>

      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-3xl animate-fadeIn">
          <div className="bg-black/50 border border-white/10 rounded-[3rem] p-8 md:p-14 max-w-3xl w-full shadow-2xl relative flex flex-col max-h-[92vh] overflow-hidden" style={{ borderColor: 'var(--primary-gold)', backgroundColor: `rgba(0,0,0, ${uiOpacity})` }}>
            <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 text-gray-400 hover:text-white transition-all p-3 bg-white/5 rounded-full z-20"><svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h2 className="text-3xl font-black gold-text-gradient uppercase tracking-[0.5em] mb-12 text-center border-b border-white/10 pb-8">{t.settings}</h2>
            <div className="flex-1 overflow-y-auto custom-scroll pr-4 space-y-14 pb-8">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-6">{t.windowTransparency}</h3>
                <div className="px-6 py-8 rounded-3xl bg-white/5 border border-white/5 flex flex-col gap-6">
                  <input type="range" min="0.0" max="1.0" step="0.01" value={uiOpacity} onChange={(e) => { const v = parseFloat(e.target.value); setUiOpacity(v); localStorage.setItem('app-ui-opacity', v.toString()); }} className="w-full h-2 accent-[#bf953f] bg-white/10 rounded-full cursor-pointer appearance-none" />
                  <div className="flex justify-between text-[10px] font-black tracking-widest text-gray-500"><span>Transparent</span><span className="text-[#bf953f]">{Math.round(uiOpacity * 100)}%</span><span>Opaque</span></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-6">{t.colorScheme}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {COLOR_SCHEMES.map((scheme, idx) => (
                    <button key={idx} onClick={() => { setColorSchemeIndex(idx); localStorage.setItem('app-theme', idx.toString()); }} className={`p-5 rounded-2xl border transition-all flex flex-col items-center gap-3 ${colorSchemeIndex === idx ? 'bg-white/10' : 'border-white/5 bg-white/5'}`} style={{ borderColor: colorSchemeIndex === idx ? 'var(--primary-gold)' : 'rgba(255,255,255,0.05)' }}>
                      <div className="flex gap-2"><div className="w-6 h-6 rounded-full" style={{ backgroundColor: scheme.primary }}></div><div className="w-6 h-6 rounded-full" style={{ backgroundColor: scheme.secondary }}></div></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{scheme.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-6">{t.background}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {BACKGROUNDS.map((bg, idx) => (
                    <button key={idx} onClick={() => { setBgColor(bg.url); localStorage.setItem('app-bg', bg.url); }} className={`relative h-24 rounded-2xl overflow-hidden border transition-all group ${bgColor === bg.url ? 'ring-2' : 'border-white/10'}`} style={{ borderColor: bgColor === bg.url ? 'var(--primary-gold)' : 'rgba(255,255,255,0.1)' }}>
                      <img src={bg.url} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" alt={bg.name} />
                      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] text-white text-center px-2 drop-shadow-md">{bg.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-6">{t.language}</h3>
                <div className="flex flex-wrap gap-3">
                  {LANGUAGES.filter(l => !l.isSpecial).map((lang) => (
                    <button key={lang.code} onClick={() => handleUpdateLanguage(lang.code)} className={`px-8 py-4 rounded-full border text-[12px] font-black uppercase tracking-[0.2em] transition-all ${currentLang.code === lang.code ? 'bg-white/10 text-white' : 'border-white/10 bg-white/5 text-gray-400'}`} style={{ borderColor: currentLang.code === lang.code ? 'var(--primary-gold)' : 'rgba(255,255,255,0.1)' }}>{lang.nativeName}</button>
                  ))}
                </div>
              </div>
              <div className="pt-10 border-t border-white/10 space-y-4">
                 <button onClick={handleClearCache} className={`w-full py-6 px-10 rounded-[1.5rem] border text-[12px] font-black uppercase tracking-[0.3em] transition-all text-left flex items-center justify-between group ${resetStage === 1 ? 'bg-red-500 border-red-400 text-white' : 'bg-red-500/5 border-red-500/20 text-red-400'}`}>
                    <span>{resetStage === 1 ? t.resetConfirm : t.clearCache}</span>
                    <svg className="h-6 w-6 transition-transform group-hover:rotate-180 duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal && !['settings'].includes(activeModal) && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-3xl animate-fadeIn">
          <div className="border border-[#bf953f]/30 rounded-[3rem] p-10 md:p-16 max-w-2xl w-full shadow-2xl relative" style={{ borderColor: 'var(--primary-gold)', backgroundColor: `rgba(0, 0, 0, ${uiOpacity})` }}>
            <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors"><svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <h2 className="text-2xl font-black gold-text-gradient uppercase tracking-widest mb-10 border-b border-white/10 pb-6 text-center">
              {activeModal === 'about' ? t.aboutUs : activeModal === 'aboutSite' ? t.aboutSite : activeModal === 'contacts' ? t.contacts : t.privacyPolicy}
            </h2>
            {activeModal === 'contacts' ? (
              <div className="flex flex-col gap-2 mb-8">
                <ContactButton icon="📸" label="Instagram" url="https://www.instagram.com/abul_walker" />
                <ContactButton icon="🎬" label="YouTube" url="https://www.youtube.com/@abulwalker" />
                <ContactButton icon="🎵" label="TikTok" url="https://www.tiktok.com/@abul_wa7ker" />
              </div>
            ) : (
              <div className="text-gray-200 whitespace-pre-wrap leading-relaxed text-sm md:text-lg mb-10 text-left px-4">
                {renderContentWithBulletPoints(
                  activeModal === 'about' ? t.aboutUsContent : 
                  activeModal === 'aboutSite' ? t.aboutSiteContent : 
                  t.privacyPolicyContent
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
