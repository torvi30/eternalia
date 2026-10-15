import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Server, 
  ShieldCheck, 
  Globe2, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  Layers, 
  Wifi,
  Cpu
} from 'lucide-react';

export default function InfrastructureStatus() {
  const { t } = useLanguage();
  const [isPinging, setIsPinging] = useState(false);

  // Regional PoPs with dynamic latency simulation
  const [regions, setRegions] = useState([
    { city: "Bogotá, Colombia", code: "BOG-EDGE-1", latency: 8, status: "optimal" },
    { city: "US-East (Virginia)", code: "IAD-EDGE-2", latency: 32, status: "optimal" },
    { city: "São Paulo, Brazil", code: "GRU-EDGE-1", latency: 39, status: "optimal" },
    { city: "Frankfurt, Germany", code: "FRA-EDGE-1", latency: 88, status: "optimal" },
    { city: "Tokyo, Japan", code: "NRT-EDGE-1", latency: 122, status: "optimal" },
  ]);

  const handleTestPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setRegions(prev => prev.map(r => ({
        ...r,
        latency: Math.max(5, r.latency + Math.floor(Math.random() * 5) - 2)
      })));
      setIsPinging(false);
    }, 600);
  };

  const services = [
    {
      id: "commerce",
      name: t.infraStatus?.services?.commerce?.name || "Eternalia Commerce Cloud",
      desc: t.infraStatus?.services?.commerce?.desc || "Sub-second storefronts & QR catalog",
      sla: "99.99%",
      latency: "14ms",
      icon: Layers,
      color: "text-amber-400",
      badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/20"
    },
    {
      id: "workforce",
      name: t.infraStatus?.services?.workforce?.name || "Workforce OS (Escrow Engine)",
      desc: t.infraStatus?.services?.workforce?.desc || "Instant settlement & digital warranties",
      sla: "99.98%",
      latency: "22ms",
      icon: Zap,
      color: "text-emerald-400",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
    },
    {
      id: "mesh",
      name: t.infraStatus?.services?.mesh?.name || "Smart Commercial Mesh Gateway",
      desc: t.infraStatus?.services?.mesh?.desc || "Georeferenced local routing & WhatsApp integration",
      sla: "100.0%",
      latency: "9ms",
      icon: Globe2,
      color: "text-cyan-400",
      badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
    },
    {
      id: "iot",
      name: t.infraStatus?.services?.iot?.name || "Enterprise Ventures IoT Ingestion",
      desc: t.infraStatus?.services?.iot?.desc || "High-frequency telemetry & event ERP backend",
      sla: "99.99%",
      latency: "28ms",
      icon: Server,
      color: "text-indigo-400",
      badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
    },
    {
      id: "ai",
      name: t.infraStatus?.services?.ai?.name || "Autonomous AI Orchestrator & Synthesis",
      desc: t.infraStatus?.services?.ai?.desc || "Quantized local LLM dispatch agents",
      sla: "99.97%",
      latency: "85ms",
      icon: Cpu,
      color: "text-purple-400",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20"
    }
  ];

  return (
    <section id="infraestructura" className="relative py-20 sm:py-28 scroll-mt-20 border-t border-white/[0.06] bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{t.infraStatus?.badge || "MONITOR EN VIVO DE INFRAESTRUCTURA"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.infraStatus?.title || "Estado de Servidores & Disponibilidad Global"}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {t.infraStatus?.subtitle || "Auditoría en tiempo real de nodos distribuidos, acuerdos de nivel de servicio (SLA 99.99%) y latencias perimetrales."}
          </p>
        </div>

        {/* Global Uptime Top Banner */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {t.infraStatus?.allOperational || "Todos los Sistemas Operacionales"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-0.5">
                {t.infraStatus?.uptime90Days || "Disponibilidad últimos 90 días: 99.994%"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-white/5 text-right font-mono">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold">AVG LATENCY</span>
              <span className="text-xs sm:text-sm font-bold text-cyan-300">12.4ms Edge</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-white/5 text-right font-mono">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold">ACTIVE PoPs</span>
              <span className="text-xs sm:text-sm font-bold text-indigo-300">18 Global</span>
            </div>
          </div>
        </div>

        {/* Core Services Uptime Table / Cards */}
        <div className="space-y-3.5 mb-12">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div 
                key={svc.id}
                className="p-4 sm:p-5 rounded-2xl bg-zinc-900/40 border border-white/[0.06] hover:border-white/15 transition-all backdrop-blur-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-zinc-950 border border-white/5 shrink-0">
                      <Icon className={`w-5 h-5 ${svc.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-white">{svc.name}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${svc.badgeColor}`}>
                          {svc.sla} SLA
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">{svc.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end lg:self-auto font-mono text-xs">
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Operational
                    </span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-cyan-400 font-semibold">{svc.latency}</span>
                  </div>
                </div>

                {/* 90-Day Visual Uptime Sparkline Bars */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                    <span>90 días atrás</span>
                    <span className="text-emerald-400/80 font-bold">100% Uptime Histórico</span>
                    <span>Hoy</span>
                  </div>
                  <div className="grid grid-cols-45 sm:grid-cols-60 gap-0.5 h-3 items-center">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <div
                        key={i}
                        title={`Día ${60 - i}: 100% Uptime • 0 Incidentes`}
                        className="h-full rounded-[1px] bg-emerald-500/80 hover:bg-emerald-400 hover:scale-125 transition-all cursor-pointer"
                      />
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Regional Latencies & Ping Tester */}
        <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wifi className="w-4 h-4 text-cyan-400" />
                <span>{t.infraStatus?.regionsTitle || "Latencia de Nodos Edge por Región"}</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Red perimetral Anycast con resolución DNS en sub-milisegundos
              </p>
            </div>

            <button
              type="button"
              onClick={handleTestPing}
              disabled={isPinging}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isPinging ? 'animate-spin' : ''}`} />
              <span>{isPinging ? (t.infraStatus?.pingTesting || "Midiendo...") : (t.infraStatus?.testPing || "Ejecutar Ping de Red")}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {regions.map((reg) => (
              <div 
                key={reg.code}
                className="p-3.5 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-cyan-500/30 transition-all font-mono"
              >
                <div className="text-[11px] text-zinc-400 font-semibold mb-1 truncate">
                  {reg.city}
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-extrabold text-white">
                    {reg.latency}<span className="text-xs font-normal text-cyan-400">ms</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>
                <div className="text-[10px] text-zinc-600 mt-1">
                  {reg.code}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
