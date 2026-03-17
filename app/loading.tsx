import Skeleton from '@/components/ui/Skeleton';
import ArticleListSkeleton from '@/components/ArticleListSkeleton';

export default function Loading() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="group block relative overflow-hidden rounded-sm border border-border bg-background shadow-sm">
            <div className="flex flex-col space-y-0 relative">
              <div className="relative aspect-video md:aspect-21/9 border-b border-border bg-muted/30">
                <Skeleton className="absolute inset-0 w-full h-full rounded-none opacity-50" />
              </div>

              <div className="p-8 md:p-12 lg:p-16 space-y-8 md:space-y-12 max-w-7xl mx-auto w-full">
                <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between gap-y-6 pb-6 border-b border-border/50">
                  <div className="flex flex-wrap items-center gap-6">
                    <Skeleton className="h-8 w-24" />
                    <div className="h-4 w-px bg-border/40 hidden sm:block" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-6 h-6 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Skeleton className="h-4 w-48 hidden md:block" />
                  </div>
                </div>

                <div className="space-y-8 w-full">
                  <div className="space-y-4">
                    <Skeleton className="h-12 md:h-20 w-full" />
                    <Skeleton className="h-12 md:h-20 w-4/5" />
                  </div>
                  <div className="space-y-3 border-l-2 border-primary/10 pl-6 md:pl-8">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                    <Skeleton className="h-5 w-4/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
          <div className="space-y-12">
            <div className="flex items-center justify-between pb-8 border-b border-border">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-8 w-32 hidden sm:block" />
            </div>
            <div className="flex flex-col">
              {[1, 2].map((i) => (
                <ArticleListSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
