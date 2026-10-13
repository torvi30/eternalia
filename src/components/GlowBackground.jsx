import React from 'react';

export default function GlowBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top subtle radial spotlight */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.55) 0%, rgba(6, 182, 212, 0.25) 45%, transparent 70%)'
        }}
      />

      {/* Ambient side glows */}
      <div 
        className="absolute top-1/3 -left-48 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 70%, transparent 80%)'
        }}
      />
      
      <div 
        className="absolute top-2/3 -right-48 w-[650px] h-[650px] rounded-full blur-[170px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(6, 182, 212, 0.15) 60%, transparent 80%)'
        }}
      />

      {/* Subtle bottom glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] rounded-full blur-[150px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
        }}
      />

      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-mesh-grid opacity-40 mix-blend-screen" />
    </div>
  );
}
