import { useEffect, useRef } from "react";

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

/**
 * Wall-mounted AC unit pinned under the header. Scrolling down opens the
 * flap and its airflow lifts and ripples the page blocks, as if the wind
 * were pushing the site down.
 */
export function AirConditioner() {
  const flapRef = useRef<SVGGElement>(null);
  const ledRef = useRef<SVGCircleElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const unit = unitRef.current;
    if (!unit) return;

    let blocks: Block[] = [];
    let intensity = 0;
    let lastY = window.scrollY;
    let frame = 0;
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
        const strength = intensity / (1 + distance / 900);
        // A wave that travels outwards from the AC unit.
        const wave = Math.sin(now * 0.009 - distance * 0.011 + block.seed);
        const lift = strength * (0.65 + 0.35 * wave);
        block.el.style.transform =
          `perspective(900px) translate3d(${(-strength * (3 + wave * 5)).toFixed(2)}px, ${(-lift * 16).toFixed(2)}px, 0) ` +
          `rotateX(${(strength * wave * 8).toFixed(2)}deg) rotateZ(${(-strength * wave * 1.2).toFixed(2)}deg) ` +
          `skewX(${(strength * wave * 2.5).toFixed(2)}deg)`;
      }

      if (flapRef.current) {
        flapRef.current.style.transform = `translateY(${intensity * 15}px) scaleY(${1 - intensity * 0.3})`;
      }
      if (ledRef.current) ledRef.current.style.opacity = String(0.25 + intensity * 0.75);
      unit.style.transform = `translateY(${Math.sin(now / 40) * intensity * 0.8}px)`;

      intensity *= 0.95;
      if (intensity > 0.003) {
        frame = requestAnimationFrame(render);
      } else {
        running = false;
        intensity = 0;
        blocks.forEach(resetBlock);
        blocks = [];
        unit.style.transform = "";
        if (flapRef.current) flapRef.current.style.transform = "";
        if (ledRef.current) ledRef.current.style.opacity = "0.25";
      }
    };

    const blow = (amount: number) => {
      intensity = Math.min(1, intensity + amount);
      if (running) return;
      running = true;
      prepare();
      frame = requestAnimationFrame(render);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (delta > 0) blow(delta / 320);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const teaser = window.setTimeout(() => blow(0.6), 1400);

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
    </div>
  );
}
