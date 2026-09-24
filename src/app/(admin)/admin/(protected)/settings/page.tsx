import { settingsAdminRepository } from "@/lib/repositories/settingsAdmin";
import { SettingsForm } from "./_components/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  let settings;
  let error = "";

  try {
    settings = await settingsAdminRepository.getSiteSettings();
  } catch (e: unknown) {
    console.error("Failed to fetch settings:", e);
    error = (e as Error).message || "Failed to load settings from the database.";
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Settings</h3>
        <p className="text-red-400/80 max-w-md mx-auto mb-6">
          {error}
        </p>
      </div>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6">
      <SettingsForm initialData={settings} />
    </div>
  );
}
