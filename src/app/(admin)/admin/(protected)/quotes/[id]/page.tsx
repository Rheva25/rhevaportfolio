import { QuoteForm } from "../_components/QuoteForm";
import { quotesAdminRepository } from "@/lib/repositories/quotesAdmin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditQuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await quotesAdminRepository.getById(id);

  if (!quote) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/quotes" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Quote</h1>
          <p className="text-muted-foreground">{quote.quote.substring(0, 50)}...</p>
        </div>
      </div>
      <QuoteForm initialData={quote} />
    </div>
  );
}
