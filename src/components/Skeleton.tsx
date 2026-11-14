
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-xl" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-3 w-16" />
          <div className="skeleton h-6 w-20" />
        </div>
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 rounded-3xl border border-base-300 bg-base-100 px-6 py-8 md:flex-row md:px-10 md:py-10">
      <div className="flex w-full flex-1 flex-col gap-3">
        <div className="skeleton h-7 w-44 rounded-full" />
        <div className="skeleton h-10 w-full max-w-lg" />
        <div className="skeleton h-4 w-full max-w-xl" />
        <div className="skeleton h-4 w-3/4 max-w-md" />
        <div className="skeleton mt-2 h-10 w-32" />
      </div>
      <div className="skeleton h-52 w-56 md:w-78.75" />
    </div>
  );
}

export function AuthCardSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-2">
        <div className="skeleton h-8 w-40" />
        <div className="skeleton h-4 w-full" />
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6">
        <div className="skeleton h-10 w-full" />
        <div className="skeleton h-10 w-full" />
        <div className="skeleton h-10 w-full" />
      </div>
    </div>
  );
}