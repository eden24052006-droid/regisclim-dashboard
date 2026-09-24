import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Page blocks that get pushed around by the air flow.
const WIND_TARGETS =
  "main :is(article, aside, img, h1, h2, [role='tab'], ol > li, .glass, .eyebrow-pill, [data-wind])";

type Block = {
  el: HTMLElement;
  x: number;
  y: number;
  seed: number;
};

function collectBlocks(): Block[] {
  const found = Array.from(document.querySelectorAll<HTMLElement>(WIND_TARGETS)).filter(
    (el) => !el.closest("[aria-hidden='true']") && getComputedStyle(el).animationName === "none",
  );
  const set = new Set(found);
  return found
    .filter((el) => {
      // Only move the outermost block so nested ones don't stack their motion.
      for (let p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false;
      return true;
    })
    .map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        el,
        x: rect.left + rect.width / 2,
        y: rect.top + window.scrollY + rect.height / 2,
        seed: Math.random() * Math.PI * 2,
      };
    });
}

function resetBlock({ el }: Block) {
  el.style.transform = "";
  el.style.transformOrigin = "";
  el.style.transition = "";
  el.style.willChange = "";
}

const WIND_PATHS = [
  { d: "M104 0 C 98 60, 72 110, 62 180 S 42 262, 30 300", w: 5.7, delay: "0s" },
  { d: "M116 0 C 112 80, 96 150, 100 230", w: 3.6, delay: "-1.1s" },
  { d: "M122 0 C 124 70, 112 140, 120 210 S 126 272, 120 300", w: 6.8, delay: "-0.5s" },
  { d: "M130 0 C 138 80, 150 150, 148 230", w: 3.6, delay: "-1.7s" },
  { d: "M140 0 C 150 60, 176 110, 186 180 S 204 250, 214 300", w: 5.7, delay: "-0.8s" },
];

/**
 * Small AC unit shown in the header. Scrolling down opens its flap, lets a
 * light breeze out and lifts/ripples the page blocks along a slow wave, as
 * if the airflow were pushing the site down.
 */
