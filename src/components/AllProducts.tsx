import type { Product } from "@/lib/types";
import { toBengaliNumber } from "@/lib/utils";
import ProductGrid from "./ProductGrid";

/** Section C — "সব পণ্য" (target of the hero's #সব-পণ্য anchor) */
export default function AllProducts({ products }: { products: Product[] }) {
  return (
    <section id="সব-পণ্য" className="flex scroll-mt-40 flex-col gap-3">
      <h2 className="text-xl font-bold">সব পণ্য</h2>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-base-content/70">
          মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}