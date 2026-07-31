import { Hexagon } from "lucide-react";
import { Marquee, Reveal } from "./ui";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-10">
      <Marquee slow className="opacity-90">
        {["ORIGINIUM", "源石", "YUÁN SHÍ", "SOURCE STONE", "ORIGINIUM", "源石", "YUÁN SHÍ", "SOURCE STONE"].map(
          (t, i) => (
            <span key={i} className="flex items-center">
              <span
                className={`whitespace-nowrap px-10 uppercase leading-none tracking-wide ${
                  t === "源石" ? "font-cjk text-ember/25" : `font-display ${i % 2 === 0 ? "text-stroke" : "text-bone/[0.07]"}`
                }`}
                style={{ fontSize: "clamp(4rem, 11vw, 12rem)" }}
              >
                {t}
              </span>
              <Hexagon className="h-5 w-5 shrink-0 text-ember/30" strokeWidth={1} />
            </span>
          )
        )}
      </Marquee>

      <div className="border-t border-bone/10 px-6 py-12 md:px-14 lg:px-20">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-bone/70">
                <span className="inline-block h-1.5 w-1.5 rotate-45 bg-ember" />
                Terra Mineral Archive
              </div>
              <p className="mt-5 max-w-sm font-serif text-sm italic leading-relaxed text-ash">
                Specimen 001 — Originium. A semi-transparent black crystal containing enormous
                energy; the basic material and catalyst of all Arts, and the primary factor of the
                Catastrophes. Handle with extreme caution.
              </p>
            </div>
            <div className="font-mono text-[10px] uppercase leading-loose tracking-[0.3em] text-dim">
              <div className="mb-3 text-bone/60">Index</div>
              <div>[01] Mineralogy</div>
              <div>[02] Properties</div>
              <div>[03] Catalysis</div>
              <div>[04] Catastrophe</div>
              <div>[05] Energy Era</div>
            </div>
            <div className="font-mono text-[10px] uppercase leading-loose tracking-[0.3em] text-dim">
              <div className="mb-3 text-bone/60">Dossier</div>
              <div>Compiled from field record ¹</div>
              <div>Pronunciation / əˈɹɪd͡ʒɪniəm /</div>
              <div className="mt-2 text-ember/80">Hazard class — active</div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-bone/[0.07] pt-6 font-mono text-[9px] uppercase tracking-[0.3em] text-dim md:flex-row md:items-center">
          <span>Terra Mineral Archive — an unofficial lore exhibit</span>
          <span className="text-bone/40">Every era of Terra arrives crystallised</span>
        </div>
      </div>
    </footer>
  );
}
