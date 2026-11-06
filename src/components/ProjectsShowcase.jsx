import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsConfig as initialProjects } from '../data/projectsConfig';
import { getProjects } from '../services/projectService';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight, 
  Search, 
  X,
  SlidersHorizontal,
  UtensilsCrossed,
  Pizza,
  Coffee,
  ShoppingBag,
  Layers,
  Maximize2,
  CheckCircle2,
  Globe,
  Eye,
  Check
} from 'lucide-react';

const getCategoryBadge = (category, language) => {
  switch (category) {
    case 'restaurants':
      return {
        icon: UtensilsCrossed,
        label: language === 'es' ? 'Restaurante' : 'Restaurant',
        badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
        dotClass: 'bg-emerald-500',
        accentBg: 'from-emerald-500/20 to-teal-500/10'
      };
    case 'fastfood':
      return {
        icon: Pizza,
        label: language === 'es' ? 'Comidas Rápidas' : 'Fast Food',
        badgeClass: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30',
        dotClass: 'bg-orange-500',
        accentBg: 'from-orange-500/20 to-amber-500/10'
      };
    case 'cafes':
      return {
        icon: Coffee,
        label: language === 'es' ? 'Café & Bakery' : 'Cafe & Bakery',
        badgeClass: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
        dotClass: 'bg-amber-500',
        accentBg: 'from-amber-500/20 to-yellow-500/10'
      };
    case 'commerce':
      return {
        icon: ShoppingBag,
        label: language === 'es' ? 'Comercio & Redes' : 'Commerce & Mesh',
        badgeClass: 'bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border-cyan-500/30',
        dotClass: 'bg-cyan-500',
        accentBg: 'from-cyan-500/20 to-blue-500/10'
      };
    default:
      return {
        icon: Layers,
        label: language === 'es' ? 'Solución' : 'Solution',
        badgeClass: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/30',
        dotClass: 'bg-indigo-500',
        accentBg: 'from-indigo-500/20 to-cyan-500/10'
      };
  }
};

