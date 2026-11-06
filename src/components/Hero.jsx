import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Activity, 
  Globe2, 
  Zap, 
  Layers, 
  Terminal, 
  Server
} from 'lucide-react';
import HeroTerminal from './HeroTerminal';

export default function Hero({ onOpenContact, onExploreClick, onDemoClick }) {
  const { t, language } = useLanguage();
  const [activeSimulationIndex, setActiveSimulationIndex] = useState(0);
  const [consoleMode, setConsoleMode] = useState('terminal'); // 'terminal' | 'telemetry'

  // Rotating live pulse activity showing high-level enterprise operations
  const liveEvents = [
    {
      vertical: "Commerce Cloud",
      icon: Layers,
      color: "text-amber-500 dark:text-amber-400",
      badgeColor: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300",
      es: "Frontends de Marca • Orden web sincronizada en <18ms hacia punto de venta y cocina",
      en: "Brand Frontends • Web checkout synced in <18ms to cloud POS and kitchen queue",
      latency: "14ms",
      throughput: "3,840 tx/min"
    },
    {
      vertical: "Workforce OS",
      icon: Zap,
      color: "text-emerald-500 dark:text-emerald-400",
      badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
      es: "Red de Servicios • Liquidación instantánea y garantía digital validada en blockchain interna",
      en: "Service Network • Instant escrow payout & digital warranty verified on internal ledger",
      latency: "22ms",
      throughput: "1,290 ops/min"
    },
    {
      vertical: "Commercial Mesh",
      icon: Compass,
      color: "text-cyan-600 dark:text-cyan-400",
      badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300",
      es: "Descubrimiento Hiperlocal • Enlace directo WhatsApp generado sin intermediación ni comisiones",
      en: "Hyperlocal Mesh • Direct customer-to-merchant link opened with zero intermediary cut",
      latency: "11ms",
      throughput: "6,150 pings/s"
    },
    {
      vertical: "Enterprise IoT",
      icon: Server,
      color: "text-indigo-600 dark:text-indigo-400",
      badgeColor: "bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-300",
      es: "Telemetría Satelital • Auditoría predictiva de combustible y telemetría de ruta activa",
      en: "Satellite Telematics • Predictive fleet health & telemetry stream broadcast live",
      latency: "28ms",
      throughput: "840 units sync"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSimulationIndex((prev) => (prev + 1) % liveEvents.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [liveEvents.length]);

  const activeEvent = liveEvents[activeSimulationIndex];
  const ActiveIcon = activeEvent.icon;

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top High-Tech Holding Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-indigo-500/30 shadow-[0_4px_20px_rgba(99,102,241,0.15)] dark:shadow-[0_0_25px_rgba(99,102,241,0.2)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-indigo-700 dark:text-indigo-200 uppercase">
              {t.hero.badge}
            </span>
            <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700 mx-0.5" />
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono hidden sm:inline flex items-center gap-1">
              <span className="text-emerald-500 dark:text-emerald-400">●</span> Multi-Tenant Mesh
            </span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
            <span className="text-zinc-900 dark:text-white block font-extrabold transition-colors">
              {t.hero.titlePart1}
            </span>
            <span className="gradient-text-accent block">
              {t.hero.titlePart2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal transition-colors">
            {t.hero.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
            
            {/* Primary CTA with glowing shine */}
            <a
              href="#ecosistema"
              onClick={onExploreClick}
              className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_4px_25px_rgba(99,102,241,0.35)] dark:shadow-[0_0_30px_rgba(99,102,241,0.45)] hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary CTA: Ver Proyectos en Vivo */}
            <a
              href="#proyectos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-900/90 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-black/10 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-200 backdrop-blur-md shadow-md"
            >
              <Globe2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>{language === 'es' ? 'Ver Proyectos Activos' : 'View Live Projects'}</span>
            </a>

            {/* Tertiary CTA: Red de Empresas & Clientes */}
            <a
              href="#empresas"
              onClick={onDemoClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-zinc-700 dark:text-zinc-300 bg-slate-100/80 dark:bg-zinc-900/50 hover:bg-slate-200 dark:hover:bg-zinc-800/80 border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 transition-all duration-200 backdrop-blur-md hover:text-zinc-900 dark:hover:text-white text-xs sm:text-sm"
            >
              <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{t.hero.ctaSecondary}</span>
            </a>

            {/* Investor CTA */}
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-300 border border-transparent hover:border-indigo-500/20 transition-all cursor-pointer"
            >
              <span>{t.hero.ctaPartner}</span>
            </button>
          </div>

          {/* Interactive Console & Telemetry Switcher */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                type="button"
                onClick={() => setConsoleMode('terminal')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  consoleMode === 'terminal'
                    ? 'bg-indigo-600 text-white shadow-[0_4px_15px_rgba(99,102,241,0.35)] dark:shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400/40'
                    : 'bg-white dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5 shadow-sm'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>CLI Terminal Simulator</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </button>

              <button
                type="button"
                onClick={() => setConsoleMode('telemetry')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  consoleMode === 'telemetry'
                    ? 'bg-indigo-600 text-white shadow-[0_4px_15px_rgba(99,102,241,0.35)] dark:shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-indigo-400/40'
                    : 'bg-white dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5 shadow-sm'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Live Stream Telemetry</span>
              </button>
            </div>

            {consoleMode === 'terminal' ? (
              <HeroTerminal 
                onOpenContact={onOpenContact} 
                onNavigateSection={(id) => {
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
              />
            ) : (
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-950/80 border border-black/10 dark:border-white/10 backdrop-blur-2xl shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden text-left transition-colors">
                {/* Top status bar inside console */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-300 tracking-wider">
                      ETERNALIA DISTRIBUTED CLOUD STREAM
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>NODE LATAM-COL-01</span>
                  </div>
                </div>

                {/* Rotating active stream card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/90 border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-slate-200 dark:bg-zinc-800 ${activeEvent.color}`}>
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${activeEvent.badgeColor}`}>
                          {activeEvent.vertical}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {activeEvent.throughput}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-snug">
                        {language === 'es' ? activeEvent.es : activeEvent.en}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 font-mono text-right self-end sm:self-center">
                    <span className="text-[10px] text-zinc-500 block uppercase">Latency</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{activeEvent.latency}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enterprise Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
            
            <div className="p-4 rounded-xl bg-white/70 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.04] text-left hover:border-black/15 dark:hover:border-white/10 transition-colors shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1 font-mono">
                4 <span className="text-indigo-600 dark:text-indigo-400 text-lg">Pillars</span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                {t.hero.stats.verticals}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/70 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.04] text-left hover:border-black/15 dark:hover:border-white/10 transition-colors shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1 font-mono">
                99.99%
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                {t.hero.stats.uptime}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/70 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.04] text-left hover:border-black/15 dark:hover:border-white/10 transition-colors shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-1 font-mono">
                +50k <span className="text-cyan-600 dark:text-cyan-400 text-lg">/día</span>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                {t.hero.stats.transactions}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/70 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/[0.04] text-left hover:border-black/15 dark:hover:border-white/10 transition-colors shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-700 dark:text-cyan-300 mb-1 font-mono flex items-center gap-1">
                &lt;15ms
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                {t.hero.stats.latency}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
