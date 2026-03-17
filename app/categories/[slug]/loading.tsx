import Skeleton from '@/components/ui/Skeleton';
import ArticleListSkeleton from '@/components/ArticleListSkeleton';

export default function CategoryLoading() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="space-y-6 mb-24 text-left border-b border-border pb-16">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 md:h-16 w-1/2" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full md:w-3/4" />
              <Skeleton className="h-5 w-2/3 md:w-1/2" />
            </div>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-12 w-full">
              {[1, 2, 3, 4, 5].map((i) => (
                <ArticleListSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
