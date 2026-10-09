import { devlogsAdminRepository } from "@/lib/repositories/devlogsAdmin";
import { DevlogForm } from "../_components/DevlogForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Devlog Entry | RHEVA",
};

export default async function EditDevlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const devlog = await devlogsAdminRepository.getDevlog(id);

  if (!devlog) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <DevlogForm initialData={devlog} />
    </div>
  );
}
