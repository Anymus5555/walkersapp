
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { LANGUAGES } from '../types';

declare global {
  interface Window {
    Hls: any;
  }
}

const RM_LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png";

const PlayerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const langCode = searchParams.get('lang') || 'en';
  const dynamicUrl = searchParams.get('url');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); 

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedLang = LANGUAGES.find(l => l.code === langCode) || LANGUAGES[1];
  const t = selectedLang.translations;

  // Detect if current stream is HLS (all highlight URLs now are HLS)
  const isHLS = dynamicUrl ? (dynamicUrl.toLowerCase().includes('.m3u8') || dynamicUrl.toLowerCase().includes('.ism')) : true;
  // YouTube fallback is disabled for Bright Moments but kept for general external links if needed
  const isYouTube = dynamicUrl ? (dynamicUrl.includes('youtube.com') || dynamicUrl.includes('youtu.be')) && !isHLS : false;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [langCode, dynamicUrl]);

  useEffect(() => {
    if (!videoRef.current || isLoading || isYouTube) return;

    const video = videoRef.current;
    const streamUrl = dynamicUrl || selectedLang.streamUrl;
    let hls: any = null;

    if (streamUrl && isHLS) {
      if (window.Hls && window.Hls.isSupported()) {
        hls = new window.Hls({ 
          enableWorker: true, 
          lowLatencyMode: true,
          backBufferLength: 90
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(e => console.warn("Autoplay blocked:", e));
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
      }
    } else {
      video.src = streamUrl;
    }

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      if (hls) hls.destroy();
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [selectedLang.streamUrl, dynamicUrl, isLoading, isYouTube, isHLS]);

  const togglePlay = () => {
    if (videoRef.current && !isYouTube) {
      if (videoRef.current.paused) videoRef.current.play();
      else videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    if (videoRef.current && !isYouTube) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current && !isYouTube) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current && !isYouTube) videoRef.current.currentTime = time;
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-5xl mb-6 flex justify-between items-center z-10 text-white px-2">
        <button 
          onClick={() => navigate(dynamicUrl ? '/backup' : '/')} 
          className="backdrop-blur-xl border border-[#bf953f]/40 px-5 py-2.5 rounded-full text-gray-300 hover:text-[#bf953f] flex items-center gap-3 transition-all shadow-lg group"
          style={{ backgroundColor: 'rgba(0, 0, 0, var(--ui-opacity, 0.4))' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{dynamicUrl ? 'Back to Moments' : t.home}</span>
        </button>
        <div 
          className="text-[10px] uppercase tracking-[0.5em] gold-text-gradient font-black backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 flex items-center gap-3 transition-all"
          style={{ backgroundColor: 'rgba(0, 0, 0, var(--ui-opacity, 0.6))' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bf953f] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bf953f]"></span>
          </span>
          {isYouTube ? 'EXTERNAL FEED' : dynamicUrl ? 'PREMIUM STREAM' : t.liveArena}
        </div>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
        className={`w-[95%] max-w-5xl relative aspect-video rounded-[2rem] overflow-hidden bg-black shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-[#bf953f]/30 group transition-all duration-500 ${isFullscreen ? 'w-full max-w-none rounded-none' : ''}`}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-5 bg-black z-50">
            <div className="w-16 h-16 border-4 border-[#bf953f]/20 border-t-[#bf953f] rounded-full animate-spin"></div>
            <span className="text-[#bf953f] text-[10px] tracking-[0.6em] uppercase font-bold animate-pulse">{t.establishingLink}</span>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              className={`w-full h-full cursor-pointer transition-all duration-700 ${isZoomed ? 'object-cover scale-105' : 'object-contain'}`} 
              onClick={togglePlay}
              playsInline 
              autoPlay
            />

            {/* Branded Watermark */}
            <div className={`absolute top-8 right-10 z-30 pointer-events-none flex flex-col items-end gap-2 transition-opacity duration-700 ${showControls ? 'opacity-100' : 'opacity-60'}`}>
              <div className="w-20 h-20 md:w-28 md:h-28 p-0 overflow-hidden group-hover:scale-105 transition-transform duration-700">
                <img src={RM_LOGO} alt="RM" className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]" />
              </div>
              <div className="flex flex-col items-end px-2 drop-shadow-lg">
                <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.3em] gold-text-gradient leading-none mb-1">Walkers</span>
                <span className="text-[9px] md:text-[10px] font-black text-white/80 uppercase tracking-[0.5em] leading-none">Madrid</span>
              </div>
            </div>

            {/* Premium Controls */}
            <div className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/95 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`p-10 rounded-full bg-black/40 backdrop-blur-xl border-2 border-[#bf953f]/30 transition-all duration-500 pointer-events-auto group/playbtn ${!isPlaying && showControls ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`} onClick={togglePlay}>
                    <svg className="w-16 h-16 text-[#bf953f] transition-transform group-hover/playbtn:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                    </svg>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-4 pointer-events-auto">
                <div className="relative group/seeker w-full h-2 flex items-center">
                  <input 
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div className="absolute w-full h-1.5 bg-white/10 rounded-full"></div>
                  <div 
                    className="absolute h-1.5 gold-gradient rounded-full pointer-events-none shadow-[0_0_10px_rgba(191,149,63,0.5)]"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <button onClick={togglePlay} className="text-white hover:text-[#bf953f] transition-all transform active:scale-90">
                      {isPlaying ? (
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                      ) : (
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" /></svg>
                      )}
                    </button>

                    <div className="flex items-center gap-4 group/volume">
                      <button onClick={toggleMute} className="text-white hover:text-[#bf953f] transition-colors">
                        {isMuted || volume === 0 ? (
                          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                        ) : (
                          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                        )}
                      </button>
                      <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-0 md:group-hover/volume:w-24 transition-all duration-300 h-1.5 accent-[#bf953f] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button onClick={toggleZoom} className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
                      {isZoomed ? 'FIT' : 'FILL'}
                    </button>
                    <button onClick={toggleFullscreen} className="text-white hover:text-[#bf953f] transition-all">
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Info Section */}
      <div className="w-[95%] max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        <div 
          className="md:col-span-2 p-10 rounded-[3rem] backdrop-blur-3xl border border-white/5 shadow-2xl relative overflow-hidden group transition-all"
          style={{ backgroundColor: 'rgba(0, 0, 0, var(--ui-opacity, 0.4))' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#bf953f]/5 blur-3xl rounded-full group-hover:bg-[#bf953f]/10 transition-all duration-1000"></div>
          <h2 className="text-3xl font-black uppercase tracking-widest gold-text-gradient mb-6">
             {dynamicUrl ? 'Premium HLS Archive' : `${selectedLang.name} ${t.liveArena}`}
          </h2>
          <p className="text-gray-400 text-base leading-relaxed font-medium">
            {dynamicUrl 
              ? 'You are accessing an ultra high-fidelity HLS stream from our private archives. Experience every moment with zero latency and native club-grade quality.' 
              : `${t.exclusiveBroadcast}. ${t.broadcastDescription}`}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
             <div className="px-5 py-2.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)] bg-green-600 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-200">Official HLS Feed</span>
             </div>
             <div className="px-5 py-2.5 bg-[#bf953f]/10 rounded-full border border-[#bf953f]/30 flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#bf953f]">4K HDR READY</span>
             </div>
          </div>
        </div>
        
        <div 
          className="p-10 rounded-[3rem] backdrop-blur-3xl border border-[#bf953f]/20 shadow-2xl flex flex-col justify-center group overflow-hidden transition-all"
          style={{ backgroundColor: 'rgba(191, 149, 63, calc(var(--ui-opacity, 0.6) * 0.1))' }}
        >
           <div className="relative z-10 text-center">
              <p className="text-[11px] font-black text-[#bf953f] uppercase tracking-[0.4em] mb-6">Internal Stream</p>
              <div className="flex flex-col items-center gap-5">
                 <div className="w-20 h-20 rounded-[1.5rem] bg-black border border-[#bf953f]/40 flex items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-[#bf953f] transition-colors">
                    <span className="text-2xl font-black text-[#bf953f] group-hover:scale-110 transition-transform">RAW</span>
                 </div>
                 <p className="text-white font-black uppercase tracking-widest text-lg">HLS PROTOCOL</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
