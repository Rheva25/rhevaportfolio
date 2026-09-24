import { productsAdminRepository } from "@/lib/repositories/productsAdmin";
import { AppForm } from "../_components/AppForm";
import { notFound } from "next/navigation";
import { Product } from "@/lib/validations/product";

export default async function EditAppPage({ params }: { params: Promise<{ id: string }> }) {
  let product: Product | null = null;
  let error = "";

  try {
    const { id } = await params;
    product = await productsAdminRepository.getProduct(id);
    if (!product) {
      notFound();
    }
  } catch (e: unknown) {
    error = (e as Error).message || "Failed to load product.";
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Product</h3>
        <p className="text-red-400/80 max-w-md mx-auto mb-6">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <AppForm initialData={product || undefined} />
    </div>
  );
}
