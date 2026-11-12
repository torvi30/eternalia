import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Coins, 
  Headphones, 
  CheckCircle2, 
  Lock,
  Server
} from 'lucide-react';

export default function TrustAndSecurity() {
  const { language } = useLanguage();

  const trustPillars = [
    {
      icon: Coins,
      badge: language === 'es' ? 'Cero Comisiones' : '0% Commission Fee',
      title: language === 'es' ? '100% de tu Ganancia Va Directa a Ti' : '100% of Your Revenue Stays with You',
      desc: language === 'es'
        ? 'A diferencia de las plataformas tradicionales que retienen entre el 18% y 30% por pedido, con Eternalia el dinero entra directamente a tu cuenta bancaria, Nequi o caja en cada transacción.'
        : 'Unlike traditional delivery platforms that take 18% to 30% per order, with Eternalia your money flows directly into your bank account or register with zero commission cuts.',
      stat: '0% FEE',
      statLabel: language === 'es' ? 'Cobro por comanda' : 'Per-order fee'
    },
    {
      icon: Server,
      badge: language === 'es' ? 'Disponibilidad 99.9%' : '99.9% Cloud Uptime',
      title: language === 'es' ? 'Infraestructura en la Nube que Nunca se Cae' : 'High-Availability Cloud Infrastructure',
      desc: language === 'es'
        ? 'Servidores de alto rendimiento con balanceo de carga automático. Si tu restaurante o comercio se llena en horas pico de fin de semana, tu menú digital y comandas responden en milisegundos.'
        : 'Dedicated edge cloud architecture with automatic load balancing ensuring lightning-fast load times even during peak holiday weekend rushes.',
      stat: '99.9%',
      statLabel: language === 'es' ? 'SLA de estabilidad' : 'Stability SLA'
    },
    {
      icon: Lock,
      badge: language === 'es' ? 'Cifrado de Extremo a Extremo' : 'End-to-End Encryption',
      title: language === 'es' ? 'Privacidad y Custodia Segura de tus Datos' : 'Data Privacy & Strict Customer Custody',
      desc: language === 'es'
        ? 'Conexiones seguras bajo protocolo HTTPS con certificados TLS activos. La información de tus clientes, historial de pedidos y base comercial te pertenece exclusivamente a ti.'
        : 'Enterprise-grade encryption protecting customer records, order history, and business catalogs with zero third-party data sharing.',
      stat: 'SSL/TLS',
      statLabel: language === 'es' ? 'Cifrado bancario' : 'Bank-grade security'
    },
    {
      icon: Headphones,
      badge: language === 'es' ? 'Soporte Local Continuo' : 'Direct Human Support',
      title: language === 'es' ? 'Acompañamiento Técnico Real y Personalizado' : 'Personal Technical Onboarding & Care',
      desc: language === 'es'
        ? 'Te ayudamos a cargar tu carta, configurar las impresoras térmicas para cocina, activar tu perfil en el directorio y entrenar a tu personal para que operes sin dolores de cabeza.'
        : 'Hands-on setup assistance for your menu items, thermal kitchen printers, directory verification, and staff workflow training.',
      stat: '< 2 hrs',
      statLabel: language === 'es' ? 'Respuesta prioritaria' : 'Priority response'
    }
  ];

  return (
    <section id="seguridad" className="py-12 sm:py-20 relative overflow-hidden bg-slate-50 dark:bg-[#07080b] border-t border-black/5 dark:border-white/5 transition-colors duration-300 scroll-mt-20">
      
      {/* Elegant ambient aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-cyan-500/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-cyan-400 text-xs font-bold tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            <span>{language === 'es' ? 'RESPALDO, ESTÁNDARES Y CONFIANZA' : 'SECURITY, STANDARDS & TRUST'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3 sm:mb-4 text-balance">
            {language === 'es' 
              ? 'Tu Negocio Seguro, Estable y 100% Bajo tu Control' 
              : 'Your Business Safe, Always Online & Truly Yours'}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed text-balance px-2">
            {language === 'es'
              ? 'Construimos tecnología para que vendas más y te preocupes menos. Sin comisiones abusivas, sin caídas inesperadas y con respaldo técnico de primer nivel.'
              : 'Designed to help you sell more without headaches. No commission cuts, zero unexpected outages, and direct human engineering backing your operations.'}
          </p>
        </div>

        {/* 4 Pillars Grid (Azul Elegante y Tecnológico) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative group p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900/70 border border-black/10 dark:border-white/10 hover:border-blue-500/40 backdrop-blur-xl shadow-sm hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-[1.5px] shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-white dark:bg-[#0c0d14] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-lg font-black text-zinc-900 dark:text-white block leading-none">
                        {pillar.stat}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        {pillar.statLabel}
                      </span>
                    </div>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/25 mb-3">
                    {pillar.badge}
                  </span>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{language === 'es' ? 'Garantía activa en todos los planes' : 'Included in all software deployments'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

