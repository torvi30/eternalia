import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  UtensilsCrossed,
  Monitor,
  Tablet,
  Smartphone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function FeaturedProducts({ onOpenContact }) {
  const { language } = useLanguage();
  const [activeDevice, setActiveDevice] = useState('desktop');

  return (
    <section id="productos-disponibles" className="py-24 relative overflow-hidden scroll-mt-20">
      {/* Background ambient decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-700 dark:text-orange-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'PRODUCTOS & SOFTWARE LISTOS PARA DESPLIEGUE' : 'READY-TO-DEPLOY SOFTWARE PRODUCTS'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            {language === 'es' ? 'Productos Disponibles de EternalIA' : 'Available EternalIA Products'}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            {language === 'es'
              ? 'Plataformas SaaS de alto rendimiento, 100% responsivas para tabletas de cocina, monitores de caja y teléfonos móviles de clientes. Conoce nuestro producto insignia para el sector gastronómico.'
              : 'High-performance SaaS platforms, 100% responsive for kitchen tablets, cashier monitors, and customer mobile phones. Explore our flagship gastronomy software.'}
          </p>
        </div>

        {/* Featured Product Banner Card */}
        <div className="bg-gradient-to-b from-white to-slate-50 dark:from-[#0e0f17] dark:to-[#090a10] rounded-3xl border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden relative">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Product Information & Value Proposition */}
            <div className="lg:col-span-5 space-y-6">

              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {language === 'es' ? 'Producto Disponible • En Producción' : 'Live Product • In Production'}
                </span>
                <span className="text-xs font-mono text-orange-600 dark:text-orange-400 font-bold">v2.4 Live</span>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 p-[1.5px] shadow-md">
                    <div className="w-full h-full bg-white dark:bg-[#0c0d14] rounded-[10px] flex items-center justify-center">
                      <UtensilsCrossed className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                    EternalIA Gastronomía OS
                  </h3>
                </div>
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                  {language === 'es'
                    ? 'Sistema Operativo para Restaurantes, Comidas Rápidas & Cafeterías'
                    : 'Operating System for Restaurants, Fast-Food Chains & Cafes'}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {language === 'es'
                  ? 'Elimina comisiones de intermediarios (Rappi, UberEats). Gestiona pedidos en mesa con código QR, comanda automática hacia comanderos de cocina, control de inventario en tiempo real y analítica de ticket promedio.'
                  : 'Eliminate 3rd-party commission cuts. Manage table QR orders, automated kitchen tickets, real-time inventory control, and average ticket analytics.'}
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{language === 'es' ? '0% Comisiones por venta' : '0% Commission fees'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{language === 'es' ? 'Menú QR para mesas' : 'In-table QR menu'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{language === 'es' ? 'Despacho directo WhatsApp' : 'Direct WhatsApp dispatch'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{language === 'es' ? 'Control de Stock en vivo' : 'Live stock tracking'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/restaurantes"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <span>{language === 'es' ? 'Ver Landing Dedicada de Restaurantes' : 'Explore Dedicated Restaurant Landing'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={onOpenContact}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                >
                  {language === 'es' ? 'Cotizar Implementación' : 'Get a Quote'}
                </button>
              </div>

            </div>

            {/* Right Column: Multi-Device Responsive Simulator */}
            <div className="lg:col-span-7 flex flex-col items-center">

              {/* Responsive Device Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200 dark:bg-zinc-900 border border-black/5 dark:border-white/10 mb-5">
                <button
                  onClick={() => setActiveDevice('desktop')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeDevice === 'desktop'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Escritorio' : 'Desktop'}</span>
                </button>

                <button
                  onClick={() => setActiveDevice('tablet')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeDevice === 'tablet'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Tablet (Cocina)' : 'Tablet'}</span>
                </button>

                <button
                  onClick={() => setActiveDevice('mobile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeDevice === 'mobile'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Móvil (Mesero/QR)' : 'Mobile'}</span>
                </button>
              </div>

              {/* Dynamic Frame Display */}
              <div className="w-full flex items-center justify-center min-h-[300px]">

                {/* Desktop View */}
                {activeDevice === 'desktop' && (
                  <div className="w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 shadow-2xl bg-zinc-950 animate-in fade-in duration-300">
                    <div className="h-6 bg-slate-200 dark:bg-zinc-800 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">
                        restaurant.eternalia.co/pedidos
                      </span>
                      <span className="text-[9px] font-mono text-emerald-500 font-bold">1920x1080</span>
                    </div>
                    <div className="relative aspect-[16/9] bg-zinc-950 overflow-hidden">
                      <img
                        src="/products/restaurants/pedidos.jpg"
                        alt="Pantalla de Pedidos en Escritorio"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Tablet View */}
                {activeDevice === 'tablet' && (
                  <div className="w-[85%] rounded-3xl p-2.5 bg-zinc-900 border-4 border-zinc-700 shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
                      <div className="h-5 bg-zinc-800 px-3 flex items-center justify-between border-b border-white/10 text-[9px] font-mono text-zinc-400">
                        <span>iPad Pro 11&quot; • Comandero</span>
                        <span className="text-orange-400 font-bold">Tablet POS</span>
                      </div>
                      <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                        <img
                          src="/products/restaurants/productos.jpg"
                          alt="Pantalla de Menú en Tablet"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile View */}
                {activeDevice === 'mobile' && (
                  <div className="w-[260px] rounded-[36px] p-2.5 bg-zinc-900 border-4 border-zinc-700 shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-3.5 bg-zinc-800 rounded-full mx-auto mb-2" />
                    <div className="rounded-[24px] overflow-hidden border border-white/10 bg-zinc-950">
                      <div className="h-5 bg-zinc-800 px-3 flex items-center justify-between border-b border-white/10 text-[8px] font-mono text-zinc-400">
                        <span>Menú QR</span>
                        <span className="text-emerald-400 font-bold">5G</span>
                      </div>
                      <div className="relative aspect-[9/16] bg-zinc-950 overflow-hidden">
                        <img
                          src="/products/restaurants/pedidos.jpg"
                          alt="Pantalla Móvil"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                    <div className="w-24 h-1 bg-zinc-700 rounded-full mx-auto mt-2" />
                  </div>
                )}

              </div>

              <div className="mt-3 text-center text-[11px] font-mono text-zinc-500">
                {language === 'es'
                  ? 'Soporte responsive verificado para iPad, POS táctil Android, iPhone y monitores de caja.'
                  : 'Verified responsive layout for iPad, Android POS touchscreens, iPhone, and desktop monitors.'}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

