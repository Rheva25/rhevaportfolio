import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";
import { Locale } from "@/i18n/config";
import { getLocalizedText } from "@/lib/utils/localization";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getPublicSiteSettings();
  
  return {
    title: {
      template: `%s | ${settings?.siteName || "Rheva Developer Platform"}`,
      default: settings?.seo.defaultTitle ? getLocalizedText(settings.seo.defaultTitle, locale) : settings?.siteName || "Rheva Developer Platform",
    },
    description: settings?.seo.defaultDescription ? getLocalizedText(settings.seo.defaultDescription, locale) : (settings?.siteDescription ? getLocalizedText(settings.siteDescription, locale) : "Software Engineer who builds practical digital products and systems."),
    keywords: settings?.seo.keywords || [],
    openGraph: settings?.seo.ogImage?.url ? {
      images: [{ url: settings.seo.ogImage.url, alt: settings.seo.ogImage.alt }],
    } : undefined,
    icons: settings?.seo.favicon?.url ? {
      icon: settings.seo.favicon.url,
    } : undefined,
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header locale={locale as Locale} />
        <main className="flex-1">
          {children}
        </main>
        <Footer locale={locale as Locale} />
      </body>
    </html>
  );
}
