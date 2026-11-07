import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onOpenContact, onOpenInvestors }) {
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-slate-100 dark:bg-[#07070a] border-t border-black/[0.08] dark:border-white/[0.08] py-12 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/[0.06] dark:border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <div className="w-full h-full bg-white dark:bg-[#0d0d12] rounded-[10px] flex items-center justify-center">
                  <svg className="w-4 h-4 text-indigo-600 dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
              <span className="font-extrabold text-xl text-zinc-900 dark:text-white tracking-tight">
                Eternalia
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-700 dark:text-indigo-300">
                Holding
              </span>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Actions & Status */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-emerald-500/30 text-zinc-700 dark:text-zinc-300 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{t.footer.systemStatus}</span>
            </div>

            {onOpenInvestors && (
              <button 
                onClick={onOpenInvestors} 
                className="px-3.5 py-1.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                {t.nav.investorsBtn || "Relación Inversionistas"}
              </button>
            )}

            {onOpenContact && (
              <button 
                onClick={onOpenContact} 
                className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                {t.nav.contact}
              </button>
            )}
          </div>
        </div>

        {/* Bottom copyright & engineering mark */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <p>
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <span>{language === 'es' ? 'Diseñado con precisión e ingeniería en Antioquia para el mundo' : 'Engineered with precision in Antioquia for the world'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
