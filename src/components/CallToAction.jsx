import { useLanguage } from '../context/LanguageContext';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export default function CallToAction({ onOpenContact }) {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-indigo-50 via-white to-slate-100 dark:from-indigo-950/40 dark:via-zinc-900/60 dark:to-zinc-950/80 border border-indigo-500/20 dark:border-indigo-500/30 backdrop-blur-2xl shadow-xl dark:shadow-[0_0_60px_rgba(99,102,241,0.15)] text-center overflow-hidden">
          
          {/* Subtle neon ring in background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 blur-3xl pointer-events-none rounded-full" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.ctaSection.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-5 max-w-2xl mx-auto">
            {t.ctaSection.title}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            {t.ctaSection.subtitle}
          </p>

          <div className="flex items-center justify-center">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm sm:text-base shadow-[0_4px_25px_rgba(99,102,241,0.35)] dark:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{t.ctaSection.buttonContact}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
