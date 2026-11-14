export default function HomeLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-3"
    >
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm text-base-content/70">লোড হচ্ছে...</p>
    </div>
  );
}