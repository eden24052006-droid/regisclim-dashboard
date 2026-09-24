import { useEffect, useRef } from "react";

type Gust = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
  phase: number;
  flake: boolean;
};

const VENT_WIDTH = 0.72; // share of the unit width that blows air

/**
 * Wall-mounted AC unit pinned under the header. Scrolling down opens the
 * flap and blows air downwards, so it looks like the wind moves the page.
 */
export function AirConditioner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flapRef = useRef<SVGGElement>(null);
  const ledRef = useRef<SVGCircleElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const unit = unitRef.current;
    if (!canvas || !ctx || !unit) return;

    const gusts: Gust[] = [];
    let intensity = 0;
    let lastY = window.scrollY;
    let frame = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (w: number) => {
      const ventWidth = unit.offsetWidth * VENT_WIDTH;
      const offset = (Math.random() - 0.5) * ventWidth;
      gusts.push({
        x: w / 2 + offset,
        y: 2,
        vx: (offset / ventWidth) * 2.2 + (Math.random() - 0.5) * 0.6,
        vy: 3 + Math.random() * 3 + intensity * 7,
        life: 0,
        maxLife: 38 + Math.random() * 42,
        length: 8 + Math.random() * 16,
        phase: Math.random() * Math.PI * 2,
        flake: Math.random() < 0.12,
      });
    };

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Soft cone of cold air under the vent.
      if (intensity > 0.02) {
        const ventWidth = unit.offsetWidth * VENT_WIDTH;
        const cone = ctx.createLinearGradient(0, 0, 0, h * 0.8);
        cone.addColorStop(0, `rgba(140, 210, 255, ${0.22 * intensity})`);
        cone.addColorStop(1, "rgba(140, 210, 255, 0)");
        ctx.fillStyle = cone;
        ctx.beginPath();
        ctx.moveTo(w / 2 - ventWidth / 2, 0);
        ctx.lineTo(w / 2 + ventWidth / 2, 0);
        ctx.lineTo(w, h * 0.8);
        ctx.lineTo(0, h * 0.8);
        ctx.closePath();
        ctx.fill();
      }

      const births = intensity * 5;
      for (let i = 0; i < births; i++) {
        if (Math.random() < births - i) spawn(w);
      }

      ctx.lineCap = "round";
      for (let i = gusts.length - 1; i >= 0; i--) {
        const g = gusts[i]!;
        g.life += 1;
        g.phase += 0.15;
        g.x += g.vx + Math.sin(g.phase) * 0.6;
        g.y += g.vy;
        g.vy *= 0.985;
        if (g.life >= g.maxLife || g.y > h) {
          gusts.splice(i, 1);
          continue;
        }
        const fade = 1 - g.life / g.maxLife;
        if (g.flake) {
          ctx.fillStyle = `rgba(230, 245, 255, ${0.85 * fade})`;
          ctx.beginPath();
          ctx.arc(g.x, g.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const tailX = g.x - g.vx * (g.length / 4);
          const tailY = g.y - g.length;
          const stroke = ctx.createLinearGradient(g.x, g.y, tailX, tailY);
          stroke.addColorStop(0, `rgba(190, 230, 255, ${0.75 * fade})`);
          stroke.addColorStop(1, "rgba(190, 230, 255, 0)");
          ctx.strokeStyle = stroke;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.quadraticCurveTo(g.x + Math.sin(g.phase) * 4, (g.y + tailY) / 2, g.x, g.y);
          ctx.stroke();
        }
      }

      if (flapRef.current)
        flapRef.current.style.transform = `translateY(${intensity * 15}px) scaleY(${1 - intensity * 0.3})`;
      if (ledRef.current) ledRef.current.style.opacity = String(0.25 + intensity * 0.75);
      unit.style.transform = `translateY(${Math.sin(performance.now() / 40) * intensity * 0.8}px)`;

      intensity *= 0.94;
      if (intensity > 0.004 || gusts.length > 0) {
        frame = requestAnimationFrame(render);
      } else {
        running = false;
        intensity = 0;
        ctx.clearRect(0, 0, w, h);
      }
    };

    const blow = (amount: number) => {
      intensity = Math.min(1, intensity + amount);
      if (!running) {
        running = true;
        frame = requestAnimationFrame(render);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (delta > 0) blow(delta / 220);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    const teaser = window.setTimeout(() => blow(0.55), 1400);

    return () => {
      window.clearTimeout(teaser);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-2 z-40 w-24 animate-rise [animation-delay:900ms] sm:right-4 sm:w-32 xl:right-6 xl:w-36 print:hidden"
      style={{ top: "calc(var(--header-h, 112px) + 0.75rem)" }}
    >
      <div ref={unitRef} className="relative drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]">
        <svg viewBox="0 0 200 76" className="w-full overflow-visible">
          <defs>
            <linearGradient id="ac-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7f9fc" />
              <stop offset="1" stopColor="#d9e1ea" />
            </linearGradient>
            <linearGradient id="ac-flap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#eef2f7" />
              <stop offset="1" stopColor="#c9d3de" />
            </linearGradient>
            <filter id="ac-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>
          <rect x="2" y="2" width="196" height="60" rx="16" fill="url(#ac-body)" />
          <rect x="14" y="7" width="172" height="2" rx="1" fill="#ffffff" opacity="0.9" />
          <text
            x="18"
            y="31"
            fontFamily="Sora, sans-serif"
            fontSize="12"
            fontWeight="700"
            fill="#1d2a3a"
          >
            Régis<tspan fill="#0a86c4">.</tspan>
            <tspan fill="#f06a1d">CLIM</tspan>
          </text>
          <rect x="150" y="20" width="32" height="14" rx="4" fill="#1d2a3a" opacity="0.9" />
          <circle
            ref={ledRef}
            cx="175"
            cy="27"
            r="3.5"
            fill="#5fd0ff"
            filter="url(#ac-glow)"
            opacity="0.25"
          />
          <circle cx="175" cy="27" r="2" fill="#bfeaff" />
          <text x="156" y="30.5" fontFamily="monospace" fontSize="8" fill="#5fd0ff">
            19°
          </text>
          <rect x="12" y="44" width="176" height="12" rx="6" fill="#16202c" />
          <g ref={flapRef} style={{ transformOrigin: "100px 50px", transformBox: "view-box" }}>
            <rect x="14" y="50" width="172" height="8" rx="4" fill="url(#ac-flap)" />
          </g>
        </svg>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-[calc(100%-0.35rem)] left-1/2 h-[min(65vh,560px)] w-[260%] -translate-x-1/2"
      />
    </div>
  );
}
