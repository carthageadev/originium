import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- char-by-char masked heading reveal ---------- */
export function CharReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.06em] ${className}`} aria-label={text}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ y: "118%", rotate: 5 }}
          whileInView={{ y: "0%", rotate: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.95, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------- generic fade/slide reveal ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- archive section header ---------- */
export function SectionHead({
  index,
  label,
  zh,
  note,
}: {
  index: string;
  label: string;
  zh: string;
  note?: string;
}) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-center gap-4 md:gap-6">
        <span className="font-mono text-[11px] tracking-[0.3em] text-ember">[{index}]</span>
        <span className="hairline w-10 shrink-0 md:w-20" />
        <span className="font-mono text-[11px] uppercase tracking-[0.45em] text-bone/80">{label}</span>
        <span className="hairline flex-1" />
        <span className="font-cjk text-lg text-bone/25 md:text-xl">{zh}</span>
      </div>
      {note && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-dim">{note}</p>
      )}
    </Reveal>
  );
}

/* ---------- animated counter ---------- */
export function Counter({
  to,
  pad = 2,
  className = "",
}: {
  to: number;
  pad?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {String(val).padStart(pad, "0")}
    </span>
  );
}

/* ---------- marquee ---------- */
export function Marquee({
  children,
  slow = false,
  className = "",
}: {
  children: ReactNode;
  slow?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max items-center ${slow ? "animate-marquee-slow" : "animate-marquee"}`}>
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
