import { motion, useScroll, useTransform } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import { useRef } from "react";
import EmberField from "./EmberField";
import { CharReveal, Marquee, Reveal } from "./ui";

const WARNINGS = ["CATASTROPHE VECTOR", "PROXIMITY PROTOCOL 7", "INFECTION RISK", "CONTAINMENT ADVISED"];

export default function Catastrophe() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="relative min-h-[120svh] overflow-hidden">
      {/* backdrop */}
      <motion.img
        style={{ scale, y }}
        src="/images/catastrophe.jpg"
        alt="A Catastrophe storm wall over a cracked, glowing wasteland"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/45 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(6,4,3,0.72)_100%)]" />
      <EmberField className="z-10 opacity-70" density={0.5} />

      {/* content */}
      <div className="relative z-20 flex min-h-[120svh] flex-col items-center justify-center px-6 py-40 text-center">
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-3 border border-ember/40 bg-ink/50 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.4em] text-ember backdrop-blur-sm md:text-[10px]">
            <TriangleAlert className="h-3.5 w-3.5" strokeWidth={1.5} />
            Hazard dossier — file 04
          </div>
        </Reveal>

        <h2 className="font-display uppercase leading-[0.9] tracking-wide" style={{ fontSize: "clamp(3rem, 9.5vw, 10.5rem)" }}>
          <span className="block text-bone drop-shadow-[0_2px_30px_rgba(6,4,3,0.9)]">
            <CharReveal text="PRIMARY FACTOR" stagger={0.028} />
          </span>
          <span className="text-stroke block">
            <CharReveal text="OF CATASTROPHES" delay={0.25} stagger={0.028} />
          </span>
        </h2>

        <Reveal delay={0.35}>
          <p className="mx-auto mt-10 max-w-lg font-serif text-lg font-light italic leading-relaxed text-bone/75 md:text-xl">
            It does not chase. It simply exists — and, in time, the sky answers. Where the stone
            accumulates, the storm learns the way.
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-bone/15 pt-8 font-mono text-left md:gap-16">
            {[
              ["BEHAVIOUR", "STORM-GENERATIVE"],
              ["FREQUENCY", "CYCLICAL"],
              ["SURVIVABILITY", "CONDITIONAL"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-[8px] uppercase tracking-[0.35em] text-dim">{k}</div>
                <div className="mt-2 text-[10px] tracking-[0.2em] text-bone/80 md:text-[11px]">{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* warning ticker */}
      <div className="absolute inset-x-0 bottom-0 z-30 border-y border-ember/25 bg-ink/70 py-3 backdrop-blur-sm">
        <Marquee slow>
          {WARNINGS.map((w) => (
            <span key={w} className="flex items-center">
              <span className="whitespace-nowrap px-8 font-mono text-[10px] uppercase tracking-[0.45em] text-ember/90">
                {w}
              </span>
              <span className="h-1 w-1 rotate-45 bg-ember/60" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
