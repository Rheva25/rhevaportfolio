import { templatesAdminRepository } from "@/lib/repositories/templatesAdmin";
import { TemplateForm } from "../../_components/TemplateForm";
import { notFound } from "next/navigation";

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = await templatesAdminRepository.getTemplate(id);

  if (!template) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto">
      <TemplateForm template={template} />
    </div>
  );
}
