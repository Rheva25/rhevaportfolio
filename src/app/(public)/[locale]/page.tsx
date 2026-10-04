import { Metadata } from "next";
import { getLocalizedAlternates } from "@/lib/utils/seo";

import { Hero } from "@/components/home/Hero";
import { Stack } from "@/components/home/Stack";
import { Projects } from "@/components/home/Projects";
import { Apps } from "@/components/home/Apps";
import { Services } from "@/components/home/Services";
import { About } from "@/components/home/About";
import { Articles } from "@/components/home/Articles";
import { Contact } from "@/components/home/Contact";
import { Templates } from "@/components/home/Templates";

import { Locale } from "@/i18n/config";

import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const localeStr = (await params).locale;
  const locale = localeStr as Locale;
  const settings = await getPublicSiteSettings();

  const defaultSections = [
    { key: "hero", component: <Hero locale={locale} /> },
    { key: "stack", component: <Stack locale={locale} /> },
    { key: "templates", component: <Templates locale={locale} /> },
    { key: "projects", component: <Projects locale={locale} /> },
    { key: "apps", component: <Apps locale={locale} /> },
    { key: "services", component: <Services locale={locale} /> },
    { key: "about", component: <About locale={locale} /> },
    { key: "articles", component: <Articles locale={locale} /> },
    { key: "contact", component: <Contact locale={locale} /> }
  ];

  let renderedSections = defaultSections;

  const cmsSections = settings?.publicSite?.homepageSections;
  if (cmsSections && cmsSections.length > 0) {
    const visibleSections = cmsSections
      .filter(s => s.visible)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
    
    // Map the visible CMS sections to their respective components
    renderedSections = visibleSections.map(cmsSec => {
      const match = defaultSections.find(ds => ds.key === cmsSec.key);
      return match ? { key: cmsSec.key, component: match.component } : null;
    }).filter(Boolean) as typeof defaultSections;
  }

  return (
    <div className="flex flex-col w-full">
      {renderedSections.map(section => (
        <div key={section.key}>{section.component}</div>
      ))}
    </div>
  );
}


export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: getLocalizedAlternates("")
  };
}
