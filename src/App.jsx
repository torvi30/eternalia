import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import GlowBackground from './components/GlowBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import DirectoryDemo from './components/DirectoryDemo';
import TechSpecs from './components/TechSpecs';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

function MainLayout() {
  const [isContactOpen, setIsContactOpen] = useState(false);

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
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

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

        <DirectoryDemo />

        <TechSpecs />

        <CallToAction onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Corporate Luxury Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Investor & Partner Contact Dialog */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}
