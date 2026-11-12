import type { Product } from "@/lib/types";
import PriceMovers from "./PriceMovers";

/** Section A — "আজ দাম বেড়েছে ▲" (top 6 risers) */
export default function PriceRisers({ products }: { products: Product[] }) {
  return <PriceMovers products={products} direction="up" />;
}