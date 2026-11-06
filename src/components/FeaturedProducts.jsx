import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  UtensilsCrossed, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Maximize2
} from 'lucide-react';

export default function FeaturedProducts({ onOpenContact }) {
  const { language } = useLanguage();

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

            {/* Right Column: Desktop Browser Preview */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 shadow-2xl bg-zinc-950">
                <div className="h-7 bg-slate-200 dark:bg-zinc-800 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    restaurant.eternalia.co/pedidos
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">1920x1080 Full HD</span>
                </div>
                <div className="relative aspect-[16/9] bg-zinc-950 overflow-hidden">
                  <img
                    src="/products/restaurants/pedidos.jpg"
                    alt="Pantalla de Pedidos en Escritorio"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="mt-3 text-center text-[11px] font-mono text-zinc-500">
                {language === 'es'
                  ? 'Panel de control de pedidos, comandas a cocina y caja en tiempo real.'
                  : 'Real-time order control, kitchen tickets, and cashier dashboard.'}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

