import { useEffect } from 'react';
import { Game } from './types';

const CMU_GOLD = '#D4611A';

export const GameDetailPage = ({ game, onBack }: { game: Game; onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [game]);

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-32 text-[#1d1d1f] font-sans selection:bg-[#D4611A] selection:text-white flex flex-col relative z-50">
      
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between bg-white/60 backdrop-blur-xl border-b border-black/5 shadow-sm">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-[#86868b] hover:text-[#1d1d1f] transition-colors bg-black/5 hover:bg-black/10 px-4 py-2 rounded-full">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Hub
        </button>
        <div className="font-bold text-xl tracking-tight">Nurse<span style={{ color: CMU_GOLD }}>Hub</span></div>
        <div className="w-[100px]"></div> {/* Spacer for centering */}
      </nav>

      {/* Hero Banner Card */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 mt-8 mb-4">
        <div className="relative w-full rounded-[40px] min-h-[550px] flex items-end overflow-hidden bg-black shadow-2xl ring-1 ring-black/10 group">
          {/* Background Image */}
          <img 
            src={game.scene || game.cover} 
            alt={game.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 w-full px-8 md:px-16 pb-16 pt-32 flex flex-col items-start gap-6">
            <div className="flex flex-wrap gap-2">
              {game.tags.map(t => (
                <span key={t} className="rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold tracking-widest text-white shadow-sm uppercase border border-white/20">
                  {t}
                </span>
              ))}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl">
              {game.title}
            </h1>
            
            <p className="text-lg md:text-xl font-medium text-white/80 max-w-3xl leading-relaxed drop-shadow-md">
              {game.description}
            </p>
            
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <a
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full px-10 py-4 font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ 
                  background: `linear-gradient(135deg, ${game.color1} 0%, ${game.color2} 100%)`,
                  boxShadow: `0 8px 32px ${game.color1}66, inset 0 2px 0 rgba(255,255,255,0.2)`
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                <span className="text-lg tracking-wide uppercase">Play Now</span>
              </a>
              <div className="flex flex-col">
                <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Platform</span>
                <span className="text-white text-sm font-semibold">Web Browser</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Price</span>
                <span className="text-[#a8e6a1] text-sm font-semibold">Free to Play</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Gallery */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-10 w-2.5 rounded-full" style={{ background: game.color1 }} />
             <h2 className="text-3xl font-black tracking-tight text-[#1d1d1f]">Screenshots</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {game.screenshots?.map((screenshot, idx) => (
              <div key={idx} className="rounded-[28px] overflow-hidden shadow-sm ring-1 ring-black/5 aspect-[16/10] group bg-black">
                <img 
                  src={screenshot} 
                  alt={`${game.title} screenshot ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] opacity-90 group-hover:opacity-100" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0 relative">
          <div className="sticky top-28 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[36px] p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <h3 className="text-2xl font-black text-[#1d1d1f] mb-6">About</h3>
            
            <p className="text-[#6e6e73] text-[15px] leading-relaxed mb-8">
              {game.description}
            </p>
            
            <div className="flex flex-col gap-5 text-[15px]">
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <span className="text-[#86868b] font-medium">Developer</span>
                <span className="font-bold text-[#1d1d1f] text-right">{game.developer}</span>
              </div>
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <span className="text-[#86868b] font-medium">Category</span>
                <span className="font-bold text-[#1d1d1f] text-right">{game.category}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[#86868b] font-medium">Access</span>
                <span className="font-black text-lg" style={{ color: game.color1 }}>Free</span>
              </div>
            </div>
            
            <div className="mt-10 rounded-2xl bg-[#f5f5f7] p-5 text-center ring-1 ring-black/5">
              <p className="text-[12px] font-medium text-[#86868b]">
                Developed for the Faculty of Nursing, Chiang Mai University.
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
