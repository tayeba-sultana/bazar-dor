import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

interface Props {
  products: Product[];
  direction: "up" | "down";
}

export default function PriceMovers({ products, direction }: Props) {
  const movers = products
    .filter((p) => p.change.dir === direction)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct)) 
    .slice(0, 6);

  if (movers.length === 0) return null;

  const isUp = direction === "up";

  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <span className={`text-base ${isUp ? "text-error" : "text-success"}`}>{isUp ? "▲" : "▼"}</span>
        {isUp ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে"}
      </h2>
      <ProductGrid products={movers} />
    </section>
  );
}