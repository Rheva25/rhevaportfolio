import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";
import { LanguageSwitcher } from "./LanguageSwitcher";

import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";

export async function Header({ locale }: { locale: Locale }) {
  const settings = await getPublicSiteSettings();
  const siteName = settings?.siteName || "RHEVA";
  const t = await getDictionary(locale);

  const links = [
    { name: t.navigation.projects, href: `/${locale}/projects` },
    { name: t.navigation.apps, href: `/${locale}/apps` },
    { name: t.navigation.services, href: `/${locale}/services` },
    { name: t.navigation.articles, href: `/${locale}/articles` },
    { name: t.navigation.about, href: `/${locale}/about` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 focus:outline-none">
            <span className="font-bold text-2xl tracking-tight text-foreground uppercase">{siteName}</span>
            <span className="hidden md:inline-flex bg-muted px-2 py-0.5 rounded-full text-muted-foreground text-xs font-medium font-mono">v1.0.0</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-7">
          <Link href={`/${locale}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-5">
            {t.navigation.home}
          </Link>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-5">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:block">
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <Link href={`/${locale}/contact`} className={buttonVariants({ variant: "outline", className: "hidden lg:inline-flex font-mono" })}>
            Let&apos;s Talk
          </Link>
          <div className="hidden md:flex w-8 h-8 rounded-full bg-primary items-center justify-center">
            <User className="text-primary-foreground h-4 w-4" />
          </div>
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-12 w-3/4 sm:max-w-sm">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Mobile navigation links</SheetDescription>
              
              {/* Mobile Language Switcher */}
              <div className="flex justify-start">
                <LanguageSwitcher currentLocale={locale} />
              </div>
              
              <nav className="flex flex-col gap-4 text-lg font-medium">
                <Link href={`/${locale}`} className="text-muted-foreground hover:text-foreground">
                  {t.navigation.home}
                </Link>
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.name}
                  </Link>
                ))}
              </nav>
              <Link href={`/${locale}/contact`} className={buttonVariants({ size: "lg", className: "w-full mt-auto font-mono" })}>
                Let&apos;s Talk
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
