import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Globe, 
  Menu, 
  X, 
  ArrowUpRight, 
  Layers, 
  Compass, 
  MessageSquare,
  Calculator,
  Activity,
  TrendingUp
} from 'lucide-react';

export default function Navbar({ onOpenContact, onOpenInvestors }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.ecosystem, href: "#ecosistema", icon: Layers },
    { name: t.nav.projects, href: "#proyectos", icon: Sparkles },
    { name: t.nav.quoteBtn || "Cotizador", href: "#cotizador", icon: Calculator },
    { name: t.nav.directory, href: "#directorio", icon: Compass },
    { name: t.nav.statusBtn || "Servidores", href: "#infraestructura", icon: Activity },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#09090b]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Minimalista de Eternalia con sutil brillo neón */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.35)]">
              <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                {/* Glowing subtle ring */}
                <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors" />
                {/* SVG Infinity / E stylized holding symbol */}
                <svg className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                  Eternalia
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                  Holding
                </span>
              </div>
              <span className="text-[10px] text-zinc-400 -mt-0.5 hidden sm:block tracking-wide">
                Tech Ecosystem & SaaS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-zinc-900/70 border border-white/[0.08] backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all flex items-center gap-1.5 group"
              >
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          {/* Right Area: Language Switcher + Contact CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Botón flotante selector de idioma (ES / EN) */}
            <button
              onClick={toggleLanguage}
              type="button"
              id="lang-toggle-btn"
              title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 hover:border-indigo-500/50 hover:bg-zinc-800/80 transition-all text-xs font-semibold text-zinc-200 shadow-sm cursor-pointer active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400 animate-pulse-slow" />
              <div className="flex items-center gap-1">
                <span className={`transition-colors ${language === 'es' ? 'text-white font-bold' : 'text-zinc-500'}`}>
                  ES
                </span>
                <span className="text-zinc-600 text-[10px]">/</span>
                <span className={`transition-colors ${language === 'en' ? 'text-white font-bold' : 'text-zinc-500'}`}>
                  EN
                </span>
              </div>
            </button>

            {/* Investor Relations Executive Button */}
            <button
              onClick={onOpenInvestors}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 hover:border-indigo-500/50 hover:bg-zinc-800/80 text-zinc-300 hover:text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.nav.investorsBtn || "Inversionistas"}</span>
            </button>

            {/* Partner Portal CTA */}
            <button
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_22px_rgba(99,102,241,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{t.nav.partnerBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-zinc-950/95 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 text-sm font-medium text-zinc-200 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{link.name}</span>
                </a>
              );
            })}

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInvestors();
                }}
                className="w-full py-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-white text-sm font-medium flex items-center justify-center gap-2 shadow"
              >
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>{t.nav.investorsBtn || "Relación Inversionistas"}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.nav.partnerBtn}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
