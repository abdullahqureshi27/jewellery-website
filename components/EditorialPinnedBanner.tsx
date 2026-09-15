'use client';

import Image from 'next/image';

/**
 * Client Component: Editorial Pinned Fullscreen Banner (Zanvari-inspired).
 * Pure high-definition image showcase with the pinned curtain-reveal scroll effect.
 * Displays crystal-clear photography with no text overlays or dark filters.
 */

export default function EditorialPinnedBanner() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0D1117]" aria-label="Editorial Showcase Banner">
      {/* Editorial Showcase Image - 100% crystal clear, sharp, unclouded */}
      <Image
        src="/products/ff-zircon-locket-set.jpeg"
        alt="Handcrafted 925 Pure Sterling Silver Jewellery by FFZever"
        fill
        sizes="100vw"
        priority
        quality={95}
        className="object-cover object-center"
      />
    </section>
  );
}

