import Skeleton from '@/components/ui/Skeleton';
import ArticleListSkeleton from '@/components/ArticleListSkeleton';

export default function Loading() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="group block relative overflow-hidden rounded-sm border border-border bg-background transition-all duration-500">
            <div className="flex flex-col space-y-0 relative">
              <div className="relative overflow-hidden aspect-video md:aspect-21/9 border-b border-border bg-muted/30">
                <Skeleton className="absolute inset-0 w-full h-full rounded-none opacity-50" />
              </div>

              <div className="p-8 md:p-12 lg:p-16 space-y-6 md:space-y-8 max-w-7xl mx-auto w-full">
                <div className="relative z-20 flex flex-wrap items-center gap-x-6 gap-y-4 pb-6 border-b border-border/50 w-full">
                  <div className="flex items-center shrink-0 gap-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="h-4 w-px bg-border/40 hidden sm:block shrink-0" />
                  <div className="flex items-center gap-2 shrink-0">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center shrink-0 mx-auto">
                    <Skeleton className="h-8 w-24" />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-muted-foreground/20">calendar_today</span>
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-muted-foreground/20">visibility</span>
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-muted-foreground/20">schedule</span>
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>

                <div className="space-y-6 w-full">
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
          <div className="space-y-20">
            <div className="group relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border">
              <Skeleton className="h-10 w-64 md:h-12 md:w-80" />
              <div className="flex items-center gap-3 mb-2 shrink-0">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="size-8 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-16">
                <div className="grid grid-cols-1 gap-16">
                  {[1, 2].map((i) => (
                    <ArticleListSkeleton key={i} />
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-4 space-y-16">
                <section className="bg-primary text-primary-foreground p-8 rounded-sm shadow-xl shadow-primary/20">
                  <div className="space-y-4">
                    <span className="material-symbols-outlined text-4xl opacity-50">mail</span>
                    <Skeleton className="h-8 w-3/4 bg-primary-foreground/20" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full bg-primary-foreground/20" />
                      <Skeleton className="h-4 w-5/6 bg-primary-foreground/20" />
                    </div>
                    <div className="space-y-3 pt-2">
                      <Skeleton className="w-full h-[46px] rounded-sm bg-primary-foreground/10" />
                      <Skeleton className="w-full h-[40px] rounded-sm bg-white/50" />
                    </div>
                    <div className="pt-2 flex justify-center">
                      <Skeleton className="h-3 w-48 bg-primary-foreground/20" />
                    </div>
                  </div>
                </section>
                <section className="bg-secondary/30 p-10 rounded-sm border border-border space-y-10">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <div className="space-y-8">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <Skeleton className="h-8 w-6" />
                        <div className="space-y-2 w-full">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-3 w-3/4 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
