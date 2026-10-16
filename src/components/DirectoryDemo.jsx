import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { marinillaBusinesses as initialBusinesses } from '../data/marinillaBusinesses';
import { getBusinesses } from '../services/businessService';
import DirectoryMap from './DirectoryMap';
import { 
  Search, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Star, 
  CheckCircle, 
  Compass, 
  ExternalLink, 
  Globe, 
  ArrowUpRight, 
  PlusCircle, 
  LayoutGrid, 
  Map as MapIcon,
  X
} from 'lucide-react';

export default function DirectoryDemo({ onOpenContact }) {
  const { t, language } = useLanguage();
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalBusiness, setActiveModalBusiness] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'

  useEffect(() => {
    let isMounted = true;
    const fetchBiz = async () => {
      try {
        const data = await getBusinesses();
        if (isMounted && data && Array.isArray(data)) {
          setBusinesses(data);
        }
      } catch (err) {
        console.warn('Error loading businesses:', err);
      }
    };
    fetchBiz();

    const handleUpdate = () => {
      fetchBiz();
    };
    window.addEventListener('eternalia_businesses_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('eternalia_businesses_updated', handleUpdate);
    };
  }, []);

  const categories = [
    { id: 'all', label: t.directory.categories.all },
    { id: 'food', label: t.directory.categories.food },
    { id: 'nursery', label: t.directory.categories.nursery },
    { id: 'services', label: t.directory.categories.services },
    { id: 'automotive', label: t.directory.categories.automotive },
  ];

  // Real-time filter logic
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const desc = language === 'es' ? (item.descriptionEs || '') : (item.descriptionEn || '');
      const categoryLabel = language === 'es' ? (item.categoryLabelEs || '') : (item.categoryLabelEn || '');
      const tagsList = item.tags || [];
      const matchesText = 
        (item.name || '').toLowerCase().includes(query) ||
        desc.toLowerCase().includes(query) ||
        (item.address || '').toLowerCase().includes(query) ||
        categoryLabel.toLowerCase().includes(query) ||
        tagsList.some(t => (t || '').toLowerCase().includes(query));

      return matchesCategory && matchesText;
    });
  }, [businesses, searchQuery, selectedCategory, language]);

  const handleWhatsAppClick = (biz) => {
    const textMessage = language === 'es'
      ? `¡Hola! Conecté con ${biz.name} a través de la Red Comercial Inteligente de Eternalia y deseo solicitar información institucional y catálogo de servicios.`
      : `Hello! I connected with ${biz.name} through the Eternalia Smart Commercial Mesh and would like to request institutional info and services catalog.`;
    const url = `https://wa.me/${biz.whatsapp}?text=${encodeURIComponent(textMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = (biz) => {
    window.open(`tel:${biz.phone}`);
  };

  const handleWebsiteClick = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="directorio" className="relative py-24 sm:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.directory.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {t.directory.title}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {t.directory.subtitle}
          </p>
        </div>

        {/* Directory Search & Filter Bar Console */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="glass-panel rounded-2xl p-3 sm:p-4 border border-white/10 shadow-2xl">
            
            {/* Top row: Live Search + View Mode Switcher (Grid / Map) */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-3.5">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.directory.searchPlaceholder}
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-zinc-950/70 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* View Switcher Toggle: [ Grid | Map ] */}
              <div className="flex items-center gap-1 bg-zinc-950/90 p-1 rounded-xl border border-white/10 shrink-0 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={language === 'es' ? 'Ver como tarjetas' : 'View as cards'}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Tarjetas' : 'Cards'}</span>
                </button>

                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'map'
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={language === 'es' ? 'Ver en mapa interactivo' : 'View on interactive map'}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? 'Mapa Interactivo' : 'Map View'}</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                        : 'bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Status indicator */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 font-mono pl-3 shrink-0 border-l border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{filteredBusinesses.length} {t.directory.totalResults}</span>
              </div>
            </div>

          </div>
        </div>

        {/* View Mode Rendering: MAP VIEW or CARDS GRID */}
        {viewMode === 'map' ? (
          <div className="mb-8">
            <DirectoryMap 
              businesses={filteredBusinesses} 
              onSelectBusiness={(biz) => setActiveModalBusiness(biz)}
              language={language}
            />
          </div>
        ) : (
          /* Business Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredBusinesses.map((biz) => {
              return (
                <div
                  key={biz.id}
                  className="glass-card rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Glow accent corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

                  <div>
                    {/* Top: Logo & Category Bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        {biz.logo ? (
                          <img 
                            src={biz.logo} 
                            alt={biz.name} 
                            className="w-10 h-10 rounded-xl object-cover border border-white/10 shadow" 
                          />
                        ) : (
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${biz.logoColor || 'from-indigo-600 to-cyan-500'} p-[1.5px] shadow`}>
                            <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center font-bold text-white text-sm">
                              {(biz.name || 'E').charAt(0)}
                            </div>
                          </div>
                        )}

                        <div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800/80 border border-white/10 text-cyan-300">
                            {language === 'es' ? (biz.categoryLabelEs || biz.category) : (biz.categoryLabelEn || biz.category)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-zinc-900/90 px-2 py-0.5 rounded border border-white/5 text-xs font-bold text-amber-400 font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{biz.rating || 5.0}</span>
                        <span className="text-zinc-500 text-[10px]">({biz.reviews || 0})</span>
                      </div>
                    </div>

                    {/* Business Name */}
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors mb-1.5 flex items-center justify-between">
                      <span>{biz.name || 'Comercio Local'}</span>
                      {biz.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                          {biz.badge}
                        </span>
                      )}
                    </h3>

                    {/* Address in Marinilla */}
                    <div className="flex items-start gap-1.5 text-xs text-zinc-400 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{biz.address || 'Marinilla, Antioquia'}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4 line-clamp-2">
                      {language === 'es' ? (biz.descriptionEs || biz.descriptionEn || '') : (biz.descriptionEn || biz.descriptionEs || '')}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(biz.tags || []).map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Interactive Actions: WhatsApp, Website & Profile */}
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    
                    {/* Primary Direct WhatsApp Action */}
                    <button
                      onClick={() => handleWhatsAppClick(biz)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-zinc-950 border border-emerald-500/30 hover:border-emerald-400 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                      title={t.directory.buttons.chat}
                    >
                      <MessageCircle className="w-4 h-4 fill-emerald-500/30" />
                      <span>{t.directory.buttons.chat}</span>
                    </button>

                    {/* Optional Direct Website Link */}
                    {biz.websiteUrl && (
                      <button
                        onClick={() => handleWebsiteClick(biz.websiteUrl)}
                        className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-400 hover:text-cyan-300 border border-white/10 transition-colors"
                        title={language === 'es' ? 'Visitar Landing / Web' : 'Visit Website'}
                      >
                        <Globe className="w-4 h-4" />
                      </button>
                    )}

                    {/* Phone Call Action */}
                    <button
                      onClick={() => handleCallClick(biz)}
                      className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                      title={t.directory.buttons.call}
                    >
                      <Phone className="w-4 h-4" />
                    </button>

                    {/* Profile detail trigger */}
                    <button
                      onClick={() => setActiveModalBusiness(biz)}
                      className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                      title={t.directory.buttons.viewDetails}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Empty state if 0 results */}
        {filteredBusinesses.length === 0 && (
          <div className="text-center py-16 px-4 glass-card rounded-2xl max-w-lg mx-auto border border-white/10">
            <Search className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">
              {language === 'es' ? 'No se encontraron comercios' : 'No businesses found'}
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              {language === 'es' 
                ? 'Intenta con otro término de búsqueda o selecciona la categoría "Todos".' 
                : 'Try another search term or switch back to the "All" category filter.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors"
            >
              {language === 'es' ? 'Restablecer Búsqueda' : 'Reset Search'}
            </button>
          </div>
        )}

        {/* Quick Developer / Merchant CTA Banner */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">
                {language === 'es' ? '¿Quieres sumar tu comercio al Directorio?' : 'Want to list your business on the directory?'}
              </span>
              <span>
                {language === 'es' 
                  ? 'Configura comercios en ' 
                  : 'Manage businesses in '}
                <code className="text-cyan-300 font-mono bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5">
                  src/data/marinillaBusinesses.js
                </code>
              </span>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs whitespace-nowrap shadow-md cursor-pointer"
          >
            {language === 'es' ? 'Registrar Mi Comercio' : 'List My Business'}
          </button>
        </div>

        {/* Business Detailed Quick View Modal */}
        {activeModalBusiness && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-2xl bg-[#121217] border border-white/15 p-6 shadow-2xl">
              <button
                onClick={() => setActiveModalBusiness(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {language === 'es' ? activeModalBusiness.categoryLabelEs : activeModalBusiness.categoryLabelEn}
                </span>
                <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {t.directory.status.verified}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {activeModalBusiness.name}
              </h3>

              <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
                {language === 'es' ? activeModalBusiness.descriptionEs : activeModalBusiness.descriptionEn}
              </p>

              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 space-y-2 mb-5 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{activeModalBusiness.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{activeModalBusiness.phone}</span>
                </div>
                {activeModalBusiness.websiteUrl && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                    <a 
                      href={activeModalBusiness.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>{activeModalBusiness.websiteUrl}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Verified Features */}
              <div className="mb-6">
                <span className="text-xs font-bold text-zinc-400 block mb-2 uppercase tracking-wider">
                  {language === 'es' ? 'Beneficios & Servicios Activos' : 'Active Verified Services'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(activeModalBusiness.features || []).map((feat, i) => (
                    <div key={i} className="text-xs text-zinc-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleWhatsAppClick(activeModalBusiness);
                    setActiveModalBusiness(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'es' ? 'Escribir por WhatsApp' : 'Chat via WhatsApp'}</span>
                </button>
                <button
                  onClick={() => setActiveModalBusiness(null)}
                  className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs cursor-pointer"
                >
                  {language === 'es' ? 'Cerrar' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
