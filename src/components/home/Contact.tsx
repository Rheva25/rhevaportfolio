import Link from "next/link";
import { getDictionary } from "@/i18n/getDictionary";
import { Locale } from "@/i18n/config";
import { Mail, Key } from "lucide-react";

export async function Contact({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  return (
    <section className="w-full bg-card py-24 border-t border-border" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-2xl bg-muted/30 border border-border p-8 md:p-14 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            {/* Status tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border text-foreground mb-8 font-mono text-[11px] font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Current Availability: Open for Q2 2025 projects
            </div>
            
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-5">
              Have a problem worth solving?
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Whether you need a custom enterprise system built from scratch, want to deploy one of my digital products, or require technical consulting&mdash;let&rsquo;s turn your operational requirements into reliable software.
            </p>
            
            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 h-12 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-semibold transition-colors shadow-sm hover:bg-primary/90">
                <Mail className="h-5 w-5" />
                <span>Start a Conversation</span>
              </Link>
              <Link href="/apps" className="inline-flex items-center gap-2 px-6 h-12 rounded-lg bg-background border border-border text-foreground font-mono text-sm font-medium transition-colors shadow-sm hover:bg-muted">
                <Key className="h-5 w-5" />
                <span>Explore Products</span>
              </Link>
            </div>
            
            {/* Direct Inquiries & SLA Footer */}
            <div className="pt-8 border-t border-border/50 font-mono text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div>
                Direct contact: <a className="text-primary hover:underline font-semibold ml-1" href="mailto:rheva@example.com">rheva@example.com</a>
              </div>
              <span className="hidden sm:inline text-muted-foreground/50">&bull;</span>
              <div className="text-foreground font-medium">Response guaranteed within 24 hours</div>
            </div>
          </div>
          
          {/* Subtle background decoration (optional based on design) */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-20 w-40 h-40 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
