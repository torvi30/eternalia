import { useState, useEffect, useCallback } from 'react';
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
  Layers,
  Package,
  Eye,
  ShoppingBag,
  Palette,
  MapPin,
  Calendar,
  X
} from 'lucide-react';

export default function FeaturedProducts({ onOpenContact }) {
  const { language } = useLanguage();
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const desktopScreens = [
    {
      id: 'menu-cliente',
      labelEs: 'Menú en Vivo para Clientes (Dark UI)',
      labelEn: 'Live Customer Menu (Dark UI)',
      shortLabelEs: 'Menú en Vivo',
      shortLabelEn: 'Live Menu',
      icon: ShoppingBag,
      url: 'chickenking.menu.eternalia.co',
      img: '/products/restaurants/menu-cliente-vivo.jpg',
      captionEs: 'Experiencia interactiva del cliente: empanadas de colores, adiciones, selección rápida y carrito flotante.',
      captionEn: 'Interactive diner experience: colored artisanal snacks, sides, quick select, and floating cart checkout.'
    },
    {
      id: 'pedidos',
      labelEs: 'Gestión de Pedidos & Mesas QR',
      labelEn: 'Orders & Table QR Management',
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
      labelEs: 'Menú Digital & Catálogo de Platos',
      labelEn: 'Digital Menu & Dish Catalog',
      shortLabelEs: 'Platos & Precios',
      shortLabelEn: 'Dishes & Prices',
      icon: UtensilsCrossed,
      url: 'restaurant.eternalia.co/admin/productos',
      img: '/products/restaurants/productos.jpg',
      captionEs: 'Catálogo con fotografías HD, precios en COP y activación/pausa de platos en 1 clic.',
      captionEn: 'HD food catalog with live prices in COP and 1-tap dish availability toggle.'
    },
    {
      id: 'branding',
      labelEs: 'Personalización de Colores & 10 Paletas UI',
      labelEn: 'Color Branding & 10 UI Palettes',
      shortLabelEs: 'Colores & Branding',
      shortLabelEn: 'Branding',
      icon: Palette,
      url: 'restaurant.eternalia.co/admin/personalizacion',
      img: '/products/restaurants/personalizacion-colores.jpg',
      captionEs: 'Configura colores de fondo, tarjetas, botones y footer con 10 estilos recomendados y vista previa en tiempo real.',
      captionEn: 'Custom brand color styling for backgrounds, cards, and buttons with 10 pre-crafted UX palettes.'
    },
    {
      id: 'mapa',
      labelEs: 'Ubicación en Google Maps & Datos de Tienda',
      labelEn: 'Google Maps Location & Store Data',
      shortLabelEs: 'Ubicación Maps',
      shortLabelEn: 'Maps Location',
      icon: MapPin,
      url: 'restaurant.eternalia.co/admin/configuracion',
      img: '/products/restaurants/configuracion-mapa.jpg',
      captionEs: 'Geolocalización con mapa interactivo embebido, selección de tipo de tienda (asadero) y textos de checkout.',
      captionEn: 'Interactive Google Maps store pin, restaurant type classification, and checkout terms.'
    },
    {
      id: 'horarios',
      labelEs: 'Horarios de Atención & Opciones de Servicio',
      labelEn: 'Opening Hours & Delivery Options',
      shortLabelEs: 'Horarios & Domicilios',
      shortLabelEn: 'Hours & Delivery',
      icon: Calendar,
      url: 'restaurant.eternalia.co/admin/horarios',
      img: '/products/restaurants/horarios-servicio.png',
      captionEs: 'Horarios por día (Lunes a Domingo), costos base de domicilio, rango de entrega y pedidos para recoger.',
      captionEn: 'Day-by-day schedules, delivery base pricing, free shipping threshold, and pickup options.'
    },
    {
      id: 'categorias',
      labelEs: 'Categorías del Menú & Estructura',
      labelEn: 'Menu Categories & Structure',
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
      labelEs: 'Control de Inventario & Alertas de Stock',
      labelEn: 'Stock & Inventory Control',
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

  const handlePrev = useCallback(() => {
    setActiveScreenIndex((prev) => (prev === 0 ? desktopScreens.length - 1 : prev - 1));
  }, [desktopScreens.length]);

  const handleNext = useCallback(() => {
    setActiveScreenIndex((prev) => (prev === desktopScreens.length - 1 ? 0 : prev + 1));
  }, [desktopScreens.length]);

  // Keyboard navigation & body scroll locking when fullscreen lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;

    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsLightboxOpen(false);
      }
    };

    let lastWheelTime = 0;
    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime < 280) return;
      if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
        lastWheelTime = now;
        if (e.deltaY > 0 || e.deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isLightboxOpen, handleNext, handlePrev]);

  // Touch swipe handlers for mobile devices
  const minSwipeDistance = 45;

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      // Swiped left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Previous
      handlePrev();
    }
  };

  return (
    <section id="productos-disponibles" className="py-24 relative overflow-hidden scroll-mt-20">
      {/* Background ambient decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-700 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'PRODUCTOS & SOFTWARE LISTOS PARA DESPLIEGUE' : 'READY-TO-DEPLOY SOFTWARE PRODUCTS'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            {language === 'es' ? 'Productos Disponibles de EternalIA' : 'Available EternalIA Products'}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            {language === 'es'
              ? 'Plataformas SaaS de alto rendimiento para el sector gastronómico. Explora los módulos reales en vista de escritorio que transforman la operación de restaurantes y comidas rápidas.'
              : 'High-performance SaaS platforms for the gastronomy industry. Explore the real desktop modules transforming restaurant and fast-food operations.'}
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
                <span className="text-xs font-mono text-blue-600 dark:text-cyan-400 font-bold">
                  {desktopScreens.length} {language === 'es' ? 'Módulos Activos' : 'Active Modules'}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[1.5px] shadow-md">
                    <div className="w-full h-full bg-white dark:bg-[#0c0d14] rounded-[10px] flex items-center justify-center">
                      <UtensilsCrossed className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                    EternalIA Gastronomía OS
                  </h3>
                </div>
                <p className="text-sm font-semibold text-blue-600 dark:text-cyan-400">
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
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer group"
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
                      className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${isActive
                          ? 'bg-blue-600 text-white shadow-md'
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
                      onClick={() => setIsLightboxOpen(true)}
                      className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                      title={language === 'es' ? 'Ampliar pantalla completa' : 'Full screen view'}
                    >
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Screenshot Frame with Navigation Controls */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
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
                    <span className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-lg flex items-center gap-1.5">
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

              {/* Mini Desktop Thumbnail Carousel (All 9 Real Screens) */}
              <div className="flex items-center gap-2 mt-4 w-full overflow-x-auto pb-1">
                {desktopScreens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreenIndex(idx)}
                    title={language === 'es' ? screen.labelEs : screen.labelEn}
                    className={`rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-black cursor-pointer aspect-[16/9] w-20 sm:w-24 shrink-0 ${activeScreenIndex === idx
                        ? 'border-blue-500 shadow-md scale-105 opacity-100 ring-2 ring-blue-500/30'
                        : 'border-black/10 dark:border-white/10 opacity-60 hover:opacity-100'
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

      {/* Fullscreen Lightbox Modal (Keyboard & Touch-Swipe Optimized) */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none overscroll-contain"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative max-w-6xl w-full max-h-[96vh] flex flex-col rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-950 overscroll-contain"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Modal Header */}
            <div className="h-11 sm:h-12 bg-zinc-900/90 px-3 sm:px-5 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-cyan-400 font-mono text-xs font-bold shrink-0">
                  {activeScreenIndex + 1} / {desktopScreens.length}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white truncate">
                  {language === 'es' ? currentScreen.labelEs : currentScreen.labelEn}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden md:inline-block text-[11px] text-zinc-400 font-mono">
                  {language === 'es' ? '← / → Teclas para cambiar' : '← / → Keys to navigate'}
                </span>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="flex items-center gap-1.5 text-zinc-300 hover:text-white text-xs font-bold px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Cerrar (ESC)</span>
                </button>
              </div>
            </div>

            {/* Modal Image Area with Floating Side Navigation Arrows */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden min-h-[300px]">
              <img
                key={currentScreen.id}
                src={currentScreen.img}
                alt={currentScreen.labelEs}
                className="max-h-[64vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              />

              {/* Floating Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-blue-600 text-white border border-white/20 hover:border-blue-500 shadow-2xl flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95"
                title={language === 'es' ? 'Anterior (Flecha izquierda)' : 'Previous (Left arrow)'}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Floating Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-blue-600 text-white border border-white/20 hover:border-blue-500 shadow-2xl flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95"
                title={language === 'es' ? 'Siguiente (Flecha derecha)' : 'Next (Right arrow)'}
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Footer with Mobile Swipe Hint and Mini Thumbnails */}
            <div className="bg-zinc-900/90 px-3 sm:px-4 py-2 border-t border-white/10 shrink-0">
              <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] text-zinc-400">
                <span className="truncate">
                  {language === 'es' ? currentScreen.captionEs : currentScreen.captionEn}
                </span>
                <span className="shrink-0 text-cyan-400 font-medium sm:hidden">
                  {language === 'es' ? '← Desliza para navegar →' : '← Swipe to navigate →'}
                </span>
              </div>

              {/* Thumbnail Strip inside Modal */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {desktopScreens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreenIndex(idx)}
                    title={language === 'es' ? screen.labelEs : screen.labelEn}
                    className={`rounded-lg overflow-hidden border transition-all p-0.5 bg-black cursor-pointer aspect-[16/9] w-14 sm:w-20 shrink-0 ${activeScreenIndex === idx
                        ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105 opacity-100'
                        : 'border-white/10 opacity-50 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={screen.img}
                      alt={screen.labelEs}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
