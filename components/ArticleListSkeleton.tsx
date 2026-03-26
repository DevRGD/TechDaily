import Skeleton from './ui/Skeleton';

export default function ArticleListSkeleton() {
  return (
    <div className="@container group relative flex flex-col gap-10 py-12 md:py-16 border-b border-border/60 px-4 -mx-4 overflow-hidden">
      <div className="grid grid-cols-12 gap-5 @md:gap-12 items-start">
        <div className="col-span-12 @[400px]:col-span-5 @[1024px]:col-span-4 aspect-video relative overflow-hidden rounded-sm border border-border/80 shadow-sm">
          <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        </div>
        <div className="col-span-12 @[400px]:col-span-7 @[1024px]:col-span-8 flex flex-col space-y-2 @md:space-y-4">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-full @md:h-8" />
            <Skeleton className="h-4 w-4/5 @md:h-8" />
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Skeleton className="h-4 w-full @md:h-5" />
            <Skeleton className="h-4 w-5/6 @md:h-5" />
          </div>

          <div className="hidden @[1024px]:block pt-4">
            <div className="relative z-20 flex flex-wrap items-center gap-x-6 gap-y-4 text-muted-foreground/40 w-full border-none pt-2">
              <div className="flex items-center shrink-0 gap-3">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-3 w-16" />
              </div>

              <div className="flex items-center shrink-0 mx-auto">
                <Skeleton className="h-3 w-24" />
              </div>

              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="@[1024px]:hidden w-full">
        <div className="relative z-20 flex flex-wrap items-center gap-x-6 gap-y-4 pt-6 text-muted-foreground/40 w-full border-t border-border/30">
          <div className="flex items-center shrink-0 gap-3">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-16" />
          </div>

          <div className="flex items-center shrink-0 mx-auto">
            <Skeleton className="h-3 w-24" />
          </div>

          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
