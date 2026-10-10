import { devlogsPublicRepository } from "@/lib/repositories/devlogsPublic";
import { Locale } from "@/i18n/config";
import { DevlogCard } from "@/components/devlogs/DevlogCard";
import { FadeUp, MaskReveal, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata = {
  title: "Devlog: Unspoken | Some thoughts become words. Some words become stories.",
  description: "A literary developer journal featuring personal reflections, growth, uncertainty, work, creativity, and life.",
};

export default async function DevlogUnspokenPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const devlogs = await devlogsPublicRepository.getPublishedDevlogs();

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      
      {/* Header Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 border-b border-[#DCD5C9] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <FadeUp delay={0.1}>
            <span className="text-[#918779] font-mono tracking-[0.2em] text-[10px] uppercase mb-6 block font-semibold">
              Publication
            </span>
          </FadeUp>
          <MaskReveal delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-serif italic text-[#24221F] tracking-tighter mb-8 leading-[1.05]">
              Devlog: Unspoken
            </h1>
          </MaskReveal>
          <FadeUp delay={0.3}>
            <p className="text-xl md:text-2xl text-[#918779] font-light max-w-2xl mx-auto mb-10 leading-snug text-balance">
              "Some thoughts become words. Some words become stories."
            </p>
            <div className="w-24 h-[1px] bg-[#24221F] mx-auto opacity-10 mb-10"></div>
            <p className="text-base text-[#24221F]/70 font-light max-w-2xl mx-auto leading-relaxed text-balance">
              A quiet space for reflections, uncertainty, creative processes, and the life of a developer behind the screens. 
              Not everything fits into a technical tutorial.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {devlogs.length === 0 ? (
            <FadeUp delay={0.4} className="text-center py-24 border border-dashed border-[#DCD5C9] rounded-xl bg-[#F5F1E8]/50">
              <h3 className="text-3xl font-serif italic text-[#24221F] mb-3">The journal is empty.</h3>
              <p className="text-[#918779] font-light">The first story is yet to be told.</p>
            </FadeUp>
          ) : (
            <StaggerContainer delay={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {devlogs.map(devlog => (
                <StaggerItem key={devlog.id}>
                  <DevlogCard devlog={devlog} locale={locale as Locale} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

        </div>
      </section>

    </div>
  );
}
