"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[55vh] w-full max-w-lg flex-col items-center justify-center gap-3 px-4 text-center">
      <div className="text-6xl">⚠️</div>
      <h1 className="text-2xl font-bold">কিছু একটা সমস্যা হয়েছে</h1>
      <p className="text-base-content/70">দয়া করে আবার চেষ্টা করুন।</p>
      <button onClick={reset} className="btn btn-primary mt-3 h-10 min-h-10 text-sm font-semibold">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}