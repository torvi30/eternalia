import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Terminal } from 'lucide-react';

export default function Footer({ onOpenContact, onOpenInvestors }) {
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-slate-100 dark:bg-[#07070a] border-t border-black/[0.08] dark:border-white/[0.08] pt-16 pb-12 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-black/[0.06] dark:border-white/[0.06]">
          
          {/* Brand Info (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
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

            <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              {t.footer.brandDesc}
            </p>

            {/* System Status Pill */}
            <a 
              href="#infraestructura"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-emerald-500/30 text-zinc-700 dark:text-zinc-300 text-xs font-mono transition-colors shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{t.footer.systemStatus}</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <a href="#productos-disponibles" className="hover:text-zinc-900 dark:text-white transition-colors">
                  {language === 'es' ? 'Productos & Software' : 'Products & Software'}
                </a>
              </li>
              <li>
                <Link to="/restaurantes" className="hover:text-zinc-900 dark:text-white transition-colors">
                  {language === 'es' ? 'Software Restaurantes' : 'Restaurant Software'}
                </Link>
              </li>
              <li>
                <a href="#empresas" className="hover:text-zinc-900 dark:text-white transition-colors">
                  {language === 'es' ? 'Empresas & Clientes' : 'Client Network'}
                </a>
              </li>
              <li>
                <a href="#infraestructura" className="hover:text-zinc-900 dark:text-white transition-colors">
                  {t.nav.statusBtn || "Estado Servidores (SLA)"}
                </a>
              </li>
              <li>
                <button onClick={onOpenInvestors} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left cursor-pointer">
                  {t.nav.investorsBtn || "Relación Inversionistas"}
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-zinc-900 dark:hover:text-white transition-colors text-left cursor-pointer">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Business Verticals */}
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              {t.footer.verticalsTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link to="/restaurantes" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-1.5 font-semibold text-orange-600 dark:text-orange-400">
                  <span>🍽️ Eternalia Food OS (Restaurantes)</span>
                </Link>
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                Eternalia Services
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                Mello's Truck Telematics
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                Banquetes Armar ERP
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                Directorio Marinilla Digital
              </li>
            </ul>
          </div>

          {/* Governance / Legal */}
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                {t.footer.privacy}
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                {t.footer.terms}
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                {t.footer.security}
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
                <Terminal className="w-3 h-3" />
                <span>API Status & Uptime (99.98%)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & engineering mark */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <p>
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <span>Diseñado con precisión e ingeniería en Antioquia para el mundo</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
