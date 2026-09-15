/**
 * Server Component: Loading skeleton displayed while fetching data.
 */

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-[#E2E8F0]" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#0F172A] animate-spin" />
      </div>
      <p className="font-serif text-lg tracking-[0.1em] uppercase text-[#0F172A] animate-pulse">
        FFZever Atelier
      </p>
      <p className="text-xs text-[#5C6270] tracking-widest uppercase mt-1">
        Polishing Fine Jewels...
      </p>
    </div>
  );
}
