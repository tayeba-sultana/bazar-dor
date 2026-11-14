import Link from "next/link";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-base-content/70">{subtitle}</p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">{children}</div>

      <Link href="/" className="text-center text-sm text-base-content/60 transition hover:text-primary">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}