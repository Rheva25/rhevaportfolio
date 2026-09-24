import { projectsAdminRepository } from "@/lib/repositories/projectsAdmin";
import { ProjectForm } from "../_components/ProjectForm";
import { notFound } from "next/navigation";
import { FolderKanban } from "lucide-react";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  let project;
  let error;

  try {
    const { id } = await params;
    project = await projectsAdminRepository.getProject(id);
    if (!project) {
      notFound();
    }
  } catch (e: unknown) {
    error = (e as Error).message || "Failed to load project.";
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg">
        <div className="bg-red-900/20 p-4 rounded-full mb-4">
          <FolderKanban className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-2">Database Connection Failed</h3>
        <p className="text-red-400/80 max-w-md mx-auto">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ProjectForm initialData={project || undefined} />
    </div>
  );
}
