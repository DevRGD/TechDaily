'use client';

import Typography from '@/components/ui/Typography';

export default function PrivacyPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="space-y-4 mb-20 text-left">
            <Typography variant="caption" className="text-primary font-bold">
              Legal
            </Typography>
            <Typography variant="h1" className="uppercase text-left">
              Privacy Policy
            </Typography>
            <Typography variant="lead" className="text-left">
              Last Updated: March 2026. Your privacy and trust are paramount to our mission as a news organization.
            </Typography>
          </div>

          <div className="journal-body space-y-8">
            <Typography variant="h2" className="text-left">
              1. Information Collection
            </Typography>
            <p>
              TechDaily collects minimal data necessary to provide our premium reading experience. This includes
              information you provide when subscribing to our newsletter or contacting our newsroom.
            </p>
            <Typography variant="h2" className="text-left">
              2. How We Use Data
            </Typography>
            <p>
              We use your information strictly for editorial communications, technical optimization of the platform, and
              occasional partnership announcements. We do not sell your personal data to third parties.
            </p>
            <Typography variant="h2" className="text-left">
              3. Newsroom Cookies
            </Typography>
            <p>
              Our platform uses functional cookies to remember theme preferences and maintain session state. For more
              details, see our individual Cookie Policy page.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
