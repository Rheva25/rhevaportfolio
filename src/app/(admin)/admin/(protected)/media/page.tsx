import { mediaAdminRepository } from "@/lib/repositories/mediaAdmin";
import { MediaList } from "./_components/MediaList";
import { MediaAsset } from "@/lib/validations/media";

// Force dynamic to always fetch the latest media assets
export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  let mediaAssets: MediaAsset[] = [];
  let error = "";

  try {
    mediaAssets = await mediaAdminRepository.getMediaAssets();
  } catch (e: unknown) {
    console.error("Failed to fetch media assets:", e);
    error = (e as Error).message || "Failed to load media assets from the database.";
  }

  return (
    <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8">
      <MediaList mediaAssets={mediaAssets} error={error} />
    </div>
  );
}
