import type { Category, Product } from "./types";

/**
 * API base URLs (from the assignment). The first one that answers wins,
 * so the site keeps working if one worker is down.
 */
const BASES = [
  process.env.NEXT_PUBLIC_API_URL,
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter(Boolean) as string[];

// Some APIs wrap the payload as { data: ... } – handle both shapes.
function unwrap<T>(json: unknown): T {
  if (json && typeof json === "object" && !Array.isArray(json) && "data" in json) {
    return (json as { data: T }).data;
  }
  return json as T;
}

async function request<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
      if (res.status === 404) return null;
      if (!res.ok) continue;
      return unwrap<T>(await res.json());
    } catch {
      // try next base URL
    }
  }
  return null;
}

export async function getProducts(): Promise<Product[]> {
  const data = await request<Product[]>("/products");
  return Array.isArray(data) ? data : [];
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const data = await request<Product[]>(`/products?category=${encodeURIComponent(slug)}`);
  return Array.isArray(data) ? data : [];
}

export async function getCategories(): Promise<Category[]> {
  const data = await request<Category[]>("/categories");
  return Array.isArray(data) ? data : [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const data = await request<Category>(`/categories/${encodeURIComponent(slug)}`);
  return data && typeof data === "object" && !Array.isArray(data) ? data : null;
}

/** Finds a product by slug (or numeric id, e.g. /product/1). */
export async function getProduct(slugOrId: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slugOrId || String(p.id) === slugOrId) ?? null;
}