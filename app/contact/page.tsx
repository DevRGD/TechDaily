'use client';

import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
          <div className="space-y-4 text-left">
            <Typography variant="h1" className="uppercase text-left">
              Get In Touch
            </Typography>
            <Typography variant="lead" className="text-left">
              Have a tip, a question, or a business inquiry? Our team is ready to listen.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-2">
                <Typography variant="caption" className="text-primary font-bold">
                  Inquiries
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-muted-foreground">mail</span>
                    <Typography variant="body">editorial@techdaily.com</Typography>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-muted-foreground">call</span>
                    <Typography variant="body">+91 (123) 456-7890</Typography>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Typography variant="caption" className="text-primary font-bold">
                  Location
                </Typography>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-muted-foreground">location_on</span>
                  <Typography variant="body">
                    12 Park Street
                    <br />
                    Kolkata, West Bengal 700016
                    <br />
                    India
                  </Typography>
                </div>
              </div>
            </div>

            <form
              className="bg-secondary/30 p-8 rounded-sm border border-border space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:ring-primary outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                    <input
                      className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:ring-primary outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                  <select className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:ring-primary outline-none appearance-none">
                    <option>Editorial Tip</option>
                    <option>Advertising Inquiry</option>
                    <option>General Support</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                  <textarea
                    className="w-full bg-background border border-border rounded-sm p-3 text-sm focus:ring-primary outline-none min-h-[120px]"
                    placeholder="Your message here..."
                  />
                </div>
              </div>
              <Button className="w-full uppercase tracking-widest font-bold font-sans">Send Message</Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
