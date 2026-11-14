import type { Product } from "@/lib/types";
import PriceMovers from "./PriceMovers";

export default function PriceRisers({ products }: { products: Product[] }) {
  return <PriceMovers products={products} direction="up" />;
}