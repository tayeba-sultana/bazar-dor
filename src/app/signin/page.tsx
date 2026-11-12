"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import FormField from "@/components/FormField";
import SocialButtons from "@/components/SocialButtons";
import { AuthCardSkeleton } from "@/components/Skeleton";
import { signIn } from "@/lib/auth-client";

// only allow same-site paths (avoid open redirects)
const safePath = (p: string | null) => (p && p.startsWith("/") && !p.startsWith("//") ? p : "/");

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = safePath(params.get("callbackUrl"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast for protected-route redirects (set by src/proxy.ts)
  const toasted = useRef(false);
  useEffect(() => {
    if (params.get("reason") === "login-required" && !toasted.current) {
      toasted.current = true;
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।");
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("সঠিক ইমেইল দিন।");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে!");
      return;
    }
    toast.success("সাইন ইন সফল হয়েছে!");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <FormField
          label="ইমেইল"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormField
          label="পাসওয়ার্ড"
          name="password"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading} className="btn btn-primary h-10 min-h-10 text-sm font-semibold">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>

        <div className="flex items-center gap-4 text-xs">
          <span className="h-px flex-1 bg-base-content/10" />
          অথবা
          <span className="h-px flex-1 bg-base-content/10" />
        </div>

        <SocialButtons callbackURL={callbackUrl} />

        <p className="text-center text-sm text-base-content/70">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

// useSearchParams() needs a Suspense boundary for production builds
export default function SignInPage() {
  return (
    <Suspense fallback={<AuthCardSkeleton />}>
      <SignInForm />
    </Suspense>
  );
}