import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      emoji="🔍"
      title="পেজটি পাওয়া যায়নি"
      message="আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। এটি সরিয়ে ফেলা হয়ে থাকতে পারে বা ঠিকানাটি ভুল হতে পারে।"
    />
  );
}