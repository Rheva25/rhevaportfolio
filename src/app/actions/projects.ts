"use server";

import { projectsAdminRepository } from "@/lib/repositories/projectsAdmin";
import { ProjectSchema, ProjectFormData } from "@/lib/validations/project";
import { verifySuperadmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";

/**
 * Checks authorization. Throws if not authorized.
 */
async function requireAuth() {
  const { isAuthorized } = await verifySuperadmin();
  if (!isAuthorized) {
    throw new Error("Unauthorized");
  }
}

export async function createProjectAction(data: ProjectFormData) {
  await requireAuth();
  
  // Validate input
  const parsed = ProjectSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid project data");
  }

  // Check unique slug
  const existing = await projectsAdminRepository.getProjectBySlug(parsed.data.slug);
  if (existing) {
    throw new Error("Slug already in use");
  }

  const project = await projectsAdminRepository.createProject(parsed.data);
  
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  
  return project.id;
}

export async function updateProjectAction(id: string, data: ProjectFormData) {
  await requireAuth();
  
  const parsed = ProjectSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid project data");
  }

  // Check unique slug (excluding current project)
  const existing = await projectsAdminRepository.getProjectBySlug(parsed.data.slug, id);
  if (existing) {
    throw new Error("Slug already in use by another project");
  }

  await projectsAdminRepository.updateProject(id, parsed.data);
  
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/projects");
  revalidatePath(`/projects/${parsed.data.slug}`);
}

export async function deleteProjectAction(id: string) {
  await requireAuth();
  
  await projectsAdminRepository.deleteProject(id);
  
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function duplicateProjectAction(id: string) {
  await requireAuth();
  
  const existing = await projectsAdminRepository.getProject(id);
  if (!existing) {
    throw new Error("Project not found");
  }

  const newProjectData: ProjectFormData = {
    ...existing,
    title: { id: `${existing.title.id} (Copy)`, en: `${existing.title.en || existing.title.id} (Copy)` },
    slug: `${existing.slug}-copy-${Date.now()}`,
    status: "In Progress" as const, // Reset to In Progress
    visibility: "Draft" as const,
  };

  const project = await projectsAdminRepository.createProject(newProjectData);
  revalidatePath("/admin/projects");
  
  return project.id;
}
