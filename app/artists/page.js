import { Suspense } from 'react';
import ArtistsClient from './ArtistsClient';

export const metadata = {
  title: 'Browse Artists | Artistly',
  description: 'Filter and find talented artists by category, location, and budget.',
};

export default function ArtistsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ArtistsClient />
    </Suspense>
  );
}
