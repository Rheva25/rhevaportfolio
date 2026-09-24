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

import { Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const localeStr = (await params).locale;
  const locale = localeStr as Locale;

  return (
    <div className="flex flex-col w-full">
      <Hero locale={locale} />
      <Stack locale={locale} />
      <Projects locale={locale} />
      <Apps locale={locale} />
      <Services locale={locale} />
      <About locale={locale} />
      <Articles locale={locale} />
      <Contact locale={locale} />
    </div>
  );
}


export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: getLocalizedAlternates("")
  };
}
