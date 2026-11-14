import type { Product } from "@/lib/types";
import { formatPrice, getChangeView, getUnitShortBn } from "@/lib/utils";

function TickerItem({ product }: { product: Product }) {
  const change = getChangeView(product.change);
  return (
    <span className="flex h-9 shrink-0 items-center gap-1.5 px-4 text-sm">
      <span>{product.image}</span>
      <span className="font-medium">{product.nameBn}</span>
      <span className="text-base-content/70">
        {formatPrice(product.today)} টাকা/{getUnitShortBn(product.unit)}
      </span>
      <span className={`font-semibold ${change.className}`}>{change.text}</span>
    </span>
  );
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div
      className="ticker-wrap overflow-hidden border-b border-base-300 bg-base-100"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="ticker-track" style={{ animationDuration: `${Math.max(products.length * 3, 30)}s` }}>
       
        <div className="flex shrink-0">
          {products.map((p) => (
            <TickerItem key={`a-${p.id}`} product={p} />
          ))}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {products.map((p) => (
            <TickerItem key={`b-${p.id}`} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}