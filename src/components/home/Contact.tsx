import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { Mail, Key } from "lucide-react";
import { getPublicSiteSettings } from "@/lib/repositories/settingsPublic";
import { getLocalizedText } from "@/lib/utils/localization";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export async function Contact({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const settings = await getPublicSiteSettings();
  const primaryEmail = settings?.contact?.primaryEmail || "rheva@example.com";
  const availabilityStatus = settings?.contact?.availabilityStatus?.id 
    ? getLocalizedText(settings.contact.availabilityStatus as { id: string; en?: string }, locale)
    : "Open for Q2 2025 projects";

  return (
    <section className="w-full bg-card py-24 md:py-32 border-t border-border" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <FadeUp className="rounded-2xl bg-muted/30 border border-border p-8 md:p-14 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            {/* Status tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-background border border-border text-foreground mb-8 font-mono text-[11px] font-medium shadow-sm uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Current Availability: {availabilityStatus}
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif italic text-foreground tracking-tight mb-6">
              Have a problem worth solving?
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10 max-w-2xl">
              Whether you need a custom enterprise system built from scratch, want to deploy one of my digital products, or require technical consulting&mdash;let&rsquo;s turn your operational requirements into reliable software.
            </p>
            
            {/* Interactive CTAs */}
            <StaggerContainer delay={0.2} className="flex flex-wrap items-center gap-4 mb-12">
              <StaggerItem>
                <Link href="/contact" className="group relative flex items-center gap-2 px-8 h-14 rounded-lg bg-foreground text-background font-mono text-xs uppercase tracking-widest transition-all hover:bg-foreground/90 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Start a Conversation</span>
                  </span>
                  <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></div>
                </Link>
              </StaggerItem>
              <StaggerItem>
                <Link href="/apps" className="group flex items-center gap-2 px-8 h-14 rounded-lg bg-transparent border border-foreground/20 text-foreground font-mono text-xs uppercase tracking-widest transition-all hover:border-foreground/50 hover:bg-muted/50">
                  <Key className="h-4 w-4" />
                  <span>Explore Products</span>
                </Link>
              </StaggerItem>
            </StaggerContainer>
            
            {/* Direct Inquiries & SLA Footer */}
            <FadeUp delay={0.4} className="pt-8 border-t border-border/50 font-mono text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 uppercase tracking-wider">
              <div>
                Direct contact: <a className="text-foreground hover:opacity-70 transition-opacity font-semibold ml-1" href={`mailto:${primaryEmail}`}>{primaryEmail}</a>
              </div>
              <span className="hidden sm:inline text-muted-foreground/30">&bull;</span>
              <div className="text-foreground font-medium opacity-80">Response guaranteed within 24 hours</div>
            </FadeUp>
          </div>
          
          {/* Subtle background decoration (optional based on design) */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-foreground/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </FadeUp>
      </div>
    </section>
  );
}
