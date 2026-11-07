import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Search,
  Flame,
  Clock,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Tag,
  Store
} from 'lucide-react';

// Capturas reales del software en producción
const directoryScreenshots = [
  {
    id: 'general',
    titleEs: 'Directorio Hiperlocal por Municipio',
    titleEn: 'Hyperlocal Municipality Directory',
    img: '/directory/directorio-general.jpg',
    captionEs: 'Vista general del directorio con buscador en tiempo real, filtros por categoría y conteo de negocios abiertos.'
  },
  {
    id: 'promociones',
    titleEs: 'Activación de Promociones Flash & Ofertas Especiales',
    titleEn: 'Flash Deals & Special Offers Activation',
    img: '/directory/directorio-promociones.jpg',
    captionEs: 'Los negocios con promociones activadas destacan con badges de fuego y banner de oferta directa a WhatsApp.'
  },
  {
    id: 'filtros',
    titleEs: 'Filtros Dinámicos por Estado y Descuentos',
    titleEn: 'Dynamic Filters by Open Status and Discounts',
    img: '/directory/directorio-filtros.jpg',
    captionEs: 'Los comensales filtran rápidamente qué locales tienen promociones activas y cuáles están abiertos en el instante.'
  }
];

// Negocios reales de los municipios según producción
const businesses = [
  {
    id: 'esquina-sabor',
    name: 'La esquina del sabor',
    town: 'marinilla',
    townLabel: 'Marinilla, Antioquia',
    category: 'Panadería',
    isOpen: true,
    schedule: 'Viernes: 06:00 - 23:00',
    logoText: 'ES',
    logoBg: 'from-amber-600 to-yellow-500',
    hasDiscount: true,
    promoBadge: 'Buñuelos con queso',
    promoDetail: 'OFERTA ESPECIAL: Buñuelos con queso al 20% de descuento en pedidos hoy.',
    actionType: 'menu',
    actionLabelEs: 'Ir a la Panadería',
    actionLabelEn: 'Visit Bakery',
    whatsapp: '573147809921',
    tags: ['pan', 'buñuelos', 'desayunos', 'café']
  },
  {
    id: 'chicken-king',
    name: 'Chicken king',
    town: 'rionegro',
    townLabel: 'Rionegro Antioquia, Antioquia',
    category: 'Asadero',
    isOpen: true,
    schedule: 'Viernes: 09:00 - 21:00',
    logoText: 'CK',
    logoBg: 'from-red-600 to-amber-600',
    hasDiscount: false,
    promoBadge: null,
    promoDetail: null,
    actionType: 'menu',
    actionLabelEs: 'Ir al asadero',
    actionLabelEn: 'Visit Grill',
    whatsapp: '573147809922',
    tags: ['pollo', 'asadero', 'almuerzos', 'broaster']
  },
  {
    id: 'la-amistacita',
    name: 'La Amistacita',
    town: 'marinilla',
    townLabel: 'Cra. 33 #33-03, Marinilla',
    category: 'Comidas Rápidas',
    isOpen: true,
    schedule: 'Viernes: 15:00 - 23:00',
    logoText: 'LA',
    logoBg: 'from-orange-500 to-red-500',
    hasDiscount: false,
    promoBadge: null,
    promoDetail: null,
    actionType: 'whatsapp',
    actionLabelEs: 'Escribir por WhatsApp',
    actionLabelEn: 'Chat on WhatsApp',
    whatsapp: '573147809923',
    tags: ['hamburguesas', 'arepas de queso', 'salchipapas']
  },
  {
    id: 'alegrarte',
    name: 'Alegrarte',
    town: 'marinilla',
    townLabel: 'Marinilla, Antioquia',
    category: 'Restaurante',
    isOpen: true,
    schedule: 'Viernes: 10:00 - 21:00',
    logoText: 'AL',
    logoBg: 'from-amber-700 to-stone-600',
    hasDiscount: false,
    promoBadge: null,
    promoDetail: null,
    actionType: 'menu',
    actionLabelEs: 'Ir al Restaurante',
    actionLabelEn: 'Visit Restaurant',
    whatsapp: '573147809924',
    tags: ['restaurante', 'almuerzos', 'comida gourmet']
  },
  {
    id: 'brosty-rul',
    name: 'Brosty Rul',
    town: 'marinilla',
    townLabel: 'Marinilla, Antioquia',
    category: 'Restaurante',
    isOpen: true,
    schedule: 'Viernes: 09:00 - 21:00',
    logoText: 'BR',
    logoBg: 'from-yellow-600 to-orange-600',
    hasDiscount: false,
    promoBadge: null,
    promoDetail: null,
    actionType: 'menu',
    actionLabelEs: 'Ir al Restaurante',
    actionLabelEn: 'Visit Restaurant',
    whatsapp: '573147809925',
    tags: ['pollo broaster', 'combos', 'comidas rapidas']
  },
  {
    id: 'mandilocas-marinilla',
    name: 'Mandilocas Marinilla',
    town: 'marinilla',
    townLabel: 'Cra. 36 #23-72, Marinilla',
    category: 'Comidas Rápidas',
    isOpen: true,
    schedule: 'Viernes: 16:30 - 22:30',
    logoText: 'MM',
    logoBg: 'from-red-600 to-yellow-500',
    hasDiscount: false,
    promoBadge: null,
    promoDetail: null,
    actionType: 'menu',
    actionLabelEs: 'Ir a Comidas Rápidas',
    actionLabelEn: 'Visit Fast Food',
    whatsapp: '573147809926',
    tags: ['mandioca', 'salchipapas', 'hamburguesas']
  },
  {
    id: 'mandilocas-sanantonio',
    name: 'Mandilocas San Antonio',
    town: 'san-antonio',
    townLabel: 'Calle 21A #55 B 29, San Antonio',
    category: 'Comidas Rápidas',
    isOpen: true,
    schedule: 'Viernes: 16:30 - 22:30',
    logoText: 'MS',
    logoBg: 'from-red-600 to-amber-500',
    hasDiscount: false,
    promoBadge: null,
    promoDetail: null,
    actionType: 'menu',
    actionLabelEs: 'Ir a Comidas Rápidas',
    actionLabelEn: 'Visit Fast Food',
    whatsapp: '573147809927',
    tags: ['san antonio', 'mandioca', 'comidas rapidas']
  },
  {
    id: 'parceros-foods',
    name: 'Parceros foods',
    town: 'marinilla',
    townLabel: 'Calle 28 # 37-37, Marinilla',
    category: 'Comidas Rápidas',
    isOpen: true,
    schedule: 'Viernes: 16:00 - 22:30',
    logoText: 'PF',
    logoBg: 'from-rose-600 to-amber-700',
    hasDiscount: true,
    promoBadge: '2x1 en Hamburguesas',
    promoDetail: 'OFERTA ESPECIAL: 2x1 en combo doble artesanal pidiendo hoy por la web.',
    actionType: 'whatsapp',
    actionLabelEs: 'Pedir por WhatsApp',
    actionLabelEn: 'Order on WhatsApp',
    whatsapp: '573147809928',
    tags: ['hamburguesas', '2x1', 'promo', 'combos']
  },
  {
    id: 'banquetes-almar',
    name: 'Banquetes Almar',
    town: 'marinilla',
    townLabel: 'Marinilla, Antioquia',
    category: 'Salón de eventos',
    isOpen: false,
    schedule: 'Viernes: 09:00 - 17:00',
    logoText: 'BA',
    logoBg: 'from-zinc-700 to-stone-900',
    hasDiscount: false,
    promoBadge: null,
    promoDetail: null,
    actionType: 'whatsapp',
    actionLabelEs: 'Consultar Fechas',
    actionLabelEn: 'Check Booking',
    whatsapp: '573147809929',
    tags: ['eventos', 'bodas', 'catering', 'banquetes']
  }
];

