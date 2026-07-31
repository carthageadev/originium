import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// --- Glitch Text Component ---
function GlitchText({ text, active = true }: { text: string; active?: boolean }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#$%^&*()";

  useEffect(() => {
    if (!active) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((c, i) => {
            if (i < iteration) return c;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text, active]);

  return <span>{display}</span>;
}

// --- Procedural Canvas Logic ---
type Vec3 = { x: number; y: number; z: number };
const COUNT = 1600;

function createShapes() {
  const mineral: Vec3[] = [];
  const scale = 220;
  for (let i = 0; i < COUNT; i++) {
    let x = 2, y = 2, z = 2;
    while (Math.abs(x) + Math.abs(y) + Math.abs(z) > 1) {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
    }
    mineral.push({ x: x * scale, y: y * scale, z: z * scale });
  }
  mineral.sort((a, b) => a.y - b.y);

  const arts: Vec3[] = [];
  for (let i = 0; i < COUNT; i++) {
    let x = 2, y = 2, z = 2;
    while (Math.abs(x) + Math.abs(y) + Math.abs(z) > 1) {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
    }
    const sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
    const s = 450 + Math.random() * 150;
    arts.push({ x: (x / sum) * s, y: (y / sum) * s, z: (z / sum) * s });
  }

  const storm: Vec3[] = [];
  for (let i = 0; i < COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 800 + Math.random() * 500;
    storm.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
    });
  }

  const grid: Vec3[] = [];
  const side = Math.ceil(Math.cbrt(COUNT));
  const step = 1000 / side;
  let idx = 0;
  for (let x = 0; x < side; x++) {
    for (let y = 0; y < side; y++) {
      for (let z = 0; z < side; z++) {
        if (idx++ < COUNT) {
          grid.push({
            x: -500 + x * step + (Math.random() * 8 - 4),
            y: -500 + y * step + (Math.random() * 8 - 4),
            z: -500 + z * step + (Math.random() * 8 - 4),
          });
        }
      }
    }
  }

  return { mineral, arts, storm, grid };
}

const SHAPES = createShapes();
const EDGES: [number, number][] = [];
for (let i = 0; i < COUNT - 4; i++) {
  EDGES.push([i, i + 1]);
  EDGES.push([i, i + 2]);
  if (i % 2 === 0) EDGES.push([i, i + 3]);
}

function InteractiveLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const targetProgress = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      targetProgress.current = v;
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.x = nx;
      mouse.current.y = ny;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvasRef.current!.width = width;
    canvasRef.current!.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvasRef.current!.width = width;
      canvasRef.current!.height = height;
    };
    window.addEventListener("resize", resize);

    let currentProgress = 0;
    const particles = SHAPES.mineral.map((p) => ({ x: p.x, y: p.y, z: p.z, px: 0, py: 0 }));
    let time = 0;
    let raf = 0;

    function getTarget(i: number, p: number) {
      let p1, p2, t;
      if (p < 0.33) {
        p1 = SHAPES.mineral[i];
        p2 = SHAPES.arts[i];
        t = p / 0.33;
      } else if (p < 0.66) {
        p1 = SHAPES.arts[i];
        p2 = SHAPES.storm[i];
        t = (p - 0.33) / 0.33;
      } else {
        p1 = SHAPES.storm[i];
        p2 = SHAPES.grid[i];
        t = (p - 0.66) / 0.34;
      }

      t = t * t * (3 - 2 * t);

      let tx = p1.x + (p2.x - p1.x) * t;
      let ty = p1.y + (p2.y - p1.y) * t;
      let tz = p1.z + (p2.z - p1.z) * t;

      if (p > 0.33 && p < 0.8) {
        const intensity = Math.sin(((p - 0.33) / 0.47) * Math.PI);
        tx += Math.sin(time * 0.02 + p1.y * 0.01) * 350 * intensity;
        ty += Math.cos(time * 0.023 + p1.z * 0.01) * 350 * intensity;
        tz += Math.sin(time * 0.018 + p1.x * 0.01) * 350 * intensity;
      }
      return { x: tx, y: ty, z: tz };
    }

    function draw() {
      ctx!.fillStyle = "#030303";
      ctx!.fillRect(0, 0, width, height);

      currentProgress += (targetProgress.current - currentProgress) * 0.04;
      time += 1;

      const rx = time * 0.002 + mouse.current.y * 0.6;
      const ry = time * 0.003 + mouse.current.x * 0.6;
      const cx = Math.cos(rx), sx = Math.sin(rx);
      const cy = Math.cos(ry), sy = Math.sin(ry);

      for (let i = 0; i < COUNT; i++) {
        const pt = particles[i];
        const target = getTarget(i, currentProgress);

        pt.x += (target.x - pt.x) * 0.06;
        pt.y += (target.y - pt.y) * 0.06;
        pt.z += (target.z - pt.z) * 0.06;

        let px = pt.x, py = pt.y, pz = pt.z;

        let ty = py * cx - pz * sx;
        let tz = py * sx + pz * cx;
        py = ty;
        pz = tz;

        let tx = px * cy + pz * sy;
        tz = -px * sy + pz * cy;
        px = tx;
        pz = tz;

        const fov = 800;
        const scale = fov / (fov + pz + 1200);
        pt.px = width / 2 + px * scale;
        pt.py = height / 2 + py * scale;
      }

      let r = 255, g = 60, b = 0;
      if (currentProgress > 0.33 && currentProgress < 0.66) {
        const t = (currentProgress - 0.33) / 0.33;
        g = 60 * (1 - t);
      } else if (currentProgress >= 0.66) {
        const t = (currentProgress - 0.66) / 0.34;
        r = 255 - (255 - 240) * t;
        g = 0 + 230 * t;
        b = 0 + 210 * t;
      }

      ctx!.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.35)`;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (let i = 0; i < EDGES.length; i++) {
        const a = particles[EDGES[i][0]];
        const b = particles[EDGES[i][1]];
        if (a.px > -100 && a.px < width + 100 && b.px > -100 && b.px < width + 100) {
          ctx!.moveTo(a.px, a.py);
          ctx!.lineTo(b.px, b.py);
        }
      }
      ctx!.stroke();

      ctx!.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.9)`;
      for (let i = 0; i < COUNT; i++) {
        const pt = particles[i];
        if (pt.px > -10 && pt.px < width + 10 && pt.py > -10 && pt.py < height + 10) {
          ctx!.fillRect(pt.px - 1, pt.py - 1, 2, 2);
        }
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
}

