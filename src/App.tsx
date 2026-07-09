import { useState, useRef } from 'react';
import { Game } from './types';
import { GameDetailPage } from './GameDetailPage';

// CMU Faculty of Nursing brand colors
const CMU_GOLD   = '#D4611A';   // CMU Orange
const CMU_GOLD2  = '#E07030';   // lighter orange
const CMU_DARK   = '#3a3a3a';   // Dark Gray
const CMU_GOLD_T = '#a84a10';   // dark orange for text

const games: Game[] = [
  {
    id: 'pmcgo',
    title: 'PMC Nurse Go',
    developer: 'Faculty of Nursing · CMU',
    category: 'Simulation',
    tags: ['Diagnosis', 'Clinical'],
    description: 'จำลองสถานการณ์การวินิจฉัยโรค สำหรับรายวิชาฝึกปฏิบัติการรักษาโรคเบื้องต้น เพิ่มพูนทักษะการคิดเชิงคลินิกผ่านเคสผู้ป่วยจริง',
    url: 'https://cmu.to/pmcgo',
    cover: '/cover_pmcgo.png',
    scene: '/scene_pmcgo.png',
    screenshots: ['/scene_pmcgo.png', '/cover_pmcgo.png'],
    color1: CMU_GOLD,
    color2: CMU_GOLD2,
    textAccent: CMU_GOLD_T,
    featured: true,
  },
  {
    id: 'medprep',
    title: 'Medical Preparation',
    developer: 'Faculty of Nursing · CMU',
    category: 'Training',
    tags: ['Pharmacy', 'Calculation'],
    description: 'ฝึกทักษะการเตรียมยา การคำนวณและการผสมยามาตรฐาน',
    url: 'https://app.nurse.cmu.ac.th/medical-preparation/',
    cover: '/cover_medprep.png',
    scene: '/scene_medprep.png',
    screenshots: ['/scene_medprep.png', '/cover_medprep.png'],
    color1: '#8B6914',
    color2: '#A07820',
    textAccent: '#5c4510',
  },
  {
    id: 'eyecan',
    title: 'Eye Can Do It',
    developer: 'Faculty of Nursing · CMU',
    category: 'Assessment',
    tags: ['Vision', 'Interactive'],
    description: 'ฝึกปฏิบัติวัดสายตาและประเมินการมองเห็นของผู้ป่วย',
    url: 'https://app.nurse.cmu.ac.th/eyecando/',
    cover: '/cover_eyecan.png',
    scene: '/scene_eyecan.png',
    screenshots: ['/scene_eyecan.png', '/cover_eyecan.png'],
    color1: CMU_DARK,
    color2: '#3a3a3a',
    textAccent: '#2a2a2a',
  },
  {
    id: 'nurse360',
    title: 'Nurse 360 AR',
    developer: 'Faculty of Nursing · CMU',
    category: 'Immersive',
    tags: ['AR', '360°'],
    description: 'จำลองดูแลผู้ป่วย 360 องศา พร้อมระบบ Augmented Reality',
    url: 'https://mis.nurse.cmu.ac.th/nurse360/',
    cover: '/cover_nurse360.png',
    scene: '/scene_nurse360.png',
    screenshots: ['/scene_nurse360.png', '/cover_nurse360.png'],
    color1: '#B07818',
    color2: '#C89030',
    textAccent: '#7a5210',
  },
];

// ——— Placeholder cover with gradient ———————————————
const GameCover = ({
  src, scene, alt, color1, color2, className = '',
}: {
  src: string; scene?: string; alt: string; color1: string; color2: string; className?: string;
}) => {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className={className}
        style={{ background: `linear-gradient(135deg, ${color1}cc 0%, ${color2}88 100%)` }}
      />
    );
  }
  return (
    <div className={`${className} overflow-hidden`}>
      <style>
        {`
          @keyframes crossfade {
            0%, 40% { opacity: 0; }
            50%, 90% { opacity: 1; }
            100% { opacity: 0; }
          }
          .animate-crossfade {
            animation: crossfade 8s infinite;
          }
        `}
      </style>
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" onError={() => setErrored(true)} />
      {scene && (
        <img src={scene} alt={`${alt} Scene`} className="absolute inset-0 h-full w-full object-cover animate-crossfade" />
      )}
    </div>
  );
};

