import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-neutral-100 selection:bg-neutral-800 selection:text-white font-sans antialiased">
      {/* Top Header / Navigation */}
      <header className="w-full max-w-5xl mx-auto px-6 py-8 flex justify-between items-center border-b border-neutral-900">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-mono font-bold tracking-wider text-neutral-200 group-hover:border-neutral-700 transition-colors">
            DJ
          </div>
          <div className="text-sm font-semibold tracking-wider uppercase text-neutral-300 group-hover:text-white transition-colors">
            DJ Tech NYC
          </div>
        </a>

        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] tracking-wide text-neutral-400">All systems operational</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 pt-16 pb-24 w-full">
        {/* Hero Section */}
        <section className="mb-20 max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
            Software Lab & Digital Studio
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-6 leading-[1.15]">
            Building purposeful digital products, web platforms, and utilities.
          </h1>
          <p className="text-base text-neutral-400 leading-relaxed font-normal">
            Independent software design, distributed web architecture, and modern apps built for performance and scale. Headquartered in New York, built for anywhere.
          </p>
        </section>

        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-neutral-900">
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Featured Products & Services
          </h2>
        </div>

        {/* Minimalist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: StreetPark NYC */}
          <a
            href="https://park.djtechnyc.com/"
            className="group block bg-neutral-950 hover:bg-neutral-900/60 border border-neutral-900 hover:border-neutral-700/80 rounded-xl p-6 sm:p-8 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-11 h-11 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 p-0.5 group-hover:border-neutral-700 transition-colors">
                <img src="/favicon.png" alt="StreetPark NYC" className="w-full h-full object-contain rounded-md" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 group-hover:text-white transition-colors">
                <span>Live app</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                StreetPark NYC
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                Real-time street parking intelligence platform. Interprets complex NYC DOT regulations, Alternate Side Parking (ASP) sweeping schedules, and ParkNYC Muni-Meter zones across all five boroughs.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-900/80 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">
                park.djtechnyc.com
              </span>
              <span className="text-neutral-600">Free Civic Tool</span>
            </div>
          </a>

          {/* Card 2: Web Production & Services */}
          <a
            href="mailto:info@djtechnyc.com?subject=Web%20Development%20%26%20Hosting%20Inquiry%20-%20DJ%20Tech%20NYC&body=Hi%20DJ%20Tech%20NYC%2C%0A%0AI'm%20interested%20in%20discussing%20a%20web%20development%20or%20hosting%20project.%0A%0AProject%20Overview%3A%0A-%20Type%20of%20site%2Fapp%3A%0A-%20Target%20timeline%3A%0A-%20Any%20specific%20features%20or%20integrations%3A%0A%0ABest%20regards%2C%0A"
            className="group block bg-neutral-950 hover:bg-neutral-900/60 border border-neutral-900 hover:border-neutral-700/80 rounded-xl p-6 sm:p-8 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-11 h-11 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-300 group-hover:border-neutral-700 group-hover:text-white transition-colors">
                <Mail className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 group-hover:text-white transition-colors">
                <span>Inquiries</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Web Architecture & Development
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                Modern responsive web engineering, bespoke custom domain architectures, CDN edge deployments, and high-availability serverless infrastructure for businesses and creators.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-900/80 flex items-center justify-between text-xs font-mono text-neutral-500">
              <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">
                info@djtechnyc.com
              </span>
              <span className="text-neutral-600">Available on Request</span>
            </div>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-8 border-t border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
        <div>
          © {new Date().getFullYear()} DJ Tech NYC. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://park.djtechnyc.com"
            className="hover:text-neutral-300 transition-colors"
          >
            StreetPark NYC
          </a>
          <a
            href="mailto:info@djtechnyc.com"
            className="hover:text-neutral-300 transition-colors"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};
