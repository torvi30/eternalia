import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { saveQuoteRequest } from '../services/inquiryService';
import { 
  Calculator, 
  Layers, 
  Zap, 
  Globe2, 
  Server, 
  CheckCircle2, 
  Send, 
  Sparkles,
  Check,
  RotateCcw
} from 'lucide-react';

export default function QuoteEngine() {
  const { t, language } = useLanguage();

  const [selectedVertical, setSelectedVertical] = useState('commerce');
  const [selectedTier, setSelectedTier] = useState('growth');
  const [selectedAddons, setSelectedAddons] = useState(['whatsapp', 'payments']);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const verticalsConfig = [
    {
      id: 'commerce',
      title: t.quoteEngine?.verticals?.commerce?.title || 'Commerce Cloud',
      desc: t.quoteEngine?.verticals?.commerce?.desc || 'Landing ultra-conversión, catálogo QR y checkout sin intermediarios',
      basePrice: 450,
      icon: Layers,
      color: 'border-amber-500/40 text-amber-400 bg-amber-500/10'
    },
    {
      id: 'workforce',
      title: t.quoteEngine?.verticals?.workforce?.title || 'Workforce OS',
      desc: t.quoteEngine?.verticals?.workforce?.desc || 'Sistema operativo laboral, agenda, garantías y split payments',
      basePrice: 850,
      icon: Zap,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'mesh',
      title: t.quoteEngine?.verticals?.mesh?.title || 'Hyperlocal Mesh',
      desc: t.quoteEngine?.verticals?.mesh?.desc || 'Directorio municipal georreferenciado con enlaces directos WhatsApp',
      basePrice: 650,
      icon: Globe2,
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    },
    {
      id: 'enterprise',
      title: t.quoteEngine?.verticals?.enterprise?.title || 'Enterprise Ventures',
      desc: t.quoteEngine?.verticals?.enterprise?.desc || 'Telemetría IoT satelital de flotas o ERP masivo para eventos',
      basePrice: 1400,
      icon: Server,
      color: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10'
    }
  ];

  const tiersConfig = [
    {
      id: 'mvp',
      title: t.quoteEngine?.tiers?.mvp?.title || 'Lanzamiento Ágil (MVP)',
      desc: t.quoteEngine?.tiers?.mvp?.desc || 'Despliegue rápido en 7-10 días con componentes esenciales',
      multiplier: 1.0,
      timeline: language === 'es' ? '7 - 10 días hábiles' : '7 - 10 business days'
    },
    {
      id: 'growth',
      title: t.quoteEngine?.tiers?.growth?.title || 'Growth & Multi-Sucursal',
      desc: t.quoteEngine?.tiers?.growth?.desc || 'Escalabilidad para tráfico medio, integraciones API y analytics',
      multiplier: 1.5,
      timeline: language === 'es' ? '2 - 3 semanas' : '2 - 3 weeks'
    },
    {
      id: 'enterprise',
      title: t.quoteEngine?.tiers?.enterprise?.title || 'Enterprise High-SLA',
      desc: t.quoteEngine?.tiers?.enterprise?.desc || 'Clúster dedicado, SLA 99.99%, seguridad bancaria y soporte',
      multiplier: 2.2,
      timeline: language === 'es' ? '3 - 5 semanas' : '3 - 5 weeks'
    }
  ];

  const addonsList = t.quoteEngine?.addons || [
    { id: 'payments', name: 'Pasarela Split Payments & Suscripciones', price: 200 },
    { id: 'whatsapp', name: 'Integración Automatizada WhatsApp Cloud API', price: 150 },
    { id: 'telemetry', name: 'Telemetría IoT en Tiempo Real & Sensores', price: 350 },
    { id: 'map', name: 'Mapeo Georreferenciado & Geolocalización en Vivo', price: 180 },
    { id: 'warranties', name: 'Garantías Digitales Verificadas & Facturación', price: 220 },
  ];

  const toggleAddon = (id) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Dynamic calculations
  const quoteCalculation = useMemo(() => {
    const currentVert = verticalsConfig.find(v => v.id === selectedVertical) || verticalsConfig[0];
    const currentTier = tiersConfig.find(t => t.id === selectedTier) || tiersConfig[1];

    const baseCost = currentVert.basePrice * currentTier.multiplier;
    const addonsCost = selectedAddons.reduce((acc, addonId) => {
      const addon = addonsList.find(a => a.id === addonId);
      return acc + (addon ? addon.price : 0);
    }, 0);

    const totalEstimate = Math.round(baseCost + addonsCost);
    const rangeMin = Math.round(totalEstimate * 0.95);
    const rangeMax = Math.round(totalEstimate * 1.15);

    return {
      verticalName: currentVert.title,
      tierName: currentTier.title,
      timeline: currentTier.timeline,
      totalEstimate,
      rangeMin,
      rangeMax,
    };
  }, [selectedVertical, selectedTier, selectedAddons, language]);

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    setIsSubmitting(true);
    const quotePayload = {
      clientName,
      clientEmail,
      clientPhone,
      clientNotes,
      vertical: selectedVertical,
      tier: selectedTier,
      addons: selectedAddons,
      estimatedInvestmentUSD: quoteCalculation.totalEstimate,
      investmentRangeUSD: `$${quoteCalculation.rangeMin} - $${quoteCalculation.rangeMax}`,
      estimatedTimeline: quoteCalculation.timeline,
      timestamp: new Date().toISOString(),
    };

    const res = await saveQuoteRequest(quotePayload);
    setIsSubmitting(false);

    if (res.success) {
      setSubmissionSuccess(res.id);
    }
  };

  const handleReset = () => {
    setSubmissionSuccess(null);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setClientNotes('');
  };

  return (
    <section id="cotizador" className="relative py-24 sm:py-32 scroll-mt-20 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.quoteEngine?.badge || "INSTANT QUOTE ENGINE • ESTIMADOR EN VIVO"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.quoteEngine?.title || "Cotizador Interactivo de Soluciones"}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {t.quoteEngine?.subtitle || "Diseña el alcance técnico de tu proyecto en 3 pasos simples y obtén una estimación de inversión y entrega en tiempo real."}
          </p>
        </div>

        {submissionSuccess ? (
          /* Confirmation Card */
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-zinc-950/90 border border-emerald-500/40 text-center shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {t.quoteEngine?.successTitle || "¡Cotización Registrada con Éxito!"}
            </h3>
            <p className="text-sm text-zinc-300 mb-4 max-w-lg mx-auto">
              {t.quoteEngine?.successDesc || "Tu estimación fue archivada en el CRM institucional con el ID:"}
            </p>
            <div className="inline-block px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 font-mono text-cyan-400 text-sm font-bold mb-6">
              #{submissionSuccess}
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 text-left text-xs font-mono space-y-1 mb-6 text-zinc-300">
              <p>• Vertical: <span className="text-white font-bold">{quoteCalculation.verticalName}</span></p>
              <p>• Escala: <span className="text-white font-bold">{quoteCalculation.tierName}</span></p>
              <p>• Rango Estimado: <span className="text-emerald-400 font-bold">${quoteCalculation.rangeMin} - ${quoteCalculation.rangeMax} USD</span></p>
              <p>• Cronograma: <span className="text-cyan-400 font-bold">{quoteCalculation.timeline}</span></p>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.quoteEngine?.successAction || "Cotizar otra solución"}</span>
            </button>
          </div>
        ) : (
          /* Estimator Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Selector Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Vertical */}
              <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
                <h3 className="text-sm font-mono font-bold text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-xs">1</span>
                  <span>{t.quoteEngine?.step1Title || "1. Selecciona la Vertical Tecnológica"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {verticalsConfig.map((v) => {
                    const isSelected = selectedVertical === v.id;
                    const Icon = v.icon;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVertical(v.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-zinc-900 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                            : 'bg-zinc-900/40 border-white/5 hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-2 rounded-xl border ${v.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">{v.title}</h4>
                          <p className="text-xs text-zinc-400 line-clamp-2">{v.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Scale Tier */}
              <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
                <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center text-xs">2</span>
                  <span>{t.quoteEngine?.step2Title || "2. Nivel de Escala & Arquitectura"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {tiersConfig.map((tier) => {
                    const isSelected = selectedTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTier(tier.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-zinc-900 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                            : 'bg-zinc-900/40 border-white/5 hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                            {tier.multiplier}x Scale
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{tier.title}</h4>
                          <p className="text-[11px] text-zinc-400 mb-2">{tier.desc}</p>
                          <span className="text-[10px] text-emerald-400 font-mono font-semibold block">
                            ⏳ {tier.timeline}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Add-on Modules */}
              <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
                <h3 className="text-sm font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-300 flex items-center justify-center text-xs">3</span>
                  <span>{t.quoteEngine?.step3Title || "3. Módulos Adicionales de Alto Impacto"}</span>
                </h3>
                <div className="space-y-2">
                  {addonsList.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-zinc-900/80 border-cyan-500/50 text-white'
                            : 'bg-zinc-900/30 border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked ? 'bg-cyan-500 border-cyan-500 text-zinc-950' : 'border-zinc-700 bg-zinc-800'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs sm:text-sm font-medium">{addon.name}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-cyan-400 shrink-0">
                          +${addon.price} USD
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Live Estimation & Submission Right Column (5 cols) */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="p-6 sm:p-7 rounded-3xl bg-zinc-950 border border-white/15 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
                
                {/* Glow accent in top right */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-zinc-300 uppercase">
                      RESUMEN DE ESTIMACIÓN
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
                    Dynamic Engine
                  </span>
                </div>

                {/* Scope Preview */}
                <div className="space-y-2 mb-6 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Vertical Core:</span>
                    <span className="text-white font-bold">{quoteCalculation.verticalName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Nivel de Escala:</span>
                    <span className="text-white font-bold">{quoteCalculation.tierName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Módulos Activos:</span>
                    <span className="text-cyan-300 font-bold">{selectedAddons.length} integrados</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Plazo Estimado:</span>
                    <span className="text-amber-400 font-bold">{quoteCalculation.timeline}</span>
                  </div>
                </div>

                {/* Big Price Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/60 border border-white/10 mb-6 text-center">
                  <span className="text-[11px] text-zinc-400 uppercase tracking-wider block font-mono mb-1">
                    {t.quoteEngine?.estimatedInvestment || "Inversión Estimada"}
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-300">
                    ${quoteCalculation.rangeMin} - ${quoteCalculation.rangeMax}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono block mt-1">
                    {t.quoteEngine?.usdSuffix || "USD aprox. (llave en mano)"}
                  </span>
                </div>

                {/* Submission Form */}
                <form onSubmit={handleSubmitQuote} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                      {t.quoteEngine?.formName || "Nombre o Razón Social"} *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Carlos Restrepo / Grupo Alfa"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        {t.quoteEngine?.formEmail || "Correo Corporativo"} *
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="ceo@empresa.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        {t.quoteEngine?.formPhone || "WhatsApp / Teléfono"}
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+57 300 000 0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                      {t.quoteEngine?.formNotes || "Notas o Alcance Específico"}
                    </label>
                    <textarea
                      rows={2}
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="Indica cualquier integración previa o fecha límite..."
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-zinc-950 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-300 hover:opacity-90 transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    <span>
                      {isSubmitting 
                        ? (t.quoteEngine?.submitting || "Transmitiendo al clúster...") 
                        : (t.quoteEngine?.submitBtn || "Enviar Cotización al CRM de Eternalia")}
                    </span>
                  </button>
                </form>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
