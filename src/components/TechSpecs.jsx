import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, Database, ShieldCheck, Zap, Server, Globe2, Radio, Check, Layers, Terminal, Sparkles, Activity } from 'lucide-react';

export default function TechSpecs() {
  const { t, language } = useLanguage();
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  const techFeatures = [
    {
      icon: Database,
      title: t.tech.items[0].title,
      desc: t.tech.items[0].desc,
      stat: "0ms UI delay",
      badge: "Realtime Mesh",
      color: "text-amber-400"
    },
    {
      icon: Zap,
      title: t.tech.items[1].title,
      desc: t.tech.items[1].desc,
      stat: "< 0.3s TTFB",
      badge: "Global Edge",
      color: "text-cyan-400"
    },
    {
      icon: ShieldCheck,
      title: t.tech.items[2].title,
      desc: t.tech.items[2].desc,
      stat: "AES-256 GCM",
      badge: "Bank-Grade",
      color: "text-emerald-400"
    },
    {
      icon: Server,
      title: t.tech.items[3].title,
      desc: t.tech.items[3].desc,
      stat: "gRPC & REST",
      badge: "Microservices",
      color: "text-indigo-400"
    }
  ];

  const architectureLayers = [
    {
      name: language === 'es' ? 'Capa 1: Edge & Client Frontends' : 'Layer 1: Edge & Client Frontends',
      protocol: 'HTTP/3 • WebSockets • PWA',
      status: 'Global Distributed Anycast',
      descEs: 'Landing pages de alta conversión, catálogos reactivos y aplicaciones de usuario renderizadas en el borde perimetral en <50ms.',
      descEn: 'High-conversion landing pages, reactive catalogs, and client web apps cached and executed at global edge nodes in <50ms.',
      nodes: '320+ Edge Locations'
    },
    {
      name: language === 'es' ? 'Capa 2: Event Mesh & State Orchestrator' : 'Layer 2: Event Mesh & State Orchestrator',
      protocol: 'Kafka • Cloud PubSub • Firebase Engine',
      status: 'Zero Data Loss Pipeline',
      descEs: 'Bus de eventos concurrentes que procesa pedidos comerciales, órdenes de servicio técnico y eventos de telemetría sin colisiones.',
      descEn: 'High-throughput event bus routing commercial checkouts, trade dispatches, and IoT telemetry streams with zero contention.',
      nodes: 'Sub-millisecond Broker'
    },
    {
      name: language === 'es' ? 'Capa 3: Fintech & Escrow Settlement Engine' : 'Layer 3: Fintech & Escrow Settlement Engine',
      protocol: 'Cryptographic Ledger • Tokenized Rails',
      status: 'PCI-DSS Compliant Security',
      descEs: 'Gestión de split-payments, suscripciones recurrentes de profesionales independientes y liquidaciones instantáneas seguras.',
      descEn: 'Multi-party split payment routing, recurring SaaS subscriptions, and automated contractor payouts with instant escrow guarantees.',
      nodes: 'Bank-Grade Security'
    },
    {
      name: language === 'es' ? 'Capa 4: Industrial IoT & Telematics Stream' : 'Layer 4: Industrial IoT & Telematics Stream',
      protocol: 'MQTT • Satellite Link • Telemetry Collector',
      status: 'Real-time Ingestion Active',
      descEs: 'Recolección masiva de métricas satelitales para flotas, telemetría vehicular pesada y diagnósticos automotrices predictivos.',
      descEn: 'Large-scale ingestion of satellite fleet metrics, fuel consumption algorithms, and predictive automotive diagnostics.',
      nodes: 'Mission-Critical Reliability'
    }
  ];

  return (
    <section id="tecnologia" className="relative py-24 sm:py-32 border-t border-b border-white/[0.06] bg-[#0c0c10]/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.tech.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.tech.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t.tech.subtitle}
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {techFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/5">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Benchmark</span>
                  <span className="text-zinc-300 font-semibold">{item.stat}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Full Architecture Topology Visualizer */}
        <div className="rounded-3xl p-6 sm:p-8 bg-zinc-950/80 border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {language === 'es' ? 'Topología Multi-Nivel de la Red Eternalia' : 'Eternalia Multi-Tier Network Topology'}
                </h4>
                <span className="text-xs text-zinc-400">
                  {language === 'es' ? 'Haz clic en cada capa para inspeccionar su protocolo y SLA' : 'Click each layer to inspect protocols and operational SLA'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Full Mesh Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Layer selector tabs */}
            <div className="lg:col-span-5 space-y-2">
              {architectureLayers.map((layer, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLayerIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                    activeLayerIndex === idx
                      ? 'bg-zinc-900 border-indigo-500/60 shadow-lg text-white'
                      : 'bg-zinc-950/40 border-white/5 hover:border-white/15 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block">{layer.name}</span>
                    <span className="text-[10px] font-mono text-zinc-500 block">{layer.protocol}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    activeLayerIndex === idx ? 'bg-indigo-500/20 text-indigo-300' : 'text-zinc-500'
                  }`}>
                    L{idx + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* Layer details display */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    {architectureLayers[activeLayerIndex].protocol}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
                    {architectureLayers[activeLayerIndex].status}
                  </span>
                </div>

                <h5 className="text-lg font-bold text-white mb-2">
                  {architectureLayers[activeLayerIndex].name}
                </h5>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {language === 'es' ? architectureLayers[activeLayerIndex].descEs : architectureLayers[activeLayerIndex].descEn}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Infrastructure Capacity:</span>
                <span className="font-bold text-white text-xs">{architectureLayers[activeLayerIndex].nodes}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
