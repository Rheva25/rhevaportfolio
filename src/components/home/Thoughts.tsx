import { Terminal, Heart, Coffee, Code2, Sparkles } from "lucide-react";
import { Locale } from "@/i18n/config";

export function Thoughts({ locale }: { locale: Locale }) {
  const content = {
    id: {
      title: "Di Balik Layar Editor",
      subtitle: "Karena kadang, bug yang paling susah di-debug ada di hati sendiri.",
      text1: "Gua bisa nulis ribuan baris kode buat ngebangun sistem yang rumit, tapi gua tetep gagal nulis satu baris kode yang bisa bikin lu ngerti perasaan gua.",
      text2: "Logika pemrograman itu selalu jelas: if this, then that. Tapi urusan hati nggak pernah se-binary itu. Kadang gua berharap manusia punya dokumentasi API, biar gua tau persis gimana caranya nyampe ke hati lu tanpa dapet balasan '403 Forbidden'.",
      text3: "Pada akhirnya, gua cuma bisa nyimpen rindu ini layaknya environment variable rahasia yang nggak akan pernah di-commit ke public repo. Biar localhost dan Tuhan aja yang tau.",
    },
    en: {
      title: "Behind the Editor",
      subtitle: "Because sometimes, the hardest bug to fix is the one in your own heart.",
      text1: "I can write thousands of lines of code to build complex systems, yet I completely fail to write a single function that makes you understand my feelings.",
      text2: "Programming logic is always clear: if this, then that. But matters of the heart are never that binary. Sometimes I wish people came with API documentation, so I'd know exactly how to reach your heart without getting a '403 Forbidden'.",
      text3: "In the end, I can only keep this longing like a secret environment variable—never to be committed to a public repo. Let only localhost and God know it exists.",
    }
  };

  const t = content[locale] || content.en;

  return (
    <section className="w-full bg-zinc-950 py-24 md:py-32 relative overflow-hidden border-y border-zinc-900">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl mb-2">
            <Heart className="w-6 h-6 text-red-500/80" fill="currentColor" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">
            {t.title}
          </h2>
          <p className="text-zinc-400 max-w-2xl text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Coffee className="w-8 h-8 text-zinc-500 mb-4" />
              <p className="text-zinc-300 leading-relaxed font-medium">
                {t.text1}
              </p>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Terminal className="w-6 h-6 text-zinc-500 mb-4" />
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {t.text2}
              </p>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
              <Sparkles className="w-6 h-6 text-primary mb-4" />
              <p className="text-zinc-200 leading-relaxed italic text-sm md:text-base font-medium">
                "{t.text3}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
