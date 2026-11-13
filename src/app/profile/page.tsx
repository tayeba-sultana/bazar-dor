"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useSignOut } from "@/lib/use-sign-out";

function ProfileSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
      <div className="flex flex-col gap-2">
        <div className="skeleton h-8 w-44" />
        <div className="skeleton h-4 w-64" />
      </div>
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-6">
        <div className="skeleton h-20 w-20 rounded-2xl" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="skeleton h-6 w-40" />
          <div className="skeleton h-4 w-56" />
        </div>
        <div className="skeleton h-10 w-28" />
      </div>
      <div className="skeleton h-40 w-full rounded-2xl" />
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const handleSignOut = useSignOut();

  if (isPending) return <ProfileSkeleton />;
  if (!session) return null; // src/proxy.ts already redirects guests

  const { user } = session;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
      <header>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>

      {/* Avatar + name + sign-out */}
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="h-20 w-20 rounded-2xl object-cover" />
        ) : (
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-3xl font-bold text-primary-content">
            {user.name?.trim().charAt(0).toUpperCase() || "U"}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-semibold">{user.name}</h2>
          <p className="truncate text-base text-base-content/70">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="btn btn-outline h-10 min-h-10 border-error text-sm font-semibold text-error hover:border-error hover:bg-error hover:text-error-content"
        >
          ↩ সাইন আউট
        </button>
      </div>

      {/* Info + update button */}
      <section className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 className="text-lg font-semibold">তথ্য</h2>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-base-200 p-4">
            <dt className="text-xs text-base-content/60">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="rounded-xl bg-base-200 p-4">
            <dt className="text-xs text-base-content/60">ইমেইল</dt>
            <dd className="break-all font-medium">{user.email}</dd>
          </div>
        </dl>

        {/* C3 — goes to a separate route */}
        <Link href="/profile/update" className="btn btn-primary mt-2 h-10 min-h-10 text-sm font-semibold sm:w-fit">
          ✏️ তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}