"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
 import { useSignOut } from "@/lib/use-sign-out";
import type { Category } from "@/lib/types";
type SessionUser = { name: string; email: string; image?: string | null };

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD-u-ca-beng", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function Avatar({ name, image }: { name?: string | null; image?: string | null }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={name ?? "avatar"} className="h-8 w-8 rounded-lg object-cover" />;
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-content">
      {name?.trim().charAt(0).toUpperCase() || "U"}
    </span>
  );
}

// function UserMenu() {
//   // const { data: session } = useSession();
//   // const handleSignOut = useSignOut();
function UserMenu({ user }: { user: SessionUser }) {
  const handleSignOut = useSignOut();
  
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // if (!session) return null;
  // const { user } = session;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-semibold transition hover:bg-base-content/10"
      >
        <Avatar name={user.name} image={user.image} />
        <span className="hidden max-w-32 truncate sm:inline">{user.name}</span>
        <ChevronDownIcon className="h-3 w-3 text-base-content/60" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg"
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-base-content/70">{user.email}</p>
          </div>
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-base-200"
          >
            👤 আমার প্রোফাইল
          </Link>
          <button
            type="button"
            role="menuitem"
            // onClick={() => {
            //   setOpen(false);
            //   handleSignOut();
            // }}
            onClick={async () => {
  await handleSignOut();
  setOpen(false);
}}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-error transition hover:bg-error/10"
          >
            ↩ সাইন আউট
          </button>
          {/* <button
  type="button"
  role="menuitem"
  onClick={async () => {
    await handleSignOut(); // sign out first
    setOpen(false);        // then close the menu
  }}
  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-error transition hover:bg-error/10"
>
  ↩ সাইন আউট
</button> */}
        </div>
      )}
    </div>
  );
}

// export default function Navbar({ categories }: { categories: Category[] }) {
//   const { data: session, isPending } = useSession();
//   const pathname = usePathname();
export default function Navbar({
  categories,
  initialUser,
}: {
  categories: Category[];
  initialUser: SessionUser | null;
}) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

  // While the browser check is loading, trust what the server already knew.
  const user: SessionUser | null = isPending ? initialUser : (session?.user ?? null);

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Row 1 — logo + auth */}
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-2" aria-label="বাজার দর — হোম">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
              🛒
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-bold">বাজার দর</span>
              <span className="block text-xs text-base-content/60" suppressHydrationWarning>
                {getBanglaDate()}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {/* {isPending ? (
              <div className="skeleton h-10 w-28 rounded-lg" aria-label="লোড হচ্ছে" />
            ) : session ? (
              <UserMenu />
            ) : ( */}
            {user ? (
  <UserMenu user={user} />
) : (
              <>
                <Link href="/signin" className="btn btn-outline btn-sm h-10 min-h-10 border-base-content text-sm font-semibold hover:bg-base-content/10 hover:text-base-content">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm h-10 min-h-10 text-sm font-semibold">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Row 2 — category links */}
        {categories.length > 0 && (
          <nav aria-label="ক্যাটাগরি" className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-3">
            <ul className="flex min-w-max gap-1 lg:min-w-0 lg:flex-wrap">
              {categories.map((cat) => {
                const active = pathname === `/category/${cat.slug}`;
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 text-xs font-semibold transition ${
                        active
                          ? "border-primary bg-primary text-primary-content"
                          : "border-transparent hover:border-base-content/15 hover:bg-base-content/10"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      {cat.nameBn}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}