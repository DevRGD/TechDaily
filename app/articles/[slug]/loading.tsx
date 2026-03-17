import Skeleton from '@/components/ui/Skeleton';

export default function ArticleLoading() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <article className="container mx-auto max-w-7xl px-4 py-16 md:py-24 space-y-12">
          <div className="space-y-8 w-full">
            <div className="space-y-4">
              <Skeleton className="h-12 md:h-16 w-full" />
              <Skeleton className="h-12 md:h-16 w-3/4" />
            </div>

            <div className="border-l-2 border-primary/10 pl-6 md:pl-8">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="aspect-video relative overflow-hidden rounded-sm border border-border bg-muted/30">
              <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
            </div>

            <div className="relative z-20 flex flex-wrap items-center gap-x-6 gap-y-4 py-6 border-y border-border/50">
              <div className="flex items-center gap-x-6 gap-y-2 flex-wrap min-w-0">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-24" />
                </div>
                <span className="opacity-30 shrink-0 text-muted-foreground">•</span>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <span className="opacity-30 shrink-0 text-muted-foreground">•</span>
                <Skeleton className="h-4 w-24" />
                <span className="opacity-30 shrink-0 text-muted-foreground">•</span>
                <Skeleton className="h-4 w-20" />
                <span className="opacity-30 shrink-0 text-muted-foreground">•</span>
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>

          <section className="pt-24 space-y-12 border-t border-border">
            <Skeleton className="h-10 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <Skeleton className="aspect-video w-full" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="aspect-video w-full" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
