import Link from "next/link";

interface Props {
  emoji?: string;
  title: string;
  message: string;
}

export default function EmptyState({ emoji = "🔍", title, message }: Props) {
  return (
    <div className="mx-auto flex min-h-[55vh] w-full max-w-lg flex-col items-center justify-center gap-3 px-4 py-12 text-center">
      <div className="text-6xl">{emoji}</div>
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <p className="text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-3 h-10 min-h-10 text-sm font-semibold">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}