import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  speed: number;
  sway: number;
  phase: number;
  alpha: number;
  warm: number;
};

/** Drifting ember / crystal-dust particle field rendered on canvas. */
export default function EmberField({
  density = 1,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let parts: Particle[] = [];
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const spawn = (anywhere = false): Particle => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + Math.random() * 40,
      r: 0.4 + Math.random() * 1.8,
      speed: 0.12 + Math.random() * 0.5,
      sway: 0.3 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.15 + Math.random() * 0.65,
      warm: Math.random(),
    });

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(130, Math.floor(((w * h) / 16000) * density));
      parts = Array.from({ length: count }, () => spawn(true));
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        p.y -= p.speed;
        p.x += Math.sin(t * 0.00045 + p.phase) * p.sway * 0.35;
        if (p.y < -12) Object.assign(p, spawn());
        if (p.x < -12) p.x = w + 10;
        if (p.x > w + 12) p.x = -10;

        const flicker = 0.55 + 0.45 * Math.sin(t * 0.003 + p.phase * 3);
        const a = p.alpha * flicker * Math.min(1, (h - p.y) / (h * 0.12) + 0.25);

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        const col = p.warm > 0.25 ? "255,138,44" : "240,196,120";
        g.addColorStop(0, `rgba(${col},${a})`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} />;
}
