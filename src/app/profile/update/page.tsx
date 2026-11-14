"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormField from "@/components/FormField";
import { authClient, useSession } from "@/lib/auth-client";

const isHttpUrl = (value: string) => /^https?:\/\/\S+$/i.test(value);

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [edited, setEdited] = useState<string | null>(null); 
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [failedUrl, setFailedUrl] = useState<string | null>(null); 
  const [loading, setLoading] = useState(false);


  const name = edited ?? session?.user?.name ?? "";
  const image = editedImage ?? session?.user?.image ?? "";
  const showPreview = isHttpUrl(image.trim()) && failedUrl !== image.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    const trimmedImage = image.trim();

    if (trimmed.length < 2) return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
    if (trimmedImage && !isHttpUrl(trimmedImage)) {
      return toast.error("ছবির লিংক http:// বা https:// দিয়ে শুরু হতে হবে।");
    }

    setLoading(true);
    // https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await authClient.updateUser({
      name: trimmed,
      image: trimmedImage || null, 
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "আপডেট ব্যর্থ হয়েছে!");
      return;
    }
    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-6">
      <header>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-base-content/70">আপনার নাম ও প্রোফাইল ছবি পরিবর্তন করুন।</p>
      </header>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
        {isPending ? (
          <div className="flex flex-col gap-4">
            <div className="skeleton h-20 w-20 rounded-2xl" />
            <div className="skeleton h-10 w-full" />
            <div className="skeleton h-10 w-full" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Live preview */}
            <div className="flex items-center gap-4">
              {showPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.trim()}
                  alt="প্রোফাইল ছবি"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedUrl(image.trim())}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-3xl font-bold text-primary-content">
                  {name.trim().charAt(0).toUpperCase() || "U"}
                </span>
              )}
              <p className="text-xs text-base-content/60">
                {failedUrl && failedUrl === image.trim()
                  ? "এই লিংক থেকে ছবি লোড হয়নি। অন্য লিংক দিন।"
                  : "ছবির লিংক পেস্ট করলে এখানে প্রিভিউ দেখা যাবে।"}
              </p>
            </div>

            <FormField
              label="নাম"
              name="name"
              placeholder="আপনার নাম"
              value={name}
              onChange={(e) => setEdited(e.target.value)}
              required
            />
            <FormField
              label="প্রোফাইল ছবির লিংক"
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              hint="ফাঁকা রাখলে ছবি মুছে যাবে।"
              value={image}
              onChange={(e) => setEditedImage(e.target.value)}
            />

            <button type="submit" disabled={loading} className="btn btn-primary h-10 min-h-10 text-sm font-semibold">
              {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
            </button>
          </form>
        )}
      </div>

      <Link href="/profile" className="text-center text-sm text-base-content/60 transition hover:text-primary">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}