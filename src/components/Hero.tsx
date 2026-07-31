import { motion, useScroll, useTransform } from "framer-motion";
import { Plus, Volume2 } from "lucide-react";
import { useRef } from "react";
import EmberField from "./EmberField";
import { CharReveal } from "./ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);
  const uiFade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const speak = () => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance("Originium. The source stone of Terra.");
      u.lang = "en-US";
      u.rate = 0.82;
      u.pitch = 0.8;
      window.speechSynthesis.speak(u);
    } catch {
      /* silent */
    }
  };

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[700px] overflow-hidden">
      {/* archival frame */}
      <div className="pointer-events-none absolute inset-3 z-30 border border-bone/[0.07] md:inset-5">
        {["-left-[5px] -top-[5px]", "-right-[5px] -top-[5px]", "-bottom-[5px] -left-[5px]", "-bottom-[5px] -right-[5px]"].map(
          (pos) => (
            <Plus key={pos} className={`absolute ${pos} h-[10px] w-[10px] text-ember/70`} strokeWidth={1} />
          )
        )}
      </div>

      {/* giant word — behind the crystal */}
      <motion.div
        style={{ y: wordY }}
        className="absolute inset-0 z-10 flex items-center justify-center pt-[6vh]"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="select-none text-center font-display leading-[0.82] tracking-[0.01em] text-bone"
          style={{ fontSize: "clamp(4.2rem, 17.5vw, 21rem)" }}
        >
          <CharReveal text="ORIGINIUM" delay={0.25} stagger={0.055} />
        </motion.h1>
      </motion.div>

      {/* crystal specimen */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 z-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.5, ease: EASE }}
          className="animate-drift"
        >
          <img
            src="/images/originium-hero.jpg"
            alt="Originium — a semi-transparent black crystal containing enormous energy"
            className="mask-fade-radial h-[46vh] w-auto object-contain drop-shadow-[0_0_80px_rgba(255,122,28,0.32)] md:h-[58vh]"
          />
        </motion.div>
      </motion.div>

      <EmberField className="z-40" density={1.1} />

      {/* top: phonetics */}
      <motion.div
        style={{ opacity: uiFade }}
        className="absolute inset-x-0 top-24 z-40 flex flex-col items-center gap-4 md:top-28"
      >
        <motion.button
          onClick={speak}
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: EASE }}
          className="group flex items-center gap-3 border border-bone/10 bg-ink/40 px-4 py-2 font-mono text-[10px] tracking-[0.3em] text-ash backdrop-blur-sm transition-colors duration-300 hover:border-ember/50 hover:text-bone md:text-[11px]"
        >
          <Volume2 className="h-3.5 w-3.5 text-ember transition-transform duration-300 group-hover:scale-125" />
          / əˈɹɪd͡ʒɪniəm /
          <span className="text-dim transition-colors group-hover:text-ember">ENUNCIATE</span>
        </motion.button>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="flex items-center gap-4 font-cjk text-sm tracking-[0.5em] text-bone/50"
        >
          源石<span className="font-mono text-[10px] tracking-[0.35em] text-dim">YUÁN SHÍ</span>
        </motion.div>
      </motion.div>

      {/* left rail */}
      <motion.div
        style={{ opacity: uiFade }}
        className="absolute left-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex"
      >
        <span className="v-text font-mono text-[9px] uppercase tracking-[0.4em] text-dim">
          Common mineral of Terra — record 001
        </span>
        <span className="h-24 w-px bg-gradient-to-b from-ember/60 to-transparent" />
      </motion.div>

      {/* right rail — specimen data */}
      <motion.div
        style={{ opacity: uiFade }}
        className="absolute right-7 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-5 text-right lg:flex"
      >
        {[
          ["STATE", "CRYSTALLINE"],
          ["CLASS", "STRATEGIC"],
          ["ENERGY", "ENORMOUS"],
          ["RISK", "EXTREME"],
        ].map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.4 + i * 0.12, ease: EASE }}
          >
            <div className="font-mono text-[9px] tracking-[0.35em] text-dim">{k}</div>
            <div className={`mt-1 font-mono text-[11px] tracking-[0.25em] ${v === "EXTREME" ? "text-ember" : "text-bone/80"}`}>
              {v}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* bottom row */}
      <motion.div
        style={{ opacity: uiFade }}
        className="absolute inset-x-7 bottom-9 z-40 flex items-end justify-between md:inset-x-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col gap-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-dim">Scroll to open dossier</span>
          <motion.span
            animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-10 w-px bg-ember"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="hidden text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.3em] text-dim md:block"
        >
          Semi-transparent
          <br />
          black crystal
          <br />
          <span className="text-ember/80">Primary factor of Catastrophes</span>
        </motion.div>
      </motion.div>

      {/* vignettes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
    </section>
  );
}