const getProjectMonogram = (name) => {
  if (!name) return 'ET';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function ProjectsShowcase({ onOpenContact }) {
  const { language } = useLanguage();
  const [projects, setProjects] = useState(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchProj = async () => {
      const data = await getProjects();
      if (isMounted && data) {
        setProjects(data);
      }
    };
    fetchProj();

    const handleUpdate = () => {
      fetchProj();
    };
    window.addEventListener('eternalia_projects_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('eternalia_projects_updated', handleUpdate);
    };
  }, []);

  const categories = [
    { 
      id: 'all', 
      label: language === 'es' ? 'Todas las Marcas' : 'All Brands',
      mobileLabel: language === 'es' ? '✨ Todas las Marcas' : '✨ All Brands',
      icon: Sparkles 
    },
    { 
      id: 'restaurants', 
      label: language === 'es' ? 'Restaurantes' : 'Restaurants',
      mobileLabel: language === 'es' ? '🍽️ Restaurantes' : '🍽️ Restaurants',
      icon: UtensilsCrossed 
    },
    { 
      id: 'fastfood', 
      label: language === 'es' ? 'Comidas Rápidas' : 'Fast Food',
      mobileLabel: language === 'es' ? '🍔 Comidas Rápidas' : '🍔 Fast Food',
      icon: Pizza 
    },
    { 
      id: 'cafes', 
      label: language === 'es' ? 'Cafés & Repostería' : 'Cafes & Bakery',
      mobileLabel: language === 'es' ? '☕ Cafés' : '☕ Cafes',
      icon: Coffee 
    },
    { 
      id: 'commerce', 
      label: language === 'es' ? 'Comercio & Redes' : 'Commerce & Mesh',
      mobileLabel: language === 'es' ? '🛍️ Comercio' : '🛍️ Commerce',
      icon: ShoppingBag 
    },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCat = selectedCategory === 'all' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;
      const matchesText = 
        project.name.toLowerCase().includes(q) ||
        (project.taglineEs && project.taglineEs.toLowerCase().includes(q)) ||
        (project.taglineEn && project.taglineEn.toLowerCase().includes(q)) ||
        (project.descriptionEs && project.descriptionEs.toLowerCase().includes(q)) ||
        (project.highlights && project.highlights.some(h => h.toLowerCase().includes(q))) ||
        project.techStack.some(t => t.toLowerCase().includes(q));
      return matchesCat && matchesText;
    });
  }, [projects, selectedCategory, searchQuery]);

  const handleLaunchProject = (url) => {
    if (!url) return;
    if (url.startsWith('/')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const openLightbox = (project, screenshotIndex = 0) => {
    setActiveModalProject(project);
    setActiveScreenshotIdx(screenshotIndex);
  };

  return (
    <section id="proyectos" className="relative py-24 sm:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-700 dark:text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>{language === 'es' ? 'PORTAFOLIO & DEMOS EN VIVO' : 'LIVE PORTFOLIO & DEMOS'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
            {language === 'es' ? 'Plataformas & Negocios Conectados' : 'Connected Platforms & Brands'}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            {language === 'es' 
              ? 'Explora las plataformas digitales que hemos desarrollado para restaurantes, cadenas de comidas rápidas, cafeterías y redes comerciales. Haz clic en cualquier pantalla para ver el sistema en acción.'
              : 'Explore the digital platforms we built for restaurants, fast-food chains, cafes, and commercial networks. Click any screen preview to see the system in action.'}
          </p>
        </div>

        {/* Filter and Search Bar Console */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="glass-panel rounded-2xl p-3.5 sm:p-5 border border-black/10 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col gap-3.5 bg-white/70 dark:bg-[#0c0d14]/70 backdrop-blur-xl">
            
            {/* Top Row: Categories & Search */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              
              {/* MOBILE CATEGORY SELECTOR */}
              <div className="flex md:hidden flex-col gap-1.5 w-full">
                {/* 1. Primary Full-Width Tab */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-cyan-400/40'
                      : 'bg-slate-100 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-300 shrink-0 animate-pulse" />
                    <span>{categories[0].mobileLabel}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/10 dark:bg-black/40 text-cyan-700 dark:text-cyan-200 border border-black/10 dark:border-white/10 font-bold">
                    {projects.length}
                  </span>
                </button>

                {/* 2. Grid for specific categories */}
                <div className="grid grid-cols-2 gap-1.5 w-full">
                  {categories.slice(1).map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selectedCategory === cat.id;
                    const count = projects.filter(p => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center justify-between py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                            : 'bg-slate-100 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-black/5 dark:border-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-zinc-950' : 'text-zinc-500 dark:text-zinc-400'}`} />
                          <span className="truncate text-[11px]">{cat.mobileLabel}</span>
                        </span>
                        <span className={`text-[10px] font-mono ml-1 ${isActive ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DESKTOP CATEGORY SELECTOR */}
              <div className="hidden md:flex items-center gap-2 flex-wrap">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? projects.length 
                    : projects.filter(p => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)] border border-cyan-400/30 font-bold'
                          : 'bg-slate-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 border border-black/5 dark:border-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{cat.label}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-black/25 text-white font-bold' : 'bg-slate-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Search Input */}
              <div className="relative w-full lg:w-64 shrink-0">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'es' ? 'Buscar restaurante o plato...' : 'Search brand or food...'}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-zinc-950/80 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs focus:outline-none focus:border-cyan-500/60 transition-all font-medium shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

            {/* Live Filter Indicator Bar */}
            <div className="flex items-center justify-between pt-2.5 border-t border-black/5 dark:border-white/5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold">
                  {selectedCategory === 'all'
                    ? (language === 'es' ? 'Todas las Marcas y Plataformas' : 'All Brands & Platforms')
                    : categories.find(c => c.id === selectedCategory)?.label}
                </span>
              </div>
              <span className="text-zinc-500">
                {filteredProjects.length} {language === 'es' ? 'negocios en exhibición' : 'businesses on display'}
              </span>
            </div>

          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const tagline = language === 'es' ? project.taglineEs : project.taglineEn;
            const desc = language === 'es' ? project.descriptionEs : project.descriptionEn;
            const metricLabel = language === 'es' ? project.metricLabelEs : project.metricLabelEn;
            const catBadge = getCategoryBadge(project.category, language);
            const CatIcon = catBadge.icon;

            return (
              <div
                key={project.id}
                className="glass-card rounded-3xl p-5 sm:p-6 border border-black/10 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-lg hover:shadow-2xl bg-white/90 dark:bg-[#0e0f17]/90"
              >
                {/* Ambient glow highlight */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${catBadge.accentBg} rounded-bl-full pointer-events-none opacity-40 group-hover:opacity-80 transition-all duration-500`} />

                <div>
                  {/* Top Bar: Brand Monogram & Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative group/monogram shrink-0">
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${project.logoColor || 'from-indigo-600 to-cyan-500'} p-[1.5px] shadow-md`}>
                          <div className="w-full h-full bg-white dark:bg-[#0c0d14] rounded-[14px] flex items-center justify-center">
                            <span className="font-mono font-black text-zinc-900 dark:text-white text-xs tracking-wider">
                              {getProjectMonogram(project.name)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                          {project.name}
                        </h3>
                        <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block mt-0.5">
                          {language === 'es' ? project.categoryLabelEs : project.categoryLabelEn}
                        </span>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${catBadge.badgeClass}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${catBadge.dotClass}`} />
                      <CatIcon className="w-3 h-3" />
                      <span>{catBadge.label}</span>
                    </span>
                  </div>

                  {/* SCREENSHOT MOCKUP WINDOW (Pantallazo interactivo) */}
                  <div 
                    onClick={() => openLightbox(project)}
                    className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-black/60 shadow-md mb-4 group/screen cursor-pointer"
                  >
                    {/* Browser top chrome */}
                    <div className="h-6 bg-slate-200 dark:bg-zinc-900/90 border-b border-black/5 dark:border-white/10 px-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/80" />
                        <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500 truncate max-w-[150px]">
                        {project.url ? project.url.replace('https://', '') : 'demo.eternalia.co'}
                      </span>
                      <Maximize2 className="w-2.5 h-2.5 text-zinc-400" />
                    </div>

                    {/* Image Preview Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 flex items-center justify-center">
                      <img 
                        src={project.screenshotUrl || '/screenshots/don-rafael.svg'} 
                        alt={`Pantallazo de ${project.name}`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/screen:scale-105"
                        loading="lazy"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover/screen:translate-y-0 transition-transform duration-300">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{language === 'es' ? 'Ver Pantallazo Completo' : 'View Full Screen'}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-2 leading-snug">
                    {tagline}
                  </h4>

                  {/* Highlights (Ventajas del desarrollo) */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-1.5 mb-4">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Impact Metric Banner */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 flex items-center justify-between mb-4 font-mono">
                    <span className="text-[10px] text-zinc-600 dark:text-zinc-400">{metricLabel}:</span>
                    <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400">{project.metricValue}</span>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => openLightbox(project)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white border border-black/10 dark:border-white/10 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{language === 'es' ? 'Ver Pantallazos' : 'Screenshots'}</span>
                  </button>

                  <button
                    onClick={() => handleLaunchProject(project.url)}
                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title={language === 'es' ? 'Abrir sitio en vivo' : 'Launch live URL'}
                  >
                    <span>{language === 'es' ? 'Probar Demo' : 'Live Demo'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 px-4 glass-card rounded-2xl max-w-lg mx-auto border border-black/10 dark:border-white/10 shadow-lg">
            <Search className="w-10 h-10 text-zinc-400 dark:text-zinc-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
              {language === 'es' ? 'No se encontraron resultados' : 'No businesses found'}
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
              {language === 'es' 
                ? 'Intenta con otro término o limpia los filtros de búsqueda.' 
                : 'Try another search term or reset category filters.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              {language === 'es' ? 'Restablecer Filtros' : 'Reset Filters'}
            </button>
          </div>
        )}

        {/* Direct Developer Helper Note */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-zinc-950/70 border border-black/10 dark:border-white/10 backdrop-blur-md max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-zinc-900 dark:text-white block">
                {language === 'es' ? 'Gestión Directa del Catálogo' : 'Direct Catalog Management'}
              </span>
              <span>
                {language === 'es' 
                  ? 'Gestiona marcas, restaurantes y pantallazos directamente en ' 
                  : 'Manage brands, restaurants, and screenshots directly in '}
                <code className="text-cyan-700 dark:text-cyan-300 font-mono bg-slate-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-black/5 dark:border-white/5">
                  src/data/projectsConfig.js
                </code>
              </span>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-bold whitespace-nowrap cursor-pointer shadow-md hover:opacity-95"
          >
            {language === 'es' ? 'Digitalizar Mi Restaurante' : 'Digitize My Restaurant'}
          </button>
        </div>

        {/* DETAILED LIGHTBOX MODAL (Visor de Pantallazos en Alta Resolución) */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#111219] text-zinc-900 dark:text-white border border-black/15 dark:border-white/15 shadow-2xl overflow-hidden">
              
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-slate-50/80 dark:bg-zinc-900/40">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${activeModalProject.logoColor || 'from-indigo-600 to-cyan-500'} p-[1.5px] shadow`}>
                    <div className="w-full h-full bg-white dark:bg-[#0c0d14] rounded-[10px] flex items-center justify-center">
                      <span className="font-mono font-bold text-zinc-900 dark:text-white text-xs">
                        {getProjectMonogram(activeModalProject.name)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                        {activeModalProject.name}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25">
                        {language === 'es' ? activeModalProject.categoryLabelEs : activeModalProject.categoryLabelEn}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">
                      {activeModalProject.url}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
                
                {/* Large Screenshot Frame */}
                <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/15 shadow-2xl bg-black">
                  <div className="h-7 bg-zinc-800 dark:bg-zinc-900 px-3 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] font-mono text-zinc-300">
                      {activeModalProject.url || 'https://demo.eternalia.co'}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">SSL 256-bit</span>
                  </div>
                  <div className="relative aspect-[16/10] bg-zinc-950">
                    <img 
                      src={
                        activeModalProject.gallery && activeModalProject.gallery[activeScreenshotIdx]
                          ? activeModalProject.gallery[activeScreenshotIdx]
                          : (activeModalProject.screenshotUrl || '/screenshots/don-rafael.svg')
                      } 
                      alt={`Pantalla completa de ${activeModalProject.name}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Multiple Screenshot Switcher (if gallery > 1) */}
                {activeModalProject.gallery && activeModalProject.gallery.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {activeModalProject.gallery.map((screen, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveScreenshotIdx(idx)}
                        className={`relative rounded-lg overflow-hidden border-2 w-20 aspect-[16/10] shrink-0 cursor-pointer ${
                          activeScreenshotIdx === idx ? 'border-cyan-500' : 'border-black/10 dark:border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={screen} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Description & Impact Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {language === 'es' ? activeModalProject.taglineEs : activeModalProject.taglineEn}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {language === 'es' ? activeModalProject.descriptionEs : activeModalProject.descriptionEn}
                    </p>

                    {/* Highlights list */}
                    {activeModalProject.highlights && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1">
                          {language === 'es' ? 'Ventajas Clave del Sistema:' : 'Key System Advantages:'}
                        </span>
                        {activeModalProject.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                            <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Metric Card */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10">
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mb-1">
                        {language === 'es' ? activeModalProject.metricLabelEs : activeModalProject.metricLabelEn}
                      </span>
                      <span className="text-xl font-black text-cyan-700 dark:text-cyan-300 font-mono block">
                        {activeModalProject.metricValue}
                      </span>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10">
                      <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                        {language === 'es' ? 'Stack Tecnológico:' : 'Tech Stack:'}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {activeModalProject.techStack.map((tech, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/10 font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Footer with Direct Conversion CTAs */}
              <div className="p-4 sm:p-6 border-t border-black/10 dark:border-white/10 bg-slate-50/80 dark:bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    onOpenContact();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{language === 'es' ? 'Quiero una Solución Como Esta' : 'I Want a Solution Like This'}</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleLaunchProject(activeModalProject.url)}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{language === 'es' ? 'Abrir Demo en Vivo' : 'Open Live Demo'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-xs cursor-pointer"
                  >
                    {language === 'es' ? 'Cerrar' : 'Close'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
