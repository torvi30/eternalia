import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  MessageCircle, 
  Star, 
  ExternalLink, 
  Phone, 
  Globe, 
  Navigation, 
  Compass, 
  Sparkles,
  X
} from 'lucide-react';

export default function DirectoryMap({ businesses, onSelectBusiness, language }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [activePinBusiness, setActivePinBusiness] = useState(null);

  // Center of Marinilla, Antioquia
  const MARINILLA_CENTER = [6.1725, -75.3340];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map if not already initialized
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: MARINILLA_CENTER,
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
      });

      // CartoDB Dark Matter - High-end sleek dark tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Add Zoom Control on top right with custom styling
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Category colors
    const categoryColors = {
      food: '#f59e0b',
      nursery: '#10b981',
      services: '#06b6d4',
      automotive: '#6366f1',
    };

    // Add glowing custom pin markers for each business
    businesses.forEach((biz) => {
      if (!biz.lat || !biz.lng) return;

      const pinColor = categoryColors[biz.category] || '#6366f1';

      // Create glowing HTML marker icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: `
          <div style="
            position: relative;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <!-- Pulsing outer ring -->
            <div style="
              position: absolute;
              inset: 0;
              border-radius: 9999px;
              background-color: ${pinColor};
              opacity: 0.25;
              animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <!-- Inner pin badge -->
            <div style="
              position: relative;
              width: 28px;
              height: 28px;
              border-radius: 9999px;
              background: #0d0d12;
              border: 2px solid ${pinColor};
              box-shadow: 0 0 15px ${pinColor}88;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffff;
              font-size: 11px;
              font-weight: 800;
              font-family: system-ui, sans-serif;
            ">
              ${biz.name.charAt(0)}
            </div>
          </div>
        `,
      });

      const marker = L.marker([biz.lat, biz.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActivePinBusiness(biz);
        map.flyTo([biz.lat, biz.lng], 16, { duration: 1.2 });
      });

      markersRef.current.push(marker);
    });

    return () => {
      // Cleanup on unmount
    };
  }, [businesses]);

  const handleCenterMarinilla = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(MARINILLA_CENTER, 14, { duration: 1 });
    }
  };

  const handleWhatsApp = (biz) => {
    const msg = language === 'es'
      ? `¡Hola! Conecté con ${biz.name} a través del Mapa Interactivo de Eternalia en Marinilla y deseo solicitar información.`
      : `Hello! I connected with ${biz.name} via the Eternalia Interactive Map in Marinilla and would like more info.`;
    window.open(`https://wa.me/${biz.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-[#09090b]">
      
      {/* Map Header Overlay Bar */}
      <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2">
        <div className="px-3.5 py-1.5 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/10 shadow-lg flex items-center gap-2 text-xs font-mono text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white">Marinilla, Antioquia</span>
          <span className="text-zinc-500">|</span>
          <span className="text-cyan-400">{businesses.length} {language === 'es' ? 'Nodos' : 'Nodes'}</span>
        </div>

        <button
          onClick={handleCenterMarinilla}
          className="p-2 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white hover:border-cyan-500/40 transition-colors shadow-lg cursor-pointer"
          title={language === 'es' ? 'Centrar en Marinilla' : 'Center on Marinilla'}
        >
          <Navigation className="w-4 h-4 text-cyan-400" />
        </button>
      </div>

      {/* Map Canvas Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-[520px] sm:h-[580px] z-0" 
      />

      {/* Interactive Bottom Business Preview Card (when a pin is clicked) */}
      {activePinBusiness && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-[1000] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-white/15 bg-zinc-950/95 backdrop-blur-xl shadow-2xl relative">
            <button
              onClick={() => setActivePinBusiness(null)}
              className="absolute top-3 right-3 p-1 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                {language === 'es' ? activePinBusiness.categoryLabelEs : activePinBusiness.categoryLabelEn}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 font-mono">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{activePinBusiness.rating}</span>
              </div>
            </div>

            <h4 className="text-base font-bold text-white mb-1">
              {activePinBusiness.name}
            </h4>

            <p className="text-xs text-zinc-400 mb-3 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{activePinBusiness.address}</span>
            </p>

            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => handleWhatsApp(activePinBusiness)}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              {activePinBusiness.websiteUrl && (
                <a
                  href={activePinBusiness.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-white/10"
                  title="Visitar Landing"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={() => onSelectBusiness(activePinBusiness)}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10"
                title="Ver Ficha Completa"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Footer Helper */}
      <div className="absolute bottom-4 left-4 z-[900] hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/5 text-[11px] font-mono text-zinc-400">
        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        <span>{language === 'es' ? 'Haz clic en cualquier nodo para ver detalles y contactar' : 'Click on any node to view details & contact'}</span>
      </div>

    </div>
  );
}
