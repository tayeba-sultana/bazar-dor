import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

/** 1 col on mobile → 2 on tablet → 3 on desktop (matches the Figma 3-column grid). */
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}