// ——— Featured Hero Carousel ————————————————————————————
const FeaturedCarousel = ({ games, onGameSelect }: { games: Game[], onGameSelect: (game: Game) => void }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % games.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + games.length) % games.length);
  };

  return (
    <div 
      className="fade-up relative group" 
      style={{ opacity: 0, animationDelay: '0ms' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Slider viewport */}
      <div 
        className="overflow-hidden rounded-[32px] transition-all duration-500"
        style={{
          boxShadow: hovered
            ? `0 32px 64px ${games[activeIdx].color1}30, 0 8px 24px rgba(0,0,0,0.08)`
            : '0 8px 32px rgba(0,0,0,0.07)',
          transform: hovered ? 'scale(1.01)' : 'scale(1)',
        }}
      >
        {/* Sliding track */}
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-full"
          style={{ transform: `translateX(-${activeIdx * 100}%)` }}
        >
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => onGameSelect(game)}
              className="w-full flex-shrink-0 block cursor-pointer"
            >
              {/* Full glass surface */}
              <div className="glass-dark relative overflow-hidden h-full">
                {/* Cover area */}
                <div className="relative overflow-hidden w-full" style={{ aspectRatio: '21/8' }}>
                  <GameCover
                    src={game.scene || game.cover}
                    alt={game.title}
                    color1={game.color1}
                    color2={game.color2}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {game.scene && (
                    <span className="absolute top-4 right-4 rounded-md bg-black/60 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md shadow-sm">
                      GAMEPLAY PREVIEW
                    </span>
                  )}
                  {/* Gradient to glass bottom */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.96) 100%)' }}
                  />
                </div>

                {/* Info section */}
                <div className="px-8 pb-8 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Category pill */}
                      <span
                        className="mb-3 inline-block rounded-full px-3 py-1 text-[11px] font-semibold"
                        style={{
                          background: `${game.color1}18`,
                          color: game.textAccent,
                          border: `1px solid ${game.color1}30`,
                        }}
                      >
                        ✦ Featured · {game.category}
                      </span>
                      <h2 className="mb-1 text-2xl font-bold tracking-tight text-[#1c1c1e]">{game.title}</h2>
                      <p className="mb-2 text-[12px] text-[#8e8e93]">{game.developer}</p>
                      <p className="text-sm leading-relaxed text-[#48484a]">{game.description}</p>
                    </div>

                    {/* Play button */}
                    <div className="ml-8 flex-shrink-0">
                      <button
                        className="flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${CMU_GOLD}, ${CMU_DARK})`,
                          boxShadow: `0 4px 16px ${game.color1}33`,
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                        Play Free
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex gap-2">
                    {game.tags.map(t => (
                      <span key={t} className="rounded-full px-3 py-1 text-[11px] font-medium text-[#6e6e73]" style={{ background: 'rgba(0,0,0,0.05)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute -left-5 top-[35%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.08)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <button
        onClick={next}
        className="absolute -right-5 top-[35%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.08)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>

      {/* Dot Pagination */}
      <div className="pointer-events-none absolute bottom-8 right-8 flex gap-1.5 z-10">
        {games.map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === activeIdx ? 16 : 6,
              background: i === activeIdx ? CMU_GOLD : 'rgba(0,0,0,0.15)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ——— Steam-style Carousel ——————————————————————————————
const ScrollRow = ({ onGameSelect }: { onGameSelect: (game: Game) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const CARD_W = 310; // card width + gap

  const scrollTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, games.length - 1));
    setActiveIdx(clamped);
    scrollRef.current?.scrollTo({ left: clamped * (CARD_W + 16), behavior: 'smooth' });
  };

  const onScroll = () => {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / (CARD_W + 16));
    setActiveIdx(idx);
  };

  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#aeaeb2]">
        Browse All Games
      </p>

      {/* Carousel wrapper — relative so arrows can be overlaid */}
      <div className="relative">

        {/* Left Arrow */}
        <button
          onClick={() => scrollTo(activeIdx - 1)}
          disabled={activeIdx === 0}
          className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-30"
          style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scrollTo(activeIdx + 1)}
          disabled={activeIdx >= games.length - 1}
          className="absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-30"
          style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto px-1 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
        >
          {games.map((game, i) => (
            <div
              key={game.id}
              onClick={() => onGameSelect(game)}
              className="group flex-shrink-0 overflow-hidden rounded-[20px] transition-all duration-300 cursor-pointer"
              style={{
                width: CARD_W,
                scrollSnapAlign: 'start',
                transform: i === activeIdx ? 'scale(1.02)' : 'scale(0.97)',
                opacity: i === activeIdx ? 1 : 0.75,
                transition: 'transform 0.4s ease, opacity 0.4s ease, box-shadow 0.3s ease',
                boxShadow: i === activeIdx
                  ? `0 16px 40px ${game.color1}40`
                  : '0 4px 16px rgba(0,0,0,0.06)',
              }}
            >
              <div className="glass-dark h-full overflow-hidden rounded-[20px]">
                {/* Cover image — portrait-ish ratio like Steam */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <GameCover
                    key={game.id}
                    src={game.scene || game.cover}
                    alt={game.title}
                    color1={game.color1}
                    color2={game.color2}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {/* Bottom gradient */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(255,255,255,0.98) 100%)' }}/>
                  {/* Category badge */}
                  <span
                    className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                    style={{ background: game.color1, backdropFilter: 'blur(8px)' }}
                  >
                    {game.category}
                  </span>
                </div>

                {/* Info */}
                <div className="px-4 pb-5 pt-3">
                  <h3 className="mb-1 text-[15px] font-bold tracking-tight text-[#1c1c1e]">{game.title}</h3>
                  <p className="mb-3 line-clamp-2 text-[11px] leading-relaxed text-[#6e6e73]">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold" style={{ color: game.color1 }}>Free to Play</span>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                      style={{ background: game.color1 }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Pagination */}
        <div className="mt-4 flex justify-center gap-2">
          {games.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIdx ? 20 : 6,
                height: 6,
                background: i === activeIdx ? CMU_GOLD : 'rgba(0,0,0,0.15)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ——— App ————————————————————————————————————————————
export default function App() {
  const [query, setQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const featured = games.find(g => g.featured)!;

  // Real-time filtering logic
  const filtered = query.trim()
    ? games.filter(g => {
        const q = query.toLowerCase();
        return (
          g.title.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.developer.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some(t => t.toLowerCase().includes(q))
        );
      })
    : null;

  const isSearching = filtered !== null;

  if (selectedGame) {
    return <GameDetailPage game={selectedGame} onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f5f5f7]">

      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob1 absolute -top-48 -left-48 h-[700px] w-[700px] rounded-full opacity-[0.25]"
          style={{ background: 'radial-gradient(circle, #e8c97a, transparent 70%)' }} />
        <div className="blob2 absolute -right-48 top-32 h-[600px] w-[600px] rounded-full opacity-[0.18]"
          style={{ background: 'radial-gradient(circle, #d4a840, transparent 70%)' }} />
        <div className="blob3 absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full opacity-[0.2]"
          style={{ background: 'radial-gradient(circle, #c8922a, transparent 70%)' }} />
        <div className="blob1 absolute right-1/4 bottom-32 h-[400px] w-[400px] rounded-full opacity-[0.15]"
          style={{ background: 'radial-gradient(circle, #f0d898, transparent 70%)' }} />
        <div className="blob2 absolute left-1/2 top-1/3 h-[350px] w-[350px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #b07818, transparent 70%)' }} />
      </div>

      {/* Navbar — liquid glass pill */}
      <nav className="sticky top-0 z-50 flex justify-center px-6 pt-4">
        <div className="glass-pill flex w-full max-w-6xl items-center gap-4 rounded-[20px] px-6 py-3 shadow-sm"
          style={{ borderColor: 'rgba(200,146,42,0.25)' }}>
          
          {/* Left: Logo */}
          <div className="flex flex-1 items-center justify-start">
            <img
              src="/nurselogo.png"
              alt="NurseCMU Logo"
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* Middle: Functional Search Input */}
          <div className="relative flex w-full max-w-md flex-shrink-0 items-center">
            <svg
              className="pointer-events-none absolute left-3 text-[#aeaeb2]"
              width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search games…"
              className="w-full rounded-full py-1.5 pl-8 pr-8 text-[12px] font-medium text-[#1c1c1e] outline-none transition placeholder:text-[#aeaeb2]"
              style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.07)' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 flex h-4 w-4 items-center justify-center rounded-full text-white transition hover:opacity-80"
                style={{ background: '#aeaeb2' }}
              >
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {/* Right: Name */}
          <div className="flex flex-1 items-center justify-end">
            <span className="flex-shrink-0 text-[15px] font-bold tracking-tight" style={{ color: CMU_DARK }}>
              NurseGame <span style={{ color: CMU_GOLD }}>Hub</span>
            </span>
          </div>

        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-6xl space-y-10 px-6 py-10">

        {/* Search results view */}
        {isSearching ? (
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#aeaeb2]">
              {filtered!.length > 0
                ? `${filtered!.length} result${filtered!.length > 1 ? 's' : ''} for "${query}"`
                : `No results for "${query}"`}
            </p>

            {filtered!.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-3 text-center text-[#aeaeb2]">Search results are active. Clear search to see all games again.</div>
              </div>
            ) : (
              /* Empty state */
              <div className="glass flex flex-col items-center justify-center rounded-[24px] py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(0,0,0,0.05)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#aeaeb2" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <p className="text-[15px] font-semibold text-[#3c3c43]">No games found</p>
                <p className="mt-1 text-[13px] text-[#aeaeb2]">Try searching for a title, category, or tag</p>
                <button
                  onClick={() => setQuery('')}
                  className="mt-5 rounded-full px-5 py-2 text-[13px] font-semibold text-white transition hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${CMU_GOLD}, ${CMU_DARK})` }}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Default view */
          <>
            {/* Featured */}
            <div>
              <p className="fade-up mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#aeaeb2]"
                style={{ opacity: 0, animationDelay: '0ms' }}>
                Featured
              </p>
              <FeaturedCarousel games={games} onGameSelect={setSelectedGame} />
            </div>

            {/* ── Horizontal Scroll Row only ── */}
            <ScrollRow onGameSelect={setSelectedGame} />
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 py-8 text-center">
        <p className="text-[11px] text-[#c7c7cc]">
          © 2026 Faculty of Nursing, Chiang Mai University
        </p>
      </footer>
    </div>
  );
}
