

import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";


export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?callbackUrl=/profile&reason=login-required");

  const { user } = session;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
      <header>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </header>

      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
        {user.image ? (
          
          <Image
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-2xl object-cover"
          />
        ) : (
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-3xl font-bold text-primary-content">
            {user.name?.trim().charAt(0).toUpperCase() || "U"}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-semibold">{user.name}</h2>
          <p className="truncate text-base text-base-content/70">{user.email}</p>
        </div>
        <SignOutButton />
      </div>

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

        <Link href="/profile/update" className="btn btn-primary mt-2 h-10 min-h-10 text-sm font-semibold sm:w-fit">
          ✏️ তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}