import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquareQuote } from "lucide-react";
import { quotesAdminRepository } from "@/lib/repositories/quotesAdmin";
import { format } from "date-fns";

export default async function QuotesPage() {
  const quotes = await quotesAdminRepository.getAll();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotes / Thoughts</h1>
          <p className="text-muted-foreground mt-1">Manage your daily quotes and developer rants.</p>
        </div>
        <Link href="/admin/quotes/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Quote
          </Button>
        </Link>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
        {quotes.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <MessageSquareQuote className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No quotes found. Start sharing your thoughts!</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {quotes.map(quote => (
              <div key={quote.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                <div className="space-y-1">
                  <h3 className="font-medium text-foreground">{quote.quote}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className={`px-2 py-0.5 rounded-full ${quote.status === 'Published' ? 'bg-green-500/10 text-green-500' : 'bg-zinc-800'}`}>
                      {quote.status}
                    </span>
                    <span>/{quote.slug}</span>
                    <span>{format(quote.createdAt, "MMM d, yyyy")}</span>
                  </div>
                </div>
                <Link href={`/admin/quotes/${quote.id}`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
