import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  UtensilsCrossed,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  Percent,
  Server,
  Maximize2
} from 'lucide-react';

export default function Hero({ onOpenContact }) {
  const { language } = useLanguage();
  const [activePreviewTab, setActivePreviewTab] = useState('pedidos');

  const previewScreens = {
    pedidos: {
      url: 'restaurant.eternalia.co/admin/pedidos',
      img: '/products/restaurants/pedidos.jpg',
      labelEs: 'Control de Pedidos & Comandas',
      labelEn: 'Live Orders & Kitchen Display',
      badgeEs: 'Operación en Tiempo Real',
      badgeEn: 'Real-Time Operations'
    },
    menu: {
      url: 'chickenking.menu.eternalia.co',
      img: '/products/restaurants/menu-cliente-vivo.jpg',
      labelEs: 'Menú Digital QR para Clientes',
      labelEn: 'Digital QR Customer Menu',
      badgeEs: 'Dark UI Gastronómica',
      badgeEn: 'Gastronomy Dark UI'
    },
    productos: {
      url: 'restaurant.eternalia.co/admin/productos',
      img: '/products/restaurants/productos.jpg',
      labelEs: 'Catálogo de Platos & Precios',
      labelEn: 'Dish & Pricing Catalog',
      badgeEs: 'Cero Comisiones',
      badgeEn: 'Zero Commission Fees'
    }
  };

  const currentPreview = previewScreens[activePreviewTab];

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 md:pt-32 md:pb-16 overflow-hidden">
      
      {/* Background Ambient Radial Auras */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] sm:w-[950px] h-[450px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-cyan-400/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Top Enterprise Status Pill (Estilo ServiceNow / Horizon) */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-blue-500/30 shadow-[0_4px_20px_rgba(37,99,235,0.12)] dark:shadow-[0_0_25px_rgba(37,99,235,0.25)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[11px] font-bold tracking-wider text-blue-600 dark:text-cyan-300 uppercase font-mono">
              {language === 'es' ? 'TECNOLOGÍA & SOFTWARE PARA NEGOCIOS REALES' : 'ENTERPRISE TECH & SAAS PLATFORMS'}
            </span>
            <div className="h-3 w-px bg-slate-300 dark:bg-zinc-700 mx-0.5 hidden xs:inline-block" />
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono hidden xs:inline-flex items-center gap-1">
              <span className="text-emerald-500 font-bold">●</span> {language === 'es' ? 'Producción Activa' : 'Live Production'}
            </span>
          </div>
        </div>

        {/* 2. Hero Headline (Titular Balanceado y Ergonómico) */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] sm:leading-[1.06] mb-4 sm:mb-6 text-balance">
            <span className="text-zinc-950 dark:text-white block font-black transition-colors">
              {language === 'es'
                ? 'La infraestructura digital que impulsa'
                : 'The digital infrastructure powering'}
            </span>
            <span className="gradient-text-accent block mt-1">
              {language === 'es'
                ? 'el comercio y las empresas del futuro.'
                : 'future-ready commerce & enterprises.'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-7 sm:mb-9 font-normal transition-colors text-balance px-2">
            {language === 'es'
              ? 'Desarrollamos y desplegamos plataformas de software especializadas, sistemas operativos para restaurantes y herramientas comerciales de alto impacto.'
              : 'We engineer and deploy specialized SaaS platforms, restaurant operating systems, and high-impact digital toolkits for growing businesses.'}
          </p>

          {/* 3. Dual Action CTAs (Estilo ServiceNow) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
            
            {/* Primary Action Button */}
            <Link
              to="/restaurantes"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_4px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5 cursor-pointer text-xs sm:text-sm active:scale-95 group"
            >
              <UtensilsCrossed className="w-4 h-4 text-cyan-100 group-hover:rotate-12 transition-transform shrink-0" />
              <span>{language === 'es' ? 'Ver Software para Restaurantes' : 'Explore Restaurant Software'}</span>
              <ArrowRight className="w-4 h-4 text-cyan-200 group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            {/* Secondary Action Button: Déjanos tus dudas */}
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900/90 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-700 shadow-sm hover:shadow transition-all duration-200 cursor-pointer text-xs sm:text-sm active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
              <span>{language === 'es' ? 'Déjanos tus dudas' : 'Send Us Your Questions'}</span>
            </button>
          </div>

          {/* 4. Enterprise Credibility KPI Strip (4 Pilares de Confianza) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto mb-10 sm:mb-14">
            
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md text-left transition-all hover:border-blue-500/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-cyan-400">0%</span>
                <Percent className="w-4 h-4 text-blue-500 dark:text-cyan-400" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                {language === 'es' ? 'Cero Comisiones' : '0% Sales Fee'}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                {language === 'es' ? 'Ganancia 100% directa' : 'Direct revenue flow'}
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md text-left transition-all hover:border-emerald-500/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">&lt; 3s</span>
                <Zap className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                {language === 'es' ? 'Comandas en Vivo' : 'Live Kitchen Orders'}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                {language === 'es' ? 'Despacho instantáneo' : 'Instant order dispatch'}
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md text-left transition-all hover:border-indigo-500/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">99.9%</span>
                <Server className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                {language === 'es' ? 'Disponibilidad SLA' : 'Uptime SLA'}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                {language === 'es' ? 'Nube con balanceo' : 'Load balanced cloud'}
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md text-left transition-all hover:border-cyan-500/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400">+50</span>
                <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                {language === 'es' ? 'Comercios Activos' : 'Connected Venues'}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                {language === 'es' ? 'Directorio local real' : 'Real local network'}
              </p>
            </div>

          </div>

        </div>

        {/* 5. Enterprise Hero Product Showcase (Vitrina Visual del Software en el Hero) */}
        <div className="max-w-5xl mx-auto">
          
          {/* Showcase Tabs */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[11px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase mr-1 hidden sm:inline">
              {language === 'es' ? 'VISTA PREVIA:' : 'LIVE PREVIEW:'}
            </span>
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-zinc-900 border border-slate-300/80 dark:border-zinc-800">
              {Object.keys(previewScreens).map((key) => {
                const screen = previewScreens[key];
                const isActive = activePreviewTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActivePreviewTab(key)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-cyan-300 shadow-sm' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {language === 'es' ? screen.labelEs : screen.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive macOS Browser Stage */}
          <div className="relative rounded-2xl sm:rounded-3xl p-1 sm:p-2 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-950 shadow-2xl shadow-blue-500/10 border border-slate-300/80 dark:border-white/10 group">
            
            {/* Ambient Background Aura */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-cyan-500/20 blur-xl opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none" />

            {/* Window Chrome Header */}
            <div className="relative bg-white dark:bg-zinc-950 rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="h-8 sm:h-9 bg-slate-100 dark:bg-zinc-900/90 px-3 sm:px-4 flex items-center justify-between border-b border-slate-200 dark:border-zinc-800">
                
                {/* macOS Window Controls */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                {/* Verified HTTPS Address Bar */}
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-[10px] sm:text-[11px] font-mono text-zinc-700 dark:text-zinc-300 max-w-[280px] sm:max-w-md truncate">
                  <span className="text-emerald-500 font-bold">🔒</span>
                  <span>https://{currentPreview.url}</span>
                </div>

                {/* Right Meta Tag */}
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[10px] font-mono font-bold text-blue-600 dark:text-cyan-400">
                    {language === 'es' ? currentPreview.badgeEs : currentPreview.badgeEn}
                  </span>
                  <Link
                    to="/restaurantes"
                    title={language === 'es' ? 'Ver landing completa' : 'View full landing'}
                    className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

              {/* Live Image Stage */}
              <div className="relative aspect-[16/9] sm:aspect-[21/10] bg-zinc-950 overflow-hidden">
                <img
                  src={currentPreview.img}
                  alt={currentPreview.labelEs}
                  className="w-full h-full object-cover object-top transition-all duration-500 transform group-hover:scale-[1.01]"
                  loading="eager"
                />

                {/* Corner Quick Action Overlay */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
                  <Link
                    to="/restaurantes"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-900/90 hover:bg-slate-950 dark:bg-zinc-900/90 dark:hover:bg-zinc-950 text-white font-bold text-xs shadow-lg backdrop-blur-md border border-white/20 transition-all cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{language === 'es' ? 'Ver Módulos Reales' : 'Explore Modules'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
