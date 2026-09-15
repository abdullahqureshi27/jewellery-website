'use client';

import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Ruler, Sparkles, HelpCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { getWhatsAppLink } from '@/lib/whatsapp';

/**
 * Client Component: Interactive Ring Sizing & Measurement Guide Modal.
 * Eliminates buyer sizing anxiety with an international size chart and step-by-step instructions.
 */

interface RingSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SizeRow {
  pk: string;
  us: string;
  diameter: string;
  circumference: string;
}

const SIZE_CHART: SizeRow[] = [
  { pk: 'Size 10', us: 'US 5', diameter: '15.7 mm', circumference: '49.3 mm' },
  { pk: 'Size 12', us: 'US 6', diameter: '16.5 mm', circumference: '51.8 mm' },
  { pk: 'Size 14', us: 'US 7', diameter: '17.3 mm', circumference: '54.4 mm' },
  { pk: 'Size 16', us: 'US 8', diameter: '18.1 mm', circumference: '57.0 mm' },
  { pk: 'Size 18', us: 'US 9', diameter: '19.0 mm', circumference: '59.5 mm' },
  { pk: 'Size 20', us: 'US 10', diameter: '19.8 mm', circumference: '62.1 mm' },
  { pk: 'Size 22', us: 'US 11', diameter: '20.6 mm', circumference: '64.6 mm' },
];

export default function RingSizeModal({ isOpen, onClose }: RingSizeModalProps) {
  // Lenis smooth scroll isolation
  useEffect(() => {
    const win = typeof window !== 'undefined' ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }) : null;
    if (isOpen) {
      win?.__lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      win?.__lenis?.start();
      document.body.style.overflow = '';
    }

    return () => {
      win?.__lenis?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-lenis-prevent="true"
        className="max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain bg-[#0A0D14] text-white border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl"
      >
        <DialogHeader className="text-left mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#CBD5E1] tracking-[0.2em] uppercase mb-1">
            <Ruler className="w-4 h-4" />
            <span>Atelier Sizing Guide</span>
          </div>
          <DialogTitle className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            Find Your Perfect Ring Fit
          </DialogTitle>
          <DialogDescription className="text-xs text-[#8B949E] mt-1">
            Follow our 3-step measuring method or match your existing ring against our Pakistani &amp; US size chart.
          </DialogDescription>
        </DialogHeader>

        {/* 3 Simple Steps Guide */}
        <div className="bg-[#131720] border border-white/10 rounded-xl p-5 mb-6">
          <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#CBD5E1]" />
            <span>How to Measure at Home in 60 Seconds</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#C5CAD4]">
            <div className="flex flex-col">
              <span className="w-5 h-5 rounded-full bg-white/10 text-white font-bold flex items-center justify-center text-[10px] mb-1.5 border border-white/15">
                1
              </span>
              <p className="leading-relaxed">
                Wrap a narrow strip of paper or string snug around the base of your intended finger.
              </p>
            </div>

            <div className="flex flex-col">
              <span className="w-5 h-5 rounded-full bg-white/10 text-white font-bold flex items-center justify-center text-[10px] mb-1.5 border border-white/15">
                2
              </span>
              <p className="leading-relaxed">
                Mark the exact point where the paper overlaps with a fine pen, keeping it flat.
              </p>
            </div>

            <div className="flex flex-col">
              <span className="w-5 h-5 rounded-full bg-white/10 text-white font-bold flex items-center justify-center text-[10px] mb-1.5 border border-white/15">
                3
              </span>
              <p className="leading-relaxed">
                Lay it flat against a millimeter ruler to find your circumference and match below.
              </p>
            </div>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="border border-white/10 rounded-xl overflow-hidden mb-6">
          <div className="bg-[#131720] grid grid-cols-4 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#CBD5E1] border-b border-white/10">
            <span>PK / Asia</span>
            <span>US Standard</span>
            <span>Inside Diameter</span>
            <span>Circumference</span>
          </div>

          <div className="divide-y divide-white/10 text-xs">
            {SIZE_CHART.map((row) => (
              <div
                key={row.pk}
                className="grid grid-cols-4 px-4 py-3 text-white hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white">{row.pk}</span>
                <span className="text-[#8B949E]">{row.us}</span>
                <span className="text-[#8B949E] tabular-nums">{row.diameter}</span>
                <span className="text-[#CBD5E1] font-semibold tabular-nums">{row.circumference}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Assistance Footer */}
        <div className="bg-[#131720] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <HelpCircle className="w-5 h-5 text-[#CBD5E1] shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Still not 100% sure of your size?</p>
              <p className="text-[11px] text-[#8B949E]">
                Place an existing ring on a ruler, photograph it, and send it to our gemologist.
              </p>
            </div>
          </div>

          <a
            href={getWhatsAppLink('Hello Faraz Faheem Atelier, I need help confirming my ring size for a jewellery order.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#CBD5E1] text-[#0F172A] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shrink-0 cursor-pointer group"
          >
            <FaWhatsapp className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
