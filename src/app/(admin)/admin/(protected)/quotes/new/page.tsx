import { QuoteForm } from "../_components/QuoteForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewQuotePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/quotes" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Quote</h1>
          <p className="text-muted-foreground">Share your thoughts and developer rants.</p>
        </div>
      </div>
      <QuoteForm />
    </div>
  );
}
