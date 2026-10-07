import { portfoliosAdminRepository } from "@/lib/repositories/portfoliosAdmin";
import { PortfolioForm } from "../_components/PortfolioForm";
import { notFound } from "next/navigation";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const portfolio = await portfoliosAdminRepository.getPortfolio(id);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Portfolio</h1>
        <p className="text-muted-foreground mt-2">
          Update the details of your external portfolio.
        </p>
      </div>
      
      <PortfolioForm initialData={portfolio} />
    </div>
  );
}
