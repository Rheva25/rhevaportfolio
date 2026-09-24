import Link from "next/link";
import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";

import { Locale } from "@/i18n/config";

import { getDictionary } from "@/i18n/getDictionary";

export async function Footer({ locale }: { locale: Locale }) {
  const settings = await getPublicSiteSettings();
  const siteName = settings?.siteName || "RHEVA";
  const year = new Date().getFullYear();
  const fullName = settings?.profile?.fullName || "Rheva Iqbal Abdillah";
  const t = await getDictionary(locale);
  
  const defaultSocials = [
    { platform: "GitHub", url: "https://github.com/rheva" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/rheva" }
  ];
  const socials = settings?.socialLinks?.length ? settings.socialLinks : defaultSocials;

  return (
    <footer className="w-full border-t border-border bg-background py-8 md:py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground uppercase">{siteName}</span>
          <span>&copy; {year} {fullName}.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href={`/${locale}/projects`} className="hover:text-foreground transition-colors">{t.navigation.projects}</Link>
          <Link href={`/${locale}/apps`} className="hover:text-foreground transition-colors">{t.navigation.apps}</Link>
          <Link href={`/${locale}/articles`} className="hover:text-foreground transition-colors">{t.navigation.articles}</Link>
          {socials.map(social => (
            <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors capitalize">
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
