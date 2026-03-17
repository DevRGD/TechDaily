'use client';

import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';

export default function AdvertisePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="space-y-4 mb-20 text-left">
            <Typography variant="caption" className="text-primary font-bold">
              Partnerships
            </Typography>
            <Typography variant="h1" className="uppercase text-left">
              Advertise with TechDaily
            </Typography>
            <Typography variant="lead" className="max-w-2xl text-left">
              Reach a premium audience of decision-makers, innovators, and technical leaders at the frontiers of the
              digital economy.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <Typography variant="h3" className="text-left">
                  Our Audience
                </Typography>
                <div className="space-y-4">
                  {[
                    '500k+ Monthly unique visitors',
                    '70% Business decision makers',
                    'Averaging 8 minutes session duration',
                    'Highly engaged newsletter subscribers',
                  ].map((stat) => (
                    <div key={stat} className="flex gap-4 items-center">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                      <Typography variant="body">{stat}</Typography>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Typography variant="h3" className="text-left">
                  Advertising Options
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { title: 'Display Ads', desc: 'High-visibility banners across our core listing pages.' },
                    { title: 'Sponsorships', desc: 'Exclusive placement within our premium newsletters.' },
                    { title: 'Native Content', desc: 'Collaborative storytelling with our editorial standards.' },
                    { title: 'Podcasts', desc: 'Audio placements in our weekly analysis shows.' },
                  ].map((opt) => (
                    <div key={opt.title} className="space-y-2 p-6 bg-secondary/30 rounded-sm border border-border">
                      <Typography variant="h4" className="text-left">
                        {opt.title}
                      </Typography>
                      <Typography variant="body-sm">{opt.desc}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-background border border-border p-10 rounded-sm shadow-xl space-y-8 sticky top-32">
              <div className="space-y-4">
                <Typography variant="h2" className="text-left">
                  Request Media Kit
                </Typography>
                <Typography variant="body-sm">
                  Submit your details and our partnerships team will reach out with our latest metrics and pricing.
                </Typography>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="w-full bg-secondary/50 border border-border rounded-lg p-3 outline-none focus:border-primary"
                  placeholder="Full Name"
                />
                <input
                  className="w-full bg-secondary/50 border border-border rounded-lg p-3 outline-none focus:border-primary"
                  placeholder="Work Email"
                />
                <input
                  className="w-full bg-secondary/50 border border-border rounded-lg p-3 outline-none focus:border-primary"
                  placeholder="Company Name"
                />
                <textarea
                  className="w-full bg-secondary/50 border border-border rounded-lg p-3 outline-none focus:border-primary h-32"
                  placeholder="Tell us about your campaign goals..."
                />
                <Button className="w-full py-6 uppercase tracking-widest font-bold">Request Access</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
