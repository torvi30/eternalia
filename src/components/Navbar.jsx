import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  ShieldCheck
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
    window.addEventListener('scroll', handleScroll);
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
      
      {/* HEADER FIJO Y MINIMALISTA */}
      <header className={`transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-white/90 dark:bg-[#09090d]/90 backdrop-blur-2xl border-b border-black/[0.08] dark:border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
          : 'py-3.5 sm:py-4 bg-white/70 dark:bg-[#09090d]/60 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.04]'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logotipo Tipográfico de Eternalia */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-white dark:bg-[#0c0d14] rounded-[10px] flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-cyan-300 transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                  Eternalia
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-cyan-400">
                  {language === 'es' ? 'Plataforma Digital' : 'Digital Platform'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Azul Elegante y Corporativo) */}
            <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-zinc-900/80 border border-black/10 dark:border-white/10 backdrop-blur-md shadow-sm">
              <button
                onClick={() => scrollTo('empresas')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                <span>{language === 'es' ? 'Empresas & Clientes' : 'Client Network'}</span>
              </button>

              <button
                onClick={() => scrollTo('productos-disponibles')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.35)] transition-all cursor-pointer active:scale-95"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-cyan-200" />
                <span>{language === 'es' ? 'Restaurantes' : 'Restaurants'}</span>
              </button>

              <button
                onClick={() => scrollTo('directorio-local')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                <span>{language === 'es' ? 'Directorio Comercial' : 'Commercial Directory'}</span>
              </button>

              <button
                onClick={() => scrollTo('seguridad')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 dark:text-cyan-400" />
                <span>{language === 'es' ? 'Seguridad' : 'Security'}</span>
              </button>
            </nav>

            {/* Right Area: Modo Claro/Oscuro + Idioma + Comenzar Proyecto */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* THEME TOGGLE (Sun / Moon) */}
              <button
                onClick={toggleTheme}
                type="button"
                id="theme-toggle-btn"
                title={isDark ? (language === 'es' ? 'Cambiar a modo claro' : 'Switch to Light Mode') : (language === 'es' ? 'Cambiar a modo oscuro' : 'Switch to Dark Mode')}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer shadow-sm active:scale-95"
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
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 border border-black/10 dark:border-white/10 transition-all text-xs font-mono text-zinc-700 dark:text-zinc-300 shadow-sm cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 shrink-0" />
                <span className={language === 'es' ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500'}>ES</span>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
                <span className={language === 'en' ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500'}>EN</span>
              </button>

              {/* Botón Principal de Contacto / Comenzar */}
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_22px_rgba(6,182,212,0.5)] transition-all cursor-pointer active:scale-95"
              >
                <span>{language === 'es' ? 'Comenzar' : 'Start'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

          {/* Mobile Navigation Strip: Siempre accesible en celulares sin menú hamburguesa ni 3 rayitas */}
          <nav 
            aria-label="Navegación móvil rápida"
            className="md:hidden mt-2.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] overflow-x-auto no-scrollbar"
          >
            <div className="flex items-center gap-1.5 pb-0.5 px-0.5 min-w-max">
              <button
                onClick={() => scrollTo('empresas')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-slate-100/90 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 rounded-full shrink-0 active:scale-95 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                <span>{language === 'es' ? 'Empresas & Clientes' : 'Empresas'}</span>
              </button>

              <button
                onClick={() => scrollTo('productos-disponibles')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.35)] shrink-0 active:scale-95 cursor-pointer"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-cyan-200" />
                <span>{language === 'es' ? 'Restaurantes' : 'Restaurants'}</span>
              </button>

              <button
                onClick={() => scrollTo('directorio-local')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-slate-100/90 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 rounded-full shrink-0 active:scale-95 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                <span>{language === 'es' ? 'Directorio Comercial' : 'Directorio'}</span>
              </button>

              <button
                onClick={() => scrollTo('seguridad')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-slate-100/90 dark:bg-zinc-900/90 border border-black/10 dark:border-white/10 rounded-full shrink-0 active:scale-95 cursor-pointer"
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
