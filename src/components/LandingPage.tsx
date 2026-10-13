import React from 'react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#090c10] text-[#f0f4f8] selection:bg-[#00f0ff] selection:text-[#090c10]">
      {/* Dynamic Background Glows */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% -20%, rgba(0, 240, 255, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 85% 85%, rgba(255, 224, 0, 0.06) 0%, transparent 50%)
          `
        }}
      />

      {/* Top Header / Navigation */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 text-[#f0f4f8] group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#101622] to-[#1b263b] border border-[#00f0ff] flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-transform group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
          </div>
          <div className="text-lg font-black tracking-wider font-mono">
            DJ TECH <span className="text-[#ffe000]">NYC</span>
          </div>
        </a>

        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00e676] bg-[rgba(0,230,118,0.1)] border border-[rgba(0,230,118,0.25)] px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#00e676] shadow-[0_0_6px_#00e676] animate-pulse" />
          Systems Online
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-6 pt-10 pb-20 w-full">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] mb-4">
            Launchpad for <br />
            <span className="bg-gradient-to-r from-[#00f0ff] via-[#4db8ff] to-[#70a6ff] bg-clip-text text-transparent">
              Digital Solutions
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#8a99ad] max-w-2xl mx-auto mb-6 leading-relaxed">
            Custom web deployments, civic platforms, and tech solutions built and hosted under the DJ Tech NYC network.
          </p>
          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-mono text-xs bg-white/[0.04] border border-[#1b263b] px-3 py-1 rounded-md text-[#8a99ad]">
              Web Services
            </span>
            <span className="font-mono text-xs bg-white/[0.04] border border-[#1b263b] px-3 py-1 rounded-md text-[#8a99ad]">
              Civic Tech
            </span>
            <span className="font-mono text-xs bg-white/[0.04] border border-[#1b263b] px-3 py-1 rounded-md text-[#8a99ad]">
              Cloud Infrastructure
            </span>
            <span className="font-mono text-xs bg-white/[0.04] border border-[#1b263b] px-3 py-1 rounded-md text-[#8a99ad]">
              NYC Applications
            </span>
          </div>
        </section>

        {/* Solutions Section Header */}
        <div className="flex justify-between items-end mb-6 border-b border-[#1b263b] pb-3">
          <h2 className="text-lg font-bold text-[#f0f4f8] tracking-tight">
            Active & Planned Solutions
          </h2>
        </div>

        {/* Grid of Solutions (Without Trade Solutions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Live Platform - StreetPark NYC */}
          <a
            href="https://park.djtechnyc.com/"
            className="group relative bg-[#101622] border border-[#00f0ff]/40 hover:border-[#00f0ff] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,240,255,0.2)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#00f0ff]/10 transition-colors" />
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/30">
                  Live Platform
                </span>
                <span className="text-2xl">🅿️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
                StreetPark NYC
              </h3>
              <p className="text-sm text-[#8a99ad] leading-relaxed">
                Real-time New York City street parking rules, Alternate Side Parking (ASP) street sweeping tracker, ParkNYC Muni-Meter rates, and tow-away warnings.
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/[0.06] font-mono text-xs">
              <span className="text-[#00f0ff] flex items-center gap-1.5 font-bold">
                park.djtechnyc.com
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
              <span className="text-xs text-[#8a99ad]">Open App</span>
            </div>
          </a>

          {/* Card 2: Web Production & Services */}
          <div className="bg-[#101622] border border-[#1b263b] hover:border-gray-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/[0.05] text-[#8a99ad] border border-white/10">
                  Services
                </span>
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Web Development & Hosting
              </h3>
              <p className="text-sm text-[#8a99ad] leading-relaxed">
                Modern responsive web platforms, custom domain configurations, high-performance edge computing, and lightweight serverless web applications.
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/[0.06] font-mono text-xs">
              <span className="text-[#8a99ad]">Available on request</span>
              <a 
                href="mailto:info@djtechnyc.com" 
                className="text-gray-400 hover:text-[#00f0ff] transition-colors"
              >
                Inquire →
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1b263b] py-8 px-6 text-center text-xs text-[#8a99ad]">
        <p>
          © 2026 <strong className="text-white">DJ Tech NYC</strong>. All rights reserved. •{' '}
          <a href="mailto:info@djtechnyc.com" className="hover:text-[#00f0ff] transition-colors">
            Contact / Inquiries
          </a>
        </p>
      </footer>
    </div>
  );
};
