'use client';

/**
 * Client Component: Hosts Sanity Studio embedded directly inside the Next.js app.
 * Requires client-side rendering for browser APIs, IndexedDB, and Studio interaction.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-50 h-screen w-screen overflow-hidden bg-white">
      <NextStudio config={config} />
    </div>
  );
}
