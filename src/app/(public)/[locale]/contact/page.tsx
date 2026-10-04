import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";
import { ContactView } from "./_components/ContactView";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  const settings = await getPublicSiteSettings();
  const primaryEmail = settings?.contact?.primaryEmail || "contact@rheva.dev";
  const location = settings?.profile?.location || "Jakarta / Bandung, Indonesia (GMT+7)";

  return <ContactView primaryEmail={primaryEmail} location={location} />;
}
