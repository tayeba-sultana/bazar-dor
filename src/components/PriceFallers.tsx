import type { Product } from "@/lib/types";
import PriceMovers from "./PriceMovers";

export default function PriceFallers({ products }: { products: Product[] }) {
  return <PriceMovers products={products} direction="down" />;
}