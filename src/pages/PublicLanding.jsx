import { useState } from 'react';
import GlowBackground from '../components/GlowBackground';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import ProjectsShowcase from '../components/ProjectsShowcase';
import QuoteEngine from '../components/QuoteEngine';
import DirectoryDemo from '../components/DirectoryDemo';
import TechSpecs from '../components/TechSpecs';
import InfrastructureStatus from '../components/InfrastructureStatus';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';
import InvestorRelationsModal from '../components/InvestorRelationsModal';

export default function PublicLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInvestorOpen, setIsInvestorOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Dynamic Background Atmosphere */}
      <GlowBackground />

      {/* Navigation Bar */}
      <Navbar 
        onOpenContact={() => setIsContactOpen(true)} 
        onOpenInvestors={() => setIsInvestorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow z-10">
        <Hero 
          onOpenContact={() => setIsContactOpen(true)}
          onExploreClick={(e) => {
            e.preventDefault();
            scrollToSection('ecosistema');
          }}
          onDemoClick={(e) => {
            e.preventDefault();
            scrollToSection('directorio');
          }}
        />

        <BentoGrid onOpenContact={() => setIsContactOpen(true)} />

        <ProjectsShowcase onOpenContact={() => setIsContactOpen(true)} />

        {/* 3. Cotizador Interactivo de Soluciones */}
        <QuoteEngine />

        {/* 5. Directorio Hiperlocal con Transacciones en Vivo */}
        <DirectoryDemo onOpenContact={() => setIsContactOpen(true)} />

        {/* Especificaciones Corporativas */}
        <TechSpecs />

        {/* 2. Dashboard de Estado de Servidores en Vivo (Uptime 99.99%) */}
        <InfrastructureStatus />

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

      {/* 4. Drawer / Modal de Relación con Inversores */}
      <InvestorRelationsModal
        isOpen={isInvestorOpen}
        onClose={() => setIsInvestorOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </div>
  );
}
