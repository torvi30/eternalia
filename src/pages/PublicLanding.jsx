import { useState } from 'react';
import GlowBackground from '../components/GlowBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import LocalDirectorySection from '../components/LocalDirectorySection';
import CompanyMarquee from '../components/CompanyMarquee';
import TrustAndSecurity from '../components/TrustAndSecurity';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import InvestorRelationsModal from '../components/InvestorRelationsModal';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

export default function PublicLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInvestorOpen, setIsInvestorOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#09090b] text-zinc-800 dark:text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-200 transition-colors duration-300">
      {/* Dynamic Background Atmosphere */}
      <GlowBackground />

      {/* Navigation Bar */}
      <Navbar 
        onOpenContact={() => setIsContactOpen(true)} 
        onOpenInvestors={() => setIsInvestorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow z-10">
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* Red de Empresas & Clientes - Marquee Infinito de Logos (Social Proof Inmediata) */}
        <CompanyMarquee />

        {/* Productos SaaS Disponibles - Posición Prioritaria Destacada */}
        <FeaturedProducts onOpenContact={() => setIsContactOpen(true)} />

        {/* Directorio Comercial Multi-Municipio & Promociones Activas */}
        <LocalDirectorySection onOpenContact={() => setIsContactOpen(true)} />

        {/* Soluciones, Seguridad & Confianza Empresarial */}
        <TrustAndSecurity />

        {/* Cierre / Llamado a la Acción */}
        <CallToAction onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Corporate Luxury Footer */}
      <Footer 
        onOpenContact={() => setIsContactOpen(true)} 
        onOpenInvestors={() => setIsInvestorOpen(true)}
      />

      {/* Investor & Partner Contact Dialog */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      {/* Drawer / Modal de Relación con Inversores */}
      <InvestorRelationsModal
        isOpen={isInvestorOpen}
        onClose={() => setIsInvestorOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Floating Instant WhatsApp Quotation Button */}
      <FloatingWhatsApp />
    </div>
  );
}
