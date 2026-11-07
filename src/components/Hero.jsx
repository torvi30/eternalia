import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  UtensilsCrossed
} from 'lucide-react';

export default function Hero({ onOpenContact, onExploreClick, onDemoClick }) {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top High-Tech Holding Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-indigo-500/30 shadow-[0_4px_20px_rgba(99,102,241,0.15)] dark:shadow-[0_0_25px_rgba(99,102,241,0.2)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-indigo-700 dark:text-indigo-200 uppercase">
              {t.hero.badge}
            </span>
            <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700 mx-0.5" />
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono hidden sm:inline flex items-center gap-1">
              <span className="text-emerald-500 dark:text-emerald-400">●</span> Multi-Tenant Mesh
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

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            
            {/* Primary CTA with glowing shine */}
            <a
              href="#productos-disponibles"
              onClick={onExploreClick}
              className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.35)] dark:shadow-[0_0_30px_rgba(99,102,241,0.45)] hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA: Software para Restaurantes */}
            <Link
              to="/restaurantes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-900/90 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-black/10 dark:border-white/10 hover:border-orange-500/40 transition-all duration-200 backdrop-blur-md shadow-md"
            >
              <UtensilsCrossed className="w-4 h-4 text-orange-500" />
              <span>{language === 'es' ? 'Software para Restaurantes' : 'Restaurant Software'}</span>
            </Link>

            {/* Tertiary CTA: Red de Empresas & Clientes */}
            <a
              href="#empresas"
              onClick={onDemoClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 bg-slate-100/80 dark:bg-zinc-900/50 hover:bg-slate-200 dark:hover:bg-zinc-800/80 border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 transition-all duration-200 backdrop-blur-md hover:text-zinc-900 dark:hover:text-white text-xs sm:text-sm cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{t.hero.ctaSecondary}</span>
            </a>

            {/* Investor CTA */}
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-300 border border-transparent hover:border-indigo-500/20 transition-all cursor-pointer"
            >
              <span>{t.hero.ctaPartner}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
