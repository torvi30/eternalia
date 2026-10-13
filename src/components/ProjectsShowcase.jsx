import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projectsConfig } from '../data/projectsConfig';
import { 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Globe2, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Search, 
  X,
  Code2,
  SlidersHorizontal,
  Compass,
  Zap,
  Truck
} from 'lucide-react';

export default function ProjectsShowcase({ onOpenContact }) {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = [
    { id: 'all', label: language === 'es' ? 'Todos los Proyectos' : 'All Projects' },
    { id: 'directories', label: language === 'es' ? 'Redes Territoriales' : 'Territorial Meshes' },
    { id: 'commerce', label: language === 'es' ? 'Comercio & Frontends' : 'Commerce & Frontends' },
    { id: 'services', label: language === 'es' ? 'Workforce OS' : 'Workforce OS' },
    { id: 'ventures', label: language === 'es' ? 'Soluciones Industriales' : 'Industrial Ventures' },
  ];

  const filteredProjects = useMemo(() => {
    return projectsConfig.filter((proj) => {
      const matchesCat = selectedCategory === 'all' || proj.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const tagline = language === 'es' ? proj.taglineEs : proj.taglineEn;
      const desc = language === 'es' ? proj.descriptionEs : proj.descriptionEn;
      const matchesText = 
        proj.name.toLowerCase().includes(query) ||
        tagline.toLowerCase().includes(query) ||
        desc.toLowerCase().includes(query) ||
        proj.techStack.some((tech) => tech.toLowerCase().includes(query));

      return matchesCat && matchesText;
    });
  }, [selectedCategory, searchQuery, language]);

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
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'PORTAFOLIO & PLATAFORMAS EN VIVO' : 'LIVE VENTURES & PORTFOLIO'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'es' ? 'Proyectos Activos del Ecosistema' : 'Active Ecosystem Projects'}
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {language === 'es' 
              ? 'Explora las plataformas, frontends y despliegues tecnológicos que operan bajo el holding Eternalia. Cada solución cuenta con su URL en vivo, arquitectura dedicada y métricas de rendimiento.'
              : 'Explore the live platforms, frontends, and technological deployments running under the Eternalia holding. Each project features dedicated URLs, architecture, and live performance.'}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-panel rounded-2xl p-3 sm:p-4 border border-white/10 shadow-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'es' ? 'Buscar proyecto o tech...' : 'Search project or tech...'}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-zinc-950/80 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-cyan-500/60 transition-all"
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
                    {/* Project Logo: custom image OR styled monogram */}
                    <div className="flex items-center gap-3">
                      {project.logo ? (
                        <img 
                          src={project.logo} 
                          alt={project.name} 
                          className="w-11 h-11 rounded-2xl object-cover border border-white/10 shadow-md"
                        />
                      ) : (
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${project.logoColor || 'from-indigo-600 to-cyan-500'} p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.3)]`}>
                          <div className="w-full h-full bg-[#0d0d12] rounded-[14px] flex items-center justify-center font-extrabold text-white text-base">
                            {project.name.charAt(0)}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
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

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeModalProject.logoColor || 'from-indigo-600 to-cyan-500'} p-[1.5px]`}>
                  <div className="w-full h-full bg-[#0d0d12] rounded-[14px] flex items-center justify-center font-extrabold text-white text-lg">
                    {activeModalProject.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {activeModalProject.name}
                  </h3>
                  <span className="text-xs text-cyan-400 font-mono">
                    {activeModalProject.url}
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
