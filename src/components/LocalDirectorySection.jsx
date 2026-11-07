import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Flame,
  Clock,
  MessageCircle,
  Share2,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  ArrowRight,
  Eye,
  Store
} from 'lucide-react';

const directoryScreens = [
  {
    id: 'directorio-municipio',
    labelEs: 'Directorio Hiperlocal por Municipio',
    labelEn: 'Hyperlocal Municipality Directory',
    shortLabelEs: 'Directorio General',
    shortLabelEn: 'General Directory',
    icon: MapPin,
    url: 'directorio.eternalia.co/marinilla',
    img: '/directory/directorio-general.jpg',
    taglineEs: 'Buscador en tiempo real por municipio (Marinilla, Rionegro, San Antonio) con filtros de categorías y comercios abiertos.',
    taglineEn: 'Real-time municipality directory with category filters, town switching, and live open status.',
    featuresEs: [
      'Ubicación exacta de cada sede con enlace a Google Maps para fácil llegada y despachos.',
      'Selector de municipio para descubrir negocios de tu pueblo en un solo toque.',
      'Buscador instantáneo por nombre de local, platos específicos o categorías comerciales.',
      'Sincronización de horarios que indica en tiempo real si el comercio está Abierto o Cerrado.'
    ],
    featuresEn: [
      'Exact physical address and Google Maps pin for seamless arrival and deliveries.',
      'Town selector to explore businesses in your municipality in a single tap.',
      'Instant search by venue name, specific dish, or business category.',
      'Live opening hours indicator showing real-time Open or Closed status.'
    ]
  },
  {
    id: 'promociones-flash',
    labelEs: 'Activación de Promociones Flash & Ofertas Especiales',
    labelEn: 'Flash Deals & Special Offers Activation',
    shortLabelEs: 'Promociones & Descuentos',
    shortLabelEn: 'Deals & Promos',
    icon: Flame,
    url: 'directorio.eternalia.co/marinilla?filtro=ofertas',
    img: '/directory/directorio-promociones.jpg',
    taglineEs: 'Vitrina de descuentos y promociones del día destacadas con badge de fuego para multiplicar ventas locales.',
    taglineEn: 'High-converting deal showcase with flame badges driving local diner rush on weekends.',
    featuresEs: [
      'Badge destacado con fuego (ej. "Buñuelos con queso", "2x1 en Hamburguesas") visible para todo el pueblo.',
      'Banner de Oferta Especial con descuento exclusivo y botón directo para pedir.',
      'Los comensales filtran con 1 clic todos los locales con promociones activas en su zona.',
      'Lanza campañas relámpago de fin de semana sin pagar comisiones publicitarias ni porcentajes.'
    ],
    featuresEn: [
      'Highlighted flame badge (e.g., "Cheese Buñuelos", "2x1 Burgers") visible across town.',
      'Special Offer Banner with exclusive discounts and direct 1-click checkout.',
      'Diners filter all venues running live promotions in their area in 1 tap.',
      'Launch weekend flash promos without paying marketing fees or commission cuts.'
    ]
  },
  {
    id: 'anuncios-personalizados',
    labelEs: 'Personalización de Anuncios & Promociones a su Gusto',
    labelEn: 'Tailored Ads & Custom Promotions',
    shortLabelEs: 'Anuncios a su Gusto',
    shortLabelEn: 'Tailored Ads',
    icon: Sparkles,
    url: 'directorio.eternalia.co/marinilla?promos=custom',
    img: '/directory/directorio-anuncios-personalizados.jpg',
    taglineEs: 'Organiza y personaliza tus promociones a tu medida: define descuentos en porcentaje (10%), precios fijos ($2.000) o anuncios libres para todo tu catálogo.',
    taglineEn: 'Organize and tailor promotions to your needs: set percentage cuts (10%), fixed prices ($2,000), or sitewide announcements.',
    featuresEs: [
      'Organización a tu gusto: configura ofertas en porcentaje (ej: 10% OFF), precio directo (ej: Buñuelos $2.000) o anuncios globales (ej: "Aplica para todo el vivero").',
      'Badge superior llamativo: activa insignias personalizadas con efecto de fuego para captar la atención inmediata del cliente.',
      'Control total de campañas: activa, pausa o cambia el texto de tus promociones según tus días de mayor flujo.',
      'Sin intermediarios: el comensal hace clic en "Ver" o "Escribir por WhatsApp" y pide directo a tu negocio.'
    ],
    featuresEn: [
      'Tailor to your taste: configure percentage deals (e.g. 10% OFF), fixed price drops ($2,000), or global storewide announcements.',
      'Eye-catching top badge: enable custom flame badges to capture instant local diner interest.',
      'Full campaign control: activate, pause, or tweak promotion copy anytime for peak sales hours.',
      'Direct customer flow: diners tap "View" or "Chat on WhatsApp" straight to your counter.'
    ]
  },
  {
    id: 'redes-whatsapp',
    labelEs: 'Redes Sociales, Horarios & Contacto WhatsApp en 1 Clic',
    labelEn: 'Social Channels, Hours & 1-Click WhatsApp',
    shortLabelEs: 'Redes, Horarios & WhatsApp',
    shortLabelEn: 'Social & WhatsApp',
    icon: MessageCircle,
    url: 'directorio.eternalia.co/marinilla?abiertos=true',
    img: '/directory/directorio-filtros.jpg',
    taglineEs: 'Perfil comercial completo con redes sociales integradas, horarios y pedido directo al chat de WhatsApp.',
    taglineEn: 'Complete business profile featuring social media integration, live hours, and 1-tap WhatsApp ordering.',
    featuresEs: [
      'Contactar a un solo clic por WhatsApp: el cliente toca el botón y abre el chat oficial con pedido listo.',
      'Redes sociales integradas: enlaces directos al Instagram y Facebook oficial de tu marca.',
      'Horarios de atención en vivo sincronizados con tus turnos (lunes a domingo).',
      'Cero comisiones: las ventas y contactos son directos a tu negocio sin intermediarios.'
    ],
    featuresEn: [
      '1-click WhatsApp contact: customers tap to open the official chat with orders ready.',
      'Integrated social links: direct access to your brand Instagram and Facebook profiles.',
      'Live operating hours synchronized with your daily schedules (Monday to Sunday).',
      'Zero commissions: sales and inquiries flow straight to your counter with no middleman.'
    ]
  }
];

