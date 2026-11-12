import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Globe, 
  ArrowUpRight, 
  Sun, 
  Moon, 
  UtensilsCrossed,
  MapPin,
  Building2,
  ShieldCheck,
  Headphones,
  Sparkles
} from 'lucide-react';

export default function Navbar({ onOpenContact }) {
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      
      {/* Enterprise Header Bar (Estilo ServiceNow / Stripe) */}
      <header className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-[#09090e]/90 backdrop-blur-2xl border-b border-slate-200/80 dark:border-zinc-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-2.5 sm:py-3' 
          : 'bg-white/75 dark:bg-[#09090e]/70 backdrop-blur-md border-b border-slate-200/50 dark:border-white/[0.06] py-3 sm:py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            
            {/* 1. Logotipo Corporativo Eternalia */}
            <Link 
              to="/" 
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 focus:outline-none"
              aria-label="Eternalia Inicio"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(37,99,235,0.35)] transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-white dark:bg-[#0c0d14] rounded-[10px] flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-blue-600 dark:text-cyan-300 transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-zinc-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                  Eternalia
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-cyan-400 font-mono">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                  <span>{language === 'es' ? 'PLATAFORMA SAAS' : 'SAAS PLATFORM'}</span>
                </span>
              </div>
            </Link>

            {/* 2. Desktop Navigation Menu (Estilo Enterprise Horizon) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-zinc-900/80 border border-slate-200/60 dark:border-white/10 backdrop-blur-md shadow-inner">
              <button
                onClick={() => scrollTo('empresas')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-300 rounded-full hover:bg-white dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                <span>{language === 'es' ? 'Empresas & Clientes' : 'Client Network'}</span>
              </button>

              <button
                onClick={() => scrollTo('productos-disponibles')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.35)] transition-all cursor-pointer active:scale-95"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-cyan-200" />
                <span>{language === 'es' ? 'Restaurantes OS' : 'Restaurants OS'}</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-white/20 rounded-full text-white ml-0.5">
                  Pro
                </span>
              </button>

              <button
                onClick={() => scrollTo('directorio-local')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-300 rounded-full hover:bg-white dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                <span>{language === 'es' ? 'Directorio Comercial' : 'Commercial Directory'}</span>
              </button>

              <button
                onClick={() => scrollTo('seguridad')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-300 rounded-full hover:bg-white dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                <span>{language === 'es' ? 'Seguridad & SLA' : 'Security & SLA'}</span>
              </button>
            </nav>

            {/* 3. Acciones Enterprise: Asesor + Demo + Switches */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              
              {/* THEME TOGGLE (Modo Claro / Oscuro) */}
              <button
                onClick={toggleTheme}
                type="button"
                id="theme-toggle-btn"
                title={isDark ? (language === 'es' ? 'Cambiar a modo claro' : 'Switch to Light Mode') : (language === 'es' ? 'Cambiar a modo oscuro' : 'Switch to Dark Mode')}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                type="button"
                id="lang-toggle-btn"
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                className="flex items-center gap-1 px-2.5 sm:px-3 h-8 sm:h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all text-xs font-mono text-zinc-700 dark:text-zinc-300 shadow-sm cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0" />
                <span className={language === 'es' ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500'}>ES</span>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
                <span className={language === 'en' ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500'}>EN</span>
              </button>

              {/* Botón Secundario Enterprise: Hablar con Asesor */}
              <button
                onClick={onOpenContact}
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 h-8 sm:h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
              >
                <Headphones className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                <span>{language === 'es' ? 'Hablar con Asesor' : 'Talk to Advisor'}</span>
              </button>

              {/* Botón Primario Enterprise: Comenzar / Solicitar Demo */}
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 h-8 sm:h-9 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer active:scale-95"
              >
                <span>{language === 'es' ? 'Solicitar Demo' : 'Get a Demo'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200" />
              </button>

            </div>

          </div>

          {/* 4. Mobile Navigation Rail (Accesible sin menús hamburguesa ocultos) */}
          <nav 
            aria-label="Navegación móvil rápida"
            className="lg:hidden mt-2 pt-2 border-t border-slate-200/60 dark:border-white/[0.06] overflow-x-auto no-scrollbar"
          >
            <div className="flex items-center gap-1.5 pb-0.5 px-0.5 min-w-max">
              <button
                onClick={() => scrollTo('empresas')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-full shrink-0 active:scale-95 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                <span>{language === 'es' ? 'Empresas' : 'Companies'}</span>
              </button>

              <button
                onClick={() => scrollTo('productos-disponibles')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-sm shrink-0 active:scale-95 cursor-pointer"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-cyan-200" />
                <span>{language === 'es' ? 'Restaurantes OS' : 'Restaurants'}</span>
              </button>

              <button
                onClick={() => scrollTo('directorio-local')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-full shrink-0 active:scale-95 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                <span>{language === 'es' ? 'Directorio' : 'Directory'}</span>
              </button>

              <button
                onClick={() => scrollTo('seguridad')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-full shrink-0 active:scale-95 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                <span>{language === 'es' ? 'Seguridad' : 'Security'}</span>
              </button>
            </div>
          </nav>

        </div>
      </header>

    </div>
  );
}
