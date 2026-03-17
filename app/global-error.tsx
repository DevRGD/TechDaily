'use client';

import Link from 'next/link'; // Added import for Link

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#f6f7f8] text-[#101822] font-sans">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl space-y-12">
            <div className="space-y-6">
              <p className="text-[#0f58bd] font-bold uppercase tracking-[0.2em] text-[10px]">
                Critical Interruption
              </p>
              <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight">
                A fatal error in the system architecture.
              </h1>
              <p className="text-lg leading-relaxed text-[#101822]/70 font-serif max-w-xl">
                The application encountered a terminal exception and cannot continue. Our system administrators have been notified of this critical failure.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => reset()}
                className="px-8 py-3 bg-primary text-primary-foreground font-sans uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-primary/90 transition-all text-center"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="px-8 py-3 border border-border font-sans uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-secondary transition-all text-center"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