export default function LocalDirectorySection({ onOpenContact }) {
  const { language } = useLanguage();
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const currentScreen = directoryScreens[activeScreenIndex];

  const handleNext = useCallback(() => {
    setActiveScreenIndex((prev) => (prev + 1) % directoryScreens.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveScreenIndex((prev) => (prev - 1 + directoryScreens.length) % directoryScreens.length);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handleNext, handlePrev]);

  // Touch swipe support
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
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section
      id="directorio-local"
      className="py-20 relative overflow-hidden bg-slate-50/80 dark:bg-[#07080c] transition-colors duration-300 border-t border-black/5 dark:border-white/5 scroll-mt-16"
    >
      {/* Glow ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-500/10 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-700 dark:text-orange-400 text-xs font-bold tracking-wider uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'DIRECTORIO TERRITORIAL MULTI-MUNICIPIO' : 'HYPERLOCAL TOWN DIRECTORY'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            {language === 'es'
              ? 'Directorio de tu Pueblo: Promociones a tu Gusto, Ubicación, Redes y WhatsApp'
              : 'Town Directory: Tailored Promotions, Location, Social Links & WhatsApp'}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            {language === 'es'
              ? 'Cada negocio en EternalIA cuenta con su vitrina comercial en el directorio de su pueblo. Sin maquetas ficticias: explora las capturas reales del sistema en producción. Organiza promociones y anuncios a tu gusto (en porcentaje, precio fijo o combos), con ubicación en Google Maps, redes sociales y pedidos en 1 clic.'
              : 'Every EternalIA business gets its verified profile in their town directory. No fictional mockups: explore real production screenshots. Organize ads and promotions to your liking (percentages, fixed prices, or combos), with Google Maps location, social links, and 1-tap WhatsApp ordering.'}
          </p>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-4xl mx-auto mt-6 text-left font-mono text-xs">
            <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">
                {language === 'es' ? 'Ubicación Maps' : 'Google Maps'}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-sm flex items-center gap-2">
              <Share2 className="w-4 h-4 text-pink-500 shrink-0" />
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">
                {language === 'es' ? 'Redes Sociales' : 'Social Channels'}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">
                {language === 'es' ? 'Horarios en Vivo' : 'Live Hours'}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 shadow-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">
                {language === 'es' ? 'WhatsApp 1 Clic' : '1-Click WhatsApp'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. SHOWCASE CONTAINER (MATCHING RESTAURANT SHOWCASE DESIGN) */}
        <div className="bg-gradient-to-b from-white to-slate-50 dark:from-[#0e0f17] dark:to-[#090a10] rounded-3xl border border-black/10 dark:border-white/15 p-6 sm:p-10 shadow-2xl overflow-hidden relative">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Screen Selector & Detailed Value Proposition */}
            <div className="lg:col-span-5 space-y-6">

              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  {language === 'es' ? 'Directorio en Producción' : 'Live Production Directory'}
                </span>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  {activeScreenIndex + 1} / {directoryScreens.length}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-tight mb-2">
                  {language === 'es' ? currentScreen.labelEs : currentScreen.labelEn}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                  {language === 'es' ? currentScreen.taglineEs : currentScreen.taglineEn}
                </p>
              </div>

              {/* 4 Detailed Bullet Features */}
              <div className="space-y-2.5 pt-1">
                {(language === 'es' ? currentScreen.featuresEs : currentScreen.featuresEn).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{language === 'es' ? 'Sumar Mi Negocio al Directorio' : 'List My Business in Directory'}</span>
                </button>

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-black/5 dark:border-white/10"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-orange-500" />
                  <span>{language === 'es' ? 'Ver Pantalla Completa' : 'Full Screen'}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Interactive Browser Window & Screenshot Viewer */}
            <div className="lg:col-span-7">

              {/* Navigation Pills (Mobile Swipeable, Desktop Wrapped) */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4 sm:flex-wrap">
                {directoryScreens.map((screen, index) => {
                  const Icon = screen.icon;
                  const isActive = activeScreenIndex === index;
                  return (
                    <button
                      key={screen.id}
                      onClick={() => setActiveScreenIndex(index)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/25 border border-orange-400/40 ring-2 ring-orange-500/20'
                          : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/10 hover:border-black/15 dark:hover:border-white/20'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0 text-orange-500" />
                      <span className="whitespace-nowrap">{language === 'es' ? screen.shortLabelEs : screen.shortLabelEn}</span>
                    </button>
                  );
                })}
              </div>

              {/* Desktop Browser Window */}
              <div className="w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 shadow-2xl bg-zinc-950 group/browser relative">

                {/* Top Browser Chrome */}
                <div className="h-7 bg-slate-200 dark:bg-zinc-800 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>

                  {/* URL Bar */}
                  <div className="px-3 py-0.5 rounded-md bg-white/70 dark:bg-zinc-950/70 border border-black/5 dark:border-white/5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 truncate max-w-[200px] sm:max-w-[280px]">
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

                {/* Screenshot Frame */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative aspect-[16/10] bg-zinc-950 overflow-hidden cursor-pointer"
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
                    aria-label="Captura anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer opacity-80 hover:opacity-100"
                    aria-label="Siguiente captura"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Active Screen Caption */}
              <div className="mt-3.5 text-center text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-center gap-2">
                <Store className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="truncate">
                  {language === 'es' ? currentScreen.taglineEs : currentScreen.taglineEn}
                </span>
              </div>

              {/* Mini Desktop Thumbnail Carousel (Capturas abajo pequeñas e intuitivas) */}
              <div className="flex items-center gap-2.5 mt-4 w-full overflow-x-auto pb-1 no-scrollbar">
                {directoryScreens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreenIndex(idx)}
                    title={language === 'es' ? screen.labelEs : screen.labelEn}
                    className={`rounded-xl overflow-hidden border-2 transition-all p-0.5 bg-black cursor-pointer aspect-[16/9] w-20 sm:w-24 shrink-0 ${
                      activeScreenIndex === idx
                        ? 'border-orange-500 shadow-md scale-105 opacity-100 ring-2 ring-orange-500/30'
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

        {/* 3. BOTTOM MERCHANTS VALUE BANNER */}
        <div className="mt-14 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>{language === 'es' ? '¿TIENES UN NEGOCIO EN TU MUNICIPIO?' : 'OWN A BUSINESS IN YOUR TOWN?'}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
                {language === 'es'
                  ? 'Suma tu Restaurante o Comercio al Directorio de tu Pueblo'
                  : 'Add Your Restaurant or Store to Your Town Directory'}
              </h3>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-4">
                {language === 'es'
                  ? 'Al implementar tu sistema con EternalIA, tu restaurante o comercio obtiene su perfil oficial en el directorio de tu municipio con ubicación en Google Maps, redes sociales integradas, horarios en vivo y pedidos a un solo clic por WhatsApp.'
                  : 'When deploying with EternalIA, your restaurant or business gets a verified profile in your town directory equipped with Google Maps location, social links, live hours, and 1-tap WhatsApp ordering.'}
              </p>

              {/* 4 Key profile pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                <div className="p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{language === 'es' ? 'Ubicación Maps' : 'Google Maps'}</span>
                </div>
                <div className="p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                  <span>{language === 'es' ? 'Redes Sociales' : 'Social Links'}</span>
                </div>
                <div className="p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span>{language === 'es' ? 'Horarios en Vivo' : 'Live Hours'}</span>
                </div>
                <div className="p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                  <span>{language === 'es' ? 'WhatsApp 1 Clic' : '1-Tap WhatsApp'}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={onOpenContact}
                className="px-6 py-3.5 rounded-2xl bg-white text-orange-700 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-xl transition-all cursor-pointer active:scale-95 text-center flex items-center justify-center gap-2"
              >
                <span>{language === 'es' ? 'Registrar Mi Negocio' : 'Register My Business'}</span>
                <ArrowRight className="w-4 h-4 text-orange-600" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="px-5 py-3.5 rounded-2xl bg-black/30 hover:bg-black/50 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer text-center"
              >
                {language === 'es' ? 'Ver Pantallazos Reales' : 'View Live Screenshots'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. FULLSCREEN LIGHTBOX MODAL */}
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
                <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-400 font-mono text-xs font-bold shrink-0">
                  {activeScreenIndex + 1} / {directoryScreens.length}
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

            {/* Modal Image Area */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden min-h-[300px]">
              <img
                key={currentScreen.id}
                src={currentScreen.img}
                alt={currentScreen.labelEs}
                className="max-h-[64vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-orange-500 text-white border border-white/20 hover:border-orange-500 shadow-2xl flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95"
                title={language === 'es' ? 'Anterior (Flecha izquierda)' : 'Previous (Left arrow)'}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-orange-500 text-white border border-white/20 hover:border-orange-500 shadow-2xl flex items-center justify-center transition-all cursor-pointer z-10 active:scale-95"
                title={language === 'es' ? 'Siguiente (Flecha derecha)' : 'Next (Right arrow)'}
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Footer with Thumbnails */}
            <div className="bg-zinc-900/90 px-3 sm:px-4 py-2 border-t border-white/10 shrink-0">
              <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] text-zinc-400">
                <span className="truncate">
                  {language === 'es' ? currentScreen.taglineEs : currentScreen.taglineEn}
                </span>
                <span className="shrink-0 text-amber-400 font-medium sm:hidden">
                  {language === 'es' ? '← Desliza para navegar →' : '← Swipe to navigate →'}
                </span>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {directoryScreens.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreenIndex(idx)}
                    title={language === 'es' ? screen.labelEs : screen.labelEn}
                    className={`rounded-lg overflow-hidden border transition-all p-0.5 bg-black cursor-pointer aspect-[16/9] w-14 sm:w-20 shrink-0 ${
                      activeScreenIndex === idx
                        ? 'border-orange-500 ring-2 ring-orange-500/50 scale-105 opacity-100'
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
