import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import ContactModal from '../components/ContactModal';
import {
  UtensilsCrossed,
  CheckCircle2,
  Clock,
  ShoppingBag,
  Layers,
  Package,
  Palette,
  MapPin,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  QrCode,
  Sun,
  Moon,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

export default function RestaurantLanding() {
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [activeModule, setActiveModule] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const modules = [
    {
      id: 'menu-cliente',
      nameEs: 'Menú Digital en Vivo (Cliente)',
      nameEn: 'Live Customer Digital Menu',
      taglineEs: 'Diseño Dark Mode de alta gama con carrito flotante y fotos apetitosas',
      taglineEn: 'Upscale Dark Mode UI with floating checkout cart and appetizing food shots',
      img: '/products/restaurants/menu-cliente-vivo.jpg',
      icon: ShoppingBag,
      badgeEs: 'Experiencia del Comensal',
      badgeEn: 'Diner Experience',
      featuresEs: [
        'Presentación visual impactante con fotos de platos, pasteles y empanadas gourmet.',
        'Contadores interactivos (+ / -) para selección ágil de cantidades sin salir del menú.',
        'Barra flotante inferior con total en pesos (COP) y botón directo a pedido.',
        'Sin descargas pesadas de apps: abre instantáneamente desde cualquier escaneo QR o enlace.'
      ],
      featuresEn: [
        'High-impact visual layout with HD imagery of gourmet snacks, sides, and main courses.',
        'Interactive (+ / -) count buttons for rapid item adding without navigating away.',
        'Bottom floating order bar with real-time total and 1-click checkout initiation.',
        'Zero app downloads: loads in milliseconds via QR scan or shared social link.'
      ]
    },
    {
      id: 'branding',
      nameEs: 'Personalización de Colores & 10 Paletas UI',
      nameEn: 'Color Branding & 10 UI Palettes',
      taglineEs: 'Adapta la identidad de tu restaurante con paletas recomendadas por diseñadores',
      taglineEn: 'Tailor your restaurant brand identity with designer-crafted color schemes',
      img: '/products/restaurants/personalizacion-colores.jpg',
      icon: Palette,
      badgeEs: 'Personalización Total',
      badgeEn: 'Full Customization',
      featuresEs: [
        'Configuración de 4 colores clave: fondo general, tarjetas de productos, botones de acción y footer.',
        '10 paletas temáticas pre-diseñadas (Trattoria & Fuego, Burger & Cheddar, Gourmet Botánico, etc.).',
        'Previsualizador en tiempo real que muestra el contraste de tu landing antes de guardar.',
        'Interruptor para activar badges de promociones y descuentos visibles en el directorio.'
      ],
      featuresEn: [
        'Tune 4 core colors: landing background, dish cards, CTA buttons, and footer accents.',
        '10 thematic preset palettes (Steakhouse Royale, Burger & Cheddar, Botanical Gourmet, etc.).',
        'Live split preview verifying WCAG text-contrast before applying changes live.',
        'Toggle switch for instant banner badges on special offers and discount campaigns.'
      ]
    },
    {
      id: 'mapa',
      nameEs: 'Ubicación en Google Maps & Datos de Tienda',
      nameEn: 'Google Maps Location & Store Data',
      taglineEs: 'Geolocalización exacta de tu sede para facilitar llegadas y domicilios',
      taglineEn: 'Accurate branch geolocation powering effortless customer arrival and dispatch',
      img: '/products/restaurants/configuracion-mapa.jpg',
      icon: MapPin,
      badgeEs: 'Geolocalización',
      badgeEn: 'Geolocation',
      featuresEs: [
        'Mapa interactivo embebido con pin personalizado de tu restaurante o asadero.',
        'Selección de categoría de tienda para títulos de encabezado y directorios locales.',
        'Instrucciones de pago y notas de entrega personalizadas bajo el total de checkout.',
        'Imagen por defecto para platos nuevos que aún no tengan fotografía tomada.'
      ],
      featuresEn: [
        'Interactive embedded Google Maps view pinpointing your kitchen or dining room.',
        'Store classification dropdown tailored for local search discovery.',
        'Custom payment instructions and delivery terms displayed right below checkout total.',
        'Smart fallback placeholder imagery for newly added dishes awaiting photo shoots.'
      ]
    },
    {
      id: 'horarios',
      nameEs: 'Horarios de Atención & Opciones de Entrega',
      nameEn: 'Opening Hours & Delivery Options',
      taglineEs: 'Control de apertura por días, tarifas de flete y rangos de despacho',
      taglineEn: 'Day-by-day operating schedules, delivery fees, and estimated transit times',
      img: '/products/restaurants/horarios-servicio.png',
      icon: Calendar,
      badgeEs: 'Logística & Turnos',
      badgeEn: 'Logistics & Hours',
      featuresEs: [
        'Programación semanal detallada de lunes a domingo con rangos horarios precisos.',
        'Activación selectiva de canales de entrega: "Para recoger en barra" y "Domicilio a casa".',
        'Definición de tarifa base de envío y umbral de compra para envío gratuito.',
        'Muestra del tiempo estimado de entrega (ej. 30-45 min) para expectativas claras del cliente.'
      ],
      featuresEn: [
        'Detailed Monday-to-Sunday opening hours schedule with precise open/close times.',
        'Independent toggle for fulfillment modes: "Curbside pickup" and "Home delivery".',
        'Base courier fee configuration and minimum ticket threshold for free shipping promos.',
        'Live estimated delivery transit time badge (e.g. 30-45 min) keeping customers informed.'
      ]
    },
    {
      id: 'pedidos',
      nameEs: 'Gestión de Pedidos & Comandas',
      nameEn: 'Order & Kitchen Tickets Management',
      taglineEs: 'Pedidos para mesa con QR, domicilios y retiro en punto centralizados',
      taglineEn: 'In-table QR orders, delivery dispatch, and counter pick-up unified',
      img: '/products/restaurants/pedidos.jpg',
      icon: Clock,
      badgeEs: 'Módulo Crítico',
      badgeEn: 'Core Engine',
      featuresEs: [
        'Despacho en 1 clic directo al WhatsApp del cliente con formato de comanda estructurado.',
        'Soporte completo para códigos QR en mesas, pedidos para llevar y despacho a domicilio.',
        'Impresión térmica automática para comandas de cocina y cuentas de salón.',
        'Trazabilidad en tiempo real de estados: Pendiente, En Preparación, Entregado y Pagado.'
      ],
      featuresEn: [
        '1-click direct dispatch to customer WhatsApp with structured receipt format.',
        'Full support for table QR codes, takeout orders, and delivery dispatch.',
        'Automatic thermal printing for kitchen tickets and dining room bills.',
        'Real-time status tracking: Pending, Cooking, Dispatched, and Paid.'
      ]
    },
    {
      id: 'productos',
      nameEs: 'Catálogo & Menú Digital',
      nameEn: 'Digital Menu & Product Catalog',
      taglineEs: 'Fotografías HD, precios dinámicos y control instantáneo de disponibilidad',
      taglineEn: 'HD food imagery, dynamic pricing, and instant availability toggles',
      img: '/products/restaurants/productos.jpg',
      icon: UtensilsCrossed,
      badgeEs: 'Alta Conversión',
      badgeEn: 'High Conversion',
      featuresEs: [
        'Carga de fotografías de alta definición optimizadas para carga ultrarrápida.',
        'Activación y desactivación de productos agotados con un solo toque (evita cancelaciones).',
        'Gestión de menú del día con platos destacados, combos y promociones automáticas.',
        'Precios en pesos colombianos (COP) o moneda local sin retrasos en sincronización.'
      ],
      featuresEn: [
        'HD food photography optimized for sub-second page loads.',
        '1-tap toggle for out-of-stock dishes (eliminates frustrated cancellations).',
        'Daily specials management with featured dishes, combos, and time-based promos.',
        'Live pricing updates without caching delays across all diner devices.'
      ]
    },
    {
      id: 'categorias',
      nameEs: 'Categorías & Menú Estructurado',
      nameEn: 'Categories & Menu Structure',
      taglineEs: 'Organiza sopas, jugos, almuerzos, fritos y adiciones de forma intuitiva',
      taglineEn: 'Organize soups, juices, daily lunch specials, snacks, and extra toppings',
      img: '/products/restaurants/categorias.jpg',
      icon: Layers,
      badgeEs: 'Fácil Administración',
      badgeEn: 'Easy Admin',
      featuresEs: [
        'Reorganización rápida del orden de aparición de categorías en el menú del cliente.',
        'Subcategorías flexibles para salsas, guarniciones, términos de carne y adiciones.',
        'Estados activo/inactivo por horario (ej. desayunos en la mañana, comidas en la noche).',
        'Descripción clara de cada sección para orientar al cliente en su pedido.'
      ],
      featuresEn: [
        'Drag-and-drop category reordering directly reflected on digital menus.',
        'Flexible subcategories for sauces, sides, meat temperatures, and add-ons.',
        'Active/inactive schedule toggles (e.g. breakfast menus vs. evening dinners).',
        'Clear section descriptions that guide customer order choices.'
      ]
    },
    {
      id: 'inventario',
      nameEs: 'Control de Inventario & Stock',
      nameEn: 'Inventory & Stock Supervision',
      taglineEs: 'Supervisión de insumos críticos con valorización del inventario en tiempo real',
      taglineEn: 'Critical supply monitoring with real-time stock valuation',
      img: '/products/restaurants/inventario.png',
      icon: Package,
      badgeEs: 'Cero Mermas',
      badgeEn: 'Zero Waste',
      featuresEs: [
        'Monitoreo de unidades disponibles y valor total monetario del inventario.',
        'Alertas tempranas de stock bajo o agotado para evitar quedarte sin suministros clave.',
        'Buscador instantáneo por nombre o categoría con filtros de stock óptimo.',
        'Habilitación y ajuste rápido de inventario por porciones o empaques.'
      ],
      featuresEn: [
        'Live tracking of available units and total monetary inventory valuation.',
        'Early alerts for low or depleted stock to prevent running out of key supplies.',
        'Instant search by dish name or category with optimal stock level filters.',
        'Quick stock adjustments by portion or pre-packaged ingredients.'
      ]
    }
  ];

  const currentModule = modules[activeModule];

  const handlePrevModule = useCallback(() => {
    setActiveModule((prev) => (prev === 0 ? modules.length - 1 : prev - 1));
  }, [modules.length]);

  const handleNextModule = useCallback(() => {
    setActiveModule((prev) => (prev === modules.length - 1 ? 0 : prev + 1));
  }, [modules.length]);

  // Keyboard navigation & body scroll lock when fullscreen lightbox is open
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
        handleNextModule();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevModule();
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
          handleNextModule();
        } else {
          handlePrevModule();
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
  }, [isLightboxOpen, handleNextModule, handlePrevModule]);

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
      handleNextModule();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Previous
      handlePrevModule();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07080c] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 selection:bg-orange-500 selection:text-white">

      {/* 1. TOP ANNOUNCEMENT & DEDICATED HEADER */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#090a10]/85 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo & Back Link */}
          <div className="flex items-center gap-2.5 sm:gap-4 overflow-hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900/90 dark:hover:bg-zinc-800 border border-black/10 dark:border-white/10 hover:border-orange-500/50 dark:hover:border-orange-500/50 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white shadow-sm hover:shadow transition-all group cursor-pointer shrink-0"
              title={language === 'es' ? 'Volver a la página principal' : 'Back to main page'}
            >
              <ArrowLeft className="w-4 h-4 text-orange-600 dark:text-orange-400 group-hover:-translate-x-1 transition-transform shrink-0" />
              <span>
                {language === 'es' ? (
                  <>Volver<span className="hidden sm:inline"> al Inicio</span></>
                ) : (
                  <>Back<span className="hidden sm:inline"> to Home</span></>
                )}
              </span>
            </Link>

            <div className="h-5 w-px bg-zinc-300 dark:bg-zinc-700 hidden sm:block" />

            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 p-[1.5px] shadow-sm shrink-0">
                <div className="w-full h-full bg-white dark:bg-[#0e0f16] rounded-[10px] flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div className="truncate">
                <span className="font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-white block leading-tight truncate">
                  EternalIA <span className="text-orange-600 dark:text-orange-400">Gastronomía OS</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hidden sm:block -mt-0.5 truncate">
                  Restaurantes &amp; Comidas Rápidas
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/10 transition-colors cursor-pointer"
              aria-label="Cambiar Tema"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/10 transition-colors cursor-pointer"
            >
              {language.toUpperCase()}
            </button>

            {/* CTA Request Demo */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Solicitar Demo Gratis' : 'Request Free Demo'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION CON INTRO GASTRONÓMICA */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-orange-500/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-700 dark:text-orange-400 text-xs font-bold tracking-wider uppercase mb-4">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'PLATAFORMA 100% OPERATIVA & PROBADA' : '100% LIVE & PROVEN PLATFORM'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight mb-5">
              {language === 'es'
                ? 'El Sistema Operativo Definitivo para tu Restaurante: Cero Comisiones, Comandas y Menú QR'
                : 'The Ultimate Restaurant OS: Zero Commission Cuts, Kitchen Tickets & QR Menus'}
            </h1>

            <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              {language === 'es'
                ? 'Diseñado específicamente para restaurantes, asaderos, cafeterías y negocios de comidas rápidas. Controla pedidos a la mesa con código QR, comanda directa a cocina, despacho a WhatsApp e inventarios en una sola pantalla.'
                : 'Built specifically for dining restaurants, grills, cafes, and fast-food chains. Manage table QR orders, kitchen ticket lines, WhatsApp delivery dispatch, and inventory in one unified screen.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{language === 'es' ? 'Implementar en Mi Negocio' : 'Deploy in My Restaurant'}</span>
              </button>

              <a
                href="#modulos"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-black/10 dark:border-white/10 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>{language === 'es' ? 'Ver Módulos Reales' : 'Explore Real Modules'}</span>
                <ArrowRight className="w-4 h-4 text-orange-500" />
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto text-left font-mono">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10">
                <span className="text-lg sm:text-xl font-black text-orange-600 dark:text-orange-400 block">0%</span>
                <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">Comisiones por ventas</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10">
                <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 block">&lt; 3s</span>
                <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">Comanda en comanderos</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10">
                <span className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 block">3 en 1</span>
                <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">Mesa QR, Takeout, Domicilio</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10">
                <span className="text-lg sm:text-xl font-black text-cyan-600 dark:text-cyan-400 block">100%</span>
                <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">Responsive Multi-pantalla</span>
              </div>
            </div>

          </div>

          {/* 3. DESKTOP BROWSER PREVIEW */}
          <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-white/90 dark:bg-[#0d0e14]/90 rounded-3xl p-4 sm:p-7 border border-black/10 dark:border-white/15 shadow-2xl backdrop-blur-xl">

              <div className="w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 shadow-2xl bg-zinc-900">
                <div className="h-7 bg-slate-200 dark:bg-zinc-800 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 truncate mx-2 max-w-[240px] sm:max-w-none">
                    🔒 https://restaurant.eternalia.co/admin/pedidos
                  </span>
                  <span className="text-[10px] text-emerald-500 font-mono font-bold hidden sm:inline shrink-0">1920 x 1080 Full HD</span>
                </div>
                <div className="relative aspect-[16/9] bg-zinc-950 overflow-hidden">
                  <img
                    src="/products/restaurants/pedidos.jpg"
                    alt="Vista de Pedidos en Escritorio"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="text-center pt-3 border-t border-black/5 dark:border-white/5 text-xs text-zinc-500 mt-4">
                {language === 'es'
                  ? '⚡ Sincronización en milisegundos con comanderos de cocina, pedidos de salón e impresión térmica de comandas.'
                  : '⚡ Millisecond synchronization with kitchen printers, dining room orders, and POS tickets.'}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. MÓDULOS REALES (PANTALLAZOS OFICIALES) */}
      <section id="modulos" className="py-20 bg-slate-100/70 dark:bg-[#0c0d13]/70 border-y border-black/10 dark:border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-700 dark:text-orange-400 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'ARQUITECTURA DE MÓDULOS' : 'CORE SYSTEM MODULES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              {language === 'es' ? 'Cada Rincón de tu Negocio, Bajo Control' : 'Every Corner of Your Restaurant, Controlled'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
              {language === 'es'
                ? 'Explora las capturas reales del software en producción. Sin maquetas ficticias: esto es exactamente lo que tú y tu equipo utilizarán desde el primer día.'
                : 'Inspect the actual production screenshots. No fictional mockups: this is exactly what your managers and waitstaff will operate.'}
            </p>
          </div>

          {/* Module Selector Navigation Tabs (Swipeable Pills on Mobile, Centered on Desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 sm:flex-wrap sm:justify-center sm:pb-0">
            {modules.map((mod, index) => {
              const Icon = mod.icon;
              const isActive = activeModule === index;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(index)}
                  className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${isActive
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/25 border border-orange-400/40 ring-2 ring-orange-500/20'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/10 hover:border-black/15 dark:hover:border-white/20'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-orange-500" />
                  <span className="whitespace-nowrap">{language === 'es' ? mod.nameEs : mod.nameEn}</span>
                </button>
              );
            })}
          </div>

          {/* Active Module Showcase Card */}
          <div className="bg-white dark:bg-[#11121a] rounded-3xl border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Module Details & Features */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span>{language === 'es' ? currentModule.badgeEs : currentModule.badgeEn}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                {language === 'es' ? currentModule.nameEs : currentModule.nameEn}
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                {language === 'es' ? currentModule.taglineEs : currentModule.taglineEn}
              </p>

              {/* Bullet Features */}
              <div className="space-y-3 pt-2">
                {(language === 'es' ? currentModule.featuresEs : currentModule.featuresEn).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'es' ? 'Implementar en Mi Restaurante' : 'Deploy in My Restaurant'}</span>
                </button>
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-black/5 dark:border-white/10"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-orange-500" />
                  <span>{language === 'es' ? 'Ver Pantalla Completa' : 'Full Screen Preview'}</span>
                </button>
              </div>
            </div>

            {/* Right: Screenshot Viewer Frame */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="relative rounded-2xl overflow-hidden border border-black/15 dark:border-white/20 shadow-2xl bg-zinc-950 group cursor-pointer"
              >
                <div className="h-7 bg-zinc-800 px-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300">
                    {language === 'es' ? currentModule.nameEs : currentModule.nameEn} • Captura Real
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>

                <div className="relative aspect-[16/10] bg-zinc-950">
                  <img
                    src={currentModule.img}
                    alt={currentModule.nameEs}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-lg flex items-center gap-2">
                      <Maximize2 className="w-4 h-4" />
                      <span>{language === 'es' ? 'Click para Pantalla Completa' : 'Click to View Full Screen'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. PILARES CLAVE: POR QUÉ ELEGIR ETERNALIA GASTRONOMÍA OS */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-700 dark:text-orange-400 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'VENTAJAS COMPETITIVAS' : 'KEY ADVANTAGES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
              {language === 'es' ? 'Tecnología Diseñada para Potenciar tu Negocio' : 'Engineered to Scale Your Restaurant Operations'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
              {language === 'es'
                ? 'Un ecosistema integral que conecta tus mesas, cocina y despachos bajo una sola plataforma confiable y sin intermediarios.'
                : 'An integrated ecosystem synchronizing your dining room, kitchen, and delivery under one reliable, middleman-free platform.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pilar 1 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#11121a] border border-black/10 dark:border-white/15 shadow-xl hover:border-orange-500/40 transition-all text-left group">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                {language === 'es' ? 'Canal Directo & Menú QR' : 'Direct Channel & QR Menu'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {language === 'es'
                  ? 'Tus clientes piden escaneando la mesa o desde tu propio enlace web sin depender de aplicaciones de terceros que recortan tus utilidades.'
                  : 'Diners order directly by scanning their table QR code or your branded link without third-party commission deductions.'}
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#11121a] border border-black/10 dark:border-white/15 shadow-xl hover:border-orange-500/40 transition-all text-left group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                {language === 'es' ? 'Sincronización en Segundos' : 'Real-Time Sync'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {language === 'es'
                  ? 'Las órdenes llegan instantáneamente a los comanderos de cocina, barra y caja. Menos errores, mayor rotación de mesas y despacho ágil.'
                  : 'Orders flow in real time to kitchen display screens, bar, and POS register. Minimize errors and speed up table turnover.'}
              </p>
            </div>

            {/* Pilar 3: Directorio Local & WhatsApp */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#11121a] border border-black/10 dark:border-white/15 shadow-xl hover:border-orange-500/40 transition-all text-left group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                {language === 'es' ? 'Directorio Local & WhatsApp' : 'Town Directory & WhatsApp'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {language === 'es'
                  ? 'Tu negocio aparece en el directorio de tu municipio con ubicación en Google Maps, redes sociales, horarios en vivo y pedidos a un solo clic por WhatsApp.'
                  : 'Your restaurant lists in your municipality directory with Google Maps pin, social media channels, live hours, and 1-click WhatsApp orders.'}
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#11121a] border border-black/10 dark:border-white/15 shadow-xl hover:border-orange-500/40 transition-all text-left group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                {language === 'es' ? 'Puesta en Marcha & Entregas Rápidas' : 'Fast Onboarding & Delivery'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {language === 'es'
                  ? 'Configuramos tu menú, categorías, fotos de platillos y horarios con entregas rápidas y asesoría cercana para que operes con total tranquilidad.'
                  : 'We set up your catalog, categories, photography, and operational hours with rapid delivery and close advisory.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION FINAL */}
      <section className="py-20 bg-gradient-to-t from-orange-600/15 to-transparent text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30">
            <UtensilsCrossed className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-4">
            {language === 'es' ? 'Pon tu Restaurante a Facturar Sin Intermediarios' : 'Start Selling Directly Without Middlemen'}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-300 text-base max-w-2xl mx-auto mb-8">
            {language === 'es'
              ? 'Te entregamos tu sistema configurado con tu carta, códigos QR para mesas, comanderos y sincronizado con tu WhatsApp, con entregas rápidas y soporte continuo.'
              : 'We deliver your tailored system with your dishes, table QR codes, kitchen screens, and WhatsApp ordering, with fast delivery and ongoing support.'}
          </p>

          <button
            onClick={() => setIsContactOpen(true)}
            className="px-9 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-2xl shadow-orange-500/30 cursor-pointer active:scale-95 transition-all"
          >
            {language === 'es' ? 'Agendar Demostración' : 'Schedule Live Demo'}
          </button>
        </div>
      </section>

      {/* 7. FULLSCREEN LIGHTBOX MODAL (Keyboard & Touch-Swipe Optimized) */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative max-w-6xl w-full max-h-[96vh] flex flex-col rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-950"
          >
            {/* Modal Header */}
            <div className="h-11 sm:h-12 bg-zinc-900/90 px-3 sm:px-5 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-400 font-mono text-xs font-bold shrink-0">
                  {activeModule + 1} / {modules.length}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white truncate">
                  {language === 'es' ? currentModule.nameEs : currentModule.nameEn}
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
                key={currentModule.id}
                src={currentModule.img}
                alt={currentModule.nameEs}
                className="max-h-[64vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              />

              {/* Floating Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevModule();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-orange-500 text-white border border-white/20 hover:border-orange-500 shadow-2xl flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95"
                title={language === 'es' ? 'Anterior (Flecha izquierda)' : 'Previous (Left arrow)'}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Floating Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextModule();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-orange-500 text-white border border-white/20 hover:border-orange-500 shadow-2xl flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95"
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
                  {language === 'es' ? currentModule.taglineEs : currentModule.taglineEn}
                </span>
                <span className="shrink-0 text-amber-400 font-medium sm:hidden">
                  {language === 'es' ? '← Desliza para navegar →' : '← Swipe to navigate →'}
                </span>
              </div>

              {/* Thumbnail Strip inside Modal */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {modules.map((mod, idx) => (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModule(idx)}
                    title={language === 'es' ? mod.nameEs : mod.nameEn}
                    className={`rounded-lg overflow-hidden border transition-all p-0.5 bg-black cursor-pointer aspect-[16/9] w-14 sm:w-20 shrink-0 ${activeModule === idx
                        ? 'border-orange-500 ring-2 ring-orange-500/50 scale-105 opacity-100'
                        : 'border-white/10 opacity-50 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={mod.img}
                      alt={mod.nameEs}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactOpen && (
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
        />
      )}

    </div>
  );
}

