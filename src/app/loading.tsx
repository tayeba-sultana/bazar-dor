// import { HeroSkeleton, ProductGridSkeleton } from "@/components/Skeleton";

// export default function HomeLoading() {
//   return (
//     <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-6">
//       <HeroSkeleton />
//       {[0, 1].map((i) => (
//         <div key={i} className="flex flex-col gap-3">
//           <div className="skeleton h-7 w-40" />
//           <ProductGridSkeleton count={3} />
//         </div>
//       ))}
//     </div>
//   );
// }

export default function HomeLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-3"
    >
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm text-base-content/70">পণ্যের দাম লোড হচ্ছে...</p>
    </div>
  );
}