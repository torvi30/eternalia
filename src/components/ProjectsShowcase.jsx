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
  Code2,
  SlidersHorizontal,
  Layers,
  Cpu,
  Users,
  Globe,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';

const getProjectGlyph = (category) => {
  switch (category) {
    case 'commerce':
      return <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />;
    case 'services':
      return <Users className="w-3.5 h-3.5 text-cyan-400" />;
    case 'ventures':
      return <Cpu className="w-3.5 h-3.5 text-indigo-400" />;
    case 'directories':
      return <Globe className="w-3.5 h-3.5 text-emerald-400" />;
    default:
      return <Layers className="w-3.5 h-3.5 text-cyan-400" />;
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
      label: language === 'es' ? 'Todas las Soluciones' : 'All Solutions',
      mobileLabel: language === 'es' ? '✨ Todas las Soluciones que Ofrecemos' : '✨ All Solutions We Offer',
      icon: Sparkles 
    },
    { 
      id: 'commerce', 
      label: language === 'es' ? 'Comercio & Frontends' : 'Commerce & Frontends',
      mobileLabel: language === 'es' ? 'Comercio Digital' : 'Digital Commerce',
      icon: ShoppingBag 
    },
    { 
      id: 'services', 
      label: language === 'es' ? 'Workforce OS' : 'Workforce OS',
      mobileLabel: language === 'es' ? 'Workforce OS' : 'Workforce OS',
      icon: Users 
    },
    { 
      id: 'directories', 
      label: language === 'es' ? 'Redes Territoriales' : 'Territorial Meshes',
      mobileLabel: language === 'es' ? 'Redes & Directorio' : 'Networks & Directory',
      icon: Globe 
    },
    { 
      id: 'ventures', 
      label: language === 'es' ? 'Soluciones Industriales' : 'Industrial Ventures',
      mobileLabel: language === 'es' ? 'Industria & IoT' : 'Industry & IoT',
      icon: Cpu 
    },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesCat = selectedCategory === 'all' || proj.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const tagline = language === 'es' ? (proj.taglineEs || '') : (proj.taglineEn || '');
      const desc = language === 'es' ? (proj.descriptionEs || '') : (proj.descriptionEn || '');
      const techList = proj.techStack || [];
      const matchesText = 
        (proj.name || '').toLowerCase().includes(query) ||
        tagline.toLowerCase().includes(query) ||
        desc.toLowerCase().includes(query) ||
        techList.some((tech) => (tech || '').toLowerCase().includes(query));

      return matchesCat && matchesText;
    });
  }, [projects, selectedCategory, searchQuery, language]);

  const handleLaunchProject = (url) => {
    if (!url || url === '#') {
      onOpenContact();
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getStatusBadge = (status) => {
    if (status === 'live') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {language === 'es' ? 'En Producción' : 'Live Production'}
        </span>
      );
    }
    if (status === 'beta') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          {language === 'es' ? 'Fase Piloto' : 'Pilot Beta'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-zinc-800 text-zinc-300 border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
        {language === 'es' ? 'En Desarrollo' : 'In Dev'}
      </span>
    );
  };

  return (
    <section id="proyectos" className="relative py-24 sm:py-32 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'es' ? 'PORTAFOLIO & SOLUCIONES EN VIVO' : 'LIVE PORTFOLIO & SOLUTIONS'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'es' ? 'Proyectos Activos & Soluciones' : 'Active Projects & Solutions'}
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {language === 'es' 
              ? 'Conoce todas las soluciones que ofrecemos en el ecosistema Eternalia: plataformas frontends de ultra-alta conversión, infraestructura de Workforce OS, directorios territoriales y telemetría de misión crítica.'
              : 'Explore all the solutions we offer across the Eternalia ecosystem: high-converting frontends, workforce operating systems, territorial directories, and mission-critical telematics.'}
          </p>
        </div>

        {/* Filter and Search Bar Console */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="glass-panel rounded-2xl p-3.5 sm:p-5 border border-white/10 shadow-2xl flex flex-col gap-3.5">
            
            {/* Top Row: Categories & Search */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              
              {/* MOBILE CATEGORY SELECTOR (Zero horizontal scroll! 100% visible) */}
              <div className="flex md:hidden flex-col gap-1.5 w-full">
                {/* 1. Primary Full-Width Tab: "✨ Todas las Soluciones que Ofrecemos" */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] border border-cyan-400/40'
                      : 'bg-zinc-900/90 text-zinc-300 hover:text-white border border-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
                    <span>{categories[0].mobileLabel}</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 text-cyan-200 border border-white/10">
                    {projects.length}
                  </span>
                </button>

                {/* 2. 2x2 Grid for specific solution categories (Fits 100% width on phone) */}
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
                            : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
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

              {/* DESKTOP CATEGORY SELECTOR (Horizontal inline segmented group) */}
              <div className="hidden md:flex items-center gap-1.5 flex-wrap">
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-cyan-400/30'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{cat.id === 'all' ? (language === 'es' ? '✨ Todas las Soluciones' : '✨ All Solutions') : cat.label}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                        isActive ? 'bg-black/30 text-white' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Search Input */}
              <div className="relative w-full lg:w-64 shrink-0">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'es' ? 'Buscar solución o tech...' : 'Search solution or tech...'}
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-500/60 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>

            {/* Live Filter Indicator Bar */}
            <div className="flex items-center justify-between pt-2.5 border-t border-white/5 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-zinc-200 font-semibold">
                  {selectedCategory === 'all'
                    ? (language === 'es' ? 'Todas las Soluciones que Ofrecemos' : 'All Solutions We Offer')
                    : categories.find(c => c.id === selectedCategory)?.label}
                </span>
              </div>
              <span className="text-zinc-500">
                {filteredProjects.length} {language === 'es' ? 'soluciones activas' : 'active solutions'}
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

            return (
              <div
                key={project.id}
                className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Ambient glow highlight */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-cyan-500/15 transition-all" />

                <div>
                  {/* Top Bar: Logo & Status Badge */}
                  <div className="flex items-center justify-between mb-5">
                    {/* Project Logo: styled monogram with glow & glyph */}
                    <div className="flex items-center gap-3">
                      <div className="relative group/monogram shrink-0">
                        <div className={`absolute -inset-1 bg-gradient-to-tr ${project.logoColor || 'from-indigo-600 to-cyan-500'} rounded-2xl blur-[6px] opacity-35 group-hover/monogram:opacity-70 transition-opacity duration-300`} />
                        <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-tr ${project.logoColor || 'from-indigo-600 to-cyan-500'} p-[1.5px] shadow-lg`}>
                          <div className="w-full h-full bg-[#0c0d14] rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden">
                            <span className="font-mono font-black text-white text-sm tracking-wider">
                              {getProjectMonogram(project.name)}
                            </span>
                            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                          </div>
                        </div>
                        {/* Category glyph chip */}
                        <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#09090b] border border-white/20 shadow-md">
                          {getProjectGlyph(project.category)}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-0.5">
                          {language === 'es' ? project.categoryLabelEs : project.categoryLabelEn}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    {getStatusBadge(project.status)}
                  </div>

                  {/* Tagline */}
                  <h4 className="text-xs font-semibold text-zinc-300 mb-2 leading-snug">
                    {tagline}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-5 line-clamp-3">
                    {desc}
                  </p>

                  {/* Impact Metric Banner */}
                  <div className="p-3 rounded-2xl bg-zinc-950/70 border border-white/5 flex items-center justify-between mb-5 font-mono">
                    <span className="text-[11px] text-zinc-400">{metricLabel}:</span>
                    <span className="text-sm font-bold text-cyan-300">{project.metricValue}</span>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 border border-white/5 text-zinc-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions: Visitar Proyecto & Ficha Técnica */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => handleLaunchProject(project.url)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_22px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                  >
                    <span>{language === 'es' ? 'Visitar Proyecto' : 'Launch Project'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors text-xs font-semibold"
                    title={language === 'es' ? 'Ficha Técnica' : 'Project Details'}
                  >
                    <Code2 className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state if search returns nothing */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 px-4 glass-card rounded-2xl max-w-lg mx-auto border border-white/10">
            <Search className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">
              {language === 'es' ? 'No se encontraron proyectos' : 'No projects found'}
            </h4>
            <p className="text-xs text-zinc-400 mb-4">
              {language === 'es' 
                ? 'Intenta con otro término o limpia los filtros de búsqueda.' 
                : 'Try another search term or reset category filters.'}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors"
            >
              {language === 'es' ? 'Restablecer Filtros' : 'Reset Filters'}
            </button>
          </div>
        )}

        {/* Quick Developer / Admin Helper Card */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block">
                {language === 'es' ? 'Configuración Rápida de Proyectos' : 'Quick Project Configuration'}
              </span>
              <span>
                {language === 'es' 
                  ? 'Puedes añadir o cambiar logos y URLs de tus proyectos en ' 
                  : 'You can add or update logos and URLs for your projects in '}
                <code className="text-cyan-300 font-mono bg-zinc-900 px-1.5 py-0.5 rounded border border-white/5">
                  src/data/projectsConfig.js
                </code>
              </span>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-[11px] font-semibold whitespace-nowrap"
          >
            {language === 'es' ? 'Sumar Nuevo Proyecto' : 'Add New Project'}
          </button>
        </div>

        {/* Detailed Project Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#121217] border border-white/15 p-6 sm:p-8 shadow-2xl">
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative shrink-0">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${activeModalProject.logoColor || 'from-indigo-600 to-cyan-500'} p-[1.5px] shadow-xl`}>
                    <div className="w-full h-full bg-[#0c0d14] rounded-[14px] flex items-center justify-center">
                      <span className="font-mono font-black text-white text-lg tracking-wider">
                        {getProjectMonogram(activeModalProject.name)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#09090b] border border-white/20 shadow-md">
                    {getProjectGlyph(activeModalProject.category)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                      {language === 'es' ? activeModalProject.categoryLabelEs : activeModalProject.categoryLabelEn}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {activeModalProject.badge || 'Enterprise'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {activeModalProject.name}
                  </h3>
                  <span className="text-xs text-cyan-400 font-mono flex items-center gap-1 mt-0.5">
                    <Globe className="w-3 h-3" />
                    <span>{activeModalProject.url}</span>
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
                {language === 'es' ? activeModalProject.descriptionEs : activeModalProject.descriptionEn}
              </p>

              {/* Metrics */}
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5 flex items-center justify-between mb-5 font-mono text-xs">
                <span className="text-zinc-400">
                  {language === 'es' ? activeModalProject.metricLabelEs : activeModalProject.metricLabelEn}:
                </span>
                <span className="font-bold text-cyan-300 text-sm">
                  {activeModalProject.metricValue}
                </span>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                  {language === 'es' ? 'Tecnologías del Proyecto' : 'Project Tech Stack'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.techStack.map((tech, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-zinc-950 border border-white/10 text-zinc-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleLaunchProject(activeModalProject.url);
                    setActiveModalProject(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>{language === 'es' ? 'Abrir URL en Producción' : 'Launch Live URL'}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs"
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
