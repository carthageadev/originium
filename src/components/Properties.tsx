import { CloudLightning, Gem, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { Reveal, SectionHead } from "./ui";

type Prop = {
  icon: LucideIcon;
  idx: string;
  tag: string;
  title: string;
  body: string;
};

const PROPS: Prop[] = [
  {
    icon: Gem,
    idx: "02.1",
    tag: "FORM",
    title: "Semi-transparent black crystal",
    body: "An obsidian body with a glassy lustre. Light enters the lattice — and does not leave it unchanged.",
  },
  {
    icon: Zap,
    idx: "02.2",
    tag: "CONTENT",
    title: "Enormous energy",
    body: "A lattice saturated with raw power, held in suspension until something — or someone — finally asks for it.",
  },
  {
    icon: Sparkles,
    idx: "02.3",
    tag: "FUNCTION",
    title: "Catalyst of all Arts",
    body: "The basic material and catalyst of every kind of Arts and Arts item. The medium through which the impossible becomes routine.",
  },
  {
    icon: CloudLightning,
    idx: "02.4",
    tag: "CONSEQUENCE",
    title: "Vector of Catastrophe",
    body: "The primary factor behind the Catastrophes that periodically scour the face of Terra. Every shard is a storm, waiting.",
  },
];

export default function Properties() {
  return (
    <section className="relative bg-coal/30 px-6 py-28 md:px-14 md:py-40 lg:px-20">
      <SectionHead index="02" label="Properties" zh="性" note="Examination of specimen 001 — four readings" />

      <div className="grid grid-cols-1 gap-px bg-bone/[0.07] sm:grid-cols-2 lg:grid-cols-4">
        {PROPS.map((p, i) => (
          <Reveal key={p.idx} delay={i * 0.08} className="h-full">
            <article className="group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden bg-ink p-7 transition-colors duration-500 md:p-8">
              {/* hover glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ember/[0.12] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] tracking-[0.3em] text-dim transition-colors duration-500 group-hover:text-ember">
                  {p.idx}
                </span>
                <p.icon
                  strokeWidth={1.25}
                  className="h-6 w-6 text-ash transition-all duration-500 group-hover:-translate-y-1 group-hover:text-ember"
                />
              </div>

              <div>
                <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.4em] text-dim">{p.tag}</div>
                <h3 className="font-display text-[1.45rem] uppercase leading-[1.05] tracking-wide text-bone/90 transition-colors duration-500 group-hover:text-bone md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-[13px] leading-relaxed text-ash">{p.body}</p>
              </div>

              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-ember to-transparent transition-all duration-700 group-hover:w-full" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
