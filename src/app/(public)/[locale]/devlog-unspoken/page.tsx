import { devlogsPublicRepository } from "@/lib/repositories/devlogsPublic";
import { Locale } from "@/i18n/config";
import { DevlogCard } from "@/components/devlogs/DevlogCard";

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
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 border-b border-[#DCD5C9]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#918779] font-mono tracking-[0.2em] text-sm uppercase mb-4 block">
            Publication
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#24221F] tracking-tight mb-6">
            Devlog: Unspoken
          </h1>
          <p className="text-lg md:text-xl text-[#918779] italic font-serif max-w-2xl mx-auto mb-8">
            "Some thoughts become words. Some words become stories."
          </p>
          <div className="w-24 h-[1px] bg-[#24221F] mx-auto opacity-20"></div>
          <p className="mt-8 text-[#24221F]/70 max-w-2xl mx-auto leading-relaxed">
            A quiet space for reflections, uncertainty, creative processes, and the life of a developer behind the screens. 
            Not everything fits into a technical tutorial.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {devlogs.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="text-2xl font-serif text-[#24221F] mb-2">The journal is empty.</h3>
              <p className="text-[#918779]">The first story is yet to be told.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {devlogs.map(devlog => (
                <DevlogCard key={devlog.id} devlog={devlog} locale={locale as Locale} />
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
