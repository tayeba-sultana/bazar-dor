import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, getUnitBn } from "@/lib/utils";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:border-primary hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl transition-transform group-hover:scale-105">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{product.nameBn}</h3>
          <p className="text-xs text-base-content/60">{getUnitBn(product.unit)}</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-base-content/70">আজকের দাম</p>
          <p className="text-xl font-bold">{formatPrice(product.today)} টাকা</p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}