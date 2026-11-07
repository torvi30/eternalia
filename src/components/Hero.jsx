import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-24 pb-6 md:pt-32 md:pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-5 sm:mb-6">
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
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-5 sm:mb-6">
            <span className="text-zinc-900 dark:text-white block font-extrabold transition-colors">
              {t.hero.titlePart1}
            </span>
            <span className="gradient-text-accent block">
              {t.hero.titlePart2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 font-normal transition-colors">
            {t.hero.subtitle}
          </p>
        </div>

      </div>
    </section>
  );
}
