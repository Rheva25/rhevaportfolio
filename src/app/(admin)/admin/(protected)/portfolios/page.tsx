import { portfoliosAdminRepository } from "@/lib/repositories/portfoliosAdmin";
import { PortfolioList } from "./_components/PortfolioList";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function PortfoliosPage() {
  const portfolios = await portfoliosAdminRepository.getPortfolios();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Portfolios</h1>
        <Link href="/admin/portfolios/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Portfolio
          </Button>
        </Link>
      </div>
      <PortfolioList initialPortfolios={portfolios} />
    </div>
  );
}
