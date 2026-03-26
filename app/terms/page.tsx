'use client';

import Typography from '@/components/ui/Typography';

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="space-y-4 mb-20 text-left">
            <Typography variant="caption" className="text-primary font-bold">
              Legal
            </Typography>
            <Typography variant="h1" className="uppercase text-left">
              Terms of Service
            </Typography>
            <Typography variant="lead" className="text-left">
              Last Updated: March 2026. Please read these terms carefully before using the TechDaily network.
            </Typography>
          </div>

          <div className="journal-body space-y-8">
            <Typography variant="h2" className="text-left">
              1. Acceptance of Terms
            </Typography>
            <p>
              By accessing or using the TechDaily website, you agree to be bound by these Terms of Service and all
              applicable laws and regulations.
            </p>
            <Typography variant="h2" className="text-left">
              2. Intellectual Property
            </Typography>
            <p>
              The content published on TechDaily, including investigative reports, technical analysis, and original
              imagery, is protected by copyright law. Unauthorized distribution or commercial use is strictly
              prohibited.
            </p>
            <Typography variant="h2" className="text-left">
              3. Editorial Integrity
            </Typography>
            <p>
              While we strive for perfect accuracy, the fast-paced nature of technical journalism may occasionally
              require corrections. We maintain a public corrections log as part of our commitment to transparency.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
