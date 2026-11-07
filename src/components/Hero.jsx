import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  Sparkles, 
  UtensilsCrossed
} from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-indigo-500/30 shadow-[0_4px_20px_rgba(99,102,241,0.15)] dark:shadow-[0_0_25px_rgba(99,102,241,0.2)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-indigo-700 dark:text-indigo-200 uppercase">
              {t.hero.badge}
            </span>
            <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700 mx-0.5" />
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono hidden sm:inline flex items-center gap-1">
              <span className="text-emerald-500 dark:text-emerald-400">●</span> {t.hero.badgeStatus}
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
            <span className="text-zinc-900 dark:text-white block font-extrabold transition-colors">
              {t.hero.titlePart1}
            </span>
            <span className="gradient-text-accent block">
              {t.hero.titlePart2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal transition-colors">
            {t.hero.subtitle}
          </p>

          {/* Action CTAs: 2 Clear, High-Converting Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            
            {/* Primary CTA: Software para Restaurantes */}
            <Link
              to="/restaurantes"
              className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-400 transition-all duration-300 shadow-[0_4px_25px_rgba(249,115,22,0.35)] dark:shadow-[0_0_30px_rgba(249,115,22,0.45)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
            >
              <UtensilsCrossed className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA: Explorar Productos & Demos */}
            <a
              href="#productos-disponibles"
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-zinc-800 dark:text-zinc-100 bg-white/90 dark:bg-zinc-900/90 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 backdrop-blur-md shadow-sm text-sm sm:text-base cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{t.hero.ctaSecondary}</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
