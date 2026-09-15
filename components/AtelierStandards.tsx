import { ShieldCheck, Gem, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Server Component: The Atelier Standards (Materials, Hallmarks & Authenticity Spotlight).
 * Educates the customer on why 925 Pure Silver and GRA Moissanite provide diamond-level luxury without compromise.
 */

export default function AtelierStandards() {
  return (
    <section className="py-24 bg-[#0A0D14] text-white relative overflow-hidden" aria-label="Atelier Standards & Materials">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-[#CBD5E1] px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Purity &amp; Gemological Excellence</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wider text-white mb-4">
            The Standards of Pure Luxury
          </h2>
          <p className="text-sm sm:text-base text-[#8B949E] leading-relaxed">
            Every creation crafted at our master atelier adheres to strict metallurgical and gemological standards,
            combining timeless silversmithing techniques with modern precision.
          </p>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: 925 Sterling Silver */}
          <div className="bg-[#131720] border border-white/10 hover:border-slate-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0A0D14] border border-white/20 flex items-center justify-center text-[#CBD5E1] mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#CBD5E1] uppercase tracking-[0.2em] block mb-2">
                Precious Metal Core
              </span>
              <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-white mb-4">
                925 Solid Sterling Silver
              </h3>
              <p className="text-xs text-[#8B949E] leading-relaxed mb-6">
                Never brass, copper, or hollow alloys. Our jewellery is cast in solid 92.5% pure sterling silver,
                hallmarked for international authenticity and hypoallergenic comfort.
              </p>
            </div>

            <ul className="space-y-3 pt-6 border-t border-white/10 text-xs text-[#C5CAD4]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                <span>Stamped 925 purity hallmark</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                <span>Zero nickel or allergic irritants</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                <span>Solid, substantial heirloom weight</span>
              </li>
            </ul>
          </div>

          {/* Card 2: GRA Moissanite */}
          <div className="bg-[#131720] border border-white/20 hover:border-slate-300 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between relative group">
            {/* Highlight Tag */}
            <span className="absolute -top-3 right-8 bg-white text-[#0F172A] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
              Diamond Alternative
            </span>

            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0A0D14] border border-white/20 flex items-center justify-center text-[#CBD5E1] mb-6 group-hover:scale-110 transition-transform">
                <Gem className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#CBD5E1] uppercase tracking-[0.2em] block mb-2">
                Certified Brilliance
              </span>
              <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-white mb-4">
                GRA D VVS1 Moissanite
              </h3>
              <p className="text-xs text-[#8B949E] leading-relaxed mb-6">
                Possessing a 2.65 refractive index, our Moissanite produces more rainbow fire and dispersion than mined
                diamonds. Guaranteed never to cloud, scratch, or lose its optical sparkle.
              </p>
            </div>

            <ul className="space-y-3 pt-6 border-t border-white/10 text-xs text-[#C5CAD4]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                <span>Passes thermal diamond pen testers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                <span>Includes scannable GRA certificate card</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                <span>9.25 Mohs hardness for everyday wear</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Rhodium Plating */}
          <div className="bg-[#131720] border border-white/10 hover:border-slate-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0A0D14] border border-white/20 flex items-center justify-center text-[#CBD5E1] mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-[#CBD5E1] uppercase tracking-[0.2em] block mb-2">
                Surface Perfection
              </span>
              <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-white mb-4">
                Anti-Tarnish Rhodium Plating
              </h3>
              <p className="text-xs text-[#8B949E] leading-relaxed mb-6">
                Coated in a multi-micron layer of rare platinum-family Rhodium. This creates an impenetrable barrier
                preventing oxidation, darkening, and scratches for decades.
              </p>
            </div>

            <ul className="space-y-3 pt-6 border-t border-white/10 text-xs text-[#C5CAD4]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                <span>White-gold mirror finish and lustre</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                <span>Complimentary lifetime re-polishing</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#CBD5E1] shrink-0" />
                <span>Impermeable to moisture and perfumes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Optical Comparison Bar */}
        <div className="bg-[#131720] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider mb-1">
              Optical Fire Comparison
            </h4>
            <p className="text-xs text-[#8B949E]">
              Why fine Moissanite is the discerning choice of modern jewellery collectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center w-full md:w-auto">
            <div className="border-l border-white/10 pl-6 first:border-0 first:pl-0">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#CBD5E1] block">2.65</span>
              <span className="text-[10px] text-[#8B949E] uppercase tracking-wider">Refractive Index</span>
            </div>
            <div className="border-l border-white/10 pl-6">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#CBD5E1] block">0.104</span>
              <span className="text-[10px] text-[#8B949E] uppercase tracking-wider">Fire &amp; Dispersion</span>
            </div>
            <div className="border-l border-white/10 pl-6 col-span-2 sm:col-span-1">
              <span className="text-xl sm:text-2xl font-bold font-serif text-[#CBD5E1] block">9.25</span>
              <span className="text-[10px] text-[#8B949E] uppercase tracking-wider">Mohs Hardness</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
