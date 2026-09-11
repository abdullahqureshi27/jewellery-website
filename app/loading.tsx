/**
 * Server Component: Loading skeleton displayed while fetching data.
 */

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-[#E8E2D7]" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#C5A059] animate-spin" />
      </div>
      <p className="font-serif text-lg tracking-[0.2em] uppercase text-[#0D1117] animate-pulse">
        Aurelia Atelier
      </p>
      <p className="text-xs text-[#5C6270] tracking-widest uppercase mt-1">
        Polishing Fine Jewels...
      </p>
    </div>
  );
}
