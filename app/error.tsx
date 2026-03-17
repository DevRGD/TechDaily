'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Typography from '@/components/ui/Typography';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-[80vh] flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl space-y-12">
            <div className="space-y-6">
              <Typography variant="caption" className="text-destructive font-black uppercase tracking-[0.2em] text-[10px]">
                System Interruption
              </Typography>
              <h1 className="journal-heading-xl !text-5xl md:!text-7xl leading-tight">
                An unexpected shift in the digital landscape.
              </h1>
              <Typography variant="body" className="journal-body max-w-xl">
                We encountered a technical anomaly while fetching this article. Our engineering team has been alerted to the disruption.
              </Typography>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center rounded-none font-black uppercase tracking-[0.2em] text-[11px] h-14 px-10 bg-[#0f58bd] text-white hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20"
              >
                Attempt Recovery
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-none font-black uppercase tracking-[0.15em] text-[11px] h-14 px-10 border border-border hover:bg-secondary transition-all"
              >
                Return Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
