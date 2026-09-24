import { inquiriesAdminRepository } from "@/lib/repositories/inquiriesAdmin";
import { InquiryList } from "./_components/InquiryList";
import { Inquiry } from "@/lib/validations/inquiry";

// Force dynamic to always fetch the latest inquiries
export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  let inquiries: Inquiry[] = [];
  let error = "";

  try {
    inquiries = await inquiriesAdminRepository.getInquiries();
  } catch (e: unknown) {
    console.error("Failed to fetch inquiries:", e);
    error = (e as Error).message || "Failed to load inquiries from the database.";
  }

  return (
    <div className="max-w-7xl mx-auto">
      <InquiryList inquiries={inquiries} error={error} />
    </div>
  );
}
