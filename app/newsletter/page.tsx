'use client';

import Typography from '@/components/ui/Typography';
import NewsletterForm from '@/components/NewsletterForm';

export default function NewsletterPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="space-y-6 mb-24 text-left border-b border-border pb-16">
            <Typography variant="caption" className="text-primary font-bold uppercase tracking-widest">
              Newsletter
            </Typography>
            <Typography variant="h1" className="uppercase text-left tracking-tighter">
              Subscription Center.
            </Typography>
            <Typography variant="lead" className="max-w-4xl text-left opacity-70 italic font-serif">
              Subscribe to the briefings, change your subscription type, or securely unsubscribe.
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="py-12 bg-secondary/20 rounded-sm p-8 md:p-12 border border-border">
              <NewsletterForm />
            </div>

            <div className="grid grid-cols-1 gap-12 text-left">
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
          </div>
        </section>
      </main>
    </div>
  );
}
