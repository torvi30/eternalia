import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, MessageSquare, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export default function CallToAction({ onOpenContact }) {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-indigo-950/40 via-zinc-900/60 to-zinc-950/80 border border-indigo-500/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(99,102,241,0.15)] text-center overflow-hidden">
          
          {/* Subtle neon ring in background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-500/20 blur-3xl pointer-events-none rounded-full" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.ctaSection.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 max-w-2xl mx-auto">
            {t.ctaSection.title}
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            {t.ctaSection.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.ctaSection.buttonContact}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-sm font-medium transition-colors"
            >
              <span>{t.ctaSection.buttonPartner}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
