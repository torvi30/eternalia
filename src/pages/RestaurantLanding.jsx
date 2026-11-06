import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import ContactModal from '../components/ContactModal';
import {
  UtensilsCrossed,
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  TrendingUp,
  Clock,
  QrCode,
  Printer,
  ShoppingBag,
  Layers,
  BarChart3,
  Package,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  DollarSign,
  Sun,
  Moon,
  Globe,
  Maximize2
} from 'lucide-react';

export default function RestaurantLanding() {
  const { language, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [activeModule, setActiveModule] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeZoomImg, setActiveZoomImg] = useState(null);

  // ROI Calculator State
  const [monthlySales, setMonthlySales] = useState(15000000); // 15 millones COP por defecto

  const modules = [
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
      id: 'metricas',
      nameEs: 'Dashboard de Métricas & Ventas',
      nameEn: 'Live Sales Analytics & Metrics',
      taglineEs: 'Conoce tus horas pico, ticket promedio y tus productos más vendidos',
      taglineEn: 'Identify peak rush hours, average order tickets, and top-seller dishes',
      img: '/products/restaurants/metricas.jpg',
      icon: BarChart3,
      badgeEs: 'Analítica en Vivo',
      badgeEn: 'Live Analytics',
      featuresEs: [
        'Detección automática de las horas pico de mayor afluencia y pedidos recibidos.',
        'Ranking de productos estrella (Top Sellers) y análisis de categorías más rentables.',
        'Cálculo automático del Ticket Promedio diario y mensual para toma de decisiones.',
        'Exportación instantánea a archivos CSV para tu contador o sistema contable.'
      ],
      featuresEn: [
        'Automated detection of peak rush hours and order volume trends.',
        'Top-seller dish rankings and most profitable category breakdown.',
        'Automatic calculation of average order ticket to optimize cross-selling.',
        '1-click CSV export ready for accounting and financial reconciliation.'
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

  // Calculate commission savings (averaging 25% charged by platforms like Rappi/UberEats/iFood)
  const deliveryPlatformCommissionRate = 0.25;
  const monthlyCommissionLoss = Math.round(monthlySales * deliveryPlatformCommissionRate);
  const yearlyCommissionLoss = monthlyCommissionLoss * 12;

  const currentModule = modules[activeModule];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07080c] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 selection:bg-orange-500 selection:text-white">

      {/* 1. TOP ANNOUNCEMENT & DEDICATED HEADER */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-[#090a10]/85 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo & Back Link */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>{language === 'es' ? 'EternalIA Hub' : 'EternalIA Hub'}</span>
            </Link>

            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-white dark:bg-[#0e0f16] rounded-[10px] flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-sm text-zinc-900 dark:text-white block leading-tight">
                  EternalIA <span className="text-orange-600 dark:text-orange-400">Gastronomía OS</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block -mt-0.5">
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
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left font-mono">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10">
                <span className="text-xl font-black text-orange-600 dark:text-orange-400 block">0%</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Comisiones por ventas</span>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10">
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 block">&lt; 3s</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Comanda en comanderos</span>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10">
                <span className="text-xl font-black text-amber-600 dark:text-amber-400 block">3 en 1</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Mesa QR, Takeout, Domicilio</span>
              </div>
              <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/60 border border-black/5 dark:border-white/10">
                <span className="text-xl font-black text-cyan-600 dark:text-cyan-400 block">100%</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Responsive Multi-pantalla</span>
              </div>
            </div>

          </div>

          {/* 3. DESKTOP BROWSER PREVIEW */}
          <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-white/90 dark:bg-[#0d0e14]/90 rounded-3xl p-4 sm:p-7 border border-black/10 dark:border-white/15 shadow-2xl backdrop-blur-xl">
              
              <div className="w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 shadow-2xl bg-zinc-900">
                <div className="h-7 bg-slate-200 dark:bg-zinc-800 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 truncate">
                    🔒 https://restaurant.eternalia.co/admin/pedidos
                  </span>
                  <span className="text-[10px] text-emerald-500 font-mono font-bold">1920 x 1080 Full HD</span>
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

          {/* Module Selector Navigation Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            {modules.map((mod, index) => {
              const Icon = mod.icon;
              const isActive = activeModule === index;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(index)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${isActive
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/25 border border-orange-400/40'
                      : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/10'
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{language === 'es' ? mod.nameEs : mod.nameEn}</span>
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

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  {language === 'es' ? 'Cotizar Este Módulo' : 'Quote This Module'}
                </button>
                <button
                  onClick={() => setActiveZoomImg(currentModule.img)}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Ampliar Pantalla' : 'Zoom Screen'}</span>
                </button>
              </div>
            </div>

            {/* Right: Screenshot Viewer Frame */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setActiveZoomImg(currentModule.img)}
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

      {/* 5. CALCULADORA DE RETORNO DE INVERSIÓN (AHORRO EN COMISIONES) */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent rounded-3xl p-6 sm:p-10 border border-orange-500/30 shadow-2xl backdrop-blur-xl">

            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-700 dark:text-orange-400 text-xs font-bold tracking-wider uppercase mb-3">
                <DollarSign className="w-3.5 h-3.5" />
                <span>{language === 'es' ? 'CALCULADORA DE RENTABILIDAD' : 'PROFITABILITY CALCULATOR'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {language === 'es' ? '¿Cuánto Dinero Estás Regalando en Comisiones?' : 'How Much Are You Losing to Commission Fees?'}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                {language === 'es'
                  ? 'Las aplicaciones de terceros cobran entre el 20% y el 30% en cada orden. Con tu propia plataforma de EternalIA, ese dinero se queda en tu caja.'
                  : '3rd-party delivery apps take 20% to 30% cut of every order. With your proprietary EternalIA frontend, 100% stays in your register.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Slider Input */}
              <div className="space-y-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-sm">
                <label htmlFor="monthly-sales-slider" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  {language === 'es' ? 'Ventas Mensuales en Domicilios / Pedidos:' : 'Monthly Delivery / Order Volume:'}
                </label>

                <div className="text-3xl font-black text-orange-600 dark:text-orange-400 font-mono">
                  ${monthlySales.toLocaleString('es-CO')} <span className="text-xs font-sans text-zinc-500 font-normal">COP / mes</span>
                </div>

                <input
                  id="monthly-sales-slider"
                  type="range"
                  min="2000000"
                  max="60000000"
                  step="1000000"
                  value={monthlySales}
                  onChange={(e) => setMonthlySales(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg"
                />

                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>$2M COP</span>
                  <span>$30M COP</span>
                  <span>$60M COP</span>
                </div>
              </div>

              {/* Savings Results */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                    {language === 'es' ? 'Ahorro Estimado al Mes (Tasa 25% de comisiones):' : 'Estimated Monthly Savings (25% rate):'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono block">
                    +${monthlyCommissionLoss.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30">
                  <span className="text-xs font-bold text-orange-800 dark:text-orange-300 block mb-1">
                    {language === 'es' ? 'Ahorro Anual que Vuelve a tu Bolsillo:' : 'Yearly Capital Returned to Your Pocket:'}
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400 font-mono block">
                    +${yearlyCommissionLoss.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer"
                >
                  {language === 'es' ? 'Recuperar Mis Ganancias Ahora' : 'Reclaim My Profits Today'}
                </button>
              </div>
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
              ? 'Te entregamos tu sistema configurado con tu carta, códigos QR para mesas, comanderos y sincronizado con tu WhatsApp en tiempo récord.'
              : 'We deliver your tailored system with your dishes, table QR codes, kitchen screens, and WhatsApp ordering in record time.'}
          </p>

          <button
            onClick={() => setIsContactOpen(true)}
            className="px-9 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-2xl shadow-orange-500/30 cursor-pointer active:scale-95 transition-all"
          >
            {language === 'es' ? 'Agendar Demostración Inmediata' : 'Schedule Instant Live Demo'}
          </button>
        </div>
      </section>

      {/* 7. LIGHTBOX ZOOM MODAL */}
      {activeZoomImg && (
        <div
          onClick={() => setActiveZoomImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative max-w-6xl w-full max-h-[95vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-950">
            <div className="h-8 bg-zinc-900 px-4 flex items-center justify-between border-b border-white/10">
              <span className="text-xs font-mono text-zinc-300 font-bold">Captura en Alta Definición • Software Real</span>
              <button
                onClick={() => setActiveZoomImg(null)}
                className="text-zinc-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded bg-zinc-800"
              >
                Cerrar (ESC)
              </button>
            </div>
            <div className="p-2 bg-black flex items-center justify-center">
              <img
                src={activeZoomImg}
                alt="Captura ampliada"
                className="max-h-[85vh] w-auto object-contain rounded-lg"
              />
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

