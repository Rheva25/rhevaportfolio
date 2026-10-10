import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";
import { getLocalizedText } from "@/lib/utils/localization";
import { FadeUp, FadeIn } from "@/components/ui/motion";

export async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const settings = await getPublicSiteSettings();
  
  const title = settings?.profile?.professionalTitle ? getLocalizedText(settings.profile.professionalTitle, locale) : dict.home.hero.title;
  const subtitle = settings?.profile?.shortBio ? getLocalizedText(settings.profile.shortBio, locale) : dict.home.hero.subtitle;
  const name = settings?.profile?.fullName || "Rheva";

  return (
    <section className="w-full bg-background pt-24 pb-32 md:pt-32 md:pb-40 border-b border-border/40 relative overflow-hidden">
      {/* Very subtle background pattern or gradient could go here, but keeping it starkly minimal for now */}
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl">
          {/* Subtle availability badge, more elegant */}
          <FadeUp delay={0.1} className="flex items-center gap-3 mb-12">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium">
              {settings?.contact?.availabilityStatus?.id
                  ? getLocalizedText(settings.contact.availabilityStatus as { id: string; en?: string }, locale) 
                  : dict.home.hero.availability}
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] text-foreground tracking-tighter font-semibold mb-8 leading-[1.02] text-balance">
              {title}
            </h1>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mt-16 md:mt-24">
            <FadeUp delay={0.3} className="md:col-span-7">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light text-balance">
                {subtitle}
              </p>
            </FadeUp>
            
            <FadeUp delay={0.4} className="md:col-span-5 flex flex-col items-start md:items-end gap-6 justify-center h-full">
              <Link href="#projects" className="group flex items-center gap-4 font-mono text-sm uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity">
                <span>{dict.home.hero.viewWork}</span>
                <span className="w-12 h-[1px] bg-foreground group-hover:w-16 transition-all duration-300"></span>
              </Link>
              
              <Link href="/about" className="group flex items-center gap-4 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                <span>About {name}</span>
                <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