export default function LocalDirectorySection({ onOpenContact }) {
  const { language } = useLanguage();
  const [selectedTown, setSelectedTown] = useState('all');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'discounts' | 'open'
  const [searchQuery, setSearchQuery] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filtro reactivo en tiempo real
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((item) => {
      // Filtro por municipio
      const matchesTown = selectedTown === 'all' || item.town === selectedTown;

      // Filtro por modo
      let matchesFilter = true;
      if (filterMode === 'discounts') {
        matchesFilter = item.hasDiscount;
      } else if (filterMode === 'open') {
        matchesFilter = item.isOpen;
      }

      // Filtro por búsqueda
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.townLabel.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesTown && matchesFilter && matchesSearch;
    });
  }, [selectedTown, filterMode, searchQuery]);

  const activeDiscountsCount = businesses.filter((b) => b.hasDiscount).length;
  const openCount = businesses.filter((b) => b.isOpen).length;

  return (
    <section id="directorio-local" className="py-20 relative overflow-hidden bg-slate-50/80 dark:bg-[#07080c] transition-colors duration-300 border-t border-black/5 dark:border-white/5 scroll-mt-16">
      
      {/* Glow ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-500/10 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-700 dark:text-orange-400 text-xs font-bold tracking-wider uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'DIRECTORIO TERRITORIAL & RED LOCAL' : 'HYPERLOCAL TOWN DIRECTORY'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            {language === 'es' ? 'Descubre Negocios Locales y sus Ofertas en Vivo' : 'Discover Local Businesses & Live Promotions'}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            {language === 'es'
              ? 'En EternalIA cada municipio cuenta con su propio directorio interactivo. Los comensales y vecinos consultan locales abiertos, activan descuentos flash y piden en 1 clic directo a WhatsApp o mesa.'
              : 'In EternalIA each town features its own live directory. Diners explore open spots, redeem instant flash promos, and order with 1 tap via WhatsApp or digital menu.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 dark:bg-zinc-800/80 border border-black/5 dark:border-white/10 text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
              <Store className="w-3.5 h-3.5 text-indigo-500" />
              <span>{businesses.length} {language === 'es' ? 'Negocios Registrados' : 'Registered Businesses'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-xs font-mono font-bold text-rose-700 dark:text-rose-400 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>{activeDiscountsCount} {language === 'es' ? 'Ofertas Activas' : 'Active Deals'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{openCount} {language === 'es' ? 'Abiertos Ahora' : 'Open Right Now'}</span>
            </span>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-orange-500/40 hover:border-orange-500 text-orange-600 dark:text-orange-400 text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Ver Pantallazos Oficiales' : 'View Production Screens'}</span>
            </button>
          </div>
        </div>

        {/* 2. TOWN TABS & FILTER BAR */}
        <div className="bg-white dark:bg-[#10111a] rounded-3xl p-4 sm:p-6 border border-black/10 dark:border-white/10 shadow-xl mb-8 space-y-4">
          
          {/* Top Row: Town/Pueblo Selector */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <span className="text-xs font-mono uppercase text-zinc-400 dark:text-zinc-500 hidden sm:inline-block shrink-0 mr-1">
              {language === 'es' ? 'Municipio:' : 'Town:'}
            </span>

            {[
              { id: 'all', label: language === 'es' ? '📍 Todos los Pueblos' : '📍 All Towns' },
              { id: 'marinilla', label: '📍 Marinilla' },
              { id: 'rionegro', label: '📍 Rionegro' },
              { id: 'san-antonio', label: '📍 San Antonio' }
            ].map((town) => (
              <button
                key={town.id}
                onClick={() => setSelectedTown(town.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedTown === town.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-500/20'
                    : 'bg-slate-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800'
                }`}
              >
                {town.label}
              </button>
            ))}
          </div>

          {/* Middle Row: Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'es' ? 'Buscar negocio, producto (ej: pizza, buñuelos, pollo) o categoría...' : 'Search business, dish (e.g. burger, pizza, bakery) or tags...'}
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-orange-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bottom Row: Quick Status & Offer Filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-800'
              }`}
            >
              {language === 'es' ? `Todos (${businesses.length})` : `All (${businesses.length})`}
            </button>

            <button
              onClick={() => setFilterMode('discounts')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'discounts'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-500/20'
                  : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{language === 'es' ? `Con Descuentos (${activeDiscountsCount})` : `With Deals (${activeDiscountsCount})`}</span>
            </button>

            <button
              onClick={() => setFilterMode('open')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'open'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 ring-2 ring-emerald-500/20'
                  : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{language === 'es' ? `Abiertos ahora (${openCount})` : `Open Now (${openCount})`}</span>
            </button>
          </div>

        </div>

        {/* 3. BUSINESS CARDS GRID */}
        {filteredBusinesses.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#10111a] rounded-3xl border border-black/10 dark:border-white/10 p-8">
            <Store className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              {language === 'es' ? 'No se encontraron negocios con esos filtros' : 'No businesses found matching filters'}
            </h4>
            <p className="text-xs text-zinc-500 mb-4">
              {language === 'es' ? 'Intenta seleccionando "Todos los Pueblos" o borrando el término de búsqueda.' : 'Try selecting "All Towns" or clearing the search bar.'}
            </p>
            <button
              onClick={() => {
                setSelectedTown('all');
                setFilterMode('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold cursor-pointer"
            >
              {language === 'es' ? 'Restablecer Filtros' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredBusinesses.map((biz) => (
              <div
                key={biz.id}
                className="bg-white dark:bg-[#11121c] rounded-3xl border border-black/10 dark:border-white/10 p-5 shadow-lg hover:shadow-2xl hover:border-orange-500/40 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Active Promo Corner Badge */}
                {biz.hasDiscount && biz.promoBadge && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-l from-rose-600 to-amber-600 text-white text-[10px] font-black tracking-wide uppercase px-3 py-1 rounded-bl-2xl shadow-md flex items-center gap-1">
                      <Flame className="w-3 h-3 text-yellow-300" />
                      <span>{biz.promoBadge}</span>
                    </div>
                  </div>
                )}

                <div>
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/10">
                      {biz.category}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        biz.isOpen
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${biz.isOpen ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                      <span>{biz.isOpen ? (language === 'es' ? 'ABIERTO' : 'OPEN') : (language === 'es' ? 'CERRADO' : 'CLOSED')}</span>
                    </span>
                  </div>

                  {/* Logo Avatar & Brand Title */}
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${biz.logoBg} p-1 shadow-md mb-3 group-hover:scale-105 transition-transform flex items-center justify-center text-white font-black text-lg tracking-wider`}>
                      <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                        {biz.logoText}
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-zinc-900 dark:text-white leading-tight">
                      {biz.name}
                    </h3>

                    <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                      <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                      <span className="truncate">{biz.townLabel}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 mt-0.5">
                      <Clock className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                      <span>{biz.schedule}</span>
                    </div>
                  </div>

                  {/* Special Offer Highlight Banner */}
                  {biz.hasDiscount && biz.promoDetail && (
                    <div className="mb-4 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-left">
                      <div className="flex items-center gap-1 text-[10px] font-black uppercase text-rose-700 dark:text-rose-300 mb-0.5">
                        <Tag className="w-3 h-3" />
                        <span>{language === 'es' ? 'OFERTA ESPECIAL' : 'SPECIAL DEAL'}</span>
                      </div>
                      <p className="text-[11px] text-rose-900 dark:text-rose-200 leading-tight">
                        {biz.promoDetail}
                      </p>
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${biz.whatsapp}?text=Hola%20${encodeURIComponent(biz.name)},%20te%20contacto%20desde%20el%20Directorio%20de%20EternalIA.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      biz.actionType === 'whatsapp'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                        : 'bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white'
                    }`}
                  >
                    {biz.actionType === 'whatsapp' ? (
                      <MessageCircle className="w-3.5 h-3.5" />
                    ) : (
                      <ExternalLink className="w-3.5 h-3.5" />
                    )}
                    <span>{language === 'es' ? biz.actionLabelEs : biz.actionLabelEn}</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* 4. CONVERSION BANNER FOR MERCHANTS & STORE OWNERS */}
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
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                {language === 'es'
                  ? 'Al implementar EternalIA Gastronomía OS, tu negocio ingresa automáticamente en el directorio de tu municipio. Activa promociones de fin de semana, recibe pedidos directos a WhatsApp y digitaliza tus comandas.'
                  : 'When deploying EternalIA Gastronomía OS, your business automatically lists in your municipality directory. Launch weekend promos, receive direct WhatsApp orders, and automate kitchen tickets.'}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={onOpenContact}
                className="px-6 py-3.5 rounded-2xl bg-white text-orange-700 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-xl transition-all cursor-pointer active:scale-95 text-center"
              >
                {language === 'es' ? 'Registrar Mi Negocio' : 'Register My Business'}
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

      {/* 5. LIGHTBOX MODAL DE PANTALLAZOS REALES DEL DIRECTORIO */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200 select-none overscroll-contain"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[96vh] flex flex-col rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-950"
          >
            {/* Header */}
            <div className="h-12 bg-zinc-900/90 px-4 sm:px-6 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-400 font-mono text-xs font-bold">
                  {lightboxIndex + 1} / {directoryScreenshots.length}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white truncate">
                  {language === 'es' ? directoryScreenshots[lightboxIndex].titleEs : directoryScreenshots[lightboxIndex].titleEn}
                </span>
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Frame */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-2 sm:p-4 min-h-[350px]">
              <img
                src={directoryScreenshots[lightboxIndex].img}
                alt={directoryScreenshots[lightboxIndex].titleEs}
                className="max-h-[66vh] w-auto max-w-full object-contain rounded-xl shadow-2xl animate-in fade-in duration-200"
              />

              {/* Prev / Next controls */}
              <button
                onClick={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : directoryScreenshots.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-orange-500 text-white transition-all cursor-pointer"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setLightboxIndex((prev) => (prev < directoryScreenshots.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-orange-500 text-white transition-all cursor-pointer"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Footer */}
            <div className="bg-zinc-900/90 px-4 py-3 border-t border-white/10 shrink-0 flex items-center justify-between text-xs text-zinc-400">
              <span className="truncate">
                {language === 'es' ? directoryScreenshots[lightboxIndex].captionEs : directoryScreenshots[lightboxIndex].captionEn}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {directoryScreenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      lightboxIndex === idx ? 'bg-orange-500 scale-125' : 'bg-zinc-600 hover:bg-zinc-400'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
