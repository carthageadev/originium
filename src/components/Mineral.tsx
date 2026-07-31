import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionHead } from "./ui";

const DATA = [
  { k: "CLASSIFICATION", v: "Strategic mineral · hazard class" },
  { k: "APPEARANCE", v: "Semi-transparent black crystal" },
  { k: "ENERGY CONTENT", v: "Enormous — held in lattice" },
  { k: "DESIGNATION", v: "Primary Catastrophe vector" },
];

export default function Mineral() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="relative px-6 py-28 md:px-14 md:py-40 lg:px-20">
      <SectionHead index="01" label="Mineralogy" zh="源石" note="Field record 1 — Terra geological survey" />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
        {/* the record */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="font-serif text-3xl font-light leading-[1.28] text-bone/95 md:text-[2.9rem] md:leading-[1.22]">
              A common mineral in <span className="italic text-gold">Terra</span> — this
              semi-transparent black crystal contains{" "}
              <span className="italic text-gold">enormous energy</span>, and is the primary factor
              of causing <span className="italic text-ember">Catastrophes</span>.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-md text-sm leading-relaxed text-ash md:text-base">
              Mined across every nation and coveted in every laboratory, Originium sits at the root
              of Terran civilisation: a stone that answers every question it is asked, and asks one
              back. It powers cities, amplifies Arts — and carries within its lattice the seed of
              the very storms that erase those cities from the map.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <blockquote className="mt-10 border-l border-ember/60 pl-6 font-serif text-lg italic text-bone/70 md:text-xl">
              “Without Originium, the efficiency of Arts would, without a doubt, drop dramatically.”
              <footer className="mt-3 font-mono text-[10px] not-italic uppercase tracking-[0.3em] text-dim">
                — Archival record [1]
              </footer>
            </blockquote>
          </Reveal>
        </div>

        {/* the specimen imagery */}
        <div className="relative lg:col-span-6" ref={ref}>
          <Reveal delay={0.1} className="relative">
            <div className="pointer-events-none absolute -inset-px z-10 border border-bone/10" />
            <div className="pointer-events-none absolute -left-2 -top-2 z-10 h-6 w-6 border-l border-t border-ember/80" />
            <div className="pointer-events-none absolute -bottom-2 -right-2 z-10 h-6 w-6 border-b border-r border-ember/80" />
            <div className="overflow-hidden">
              <motion.img
                style={{ y, scale: 1.18 }}
                src="/images/originium-cluster.jpg"
                alt="Originium crystal clusters rising from cracked volcanic ground"
                className="h-[46vh] w-full object-cover md:h-[60vh]"
              />
            </div>
            <div className="flex items-center justify-between border-x border-b border-bone/10 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.3em] text-dim">
              <span>Fig. 01 — Vein exposure, post-Catastrophe zone</span>
              <span className="text-ember/80">Scale 1:14</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* data table */}
      <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-10 md:mt-28 md:grid-cols-4">
        {DATA.map((d, i) => (
          <Reveal key={d.k} delay={i * 0.08}>
            <div className="hairline mb-5 w-full" />
            <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-dim">{d.k}</div>
            <div className="mt-2 font-serif text-lg text-bone/90 md:text-xl">{d.v}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
