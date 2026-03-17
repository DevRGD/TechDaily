'use client';

import Typography from '@/components/ui/Typography';
import NewsletterForm from '@/components/NewsletterForm';

export default function NewsletterPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-4xl px-4 py-16 md:py-32 text-center space-y-12">
          <div className="inline-flex items-center justify-center size-20 bg-primary/10 rounded-full text-primary mb-4">
            <span className="material-symbols-outlined text-4xl">mail</span>
          </div>

          <div className="space-y-6">
            <Typography variant="h1" className="text-5xl md:text-7xl">
              The Pulse of Innovation.
            </Typography>
            <Typography variant="lead" className="max-w-2xl mx-auto">
              Join 500,000+ tech leaders for our weekly briefing on AI, hardware, and the digital economy.
            </Typography>
          </div>

          <div className="py-12 bg-secondary/20 rounded-3xl p-8 md:p-16 border border-border">
            <NewsletterForm className="mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-3xl font-bold">bolt</span>
              <Typography variant="h4">Real-time Signals</Typography>
              <Typography variant="body-sm">
                Daily updates on market shifts and emerging technologies before they hit the main feed.
              </Typography>
            </div>
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-3xl font-bold">analytics</span>
              <Typography variant="h4">Deep Dives</Typography>
              <Typography variant="body-sm">
                Weekly analytical reports on the structural impact of major tech developments.
              </Typography>
            </div>
            <div className="space-y-4">
              <span className="material-symbols-outlined text-primary text-3xl font-bold">verified</span>
              <Typography variant="h4">Expert Curations</Typography>
              <Typography variant="body-sm">
                Hand-picked reading list from our editorial team to help you navigate the noise.
              </Typography>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
