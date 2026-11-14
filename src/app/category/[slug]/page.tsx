import CategoryProducts from "@/components/CategoryProducts";
import EmptyState from "@/components/EmptyState";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBengaliNumber } from "@/lib/utils";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [products, category] = await Promise.all([getProductsByCategory(slug), getCategory(slug)]);

  if (products.length === 0) {
    return (
      <EmptyState
        emoji="😢"
        title="কোনো পণ্য পাওয়া যায়নি"
        message="এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।"
      />
    );
  }

  const icon = category?.icon ?? products[0].categoryIcon;
  const name = category?.nameBn ?? products[0].categoryNameBn;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      {/* Title + icon */}
      <header className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span className="text-4xl">{icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-base-content/70">
            {toBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      <CategoryProducts products={products} />
    </div>
  );
}