import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { ChevronRightIcon } from "@/components/Icons";
import { getProduct } from "@/lib/api";
import {
  calcChange,
  formatPrice,
  getUnitBn,
  getUnitShortBn,
} from "@/lib/utils";

// export const dynamic = "force-dynamic"; // protected by src/proxy.ts (login required)

function StatCard({
  label,
  value,
  caption,
  valueClass = "",
}: {
  label: string;
  value: string;
  caption: string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-base-300 bg-base-100 p-4">
      <p className="text-xs text-base-content/60">{label}</p>
      <p className={`text-2xl font-bold ${valueClass}`}>{value} টাকা</p>
      <p className="text-xs text-base-content/60">{caption}</p>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const markets = (product.markets ?? []).map((m) => ({
    ...m,
    avg: (m.min + m.max) / 2,
  }));

  const hasMarkets = markets.length > 0;
  const lowest = hasMarkets ? markets.reduce((a, b) => (b.min < a.min ? b : a)) : null;
  const highest = hasMarkets ? markets.reduce((a, b) => (b.max > a.max ? b : a)) : null;
  const minPrice = lowest?.min ?? product.today;
  const maxPrice = highest?.max ?? product.today;
  const avgPrice = hasMarkets
    ? markets.reduce((sum, m) => sum + m.avg, 0) / markets.length
    : product.today;
  const cheapestAvgMarket = hasMarkets ? markets.reduce((a, b) => (b.avg < a.avg ? b : a)) : null;

  const diff = Math.abs(product.today - product.yesterday);
  const changeSentence =
    product.change.dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${formatPrice(diff)} টাকা`
      : product.change.dir === "down"
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${formatPrice(diff)} টাকা`
        : "গতকালের তুলনায় আজ দামে কোনো পরিবর্তন নেই";

  const history = [
    { label: "গতকাল", price: product.yesterday },
    { label: "গত সপ্তাহ", price: product.lastWeek },
    { label: "গত মাস", price: product.lastMonth },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      {/* Breadcrumbs */}
      <nav aria-label="breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <li><Link href="/" className="hover:text-primary">হোম</Link></li>
          <li className="flex items-center gap-3">
            <ChevronRightIcon className="h-2 w-1.5 text-base-content/50" />
            <Link href={`/category/${product.category}`} className="hover:text-primary">
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="flex items-center gap-3">
            <ChevronRightIcon className="h-2 w-1.5 text-base-content/50" />
            <span className="font-medium">{product.nameBn}</span>
          </li>
        </ol>
      </nav>

      {/* Top summary */}
      <header className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 md:flex-row md:items-stretch">
        <div className="flex flex-1 items-center gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
            {product.image}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold md:text-3xl">{product.nameBn}</h1>
            <p className="text-sm text-base-content/70">
              {getUnitBn(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-sm">{changeSentence}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl bg-base-200 px-6 py-5 text-center md:min-w-40">
          <p className="text-sm text-base-content/70">আজকের দাম</p>
          <p className="text-3xl font-bold">{formatPrice(product.today)}</p>
          <p className="text-sm text-base-content/70">টাকা / {getUnitShortBn(product.unit)}</p>
          <ChangeBadge change={product.change} className="mt-1 bg-transparent !p-0 text-sm" />
        </div>
      </header>

      {/* Details card */}
      <div className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        {/* Price summary */}
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard
              label="সর্বনিম্ন দাম"
              value={formatPrice(minPrice)}
              valueClass="text-success"
              caption={`সবচেয়ে কম দামের বাজার${lowest ? ` · ${lowest.market}` : ""}`}
            />
            <StatCard
              label="সর্বোচ্চ দাম"
              value={formatPrice(maxPrice)}
              valueClass="text-error"
              caption={`সবচেয়ে বেশি দামের বাজার${highest ? ` · ${highest.market}` : ""}`}
            />
            <StatCard
              label="গড় দাম"
              value={formatPrice(avgPrice)}
              caption="সব বাজারের গড়"
            />
          </div>
        </section>

        {/* Time comparison */}
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">সময়ের তুলনা</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {history.map((h) => (
              <div key={h.label} className="rounded-2xl border border-base-300 bg-base-100 p-4">
                <p className="text-sm text-base-content/70">{h.label}</p>
                <p className="text-xl font-bold">{formatPrice(h.price)} টাকা</p>
                <ChangeBadge change={calcChange(product.today, h.price)} className="mt-1.5 !bg-transparent !p-0" />
              </div>
            ))}
          </div>
        </section>

        {/* Market table */}
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          {hasMarkets ? (
            <div className="overflow-x-auto rounded-2xl border border-base-300">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="bg-base-200 text-xs font-semibold text-base-content/70">
                  <tr>
                    <th className="px-4 py-3">বাজার</th>
                    <th className="px-4 py-3">বিভাগ</th>
                    <th className="px-4 py-3">সর্বনিম্ন</th>
                    <th className="px-4 py-3">সর্বাধিক</th>
                    <th className="px-4 py-3">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m) => {
                    const emphasis = m === cheapestAvgMarket;
                    return (
                      <tr
                        key={`${m.market}-${m.division}`}
                        className={`border-t border-base-content/5 ${emphasis ? "bg-base-200 font-semibold" : ""}`}
                      >
                        <td className="px-4 py-3 font-medium">{m.market}</td>
                        <td className="px-4 py-3 text-base-content/70">{m.division}</td>
                        <td className="px-4 py-3">{formatPrice(m.min)} টাকা</td>
                        <td className="px-4 py-3">{formatPrice(m.max)} টাকা</td>
                        <td className="px-4 py-3 font-semibold">{formatPrice(m.avg)} টাকা</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-base-content/70">এই পণ্যের বাজারভিত্তিক তথ্য এখনো নেই।</p>
          )}
        </section>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <Link href="/#সব-পণ্য" className="btn btn-primary h-10 min-h-10 text-sm font-semibold">
          সব পণ্য দেখুন
        </Link>
        <Link href={`/category/${product.category}`} className="btn btn-ghost h-10 min-h-10 text-sm font-semibold">
          {product.categoryIcon} সব {product.categoryNameBn}
        </Link>
      </div>
    </div>
  );
}