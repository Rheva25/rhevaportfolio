import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";
import { getLocalizedText } from "@/lib/utils/localization";
import { FadeUp, FadeIn, MaskReveal } from "@/components/ui/motion";

export async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const settings = await getPublicSiteSettings();
  
  const profTitle = settings?.profile?.professionalTitle;
  const titleText = profTitle ? getLocalizedText(profTitle, locale) : "";
  const title = titleText.trim() ? titleText : dict.home.hero.title;
  
  const bio = settings?.profile?.shortBio;
  const subtitleText = bio ? getLocalizedText(bio, locale) : "";
  const subtitle = subtitleText.trim() ? subtitleText : dict.home.hero.subtitle;
  const name = settings?.profile?.fullName || "Rheva";

  return (
    <section className="w-full bg-background pt-32 pb-32 md:pt-48 md:pb-40 border-b border-border/40 relative overflow-hidden">
      {/* Background grain/noise for organic feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl">
          {/* Subtle availability badge */}
          <FadeIn delay={0.1} className="flex items-center gap-3 mb-16 md:mb-20">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium">
              {settings?.contact?.availabilityStatus?.id
                  ? getLocalizedText(settings.contact.availabilityStatus as { id: string; en?: string }, locale) 
                  : dict.home.hero.availability}
            </span>
          </FadeIn>
          
          <MaskReveal delay={0.2}>
            <h1 className="text-6xl sm:text-7xl md:text-[6rem] lg:text-[8rem] text-foreground tracking-tighter font-medium mb-8 leading-[1.05] text-balance">
              {title}
            </h1>
          </MaskReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mt-20 md:mt-32">
            <FadeUp delay={0.4} className="md:col-span-7">
              <p className="text-xl md:text-3xl text-muted-foreground leading-snug font-light text-balance mb-8">
                {subtitle}
              </p>
              
              {settings?.profile?.coreCompetencies && settings.profile.coreCompetencies.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {settings.profile.coreCompetencies.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                      <span className="w-1 h-1 rounded-full bg-foreground/30"></span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              )}
            </FadeUp>
            
            <FadeUp delay={0.5} className="md:col-span-5 flex flex-col items-start md:items-end gap-6 justify-center h-full pt-4 md:pt-0">
              <Link href="#projects" className="group flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity">
                <span>{dict.home.hero.viewWork}</span>
                <span className="w-16 h-[1px] bg-foreground group-hover:w-24 transition-all duration-500 ease-out"></span>
              </Link>
              
              <Link href="/about" className="group flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                <span>About {name}</span>
                <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
              </Link>
              
              {/* Social Links from Settings */}
              {settings?.socialLinks && settings.socialLinks.length > 0 && (
                <div className="flex items-center gap-4 mt-4 md:mt-2">
                  {settings.socialLinks.map((social, index) => (
                    <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      {social.platform}
                    </a>
                  ))}
                </div>
              )}
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
