import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  UtensilsCrossed 
} from 'lucide-react';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">
              {t.hero.badge}
            </span>
            <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700 mx-0.5" />
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono hidden sm:inline flex items-center gap-1">
              <span className="text-emerald-500 dark:text-emerald-400">●</span> {t.hero.badgeStatus}
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-5 sm:mb-6">
            <span className="text-zinc-900 dark:text-white block font-extrabold transition-colors">
              {t.hero.titlePart1}
            </span>
            <span className="gradient-text-accent block">
              {t.hero.titlePart2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-8 font-normal transition-colors">
            {t.hero.subtitle}
          </p>

          {/* Action CTA: Botón directo a Gastronomía OS */}
          <div className="flex justify-center">
            <Link
              to="/restaurantes"
              className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white dark:text-zinc-950 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 transition-all duration-200 shadow-md transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base active:scale-95"
            >
              <UtensilsCrossed className="w-4 h-4 text-zinc-400 dark:text-zinc-600 group-hover:rotate-12 transition-transform" />
              <span>{language === 'es' ? 'Ver Software para Restaurantes' : 'View Restaurant Software'}</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
