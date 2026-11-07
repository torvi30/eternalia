import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const { language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Default support WhatsApp phone number
  const whatsappNumber = '573147809921';

  const messageText = language === 'es'
    ? '¡Hola Eternalia! Quiero cotizar una solución digital para mi negocio (Software de Restaurantes / Directorio Comercial / Landing). ¿Me pueden brindar más información?'
    : 'Hello Eternalia! I want to request a quote for a digital solution for my business (Restaurant OS / Commercial Directory / Web Landing). Can you provide details?';

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

  // Show tooltip after 3 seconds on desktop
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside aria-label={language === 'es' ? 'Canal de WhatsApp' : 'WhatsApp Contact'} className="fixed bottom-6 right-6 z-40 flex items-end gap-3 select-none">
      
      {/* Interactive Tooltip Card */}
      {showTooltip && !isDismissed && (
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-black/10 dark:border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {language === 'es' ? '¿Cotizamos tu negocio? Chatea con nosotros' : 'Need a quick quote? Chat with us'}
          </a>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Cerrar notificación de WhatsApp"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Main Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={language === 'es' ? 'Chatear por WhatsApp para cotización inmediata' : 'Chat on WhatsApp for instant quote'}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.65)] transform hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Subtle pulsating outer ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        {/* Online Status Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-950 shadow-sm" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-white/20 text-white transform group-hover:rotate-12 transition-transform duration-300" />
      </a>

    </aside>
  );
}
