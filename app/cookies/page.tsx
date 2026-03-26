'use client';

import Typography from '@/components/ui/Typography';

export default function CookiesPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="space-y-4 mb-20 text-left">
            <Typography variant="caption" className="text-primary font-bold">
              Legal
            </Typography>
            <Typography variant="h1" className="uppercase text-left">
              Cookies Policy
            </Typography>
            <Typography variant="lead" className="text-left">
              Last Updated: March 2026. How we use digital identifiers to improve your reading experience.
            </Typography>
          </div>

          <div className="journal-body space-y-8">
            <Typography variant="h2" className="text-left">
              1. What are Cookies?
            </Typography>
            <p>
              Cookies are small text files stored on your device that help us recognize you when you return to our
              newsroom.
            </p>
            <Typography variant="h2" className="text-left">
              2. Essential Cookies
            </Typography>
            <p>
              We use essential cookies to maintain your theme preference (Light/Dark/System) and ensure secure
              navigation across our platform. These cannot be disabled.
            </p>
            <Typography variant="h2" className="text-left">
              3. Analytics
            </Typography>
            <p>
              We use anonymized analytics to understand which stories resonate most with our readers, allowing us to
              better prioritize investigative resources.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
