"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { i18n } from "@/i18n/config";

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getTargetUrl = (targetLocale: string) => {
    if (!pathname) return `/${targetLocale}`;
    
    // Replace the current locale in the pathname
    const segments = pathname.split('/');
    if (segments[1] && i18n.locales.includes(segments[1] as "id" | "en")) {
      segments[1] = targetLocale;
    } else {
      segments.splice(1, 0, targetLocale);
    }
    
    let url = segments.join('/') || `/${targetLocale}`;
    
    const params = searchParams.toString();
    if (params) {
      url += `?${params}`;
    }
    
    return url;
  };

  return (
    <div className="flex items-center gap-2 text-sm font-semibold rounded-md border p-1 bg-muted/50 text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <Link 
        href={getTargetUrl("en")} 
        className={`px-2 py-1 rounded transition-colors ${currentLocale === "en" ? "bg-background text-foreground shadow-sm" : "hover:text-foreground"}`}
        aria-label="Switch to English"
      >
        EN
      </Link>
      <span className="w-px h-4 bg-border"></span>
      <Link 
        href={getTargetUrl("id")} 
        className={`px-2 py-1 rounded transition-colors ${currentLocale === "id" ? "bg-background text-foreground shadow-sm" : "hover:text-foreground"}`}
        aria-label="Switch to Indonesian"
      >
        ID
      </Link>
    </div>
  );
}
