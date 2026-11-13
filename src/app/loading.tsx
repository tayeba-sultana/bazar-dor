import { HeroSkeleton, ProductGridSkeleton } from "@/components/Skeleton";

export default function HomeLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-6">
      <HeroSkeleton />
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="skeleton h-7 w-40" />
          <ProductGridSkeleton count={3} />
        </div>
      ))}
    </div>
  );
}