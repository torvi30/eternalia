import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Layers, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Cpu, 
  CheckCircle2, 
  BarChart3, 
  Globe2, 
  ArrowUpRight, 
  Server, 
  Lock, 
  Check, 
  Wine, 
  Car,
  Clock,
  Terminal,
  Activity,
  SlidersHorizontal,
  ChevronRight,
  QrCode,
  ShoppingBag
} from 'lucide-react';

export default function BentoGrid({ onOpenContact }) {
  const { t, language } = useLanguage();
  const bento = t.ecosystem.bento;

  // Active layer filter tab
  const [selectedLayer, setSelectedLayer] = useState('all');

  // Interactive Commerce Cloud conversion simulator
  const [activeSession, setActiveSession] = useState('landing-pro');
  const sessionStreams = {
    'landing-pro': {
      shortLabel: language === 'es' ? 'Landing' : 'Landing',
      label: language === 'es' ? 'Landing Page Web' : 'Brand Landing Page',
      icon: Globe2,
      metric: '0.38s TTFB',
      visitors: '1,420 activos',
      conversion: '8.4%',
      status: language === 'es' ? 'Tráfico en Vivo' : 'Live Traffic',
      statusColor: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
      events: [
        { title: language === 'es' ? 'Acceso desde Instagram / Web' : 'Direct Inbound Visit', value: 'Edge Cache Hit (99.8%)' },
        { title: language === 'es' ? 'Interacción con Catálogo Digital' : 'Catalog Interaction', value: '1.4s Dwell Time' },
        { title: language === 'es' ? 'Conversión a WhatsApp / POS' : 'Checkout & POS Dispatch', value: '$84.000 COP • Sincronizado' }
      ]
    },
    'catalogo-qr': {
      shortLabel: language === 'es' ? 'Menú QR' : 'QR Menu',
      label: language === 'es' ? 'Catálogo & Menú QR' : 'Interactive QR Menu',
      icon: QrCode,
      metric: '0.12s Sync',
      visitors: '89 mesas activas',
      conversion: '94.2%',
      status: language === 'es' ? 'Terminal Conectada' : 'Connected Terminal',
      statusColor: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
      events: [
        { title: language === 'es' ? 'Escaneo de QR en Mesa/Local' : 'Instant Table QR Scan', value: 'Sin Descarga de App' },
        { title: language === 'es' ? 'Comanda Táctil a Cocina' : 'KDS Kitchen Dispatch', value: '< 20ms Websocket' },
        { title: language === 'es' ? 'Cierre de Cuenta & Facturación' : 'Digital Bill Settlement', value: 'Auto Conciliación' }
      ]
    },
    'checkout-funnel': {
      shortLabel: language === 'es' ? 'Domicilios' : 'Delivery',
      label: language === 'es' ? 'Funnel de Domicilios' : 'Delivery Sales Funnel',
      icon: ShoppingBag,
      metric: 'Instant Routing',
      visitors: '340 pedidos/h',
      conversion: '12.8%',
      status: language === 'es' ? 'Enrutamiento Activo' : 'Active Routing',
      statusColor: 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/30',
      events: [
        { title: language === 'es' ? 'Geocodificación de Dirección' : 'Algorithmic Geocoding', value: 'Cálculo de Distancia' },
        { title: language === 'es' ? 'Asignación de Repartidor' : 'Smart Fleet Routing', value: 'Auto-Despacho' },
        { title: language === 'es' ? 'Confirmación al Cliente' : 'WhatsApp Client Ping', value: 'Link de Seguimiento' }
      ]
    }
  };

  // Workforce OS interactive profile
  const [selectedWorkforceIndex, setSelectedWorkforceIndex] = useState(0);
  const workforceProtocols = [
    {
      shortLabel: language === 'es' ? 'Redes & Energía' : 'Grid & Power',
      tabLabel: language === 'es' ? 'Técnico & Redes' : 'Technical Grid',
      domainEs: "Instalaciones de Alta Tensión & Redes",
      domainEn: "High-Voltage Power & Industrial Grid",
      badge: "Protocolo Técnico A-1",
      verification: "Certificación CONTE • Póliza Activa",
      settlementTime: language === 'es' ? "Liquidación en 5 min" : "5 min Settlement",
      rating: "99.4% Eficacia",
      icon: Zap,
    },
    {
      shortLabel: language === 'es' ? 'Acabados' : 'Finishes',
      tabLabel: language === 'es' ? 'Construcción' : 'Architecture Finishes',
      domainEs: "Acabados Arquitectónicos & Obra Civil",
      domainEn: "Architectural Finishes & Civil Works",
      badge: "Protocolo Estructural B-2",
      verification: "Garantía de Entrega Inmutable",
      settlementTime: language === 'es' ? "Split Escrow 50/50" : "50/50 Split Escrow",
      rating: "98.9% Confiabilidad",
      icon: Cpu,
    },
    {
      shortLabel: language === 'es' ? 'Automotriz' : 'Fleet Auto',
      tabLabel: language === 'es' ? 'Mecánica Pesada' : 'Heavy Fleet Fleet',
      domainEs: "Mantenimiento Preventivo de Flotas",
      domainEn: "Fleet Preventive Telematics & Repair",
      badge: "Diagnóstico Predictivo OBD-II",
      verification: "Historial Telemático Registrado",
      settlementTime: language === 'es' ? "Pago contra Telemetría" : "Payout On Telemetry",
      rating: "99.8% Disponibilidad",
      icon: Truck,
    }
  ];

  const [activeVentureIndex, setActiveVentureIndex] = useState(0);

  return (
    <section id="ecosistema" className="relative py-24 sm:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-700 dark:text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.ecosystem.badge}</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              {t.ecosystem.title}
            </h2>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {t.ecosystem.subtitle}
            </p>
          </div>

          {/* Interactive Layer Filter Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 dark:bg-zinc-950/80 border border-black/10 dark:border-white/10 backdrop-blur-md self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedLayer('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedLayer === 'all'
                  ? 'bg-indigo-600 text-white font-bold shadow-md'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5'
              }`}
            >
              {t.ecosystem.layers.all}
            </button>
            <button
              onClick={() => setSelectedLayer('commerce')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedLayer === 'commerce'
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5'
              }`}
            >
              {t.ecosystem.layers.commerce}
            </button>
            <button
              onClick={() => setSelectedLayer('workforce')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedLayer === 'workforce'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5'
              }`}
            >
              {t.ecosystem.layers.workforce}
            </button>
            <button
              onClick={() => setSelectedLayer('industry')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedLayer === 'industry'
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5'
              }`}
            >
              {t.ecosystem.layers.industry}
            </button>
          </div>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Card 1: ETERNALIA COMMERCE CLOUD */}
          {(selectedLayer === 'all' || selectedLayer === 'commerce') && (
            <div className={`glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-black/10 dark:border-white/10 hover:border-amber-500/40 transition-all duration-300 relative overflow-hidden group shadow-lg ${
              selectedLayer === 'commerce' ? 'lg:col-span-12' : 'lg:col-span-7'
            }`}>
              {/* Ambient inner glow */}
              <div className="absolute -top-28 -right-28 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-all" />

              <div>
                {/* Card Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                    <Layers className="w-3.5 h-3.5" />
                    {bento.commerce.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Cloud Frontends • v3.8</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
                  {bento.commerce.title}
                </h3>

                <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-200/90 mb-3">
                  {bento.commerce.headline}
                </h4>
                
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                  {bento.commerce.description}
                </p>

                {/* Core Features bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                  {bento.commerce.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* High-Tech Interactive Conversion Terminal */}
              <div className="rounded-2xl bg-white dark:bg-zinc-950/90 border border-black/10 dark:border-white/10 p-4 sm:p-5 backdrop-blur-xl mb-6 shadow-xl dark:shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                      {bento.commerce.simulationTitle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>TELEMETRY LIVE</span>
                  </div>
                </div>

                {/* Segmented Control Selector */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-zinc-900/90 rounded-xl border border-black/5 dark:border-white/10 mb-4">
                  {Object.keys(sessionStreams).map((key) => {
                    const stream = sessionStreams[key];
                    const Icon = stream.icon;
                    const isActive = activeSession === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveSession(key)}
                        className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-amber-500 text-zinc-950 shadow-md font-bold' 
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800/60'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-zinc-950' : 'text-zinc-500 dark:text-zinc-400'}`} />
                        <span className="truncate sm:hidden text-[11px]">{stream.shortLabel}</span>
                        <span className="hidden sm:inline truncate text-xs">{stream.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Session details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base">{sessionStreams[activeSession].label}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {sessionStreams[activeSession].visitors}
                    </span>
                  </div>
                  <span className={`self-start sm:self-auto px-2 py-0.5 rounded text-[11px] font-semibold border ${sessionStreams[activeSession].statusColor}`}>
                    {sessionStreams[activeSession].status}
                  </span>
                </div>

                {/* Events stream */}
                <div className="space-y-2 mb-3 bg-slate-50 dark:bg-zinc-900/60 p-3 sm:p-3.5 rounded-xl border border-black/5 dark:border-white/5">
                  {sessionStreams[activeSession].events.map((ev, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 sm:gap-2">
                      <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span>{ev.title}</span>
                      </span>
                      <span className="text-amber-700 dark:text-amber-200/90 font-mono text-[11px] font-semibold pl-3.5 sm:pl-0 sm:text-right shrink-0">
                        {ev.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-black/5 dark:border-white/5 text-xs font-mono">
                  <span className="text-zinc-500">Performance Metric:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-300 text-xs">{sessionStreams[activeSession].metric}</span>
                </div>
              </div>

              {/* Performance Metrics summary */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-black/10 dark:border-white/10 text-center">
                {bento.commerce.metrics.map((m, i) => (
                  <div key={i} className="p-2 sm:p-3 rounded-xl bg-slate-100 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 flex flex-col justify-center">
                    <span className="text-base sm:text-lg font-mono font-bold text-zinc-900 dark:text-white block">{m.value}</span>
                    <span className="text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 block leading-tight font-medium mt-1">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Right Column: Cards 2 & 3 */}
          <div className={`${selectedLayer === 'all' ? 'lg:col-span-5' : 'lg:col-span-12'} flex flex-col gap-6 sm:gap-8`}>
            
            {/* Card 2: ETERNALIA SERVICES INFRASTRUCTURE (Workforce OS) */}
            {(selectedLayer === 'all' || selectedLayer === 'workforce') && (
              <div className="glass-card rounded-3xl p-6 sm:p-7 border border-black/10 dark:border-white/10 hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-all" />

                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                    <Zap className="w-3.5 h-3.5" />
                    {bento.workforce.tag}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono">
                    Multi-Party Escrow
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                  {bento.workforce.title}
                </h3>

                <h4 className="text-xs font-medium text-emerald-600 dark:text-emerald-300 mb-3">
                  {bento.workforce.headline}
                </h4>
                
                <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5">
                  {bento.workforce.description}
                </p>

                {/* Workforce protocol Segmented Control */}
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-zinc-900/90 rounded-xl border border-black/5 dark:border-white/10 mb-4">
                  {workforceProtocols.map((p, idx) => {
                    const Icon = p.icon;
                    const isActive = selectedWorkforceIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedWorkforceIndex(idx)}
                        className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800/60'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-zinc-950' : 'text-zinc-500 dark:text-zinc-400'}`} />
                        <span className="truncate sm:hidden text-[11px]">{p.shortLabel}</span>
                        <span className="hidden sm:inline truncate text-xs">{p.tabLabel}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Protocol Card */}
                <div className="p-4 rounded-xl bg-white dark:bg-zinc-950/85 border border-black/10 dark:border-white/10 backdrop-blur-md space-y-3 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                          {workforceProtocols[selectedWorkforceIndex].badge}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white block leading-snug">
                        {language === 'es' ? workforceProtocols[selectedWorkforceIndex].domainEs : workforceProtocols[selectedWorkforceIndex].domainEn}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 font-mono block mt-1">
                        {workforceProtocols[selectedWorkforceIndex].verification}
                      </span>
                    </div>
                    <div className="self-start sm:self-auto bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 text-[11px] text-emerald-700 dark:text-emerald-300 font-mono font-semibold shrink-0">
                      {workforceProtocols[selectedWorkforceIndex].rating}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2.5 border-t border-black/5 dark:border-white/5 font-mono">
                    <div>
                      <span className="text-zinc-500 text-[10px] block">Settlement SLA:</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{workforceProtocols[selectedWorkforceIndex].settlementTime}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-500 text-[10px] block">Guarantee:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Platform Insured</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Card 3: ETERNALIA ENTERPRISE VENTURES */}
            {(selectedLayer === 'all' || selectedLayer === 'industry') && (
              <div className="glass-card rounded-3xl p-6 sm:p-7 border border-black/10 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden group shadow-lg">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
                    <Truck className="w-3.5 h-3.5" />
                    {bento.industry.tag}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">Mission-Critical Tier</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                  {bento.industry.title}
                </h3>

                <h4 className="text-xs font-medium text-cyan-600 dark:text-cyan-300 mb-3">
                  {bento.industry.headline}
                </h4>
                
                <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {bento.industry.description}
                </p>

                {/* Interactive solutions overview */}
                <div className="space-y-2.5">
                  {bento.industry.solutions.map((sol, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveVentureIndex(index)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        activeVentureIndex === index
                          ? 'bg-slate-100 dark:bg-zinc-900/90 border-cyan-500/50 shadow-md'
                          : 'bg-white/80 dark:bg-zinc-950/40 border-black/5 dark:border-white/5 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          {index === 0 ? <Truck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> : index === 1 ? <Wine className="w-4 h-4 text-pink-600 dark:text-pink-400" /> : <Car className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                          <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">{sol.title}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
                          {sol.badge}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {sol.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
