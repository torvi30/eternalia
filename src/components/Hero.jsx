import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  UtensilsCrossed 
} from 'lucide-react';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-28 pb-4 sm:pt-28 md:pt-32 md:pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 dark:bg-zinc-900/90 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.2)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-blue-400 dark:text-cyan-300 uppercase">
              {t.hero.badge}
            </span>
            <div className="h-3 w-px bg-zinc-700 mx-0.5" />
            <span className="text-[11px] text-zinc-300 dark:text-zinc-400 font-mono hidden sm:inline flex items-center gap-1">
              <span className="text-cyan-400">●</span> {t.hero.badgeStatus}
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-3.5 sm:mb-4">
            <span className="text-zinc-900 dark:text-white block font-extrabold transition-colors">
              {t.hero.titlePart1}
            </span>
            <span className="gradient-text-accent block">
              {t.hero.titlePart2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-7 font-normal transition-colors">
            {t.hero.subtitle}
          </p>

          {/* Action CTA: Botón directo a Gastronomía OS (Compacto, Elegante y Centrado) */}
          <div className="flex justify-center">
            <Link
              to="/restaurantes"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5 cursor-pointer text-xs sm:text-sm active:scale-95"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-cyan-100 group-hover:rotate-12 transition-transform shrink-0" />
              <span>{language === 'es' ? 'Ver Software para Restaurantes' : 'View Restaurant Software'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-200 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
