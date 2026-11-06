import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  UtensilsCrossed, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Clock,
  BarChart3,
  Layers,
  Package,
  Eye,
  X
} from 'lucide-react';

export default function FeaturedProducts({ onOpenContact }) {
  const { language } = useLanguage();
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [zoomModalImg, setZoomModalImg] = useState(null);

  const desktopScreens = [
    {
      id: 'pedidos',
      labelEs: 'Pedidos & Mesas QR',
      labelEn: 'Orders & Table QR',
      shortLabelEs: 'Pedidos',
      shortLabelEn: 'Orders',
      icon: Clock,
      url: 'restaurant.eternalia.co/admin/pedidos',
      img: '/products/restaurants/pedidos.jpg',
      captionEs: 'Control de pedidos en vivo, mesas con QR, despachos a WhatsApp e impresión térmica.',
      captionEn: 'Live order tracking, table QR codes, direct WhatsApp dispatch, and thermal printing.'
    },
    {
      id: 'productos',
      labelEs: 'Menú Digital & Platos',
      labelEn: 'Digital Menu & Dishes',
      shortLabelEs: 'Menú & Platos',
      shortLabelEn: 'Menu & Dishes',
      icon: UtensilsCrossed,
      url: 'restaurant.eternalia.co/admin/productos',
      img: '/products/restaurants/productos.jpg',
      captionEs: 'Catálogo con fotografías HD, precios en COP y activación/pausa de platos en 1 clic.',
      captionEn: 'HD food catalog with live prices in COP and 1-tap dish availability toggle.'
    },
    {
      id: 'metricas',
      labelEs: 'Métricas & Ventas',
      labelEn: 'Sales & Metrics',
      shortLabelEs: 'Métricas',
      shortLabelEn: 'Metrics',
      icon: BarChart3,
      url: 'restaurant.eternalia.co/admin/metricas',
      img: '/products/restaurants/metricas.jpg',
      captionEs: 'Analítica de ventas del mes, horas pico, ranking de platos más vendidos y exportación CSV.',
      captionEn: 'Monthly revenue metrics, rush peak hours, top-seller dishes, and CSV export.'
    },
    {
      id: 'categorias',
      labelEs: 'Categorías del Menú',
      labelEn: 'Menu Categories',
      shortLabelEs: 'Categorías',
      shortLabelEn: 'Categories',
      icon: Layers,
      url: 'restaurant.eternalia.co/admin/categorias',
      img: '/products/restaurants/categorias.jpg',
      captionEs: 'Organización intuitiva de sopas, almuerzos del día, comidas rápidas, bebidas y adiciones.',
      captionEn: 'Intuitive organization of soups, lunch specials, fast food, drinks, and extra sides.'
    },
    {
      id: 'inventario',
      labelEs: 'Control de Inventario',
      labelEn: 'Stock & Inventory',
      shortLabelEs: 'Inventario',
      shortLabelEn: 'Inventory',
      icon: Package,
      url: 'restaurant.eternalia.co/admin/inventario',
      img: '/products/restaurants/inventario.png',
      captionEs: 'Monitoreo de insumos con stock activo, valor total del inventario y alertas tempranas.',
      captionEn: 'Supply monitoring with active stock, total inventory valuation, and early alerts.'
    }
  ];

  const currentScreen = desktopScreens[activeScreenIndex];

  const handlePrev = () => {
    setActiveScreenIndex((prev) => (prev === 0 ? desktopScreens.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveScreenIndex((prev) => (prev === desktopScreens.length - 1 ? 0 : prev + 1));
  };

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
              ? 'Plataformas SaaS de alto rendimiento para el sector gastronómico. Explora los 5 módulos reales en vista de escritorio que transforman la operación de restaurantes y comidas rápidas.'
              : 'High-performance SaaS platforms for the gastronomy industry. Explore the 5 real desktop modules transforming restaurant and fast-food operations.'}
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
                <span className="text-xs font-mono text-orange-600 dark:text-orange-400 font-bold">5 Módulos Activos</span>
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

            {/* Right Column: Multi-Screen Desktop Browser Showcase */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              {/* Module Screen Selector Tabs */}
              <div className="w-full flex items-center justify-between gap-1.5 p-1 rounded-2xl bg-slate-200 dark:bg-zinc-900 border border-black/5 dark:border-white/10 mb-4 overflow-x-auto">
                {desktopScreens.map((screen, idx) => {
                  const Icon = screen.icon;
                  const isActive = activeScreenIndex === idx;
                  return (
                    <button
                      key={screen.id}
                      onClick={() => setActiveScreenIndex(idx)}
                      className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{language === 'es' ? screen.shortLabelEs : screen.shortLabelEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop Browser Window */}
              <div className="w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 shadow-2xl bg-zinc-950 group/browser relative">
                
                {/* Browser Top Chrome */}
                <div className="h-7 bg-slate-200 dark:bg-zinc-800 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  
                  {/* Dynamic URL bar matching active screen */}
                  <div className="px-3 py-0.5 rounded-md bg-white/70 dark:bg-zinc-950/70 border border-black/5 dark:border-white/5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 truncate max-w-[280px]">
                    🔒 {currentScreen.url}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-emerald-500 font-bold hidden sm:inline">1920x1080 Full HD</span>
                    <button
                      onClick={() => setZoomModalImg(currentScreen.img)}
                      className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                      title={language === 'es' ? 'Ampliar pantalla' : 'Zoom screen'}
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Screenshot Frame with Navigation Controls */}
                <div 
                  onClick={() => setZoomModalImg(currentScreen.img)}
                  className="relative aspect-[16/9] bg-zinc-950 overflow-hidden cursor-pointer"
                >
                  <img
                    key={currentScreen.id}
                    src={currentScreen.img}
                    alt={currentScreen.labelEs}
                    className="w-full h-full object-contain animate-in fade-in duration-300"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/browser:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-lg flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'es' ? 'Click para Pantalla Completa' : 'Click to View Full Screen'}</span>
                    </span>
                  </div>

                  {/* Previous / Next Arrow Controls */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer opacity-80 hover:opacity-100"
                    aria-label="Pantalla anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer opacity-80 hover:opacity-100"
                    aria-label="Siguiente pantalla"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Active Screen Caption */}
              <div className="mt-3.5 text-center text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-center gap-2">
                <span className="font-bold text-zinc-900 dark:text-white">
                  {language === 'es' ? currentScreen.labelEs : currentScreen.labelEn}:
                </span>
                <span>
                  {language === 'es' ? currentScreen.captionEs : currentScreen.captionEn}
                </span>
              </div>

              {/* Mini Desktop Thumbnail Carousel */}
              <div className="grid grid-cols-5 gap-2 mt-4 w-full">
                {desktopScreens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreenIndex(idx)}
                    className={`rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-black cursor-pointer aspect-[16/9] ${
                      activeScreenIndex === idx 
                        ? 'border-orange-500 shadow-md scale-105' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={screen.img} 
                      alt={screen.labelEs} 
                      className="w-full h-full object-cover rounded-lg" 
                    />
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {zoomModalImg && (
        <div 
          onClick={() => setZoomModalImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative max-w-6xl w-full max-h-[95vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-950">
            <div className="h-8 bg-zinc-900 px-4 flex items-center justify-between border-b border-white/10">
              <span className="text-xs font-mono text-zinc-300 font-bold">Captura en Alta Definición • Vista de Escritorio</span>
              <button
                onClick={() => setZoomModalImg(null)}
                className="text-zinc-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded bg-zinc-800 cursor-pointer"
              >
                Cerrar (ESC)
              </button>
            </div>
            <div className="p-2 bg-black flex items-center justify-center">
              <img 
                src={zoomModalImg} 
                alt="Captura ampliada" 
                className="max-h-[85vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
