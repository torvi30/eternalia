import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Globe, 
  ArrowUpRight, 
  Sun, 
  Moon, 
  UtensilsCrossed 
} from 'lucide-react';

export default function Navbar({ onOpenContact }) {
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
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
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <div className="w-full h-full bg-white dark:bg-[#0c0d14] rounded-[10px] flex items-center justify-center transition-colors">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-white transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
                  Eternalia
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
                  {language === 'es' ? 'Plataforma Digital' : 'Digital Platform'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Píldora Central Elegante) */}
            <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-zinc-950/70 border border-black/[0.06] dark:border-white/[0.08] backdrop-blur-md shadow-sm">
              <button
                onClick={() => scrollTo('productos-disponibles')}
                className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                {language === 'es' ? 'Productos' : 'Products'}
              </button>

              <Link
                to="/restaurantes"
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/25 rounded-full transition-all"
              >
                <UtensilsCrossed className="w-3 h-3" />
                <span>{language === 'es' ? 'Restaurantes' : 'Restaurants'}</span>
              </Link>

              <button
                onClick={() => scrollTo('directorio-local')}
                className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                {language === 'es' ? 'Directorio Local' : 'Local Directory'}
              </button>

              <button
                onClick={() => scrollTo('empresas')}
                className="px-3.5 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                {language === 'es' ? 'Empresas & Clientes' : 'Client Network'}
              </button>
            </nav>

            {/* Right Area: Modo Claro/Oscuro + Idioma + Comenzar Proyecto (SIN RAYITAS NI MENÚ EXTRA) */}
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
                <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className={language === 'es' ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500'}>ES</span>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
                <span className={language === 'en' ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500'}>EN</span>
              </button>

              {/* Botón Principal de Contacto / Comenzar (Visible tanto en móvil como en escritorio) */}
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_22px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
              >
                <span>{language === 'es' ? 'Comenzar' : 'Start'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>
        </div>
      </header>

    </div>
  );
}
