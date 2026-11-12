import Hero from "@/components/Hero";
import PriceRisers from "@/components/PriceRisers";
import PriceFallers from "@/components/PriceFallers";
import AllProducts from "@/components/AllProducts";
import { getProducts } from "@/lib/api";

// export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-6">
      <Hero />

      {products.length === 0 ? (
        <p className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center text-base-content/70">
          এই মুহূর্তে পণ্যের তথ্য লোড করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।
        </p>
      ) : (
        <>
          <PriceRisers products={products} />
          <PriceFallers products={products} />
          <AllProducts products={products} />
        </>
      )}
    </div>
  );
}
