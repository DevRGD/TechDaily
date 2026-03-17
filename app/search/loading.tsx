import Skeleton from '@/components/ui/Skeleton';
import ArticleListSkeleton from '@/components/ArticleListSkeleton';

export default function SearchLoading() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="space-y-6 mb-24 text-left border-b border-border pb-16">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 md:h-16 w-1/2" />
            <Skeleton className="h-6 w-2/3" />
          </div>

          <div className="space-y-12">
            <div className="w-full pb-12">
              <div className="flex flex-col">
                {[1, 2, 3].map((i) => (
                  <ArticleListSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
