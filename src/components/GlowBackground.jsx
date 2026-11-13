import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function GlowBackground() {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-500 select-none">
      {/* Top subtle radial spotlight - optimized for mobile GPU & Retina screens */}
      <div 
        className={`absolute -top-24 sm:-top-40 left-1/2 -translate-x-1/2 w-[350px] sm:w-[900px] h-[300px] sm:h-[550px] rounded-full blur-[60px] sm:blur-[140px] transition-opacity duration-500 ${
          isDark ? 'opacity-25' : 'opacity-35'
        }`}
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.55) 0%, rgba(6, 182, 212, 0.25) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.18) 45%, transparent 70%)'
        }}
      />

      {/* Ambient side glows - hidden on mobile to conserve GPU VRAM */}
      <div 
        className={`hidden sm:block absolute top-1/3 -left-48 w-[600px] h-[600px] rounded-full blur-[160px] transition-opacity duration-500 ${
          isDark ? 'opacity-15' : 'opacity-25'
        }`}
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 70%, transparent 80%)'
            : 'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(59, 130, 246, 0.1) 70%, transparent 80%)'
        }}
      />
      
      <div 
        className={`hidden sm:block absolute top-2/3 -right-48 w-[650px] h-[650px] rounded-full blur-[170px] transition-opacity duration-500 ${
          isDark ? 'opacity-15' : 'opacity-25'
        }`}
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(6, 182, 212, 0.15) 60%, transparent 80%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(6, 182, 212, 0.1) 60%, transparent 80%)'
        }}
      />

      {/* Subtle bottom glow - hidden on mobile */}
      <div 
        className={`hidden sm:block absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] rounded-full blur-[150px] transition-opacity duration-500 ${
          isDark ? 'opacity-15' : 'opacity-20'
        }`}
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
        }}
      />

      {/* Subtle architectural grid pattern without mix-blend-mode for WebKit iOS performance */}
      <div className="absolute inset-0 bg-mesh-grid opacity-35 dark:opacity-20" />
    </div>
  );
}
