import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { marinillaBusinesses as defaultBusinesses } from '../data/marinillaBusinesses';
import { getBusinesses } from '../services/businessService';
import { 
  Building2, 
  ArrowUpRight, 
  Sparkles
} from 'lucide-react';

export default function CompanyMarquee() {
  const { language } = useLanguage();
  const [businesses, setBusinesses] = useState(defaultBusinesses);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    // Load businesses from directory service (supports Firestore or local storage)
    getBusinesses().then((data) => {
      if (data && data.length > 0) {
        setBusinesses(data);
      }
    });

    // Listen for live updates
    const handleUpdate = () => {
      getBusinesses().then((data) => {
        if (data && data.length > 0) {
          setBusinesses(data);
        }
      });
    };

    window.addEventListener('eternalia_businesses_updated', handleUpdate);
    return () => window.removeEventListener('eternalia_businesses_updated', handleUpdate);
  }, []);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const getInitials = (name) => {
    if (!name) return 'ET';
    const clean = name.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/);
    if (clean.length === 1) return clean[0].substring(0, 2).toUpperCase();
    return (clean[0][0] + clean[1][0]).toUpperCase();
  };

  // Build duplicated arrays for continuous infinite marquee looping
  const row1Items = [...businesses, ...businesses, ...businesses];
  const row2Items = [...businesses.slice().reverse(), ...businesses.slice().reverse(), ...businesses.slice().reverse()];

  const renderCard = (biz, uniqueKey) => {
    const hasValidLogo = biz.logo && !imageErrors[biz.id];
    const targetUrl = biz.websiteUrl || (biz.whatsapp ? `https://wa.me/${biz.whatsapp}` : '#');
    const category = language === 'es' ? (biz.categoryLabelEs || biz.category) : (biz.categoryLabelEn || biz.category);
    const subtitle = language === 'es' ? (biz.tags?.[0] || biz.descriptionEs) : (biz.tags?.[0] || biz.descriptionEn);

    return (
      <a
        key={uniqueKey}
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/95 dark:bg-zinc-900/85 hover:bg-white dark:hover:bg-zinc-800/95 border border-black/[0.08] dark:border-white/[0.08] hover:border-cyan-500/40 dark:hover:border-cyan-500/40 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 w-[290px] sm:w-[330px] shrink-0 mx-2 select-none transform hover:-translate-y-1"
      >
        {/* Logo Container (Image URL or Monogram) */}
        <div className="relative w-12 h-12 rounded-xl shrink-0 p-[1.5px] bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 group-hover:from-cyan-500 group-hover:to-indigo-500 transition-colors shadow-inner">
          <div className="w-full h-full rounded-[10px] bg-slate-50 dark:bg-zinc-950 flex items-center justify-center overflow-hidden">
            {hasValidLogo ? (
              <img
                src={biz.logo}
                alt={biz.name}
                onError={() => handleImageError(biz.id)}
                className="w-full h-full object-contain p-1 rounded-lg"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-tr ${biz.logoColor || 'from-indigo-600 to-cyan-500'} flex items-center justify-center text-white font-black text-xs sm:text-sm tracking-wider shadow-inner`}>
                {getInitials(biz.name)}
              </div>
            )}
          </div>
        </div>

        {/* Business Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors truncate">
              {biz.name}
            </h4>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </div>

          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-black/5 dark:border-white/5 mb-1 truncate max-w-full">
            {category}
          </span>

          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
            {subtitle}
          </p>
        </div>
      </a>
    );
  };

  return (
    <section id="empresas" className="py-20 relative overflow-hidden scroll-mt-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/5 to-purple-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10 text-center">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-700 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase mb-3.5">
          <Building2 className="w-3.5 h-3.5" />
          <span>{language === 'es' ? 'RED DE COMERCIOS & EMPRESAS' : 'BUSINESS & MERCHANT NETWORK'}</span>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
          {language === 'es' ? 'Comercios Conectados a Nuestra Red' : 'Businesses Connected to Our Network'}
        </h2>

        {/* Section Subtitle */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          {language === 'es'
            ? 'Empresas y comercios locales con landings activas, catálogos digitales interactivos y canales de atención directa sin intermediarios.'
            : 'Local merchants and brands with active landing pages, digital catalogs, and direct contact channels without middlemen.'}
        </p>
      </div>

      {/* Marquee Full-Width Stage with Lateral Fade Gradients */}
      <div className="relative w-full overflow-hidden marquee-container py-3">
        {/* Left Fade Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 md:w-48 bg-gradient-to-r from-slate-50 dark:from-[#09090b] to-transparent z-20" />

        {/* Right Fade Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 md:w-48 bg-gradient-to-l from-slate-50 dark:from-[#09090b] to-transparent z-20" />

        {/* Row 1: Moving Right to Left */}
        <div className="flex mb-4">
          <div className="marquee-track">
            {row1Items.map((biz, index) => renderCard(biz, `row1-${biz.id}-${index}`))}
          </div>
        </div>

        {/* Row 2: Moving Left to Right */}
        <div className="flex">
          <div className="marquee-track-reverse">
            {row2Items.map((biz, index) => renderCard(biz, `row2-${biz.id}-${index}`))}
          </div>
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="text-center mt-6 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
        <span>
          {language === 'es' 
            ? 'Haz clic en cualquier comercio para abrir su landing page o contacto directo' 
            : 'Click any business to open their live landing page or direct contact'}
        </span>
      </div>
    </section>
  );
}
