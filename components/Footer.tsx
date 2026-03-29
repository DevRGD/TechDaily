import Link from 'next/link';
import Typography from './ui/Typography';

const FOOTER_SECTIONS = [
  {
    title: 'Categories',
    links: [
      { label: 'Social', href: '/categories/social' },
      { label: 'AI', href: '/categories/ai' },
      { label: 'Hardware', href: '/categories/hardware' },
    ],
  },
  {
    title: 'Journal',
    links: [
      { label: 'Latest News', href: '/' },
      { label: 'Articles Feed', href: '/articles' },
      { label: 'Newsletters', href: '/newsletter' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Advertising', href: '/advertise' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border pt-20 pb-12">
      <div className="container mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="size-8 border-4 border-primary rounded-[6px] shrink-0 shadow-sm shadow-primary/20" />
              <Typography variant="h4" as="h2" className="text-[44px] uppercase tracking-tighter leading-none pt-1">
                TechDaily
              </Typography>
            </Link>
            <Typography variant="body-sm" className="max-w-sm">
              Reporting on the frontiers of technology, science, and the future of humanity since 2012. Authority on AI,
              policy, and digital innovation.
            </Typography>
            <div className="flex gap-4">
              {['rss_feed', 'alternate_email', 'share', 'public'].map((icon) => (
                <button
                  key={icon}
                  className="size-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                >
                  <span className="material-symbols-outlined text-xl">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-6">
                <Typography variant="caption" className="text-foreground">
                  {section.title}
                </Typography>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography variant="caption" className="normal-case font-medium">
            TechDaily 💌 Architected by DevRGD
          </Typography>
          <div className="flex flex-wrap justify-center gap-8 items-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookies
            </Link>
            <span className="text-border">|</span>
            <span className="text-muted-foreground/50">News Summarized by AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
