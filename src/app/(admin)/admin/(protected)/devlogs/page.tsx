import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { devlogsAdminRepository } from "@/lib/repositories/devlogsAdmin";
import { DevlogList } from "./_components/DevlogList";

export const metadata = {
  title: "Admin - Devlog: Unspoken | RHEVA",
};

export default async function AdminDevlogsPage() {
  const devlogs = await devlogsAdminRepository.getDevlogs();

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Devlog: Unspoken</h1>
        <Link href="/admin/devlogs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Devlog
          </Button>
        </Link>
      </div>

      <DevlogList initialData={devlogs} />
    </div>
  );
}
