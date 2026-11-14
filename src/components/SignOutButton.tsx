"use client";

import { useSignOut } from "@/lib/use-sign-out";

export default function SignOutButton() {
  const handleSignOut = useSignOut();

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="btn btn-outline h-10 min-h-10 border-error text-sm font-semibold text-error hover:border-error hover:bg-error hover:text-error-content"
    >
      ↩ সাইন আউট
    </button>
  );
}