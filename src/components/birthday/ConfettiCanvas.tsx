import { useEffect, useRef } from "react";

interface Props {
  /** Increment this key to re-trigger confetti */
  triggerKey: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  shape: "rect" | "circle" | "star";
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  life: number;
}

const COLORS = [
  "#e05c78", "#f4a0b0", "#d4a843", "#fde68a",
  "#c17bd4", "#93c5fd", "#6ee7b7", "#fca5a5",
];

function createParticles(canvas: HTMLCanvasElement): Particle[] {
  const count = 160;
  return Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    vx: (Math.random() - 0.5) * 5,
    vy: Math.random() * 3 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: (["rect", "circle", "star"] as const)[Math.floor(Math.random() * 3)],
    size: Math.random() * 8 + 5,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.15,
    opacity: 1,
    life: 1,
  }));
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
    const ai = a + Math.PI / 5;
    if (i === 0) ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
    else ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    ctx.lineTo(x + (r * 0.4) * Math.cos(ai), y + (r * 0.4) * Math.sin(ai));
  }
  ctx.closePath();
}

export default function ConfettiCanvas({ triggerKey }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);

  useEffect(() => {
    if (triggerKey === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesRef.current = createParticles(canvas);
    activeRef.current = true;

    const ctx = canvas.getContext("2d")!;

    const tick = () => {
      if (!activeRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.02);

      for (const p of particlesRef.current) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        p.life     -= 0.007;
        p.opacity   = Math.max(0, p.life);

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle   = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawStar(ctx, 0, 0, p.size / 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        activeRef.current = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      activeRef.current = false;
    };
  }, [triggerKey]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  );
}
