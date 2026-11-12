export default function ProductLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="skeleton h-5 w-56" />

      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 md:flex-row">
        <div className="flex flex-1 items-center gap-4">
          <div className="skeleton h-20 w-20 rounded-2xl" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-8 w-48" />
            <div className="skeleton h-4 w-32" />
            <div className="skeleton h-4 w-64" />
          </div>
        </div>
        <div className="skeleton h-32 w-full md:w-40" />
      </div>

      <div className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="skeleton h-6 w-40" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-24" />
          ))}
        </div>
        <div className="skeleton h-6 w-56" />
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-11 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}