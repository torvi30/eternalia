import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Sparkles, 
  Globe, 
  Menu, 
  X, 
  ArrowUpRight, 
  TrendingUp,
  Mail,
  Sun,
  Moon,
  UtensilsCrossed,
  Building2,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ onOpenContact, onOpenInvestors }) {
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  const scrollTo = (id) => {
    setDrawerOpen(false);
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
          : 'py-4 bg-white/70 dark:bg-[#09090d]/60 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.04]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logotipo Tipográfico de Eternalia */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <div className="w-full h-full bg-white dark:bg-[#0c0d14] rounded-[10px] flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-indigo-600 dark:text-white transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
                    Eternalia
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
                    {language === 'es' ? 'Plataforma Digital' : 'Digital Platform'}
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
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

            {/* Right Header Area: Modo Claro/Oscuro + Idioma + Contacto + Hamburguesa (Móvil) */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 border border-black/10 dark:border-white/10 transition-all text-xs font-mono text-zinc-700 dark:text-zinc-300 shadow-sm cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className={language === 'es' ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500'}>ES</span>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
                <span className={language === 'en' ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500'}>EN</span>
              </button>

              {/* Botón Principal de Contacto / Comenzar */}
              <button
                onClick={onOpenContact}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_22px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
              >
                <span>{language === 'es' ? 'Comenzar Proyecto' : 'Start Project'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Botón Hamburguesa Minimalista Accesible (SOLO EN MÓVIL / TABLET PEQUEÑA) */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer active:scale-95"
                aria-label="Abrir Menú de Navegación"
              >
                <Menu className="w-5 h-5" />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* MENÚ DESPLEGABLE MÓVIL (DRAWER LATERAL FLUIDO) */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          
          {/* Backdrop Blur */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-sm transition-opacity" 
          />

          {/* Panel Lateral Drawer */}
          <div className="relative w-full max-w-sm h-full bg-white dark:bg-[#0c0d13] text-zinc-900 dark:text-white border-l border-black/10 dark:border-white/15 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-in slide-in-from-right duration-300">
            
            {/* Top Bar del Drawer */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-black/10 dark:border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px]">
                    <div className="w-full h-full bg-white dark:bg-[#09090e] rounded-[10px] flex items-center justify-center font-bold text-indigo-600 dark:text-white text-xs">
                      E
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">Eternalia</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{language === 'es' ? 'Menú Principal' : 'Main Menu'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Theme toggle inside drawer */}
                  <button
                    onClick={toggleTheme}
                    type="button"
                    title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/10 dark:border-white/10 transition-colors cursor-pointer"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                  </button>

                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/10 dark:border-white/10 transition-colors cursor-pointer"
                    aria-label="Cerrar Menú"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* SECCIÓN: NAVEGACIÓN PRINCIPAL */}
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold block mb-3">
                  {language === 'es' ? 'Soluciones & Módulos' : 'Solutions & Modules'}
                </span>

                <div className="space-y-2.5">
                  {/* Botón Destacado: Software para Restaurantes */}
                  <Link
                    to="/restaurantes"
                    onClick={() => setDrawerOpen(false)}
                    className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50 border border-orange-500/30 hover:border-orange-500 text-left transition-all flex items-center justify-between cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400">
                        <UtensilsCrossed className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white block group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                          {language === 'es' ? '🍽️ Software Restaurantes' : '🍽️ Restaurant Software'}
                        </span>
                        <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
                          {language === 'es' ? 'Menú QR, pedidos WhatsApp, comandas' : 'QR menu, WhatsApp orders, kitchen tickets'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  {/* Botón: Directorio Comercial Local */}
                  <button
                    onClick={() => scrollTo('directorio-local')}
                    className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-500/30 hover:border-emerald-500 text-left transition-all flex items-center justify-between cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white block group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                          {language === 'es' ? '📍 Directorio Local & Ofertas' : '📍 Local Directory & Deals'}
                        </span>
                        <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
                          {language === 'es' ? 'Comercios de tu pueblo y promociones' : 'Town businesses & live promos'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                  </button>

                  {/* Botón Principal: Productos Disponibles */}
                  <button
                    onClick={() => scrollTo('productos-disponibles')}
                    className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-950/60 dark:to-cyan-950/60 border border-cyan-500/30 hover:border-cyan-500 text-left transition-all flex items-center justify-between cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-300">
                        <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white block group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
                          {language === 'es' ? 'Productos & Software' : 'Software & Products'}
                        </span>
                        <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
                          {language === 'es' ? 'Menú digital, catálogos y vitrina web' : 'Digital menu, catalogs & web showcase'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => scrollTo('empresas')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-950/70 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 text-left transition-all cursor-pointer shadow-sm"
                  >
                    <Building2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 mb-1.5" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                      {language === 'es' ? 'Empresas' : 'Businesses'}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {language === 'es' ? 'Red de Clientes' : 'Client Network'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenContact();
                    }}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-950/70 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 text-left transition-all cursor-pointer shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mb-1.5" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                      {language === 'es' ? 'Contacto' : 'Contact'}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {language === 'es' ? 'Dirección' : 'Leadership'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenInvestors();
                    }}
                    className="col-span-2 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-950/70 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 text-left transition-all cursor-pointer shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                          {language === 'es' ? 'Inversores & Alianzas' : 'Investors & Partnerships'}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {language === 'es' ? 'Oportunidades de expansión institucional' : 'Institutional growth'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Pie del Drawer: Comenzar Legado / Contacto */}
            <div className="pt-5 border-t border-black/10 dark:border-white/10 space-y-2.5">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>{language === 'es' ? 'Comenzar Proyecto / Contactar' : 'Start Project / Contact Us'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <span className="text-[10px] text-zinc-500 font-mono">
                  {language === 'es' ? 'Eternalia • Todos los derechos reservados' : 'Eternalia • All rights reserved'}
                </span>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