// --- Main App ---
export default function App() {
  const { scrollYProgress } = useScroll();
  const progressText = useTransform(scrollYProgress, (v) => `SYS.PROG: ${(v * 100).toFixed(2)}%`);

  return (
    <main className="bg-[#030303] text-[#f5f2eb] min-h-[400vh] font-mono selection:bg-[#ff3c00] selection:text-white relative">
      <div className="crt pointer-events-none" />
      <div className="vignette pointer-events-none" />

      <InteractiveLattice />

      <div className="fixed inset-x-8 top-8 z-20 flex justify-between uppercase text-[10px] tracking-[0.3em] opacity-50 mix-blend-difference pointer-events-none text-white">
        <div>
          <GlitchText text="TERRA ARCHIVE // 001" />
        </div>
        <div className="text-right">
          <GlitchText text="HAZARD LEVEL: OMEGA" />
          <br />
          <motion.span>{progressText}</motion.span>
        </div>
      </div>

      <div className="fixed bottom-8 left-8 z-20 text-[10px] uppercase tracking-[0.3em] opacity-50 mix-blend-difference pointer-events-none text-white">
        SCROLL TO ENGAGE LATTICE
      </div>

      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none mix-blend-difference overflow-hidden text-white">
        
        {/* Phase 1: MINERAL */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.15, 0.25, 1], [1, 1, 0, 0]),
            scale: useTransform(scrollYProgress, [0, 0.25, 1], [1, 1.4, 1.6]),
            filter: useTransform(scrollYProgress, [0.15, 0.25, 1], ["blur(0px)", "blur(20px)", "blur(30px)"]),
          }}
        >
          <div className="text-[12px] tracking-[1em] mb-4 text-white">SPECIMEN 001</div>
          <h1 className="text-[18vw] font-display leading-[0.8] text-white tracking-tight">ORIGINIUM</h1>
        </motion.div>

        {/* Phase 2: CATALYST */}
        <motion.div
          className="absolute flex flex-col items-center text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.15, 0.25, 0.45, 0.55, 1], [0, 1, 1, 0, 0]),
            scale: useTransform(scrollYProgress, [0.15, 0.55, 1], [0.8, 1.2, 1.6]),
            filter: useTransform(scrollYProgress, [0.45, 0.55, 1], ["blur(0px)", "blur(20px)", "blur(30px)"]),
          }}
        >
          <div className="text-[12px] tracking-[1em] mb-4 text-white">ARTS CATALYSIS</div>
          <h1 className="text-[14vw] font-display leading-[0.8] text-white tracking-tight">
            ENORMOUS<br />ENERGY
          </h1>
        </motion.div>

        {/* Phase 3: STORM */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.45, 0.55, 0.75, 0.85, 1], [0, 1, 1, 0, 0]),
            scale: useTransform(scrollYProgress, [0.45, 0.85, 1], [0.8, 1.2, 1.6]),
            filter: useTransform(scrollYProgress, [0.75, 0.85, 1], ["blur(0px)", "blur(20px)", "blur(30px)"]),
          }}
        >
          <div className="text-[12px] tracking-[1em] mb-4 text-white">SYSTEM WARNING</div>
          <h1 className="text-[16vw] font-display leading-[0.8] text-white tracking-tight">CATASTROPHE</h1>
        </motion.div>

        {/* Phase 4: GRID */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]),
            scale: useTransform(scrollYProgress, [0.75, 1], [0.8, 1]),
          }}
        >
          <div className="text-[12px] tracking-[1em] mb-4 text-white">CONTAINMENT PROTOCOL</div>
          <h1 className="text-[15vw] font-display leading-[0.8] text-white tracking-tight">ENERGY ERA</h1>
        </motion.div>

      </div>
    </main>
  );
}
