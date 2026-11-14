"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { parseBengaliNumber, toBengaliNumber } from "@/lib/utils";
import ProductGrid from "./ProductGrid";

type SortKey = "default" | "price-asc" | "price-desc";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "price-asc") list.sort((a, b) => parseBengaliNumber(a.today) - parseBengaliNumber(b.today));
    if (sort === "price-desc") list.sort((a, b) => parseBengaliNumber(b.today) - parseBengaliNumber(a.today));
    return list;
  }, [products, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end rounded-2xl border border-base-300 bg-base-100 p-4">
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
          aria-label="পণ্য সাজান"
          className="select select-bordered"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <p className="text-sm text-base-content/70">
        মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <ProductGrid products={sorted} />
    </div>
  );
}