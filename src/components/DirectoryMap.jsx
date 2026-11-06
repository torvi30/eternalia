import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../context/ThemeContext';
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
  Activity,
  X
} from 'lucide-react';

// Center of Marinilla, Antioquia
const MARINILLA_CENTER = [6.1725, -75.3340];

export default function DirectoryMap({ businesses, onSelectBusiness, language }) {
  const { isDark } = useTheme();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef([]);
  const [activePinBusiness, setActivePinBusiness] = useState(null);

  // Live activity simulation
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);

  const activityEvents = [
    {
      biz: "Restaurante El Portal de la Huerta",
      textEs: "Nuevo pedido online verificado (+4 platos típicos)",
      textEn: "New online order verified (+4 local dishes)",
      timeEs: "Hace 8s",
      timeEn: "8s ago",
      type: "order"
    },
    {
      biz: "Vivero El Rosal",
      textEs: "Consulta directa por WhatsApp iniciada para catálogo floral",
      textEn: "Direct WhatsApp chat initiated for floral catalog",
      timeEs: "Hace 24s",
      timeEn: "24s ago",
      type: "chat"
    },
    {
      biz: "Taller Mecánico Marinilla",
      textEs: "Diagnóstico telemático de frenos completado y cargado al historial",
      textEn: "Brake telematics diagnostic completed and logged",
      timeEs: "Hace 41s",
      timeEn: "41s ago",
      type: "iot"
    },
    {
      biz: "Barbería & Estilo Elite",
      textEs: "Liquidación instantánea en escrow y garantía digital aprobada",
      textEn: "Instant escrow payout & digital warranty validated",
      timeEs: "Hace 58s",
      timeEn: "58s ago",
      type: "payment"
    },
    {
      biz: "Café Colonial Marinilla",
      textEs: "Reserva de mesa confirmada con código QR interactivo",
      textEn: "Table reservation confirmed via dynamic QR code",
      timeEs: "Hace 1m",
      timeEn: "1m ago",
      type: "qr"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveActivityIndex((prev) => (prev + 1) % activityEvents.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activityEvents.length]);

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

      // Zoom Control on top right
      L.control.zoom({ position: 'topright' }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Dynamic Tile Layer update based on theme
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    const tileUrl = isDark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

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
      const innerBg = isDark ? '#0d0d12' : '#ffffff';
      const innerTextColor = isDark ? '#ffffff' : '#09090b';

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
            <div style="
              position: absolute;
              inset: 0;
              border-radius: 9999px;
              background-color: ${pinColor};
              opacity: 0.25;
              animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <div style="
              position: relative;
              width: 28px;
              height: 28px;
              border-radius: 9999px;
              background: ${innerBg};
              border: 2px solid ${pinColor};
              box-shadow: 0 0 15px ${pinColor}88;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${innerTextColor};
              font-family: monospace;
              font-weight: 800;
              font-size: 11px;
            ">
              ${biz.name ? biz.name.substring(0, 1).toUpperCase() : '•'}
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
  }, [businesses, isDark]);

  const handleCenterMarinilla = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(MARINILLA_CENTER, 14, { duration: 1 });
    }
  };

  const handleWhatsApp = (biz) => {
    const phone = biz.whatsapp || biz.phone || '573000000000';
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(
      language === 'es'
        ? `Hola ${biz.name}, los encontré en el Directorio Digital de Marinilla de Eternalia. Quisiera más información sobre sus servicios.`
        : `Hello ${biz.name}, I found you on the Marinilla Digital Directory on Eternalia. I would like more information.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-slate-100 dark:bg-[#09090b]">
      
      {/* Map Header Overlay Bar */}
      <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2">
        <div className="px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-zinc-950/85 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg flex items-center gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-zinc-900 dark:text-white">Marinilla, Antioquia</span>
          <span className="text-zinc-400 dark:text-zinc-500">|</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{businesses.length} {language === 'es' ? 'Nodos' : 'Nodes'}</span>
        </div>

        <button
          onClick={handleCenterMarinilla}
          className="p-2 rounded-xl bg-white/90 dark:bg-zinc-950/85 backdrop-blur-md border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-cyan-500/40 transition-colors shadow-lg cursor-pointer"
          title={language === 'es' ? 'Centrar en Marinilla' : 'Center on Marinilla'}
        >
          <Navigation className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        </button>
      </div>

      {/* Floating Real-Time Activity Notification Stream */}
      <div className="absolute top-16 left-4 right-4 sm:left-auto sm:right-14 sm:top-4 z-[1000] pointer-events-auto max-w-sm animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="p-3 rounded-2xl bg-white/95 dark:bg-zinc-950/90 border border-black/10 dark:border-white/15 backdrop-blur-xl shadow-xl dark:shadow-2xl">
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE MESH ACTIVITY</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">
              {language === 'es' ? activityEvents[activeActivityIndex].timeEs : activityEvents[activeActivityIndex].timeEn}
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-900 dark:text-white leading-snug">
                {language === 'es' ? activityEvents[activeActivityIndex].textEs : activityEvents[activeActivityIndex].textEn}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5 truncate">
                📍 {activityEvents[activeActivityIndex].biz}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-[520px] sm:h-[580px] z-0" 
      />

      {/* Interactive Bottom Business Preview Card */}
      {activePinBusiness && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-[1000] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-black/10 dark:border-white/15 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl relative">
            <button
              onClick={() => setActivePinBusiness(null)}
              className="absolute top-3 right-3 p-1 rounded-lg bg-slate-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25">
                {language === 'es' ? activePinBusiness.categoryLabelEs : activePinBusiness.categoryLabelEn}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 dark:text-amber-400 font-mono">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500 dark:text-amber-400" />
                <span>{activePinBusiness.rating}</span>
              </div>
            </div>

            <h4 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
              {activePinBusiness.name}
            </h4>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{activePinBusiness.address}</span>
            </p>

            <div className="flex items-center gap-2 pt-2 border-t border-black/10 dark:border-white/10">
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
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-cyan-600 dark:text-cyan-400 border border-black/10 dark:border-white/10"
                  title="Visitar Landing"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={() => onSelectBusiness(activePinBusiness)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-black/10 dark:border-white/10 cursor-pointer"
                title="Ver Ficha Completa"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Map Footer Helper */}
      <div className="absolute bottom-4 left-4 z-[900] hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border border-black/5 dark:border-white/5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        <span>{language === 'es' ? 'Haz clic en cualquier nodo para ver detalles y contactar' : 'Click on any node to view details & contact'}</span>
      </div>

    </div>
  );
}
