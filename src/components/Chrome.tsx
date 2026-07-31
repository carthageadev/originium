import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";

/** Fixed site chrome: scroll progress, archival header, ambient cursor glow. */
export default function Chrome() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  const mx = useMotionValue(-800);
  const my = useMotionValue(-800);
  const cx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const cy = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX - 260);
      my.set(e.clientY - 260);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-blood via-ember to-gold"
        style={{ scaleX: progress }}
      />

      {/* archival header */}
      <header className="fixed inset-x-0 top-0 z-[95] flex items-center justify-between px-5 py-4 font-mono text-[9px] uppercase tracking-[0.35em] text-bone/60 md:px-10 md:py-5 md:text-[10px]">
        <span className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-ember" />
          Terra Mineral Archive
        </span>
        <span className="hidden md:block">
          Specimen 001 — <span className="font-cjk tracking-[0.2em]">源石</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-1 animate-pulse rounded-full bg-ember" />
          Hazard class — active
        </span>
      </header>

      {/* cursor glow */}
      <motion.div
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[85] h-[520px] w-[520px] rounded-full"
        style={{
          x: cx,
          y: cy,
          background:
            "radial-gradient(closest-side, rgba(255,122,28,0.07), rgba(255,122,28,0.02) 55%, transparent)",
        }}
      />
    </>
  );
}
