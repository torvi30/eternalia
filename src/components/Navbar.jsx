import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Globe, 
  Menu, 
  X, 
  ArrowUpRight, 
  Compass, 
  Calculator, 
  Activity, 
  TrendingUp,
  ShieldCheck,
  Mail,
  BookOpen,
  QrCode,
  UserCheck,
  ChevronRight,
  LogIn,
  Lock
} from 'lucide-react';

export default function Navbar({ onOpenContact, onOpenInvestors }) {
  const { language, toggleLanguage, t } = useLanguage();
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

  // 4 Human-Centered Solutions (Welllthy / Lantern style)
  const legacySolutions = [
    {
      title: language === 'es' ? 'Cartas al Futuro' : 'Letters to the Future',
      subtitle: language === 'es' ? 'Escribe hoy, entrega programada mañana' : 'Write today, delivered tomorrow',
      icon: Mail,
      accent: 'from-amber-500 to-orange-500',
      action: () => scrollTo('ecosistema'),
    },
    {
      title: language === 'es' ? 'Legado & Memorias' : 'Legacy & Memories',
      subtitle: language === 'es' ? 'Historias, anécdotas y recetas en texto' : 'Shared stories, anecdotes and life notes',
      icon: BookOpen,
      accent: 'from-cyan-500 to-blue-500',
      action: () => scrollTo('ecosistema'),
    },
    {
      title: language === 'es' ? 'Códigos QR & Placas' : 'QR Codes & Plaques',
      subtitle: language === 'es' ? 'Conecta el mundo físico con tus memorias' : 'Bridge physical tokens with your words',
      icon: QrCode,
      accent: 'from-emerald-500 to-teal-500',
      action: () => scrollTo('directorio'),
    },
    {
      title: language === 'es' ? 'Contactos de Confianza' : 'Trusted Custodians',
      subtitle: language === 'es' ? 'Custodios de seguridad y entrega garantizada' : 'Verified custodians & guaranteed delivery',
      icon: UserCheck,
      accent: 'from-indigo-500 to-purple-500',
      action: () => scrollTo('ecosistema'),
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      
      {/* 1. SUTIL BANNER SUPERIOR DE CONFIANZA & SEGURIDAD (Inspirado en Lantern / Welllthy) */}
      <div className="bg-[#07080b] border-b border-white/[0.06] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-zinc-200 font-semibold">
              {language === 'es' ? 'Infraestructura Cifrada de Extremo a Extremo' : 'End-to-End Encrypted Infrastructure'}
            </span>
            <span className="hidden md:inline text-zinc-600">•</span>
            <span className="hidden md:inline text-zinc-400">
              {language === 'es' ? 'Custodia segura y legado digital inmutable' : 'Zero-knowledge custody & digital preservation'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[10px] text-zinc-500">
              {language === 'es' ? 'Protocolo AES-256' : 'AES-256 Protocol'}
            </span>
            <Link 
              to="/admin/login" 
              className="text-[11px] text-zinc-400 hover:text-white transition-colors flex items-center gap-1 hover:underline"
            >
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>{language === 'es' ? 'Portal de Acceso' : 'Portal Access'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. HEADER FIJO Y MINIMALISTA */}
      <header className={`transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#09090d]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
          : 'py-4 bg-[#09090d]/60 backdrop-blur-md border-b border-white/[0.04]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logotipo Tipográfico de Eternalia */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <div className="w-full h-full bg-[#0c0d14] rounded-[10px] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                    Eternalia
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                    {language === 'es' ? 'Legado & Tech' : 'Legacy & Tech'}
                  </span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links (Sobrios y Limpios) */}
            <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md">
              <button
                onClick={() => scrollTo('proyectos')}
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                {language === 'es' ? 'Soluciones' : 'Solutions'}
              </button>

              <button
                onClick={() => scrollTo('directorio')}
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                {language === 'es' ? 'Red & Placas' : 'Mesh & Directory'}
              </button>

              <button
                onClick={() => scrollTo('cotizador')}
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                {language === 'es' ? 'Cotizador' : 'Custom Quote'}
              </button>

              <button
                onClick={() => scrollTo('infraestructura')}
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                {language === 'es' ? 'Seguridad & Servidores' : 'Security & Servers'}
              </button>
            </nav>

            {/* Right Header Area: Idioma + Acceso Portal + Contacto + Hamburguesa */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                type="button"
                id="lang-toggle-btn"
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 hover:border-cyan-500/40 transition-all text-xs font-mono text-zinc-300 shadow-sm cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className={language === 'es' ? 'text-white font-bold' : 'text-zinc-500'}>ES</span>
                <span className="text-zinc-600">/</span>
                <span className={language === 'en' ? 'text-white font-bold' : 'text-zinc-500'}>EN</span>
              </button>

              {/* Botón Iniciar Sesión / Portal (Desktop) */}
              <Link
                to="/admin/login"
                className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                <span>{language === 'es' ? 'Iniciar Sesión' : 'Sign In'}</span>
              </Link>

              {/* Botón Principal de Contacto / Comenzar */}
              <button
                onClick={onOpenContact}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_22px_rgba(6,182,212,0.4)] transition-all cursor-pointer active:scale-95"
              >
                <span>{language === 'es' ? 'Comenzar Legado' : 'Start Legacy'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Botón Hamburguesa Minimalista Accesible (Móvil y Drawer) */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-300 hover:text-white hover:border-white/25 transition-all cursor-pointer active:scale-95"
                aria-label="Abrir Menú de Navegación"
              >
                <Menu className="w-5 h-5" />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* 3. MENÚ DESPLEGABLE (DRAWER LATERAL FLUIDO) - ESTILO WELLTHY / LANTERN */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          
          {/* Backdrop Blur Oscuro */}
          <div 
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
          />

          {/* Panel Lateral Drawer */}
          <div className="relative w-full max-w-md h-full bg-[#0c0d13] border-l border-white/15 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 animate-in slide-in-from-right duration-300">
            
            {/* Top Bar del Drawer */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[1.5px]">
                    <div className="w-full h-full bg-[#09090e] rounded-[10px] flex items-center justify-center font-bold text-white text-xs">
                      E
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white tracking-tight">Eternalia</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{language === 'es' ? 'Cifrado Zero-Knowledge' : 'Zero-Knowledge Encrypted'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  aria-label="Cerrar Menú"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* SECCIÓN 1: SOLUCIONES DE LEGADO HUMANAS Y DIRECTAS */}
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block mb-3">
                  {language === 'es' ? 'Soluciones Clave de Legado' : 'Core Legacy Solutions'}
                </span>

                <div className="space-y-2.5">
                  {legacySolutions.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full p-3.5 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/5 hover:border-cyan-500/30 transition-all text-left flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${item.accent} text-white shadow-sm`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs text-zinc-400 line-clamp-1">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECCIÓN 2: ECOSISTEMA & HERRAMIENTAS */}
              <div className="mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold block mb-3">
                  {language === 'es' ? 'Navegación & Ecosistema' : 'Navigation & Ecosystem'}
                </span>

                {/* Botón Principal: Todas las Soluciones que Ofrecemos */}
                <button
                  onClick={() => scrollTo('proyectos')}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 text-left transition-all mb-3 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-300">
                      <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-cyan-200 transition-colors">
                        {language === 'es' ? 'Todas las Soluciones que Ofrecemos' : 'All Solutions We Offer'}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {language === 'es' ? 'Portafolio de plataformas y frontends activos' : 'Live active platforms & frontends'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => scrollTo('directorio')}
                    className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 text-left transition-all cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-cyan-400 mb-1.5" />
                    <span className="text-xs font-bold text-white block">
                      {language === 'es' ? 'Directorio' : 'Directory'}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {language === 'es' ? 'Red Comercial' : 'Local Mesh'}
                    </span>
                  </button>

                  <button
                    onClick={() => scrollTo('cotizador')}
                    className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 text-left transition-all cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-amber-400 mb-1.5" />
                    <span className="text-xs font-bold text-white block">
                      {language === 'es' ? 'Cotizador' : 'Solutions'}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {language === 'es' ? 'Simulador' : 'Interactive'}
                    </span>
                  </button>

                  <button
                    onClick={() => scrollTo('infraestructura')}
                    className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 text-left transition-all cursor-pointer"
                  >
                    <Activity className="w-4 h-4 text-emerald-400 mb-1.5" />
                    <span className="text-xs font-bold text-white block">
                      {language === 'es' ? 'Servidores' : 'Servers'}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {language === 'es' ? 'Uptime 99.99%' : 'Live Health'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenInvestors();
                    }}
                    className="p-3 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 text-left transition-all cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-indigo-400 mb-1.5" />
                    <span className="text-xs font-bold text-white block">
                      {language === 'es' ? 'Inversores' : 'Investors'}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {language === 'es' ? 'Relaciones' : 'Relations'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Pie del Drawer: Iniciar Sesión / Portal + Comenzar Legado */}
            <div className="pt-5 border-t border-white/10 space-y-2.5">
              
              {/* Acceso Portal Admin / Iniciar Sesión */}
              <Link
                to="/admin/login"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <LogIn className="w-4 h-4 text-indigo-400" />
                <span>{language === 'es' ? 'Iniciar Sesión / Portal Admin' : 'Sign In / Admin Portal'}</span>
              </Link>

              {/* Botón Principal Iniciar Legado */}
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <span>{language === 'es' ? 'Comenzar Mi Legado' : 'Start My Legacy'}</span>
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
