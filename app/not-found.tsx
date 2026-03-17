import Link from 'next/link';
import Typography from '@/components/ui/Typography';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl space-y-12">
            <div className="space-y-6">
              <Typography variant="caption" className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                404 — Error
              </Typography>
              <h1 className="journal-heading-xl !text-5xl md:!text-7xl leading-tight">
                This article hasn&apos;t been written yet.
              </h1>
              <Typography variant="body" className="journal-body max-w-xl">
                The page you are looking for might have been moved, renamed, or is temporarily unavailable in our archives.
              </Typography>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-none font-black uppercase tracking-[0.2em] text-[11px] h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
              >
                Back to Edition
              </Link>
              <Link
                href="/articles"
                className="inline-flex items-center justify-center rounded-none font-black uppercase tracking-[0.15em] text-[11px] h-14 px-10 border border-border hover:bg-secondary transition-all"
              >
                Browse All Articles
              </Link>
            </div>
          </div>

          <div className="mt-32 w-full border-t border-border pt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="space-y-8">
                <Typography variant="caption" className="font-black text-foreground uppercase tracking-widest text-[11px]">
                  Top Categories
                </Typography>
                <div className="flex flex-col gap-4">
                  {['AI', 'Startups', 'Apps', 'Innovation'].map((cat) => (
                    <Link key={cat} href={`/categories/${cat.toLowerCase()}`} className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-between group">
                      {cat}
                      <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-all">arrow_forward</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <Typography variant="caption" className="font-black text-foreground uppercase tracking-widest text-[11px]">
                  Company
                </Typography>
                <div className="flex flex-col gap-4">
                  {['About', 'Contact', 'Newsletter', 'Advertise'].map((item) => (
                    <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-between group">
                      {item}
                      <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-all">arrow_forward</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <Typography variant="caption" className="font-black text-foreground uppercase tracking-widest text-[11px]">
                  Legal
                </Typography>
                <div className="flex flex-col gap-4">
                  {['Privacy', 'Terms', 'Cookies'].map((item) => (
                    <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm font-medium hover:text-primary transition-colors flex items-center justify-between group">
                      {item}
                      <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-all">arrow_forward</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
