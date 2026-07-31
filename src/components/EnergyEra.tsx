import { ArrowDownRight, FlaskConical, Gem, PlugZap, TrendingUp, type LucideIcon } from "lucide-react";
import { CharReveal, Counter, Reveal, SectionHead } from "./ui";

type Step = { icon: LucideIcon; era: string; title: string; body: string };

const STEPS: Step[] = [
  {
    icon: Gem,
    era: "ERA I",
    title: "The Mineral",
    body: "Pulled from the earth as ore. Collected first as curiosity, then as commodity.",
  },
  {
    icon: FlaskConical,
    era: "ERA II",
    title: "The Catalyst",
    body: "Bound into every Arts item. The engine of ritual, industry and war alike.",
  },
  {
    icon: PlugZap,
    era: "ERA III",
    title: "The Grid",
    body: "As technologies develop, more and more countries start to use it as an energy source.",
  },
];

export default function EnergyEra() {
  return (
    <section className="relative px-6 py-28 md:px-14 md:py-40 lg:px-20">
      <SectionHead index="05" label="Energy Era" zh="能" note="Civilisational uptake — ongoing" />

      <h2 className="font-display uppercase leading-[0.92] tracking-wide text-bone" style={{ fontSize: "clamp(2.8rem, 7.5vw, 8rem)" }}>
        <CharReveal text="TERRA RUNS" stagger={0.03} />
        <br />
        <span className="text-stroke">
          <CharReveal text="ON THE STONE" delay={0.2} stagger={0.03} />
        </span>
      </h2>

      <Reveal delay={0.25}>
        <div className="mt-8 flex items-center gap-3 font-serif text-lg italic text-ash md:text-xl">
          <ArrowDownRight className="h-5 w-5 text-ember" strokeWidth={1.25} />
          Every civilisation’s next era arrives crystallised.
        </div>
      </Reveal>

      {/* progression */}
      <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
        {STEPS.map((s, i) => (
          <Reveal key={s.era} delay={i * 0.12} className="relative">
            <div className={`border-t border-bone/10 pt-8 ${i > 0 ? "md:border-l md:pl-10" : ""} md:pr-10`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.35em] text-ember">{s.era}</span>
                <s.icon strokeWidth={1.1} className="h-6 w-6 text-ash" />
              </div>
              <h3 className="mt-6 font-display text-2xl uppercase tracking-wide text-bone/90 md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ash">{s.body}</p>
            </div>
            {i < STEPS.length - 1 && (
              <span className="absolute left-0 top-[-5px] hidden h-[9px] w-[9px] rotate-45 bg-ember/70 md:block" />
            )}
          </Reveal>
        ))}
      </div>

      {/* readings */}
      <div className="mt-24 grid grid-cols-1 gap-10 border-y border-bone/10 py-12 sm:grid-cols-3 md:mt-32">
        <Reveal>
          <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-dim">Archive specimen no.</div>
          <div className="mt-3 font-display text-5xl tracking-wide text-bone md:text-6xl">
            <Counter to={1} pad={3} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-dim">Arts dependence</div>
          <div className="mt-3 font-display text-5xl tracking-wide text-ember md:text-6xl">
            <Counter to={100} />
            <span className="text-3xl md:text-4xl">%</span>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-dim">National adoption</div>
          <div className="mt-3 flex items-center gap-4 font-display text-5xl uppercase tracking-wide text-bone md:text-6xl">
            Rising
            <TrendingUp className="h-9 w-9 text-ember md:h-12 md:w-12" strokeWidth={1.1} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
