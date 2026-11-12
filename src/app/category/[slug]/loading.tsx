import { ProductGridSkeleton } from "@/components/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton h-10 w-10 rounded-lg" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-7 w-28" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end rounded-2xl border border-base-300 bg-base-100 p-4">
          <div className="skeleton h-8 w-44" />
        </div>
        <div className="skeleton h-4 w-40" />
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}