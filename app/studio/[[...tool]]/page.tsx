'use client';

/**
 * Client Component: Hosts Sanity Studio embedded directly inside the Next.js app.
 * Requires client-side rendering for browser APIs, IndexedDB, and Studio interaction.
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  return (
    <div className="h-screen w-full">
      <NextStudio config={config} />
    </div>
  );
}
