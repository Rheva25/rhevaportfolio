import { projectsAdminRepository } from "@/lib/repositories/projectsAdmin";
import { ProjectList } from "./_components/ProjectList";

import { Project } from "@/lib/validations/project";

// Force dynamic to always fetch the latest projects
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  let projects: Project[] = [];
  let error = "";

  try {
    projects = await projectsAdminRepository.getProjects();
  } catch (e: unknown) {
    console.error("Failed to fetch projects:", e);
    error = (e as Error).message || "Failed to load projects from the database.";
  }

  return (
    <ProjectList projects={projects} error={error} />
  );
}
