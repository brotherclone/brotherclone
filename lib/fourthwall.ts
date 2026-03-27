/**
 * Fourthwall Storefront API client.
 * All calls go through the server-side proxy — this module is server-only.
 */

export type ProductMode = "affiliate" | "dropship" | "in-hand";

export interface DropProduct {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  imageUrl: string;
  mode: ProductMode;
  affiliateUrl?: string; // only set when mode === "affiliate"
}

export interface ArchiveEntry {
  date: string; // ISO date string YYYY-MM-DD
  product: DropProduct;
  editorialNote?: string;
}

const API_URL = process.env.FOURTHWALL_API_URL ?? "https://storefront.fourthwall.com";
const TOKEN = process.env.FOURTHWALL_STOREFRONT_TOKEN;

async function fw<T>(path: string): Promise<T> {
  if (!TOKEN) throw new Error("FOURTHWALL_STOREFRONT_TOKEN is not set");

  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Fourthwall API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getActiveProduct(): Promise<DropProduct | null> {
  try {
    // Fourthwall returns the product tagged as "active-drop" (convention we set in the dashboard)
    const data = await fw<{ products: DropProduct[] }>("/api/v1/products?tag=active-drop");
    return data.products[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAllProducts(): Promise<DropProduct[]> {
  const data = await fw<{ products: DropProduct[] }>("/api/v1/products");
  return data.products;
}
