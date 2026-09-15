'use client';

/**
 * Client Component: Global error boundary for recovering from runtime errors.
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Showcase runtime error:', error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[#FAF0F0] border border-[#F2C0C0] flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-8 h-8 text-[#D93838]" />
      </div>
      <h2 className="font-serif text-2xl font-bold uppercase tracking-wider text-[#0D1117] mb-2">
        Unable to Load Jewels
      </h2>
      <p className="text-sm text-[#5C6270] mb-8 leading-relaxed">
        We encountered a momentary issue retrieving the showcase pieces. Please refresh or return to the main gallery.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-[#0D1117] text-white hover:bg-[#CBD5E1] hover:text-[#0F172A] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-[#E2E8F0] hover:border-[#0D1117] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#12141A] transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
