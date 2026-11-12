"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { GithubIcon, GoogleIcon } from "./Icons";

type Provider = "google" | "github";

/** Google + GitHub login (BetterAuth social providers). */
export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState<Provider | null>(null);

  const handle = async (provider: Provider) => {
    setLoading(provider);
    const { error } = await signIn.social({ provider, callbackURL });
    // On success the browser is redirected to the provider, so we only get here on failure.
    if (error) {
      toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে!");
      setLoading(null);
    }
  };

  const btn =
    "btn h-10 min-h-10 border-base-300 bg-base-100 text-sm font-semibold hover:bg-base-content/10";

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <button type="button" onClick={() => handle("google")} disabled={loading !== null} className={btn}>
        {loading === "google" ? <span className="loading loading-spinner loading-xs" /> : <GoogleIcon />}
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => handle("github")} disabled={loading !== null} className={btn}>
        {loading === "github" ? <span className="loading loading-spinner loading-xs" /> : <GithubIcon />}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}