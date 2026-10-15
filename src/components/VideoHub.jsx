import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getVideos, defaultVideos } from '../services/videoService';
import { 
  Play, 
  Video, 
  X, 
  Eye, 
  Clock, 
  ChevronRight
} from 'lucide-react';

export default function VideoHub() {
  const { language } = useLanguage();
  const [videos, setVideos] = useState(defaultVideos);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchVids = async () => {
      const data = await getVideos();
      if (isMounted && data) {
        setVideos(data);
      }
    };
    fetchVids();

    const handleUpdate = () => {
      fetchVids();
    };
    window.addEventListener('eternalia_videos_updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('eternalia_videos_updated', handleUpdate);
    };
  }, []);

  const categories = [
    { id: 'all', label: language === 'es' ? 'Todas las Demos' : 'All Demos' },
    { id: 'workforce', label: 'Workforce OS' },
    { id: 'commerce', label: 'Commerce Cloud' },
    { id: 'ventures', label: language === 'es' ? 'Industrial IoT' : 'Industrial IoT' },
    { id: 'directories', label: language === 'es' ? 'Red Territorial' : 'Territorial Mesh' },
  ];

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      if (selectedCategory === 'all') return true;
      return v.category === selectedCategory;
    });
  }, [videos, selectedCategory]);

  // Convert youtube url to embed format if applicable
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <section id="demos" className="relative py-24 sm:py-32 scroll-mt-20 border-t border-white/[0.06] bg-[#07070a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'es' ? 'VIDEO HUB & DEMOS CORPORATIVAS' : 'VIDEO HUB & CORPORATE DEMOS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === 'es' ? 'Nuestras Plataformas en Acción' : 'Our Platforms in Action'}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {language === 'es'
              ? 'Conoce a través de demostraciones en video la arquitectura de Workforce OS, los micro-frontends de alta velocidad y la telemetría satelital.'
              : 'Explore through video walkthroughs the architecture of Workforce OS, sub-second storefronts, and mission-critical telematics.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 font-medium ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-500/40'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5 hover:border-white/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveVideoModal(item)}
              className="group rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transform hover:-translate-y-1"
            >
              {/* Thumbnail with Glass and Play Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white flex items-center gap-1 font-bold">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{item.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 text-[10px] font-mono text-indigo-300 font-bold">
                  {item.badge}
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-600/90 group-hover:bg-cyan-500 text-white flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.6)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all transform group-hover:scale-110">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Eye className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{item.views} vistas</span>
                  </span>
                  <span className="text-indigo-400 font-semibold group-hover:text-cyan-300 flex items-center gap-1 transition-colors">
                    <span>Ver Demo</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-zinc-950 border border-white/15 rounded-3xl p-4 sm:p-6 shadow-2xl text-left overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black mb-4 border border-white/10 shadow-2xl">
              <iframe
                src={getEmbedUrl(activeVideoModal.videoUrl)}
                title={activeVideoModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Meta Info */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold uppercase">
                  {activeVideoModal.categoryLabel || activeVideoModal.category}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  ⏱ {activeVideoModal.duration}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {activeVideoModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {activeVideoModal.description}
              </p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
