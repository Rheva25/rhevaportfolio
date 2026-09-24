import { productsAdminRepository } from "@/lib/repositories/productsAdmin";
import { AppList } from "./_components/AppList";
import { Product } from "@/lib/validations/product";

// Force dynamic to always fetch the latest products
export const dynamic = "force-dynamic";

export default async function AdminAppsPage() {
  let products: Product[] = [];
  let error = "";

  try {
    products = await productsAdminRepository.getProducts();
  } catch (e: unknown) {
    console.error("Failed to fetch products:", e);
    error = (e as Error).message || "Failed to load products from the database.";
  }

  return (
    <div className="max-w-7xl mx-auto">
      <AppList products={products} error={error} />
    </div>
  );
}
