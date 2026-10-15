import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Sparkles, 
  Download, 
  ArrowRight, 
  Calendar, 
  PieChart
} from 'lucide-react';

export default function InvestorRelationsModal({ isOpen, onClose, onOpenContact }) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadDossier = () => {
    // Generar un resumen ejecutivo descargable en formato Markdown / Texto corporativo
    const dossierContent = `
================================================================================
ETERNALIA TECH HOLDING • EXECUTIVE DOSSIER 2026
Institutional Briefing & Capital Allocation Strategy
================================================================================

1. EXECUTIVE SUMMARY:
Eternalia is a next-generation technology holding company unifying:
- Eternalia Commerce Cloud (High-conversion serverless storefronts & QR catalogs)
- Eternalia Services Infrastructure / Workforce OS (Formalization & escrow payments)
- Red Comercial Inteligente (Hyperlocal georeferenced merchant discovery)
- Eternalia Enterprise Ventures (Satellite IoT fleet telemetry & event ERP)

2. INVESTMENT THESIS & FLYWHEEL:
Layer 1: Zero-fee local merchant discovery to dominate territory density.
Layer 2: Transactional monetization via split escrow payments and warranty insurance.
Layer 3: Enterprise B2B SaaS subscriptions and long-term IoT telemetry contracts.

3. KEY METRICS:
- Addressable LATAM Market (TAM): $120B+
- Target Network Take Rate: 3.5% - 5.0%
- Projected Software Gross Margin: 82%
- Current Round: Strategic Seed Allocation

4. MULTI-YEAR STRATEGIC ROADMAP:
- Q1-Q2 2026: Hyperlocal Dominance (Marinilla, Rionegro, Eastern Antioquia)
- Q3-Q4 2026: Workforce OS 10,000-technician milestone & escrow integration
- 2027+: Enterprise IoT Expansion across Mexico & Central America

5. CORPORATE CONTACT:
Executive Desk: leadership@eternalia.io
Web: https://eternalia.io
© 2026 Eternalia Tech Holding. All Rights Reserved.
================================================================================
    `.trim();

    const blob = new Blob([dossierContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Eternalia-Executive-Dossier-2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const metrics = t.investorModal?.metrics || [
    { label: "TAM LATAM", value: "$120B+", desc: "Comercio local y fuerza de servicios" },
    { label: "Take Rate Objetivo", value: "3.5% - 5.0%", desc: "En servicios liquidados por la red" },
    { label: "Gross Margin", value: "82%", desc: "Estructura cloud serverless de bajo coste" },
    { label: "Fase Actual", value: "Seed Round", desc: "Abierta para socios estratégicos" }
  ];

  const roadmap = t.investorModal?.roadmap || [
    { period: "Q1-Q2 2026", title: "Dominio Hiperlocal", desc: "Consolidación de la Red Comercial en Marinilla, Rionegro y el Oriente Antioqueño. Más de 150 comercios digitalizados." },
    { period: "Q3-Q4 2026", title: "Escalamiento Workforce OS", desc: "Lanzamiento oficial del sistema de formalización laboral y split payments para 10,000 técnicos independientes." },
    { period: "2027+", title: "Expansión Enterprise IoT", desc: "Internacionalización de soluciones de telemetría pesada en México, Perú y Centroamérica." }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      {/* Container Card */}
      <div 
        className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(99,102,241,0.25)] text-left overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-20 cursor-pointer"
          aria-label="Cerrar modal de inversores"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.investorModal?.badge || "EXECUTIVE INVESTOR BRIEFING"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.investorModal?.title || "Relación con Inversionistas & Partners Estratégicos"}
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {t.investorModal?.subtitle || "Arquitectura de monetización, tesis de inversión y roadmap multianual de Eternalia Tech Holding."}
          </p>
        </div>

        {/* 4 Pillars of Value Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 relative z-10">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-zinc-900/60 border border-white/5 font-mono">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold truncate">{m.label}</span>
              <span className="text-lg sm:text-xl font-bold text-white block mt-0.5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                {m.value}
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5 leading-tight">{m.desc}</span>
            </div>
          ))}
        </div>

        {/* Investment Thesis & Flywheel */}
        <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 mb-6 relative z-10">
          <h3 className="text-xs sm:text-sm font-bold text-white mb-2 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-400" />
            <span>{t.investorModal?.thesisTitle || "Tesis de Inversión y Monetización"}</span>
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {t.investorModal?.thesisText || "Eternalia captura valor a través de un modelo trifásico: 1) Cero comisión inicial en el descubrimiento hiperlocal para capturar masa crítica; 2) Take-rate transaccional y comisiones de pasarela en pagos de servicios; 3) Suscripciones SaaS recurrentes B2B y contratos anuales Enterprise en IoT."}
          </p>
        </div>

        {/* Multi-Year Strategic Roadmap */}
        <div className="mb-6 relative z-10">
          <h3 className="text-xs sm:text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>{t.investorModal?.roadmapTitle || "Roadmap Estratégico Multianual"}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roadmap.map((phase, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-bold border border-indigo-500/25 inline-block mb-2">
                  {phase.period}
                </span>
                <h4 className="text-xs font-bold text-white mb-1">{phase.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Round Status & Actions */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-zinc-900 to-zinc-950 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {t.investorModal?.roundTitle || "Ronda de Inversión & Capital"}
            </span>
            <p className="text-xs text-zinc-300">
              {t.investorModal?.roundStatus || "Ronda Semilla en Curso • Asignación Prioritaria a Socios con Capacidad de Distribución"}
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={handleDownloadDossier}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10 shadow"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.investorModal?.downloadDossier || "Descargar Dossier"}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] cursor-pointer"
            >
              <span>{t.investorModal?.scheduleMeeting || "Agendar con Dirección"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
