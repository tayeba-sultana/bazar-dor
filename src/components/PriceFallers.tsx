import type { Product } from "@/lib/types";
import PriceMovers from "./PriceMovers";

/** Section B — "আজ দাম কমেছে ▼" (top 6 fallers) */
export default function PriceFallers({ products }: { products: Product[] }) {
  return <PriceMovers products={products} direction="down" />;
}