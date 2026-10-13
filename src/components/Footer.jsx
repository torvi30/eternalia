import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Activity, ShieldCheck, Heart, Terminal } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-[#07070a] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/[0.06]">
          
          {/* Brand Info (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Eternalia
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300">
                Holding
              </span>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              {t.footer.brandDesc}
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-emerald-500/30 text-zinc-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">{t.footer.systemStatus}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#ecosistema" className="hover:text-white transition-colors">
                  {t.nav.ecosystem}
                </a>
              </li>
              <li>
                <a href="#directorio" className="hover:text-white transition-colors">
                  {t.nav.directory}
                </a>
              </li>
              <li>
                <a href="#tecnologia" className="hover:text-white transition-colors">
                  {t.nav.tech}
                </a>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors text-left">
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Business Verticals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.verticalsTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                Eternalia Food & POS
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Eternalia Services
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Mello's Truck Telematics
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Banquetes Armar ERP
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Directorio Marinilla Digital
              </li>
            </ul>
          </div>

          {/* Governance / Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                {t.footer.privacy}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                {t.footer.terms}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                {t.footer.security}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-indigo-400">
                <Terminal className="w-3 h-3" />
                <span>API Status & Uptime</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & engineering mark */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <p>
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-1 text-zinc-400">
            <span>Diseñado con precisión e ingeniería en Antioquia para el mundo</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
