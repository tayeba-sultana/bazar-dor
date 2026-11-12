"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import FormField from "@/components/FormField";
import SocialButtons from "@/components/SocialButtons";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("সঠিক ইমেইল দিন।");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (password !== confirm) return toast.error("দুটি পাসওয়ার্ড মিলছে না।");

    setLoading(true);
    const { error } = await signUp.email({ name: name.trim(), email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে!");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
    router.push("/signin");
  };

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <FormField
          label="নাম"
          name="name"
          placeholder="যেমন: রহিম উদ্দিন"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormField
          label="পাসওয়ার্ড নিশ্চিত করুন"
          name="confirm"
          type="password"
          placeholder="আবার লিখুন"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button type="submit" disabled={loading} className="btn btn-primary h-10 min-h-10 text-sm font-semibold">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        <div className="flex items-center gap-4 text-xs">
          <span className="h-px flex-1 bg-base-content/10" />
          অথবা
          <span className="h-px flex-1 bg-base-content/10" />
        </div>

        <SocialButtons callbackURL="/" />

        <p className="text-center text-sm text-base-content/70">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-primary hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}