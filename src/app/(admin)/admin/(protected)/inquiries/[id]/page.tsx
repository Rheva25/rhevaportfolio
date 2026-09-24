import { inquiriesAdminRepository } from "@/lib/repositories/inquiriesAdmin";
import { InquiryForm } from "../_components/InquiryForm";
import { notFound } from "next/navigation";
import { Inquiry } from "@/lib/validations/inquiry";

export default async function EditInquiryPage({ params }: { params: Promise<{ id: string }> }) {
  let inquiry: Inquiry | null = null;
  let error = "";

  try {
    const { id } = await params;
    inquiry = await inquiriesAdminRepository.getInquiry(id);
    if (!inquiry) {
      notFound();
    }
  } catch (e: unknown) {
    error = (e as Error).message || "Failed to load inquiry.";
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-red-950/20 border border-red-900/50 rounded-lg max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Inquiry</h3>
        <p className="text-red-400/80 max-w-md mx-auto mb-6">
          {error}
        </p>
      </div>
    );
  }

  if (!inquiry) {
      return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <InquiryForm initialData={inquiry} />
    </div>
  );
}
