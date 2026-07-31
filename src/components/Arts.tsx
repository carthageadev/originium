import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useRef } from "react";
import EmberField from "./EmberField";
import { CharReveal, Reveal, SectionHead } from "./ui";

const FLOW = ["ORIGINIUM", "CATALYSIS", "ARTS"];
const CHIPS = ["BASE MATERIAL", "AMPLIFICATION MEDIUM", "ARTS-ITEM CORE"];

export default function Arts() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="relative overflow-hidden px-6 py-28 md:px-14 md:py-40 lg:px-20">
      <EmberField className="z-0 opacity-60" density={0.4} />

      <div className="relative z-10">
        <SectionHead index="03" label="Catalysis" zh="术" note="On the dependence of all Arts upon the stone" />

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* imagery */}
          <div className="relative order-2 lg:order-1 lg:col-span-5" ref={ref}>
            <Reveal className="relative">
              <div className="overflow-hidden border border-bone/10">
                <motion.img
                  style={{ y, scale: 1.22 }}
                  src="/images/originium-arts.jpg"
                  alt="Amber Arts energy ribbons orbiting a floating Originium shard"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between py-3 font-mono text-[9px] uppercase tracking-[0.3em] text-dim">
                <span>Fig. 02 — Catalytic resonance, laboratory exposure</span>
              </div>
              <div className="pointer-events-none absolute -inset-3 border border-bone/[0.06]" />
            </Reveal>
          </div>

          {/* copy */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <h2 className="font-display uppercase leading-[0.95] tracking-wide text-bone" style={{ fontSize: "clamp(2.6rem, 5.4vw, 5.2rem)" }}>
              <CharReveal text="WITHOUT IT," stagger={0.03} />
              <br />
              <span className="text-stroke-ember">
                <CharReveal text="ARTS DIE" delay={0.2} stagger={0.03} />
              </span>
              <br />
              <CharReveal text="QUIETLY." delay={0.4} stagger={0.03} />
            </h2>

            <Reveal delay={0.25}>
              <p className="mt-9 max-w-xl font-serif text-lg font-light leading-relaxed text-bone/80 md:text-xl">
                Widely used in the field of Arts, it works as the{" "}
                <span className="italic text-gold">basic material and catalyst</span> of all kinds of
                Arts and Arts items. Strike the stone from the equation, and the miraculous becomes
                a language no one can speak.
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-2">
                {CHIPS.map((c) => (
                  <span
                    key={c}
                    className="border border-bone/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-ash transition-colors duration-300 hover:border-ember/50 hover:text-bone"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* flow diagram */}
            <Reveal delay={0.45}>
              <div className="mt-12 flex max-w-xl items-center justify-between border-y border-bone/10 py-6">
                {FLOW.map((f, i) => (
                  <div key={f} className="flex items-center gap-3 md:gap-6">
                    <div className="text-center">
                      <div className={`font-display text-base uppercase tracking-widest md:text-xl ${i === 0 ? "text-ember" : "text-bone/85"}`}>
                        {f}
                      </div>
                      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-dim">
                        {["THE STONE", "THE SPARK", "THE MIRACLE"][i]}
                      </div>
                    </div>
                    {i < FLOW.length - 1 && (
                      <MoveRight className="h-4 w-4 shrink-0 text-ember/70" strokeWidth={1.25} />
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
