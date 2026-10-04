import { templatesAdminRepository } from "@/lib/repositories/templatesAdmin";
import { TemplateList } from "./_components/TemplateList";
import { Template } from "@/lib/validations/template";

// Force dynamic to always fetch the latest templates
export const dynamic = "force-dynamic";

export default async function AdminTemplatesPage() {
  let templates: Template[] = [];
  let error = "";

  try {
    templates = await templatesAdminRepository.getTemplates();
  } catch (e: unknown) {
    console.error("Failed to fetch templates:", e);
    error = (e as Error).message || "Failed to load templates from the database.";
  }

  return (
    <div className="max-w-7xl mx-auto">
      <TemplateList templates={templates} error={error} />
    </div>
  );
}