export function AirConditioner({ className }: { className?: string }) {
  const flapRef = useRef<SVGGElement>(null);
  const ledRef = useRef<SVGCircleElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);
  const windRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const unit = unitRef.current;
    const wind = windRef.current;
    if (!unit || !wind) return;

    let blocks: Block[] = [];
    let target = 0;
    let intensity = 0;
    let lastY = window.scrollY;
    let frame = 0;
    let lastFrame = 0;
    let running = false;

    const prepare = () => {
      blocks = collectBlocks();
      for (const { el } of blocks) {
        el.style.transformOrigin = "50% 100%";
        el.style.transition = "none";
        el.style.willChange = "transform";
      }
    };

    const render = (now: number) => {
      // The page changed under us (client-side navigation): pick up its blocks.
      if (blocks.length > 0 && !blocks[0]!.el.isConnected) prepare();

      // Ease towards the scroll-driven target so the gust builds up and dies down
      // gently, at the same pace whatever the screen refresh rate.
      const steps = Math.min((now - (lastFrame || now)) / 16.7, 4) || 1;
      lastFrame = now;
      intensity += (target - intensity) * (1 - Math.pow(0.94, steps));
      target *= Math.pow(0.965, steps);

      const unitRect = unit.getBoundingClientRect();
      const sourceX = unitRect.left + unitRect.width / 2;
      const sourceY = unitRect.bottom;
      const viewport = window.innerHeight;

      for (const block of blocks) {
        const y = block.y - window.scrollY;
        if (y < -300 || y > viewport + 300) {
          if (block.el.style.transform) block.el.style.transform = "";
          continue;
        }
        const distance = Math.hypot(sourceX - block.x, sourceY - y);
        const strength = intensity / (1 + distance / 1000);
        // A slow wave that travels outwards from the AC unit.
        const wave = Math.sin(now * 0.0035 - distance * 0.007 + block.seed);
        const lift = strength * (0.65 + 0.35 * wave);
        block.el.style.transform =
          `perspective(900px) translate3d(${(-strength * (3 + wave * 5)).toFixed(2)}px, ${(-lift * 16).toFixed(2)}px, 0) ` +
          `rotateX(${(strength * wave * 7).toFixed(2)}deg) rotateZ(${(-strength * wave * 1).toFixed(2)}deg) ` +
          `skewX(${(strength * wave * 2).toFixed(2)}deg)`;
      }

      wind.style.opacity = String(Math.min(0.75, intensity * 1.1));
      if (flapRef.current) {
        flapRef.current.style.transform = `translateY(${intensity * 15}px) scaleY(${1 - intensity * 0.3})`;
      }
      if (ledRef.current) ledRef.current.style.opacity = String(0.25 + intensity * 0.75);
      unit.style.transform = `translateY(${Math.sin(now / 60) * intensity * 0.5}px)`;

      if (target > 0.008 || intensity > 0.008) {
        frame = requestAnimationFrame(render);
      } else {
        running = false;
        lastFrame = 0;
        target = 0;
        intensity = 0;
        blocks.forEach(resetBlock);
        blocks = [];
        wind.style.opacity = "0";
        wind.classList.add("wind-paused");
        unit.style.transform = "";
        if (flapRef.current) flapRef.current.style.transform = "";
        if (ledRef.current) ledRef.current.style.opacity = "0.25";
      }
    };

    const blow = (amount: number) => {
      target = Math.min(1, target + amount);
      if (running) return;
      running = true;
      prepare();
      wind.classList.remove("wind-paused");
      frame = requestAnimationFrame(render);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (delta > 0) blow(delta / 450);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const teaser = window.setTimeout(() => blow(0.5), 1400);

    return () => {
      window.clearTimeout(teaser);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      blocks.forEach(resetBlock);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative w-14 shrink-0 min-[380px]:w-20 sm:w-24 xl:w-32 print:hidden",
        className,
      )}
    >
      <div ref={unitRef} className="relative drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
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
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <rect x="2" y="2" width="196" height="60" rx="18" fill="url(#ac-body)" />
          <rect x="16" y="8" width="168" height="3" rx="1.5" fill="#ffffff" opacity="0.9" />
          <rect x="20" y="22" width="60" height="5" rx="2.5" fill="#c3cedb" />
          <rect x="130" y="17" width="52" height="20" rx="6" fill="#1d2a3a" opacity="0.9" />
          <circle
            ref={ledRef}
            cx="170"
            cy="27"
            r="5"
            fill="#5fd0ff"
            filter="url(#ac-glow)"
            opacity="0.25"
          />
          <circle cx="170" cy="27" r="3" fill="#bfeaff" />
          <text x="137" y="32" fontFamily="monospace" fontSize="13" fill="#5fd0ff">
            19°
          </text>
          <rect x="12" y="44" width="176" height="12" rx="6" fill="#16202c" />
          <g ref={flapRef} style={{ transformOrigin: "100px 50px", transformBox: "view-box" }}>
            <rect x="14" y="50" width="172" height="8" rx="4" fill="url(#ac-flap)" />
          </g>
        </svg>
      </div>
      <svg
        ref={windRef}
        viewBox="0 0 240 300"
        className="wind-paused absolute top-[calc(100%-2px)] left-1/2 h-72 w-60 -translate-x-1/2 xl:h-80 xl:w-72 overflow-visible opacity-0"
      >
        <defs>
          <linearGradient
            id="wind-fade"
            x1="0"
            y1="0"
            x2="0"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="rgb(205, 238, 255)" stopOpacity="0.95" />
            <stop offset="0.6" stopColor="rgb(160, 215, 255)" stopOpacity="0.35" />
            <stop offset="1" stopColor="rgb(160, 215, 255)" stopOpacity="0" />
          </linearGradient>
          <filter id="wind-blur" x="-40%" y="-20%" width="180%" height="140%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
        </defs>
        <g fill="none" stroke="url(#wind-fade)" strokeLinecap="round" filter="url(#wind-blur)">
          {WIND_PATHS.map(({ d, w, delay }) => (
            <path
              key={d}
              d={d}
              strokeWidth={w}
              className="wind-line"
              style={{ animationDelay: delay }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
