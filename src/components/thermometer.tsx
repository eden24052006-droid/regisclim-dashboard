import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const HOT = 32;
const COLD = 19;

/**
 * Thermometer pinned to the side of the screen: it reads 32° at the top of
 * the page and cools down to 19° as the visitor scrolls to the bottom.
 */
export function Thermometer() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const temperature = Math.round(HOT - (HOT - COLD) * progress);
  const warm = temperature > 25;
  const level = 1 - progress * 0.82; // share of the tube filled with "mercury"

  return (
    <div aria-hidden className="pointer-events-none relative z-30 print:hidden">
      {/* Desktop: vertical thermometer on the left edge. */}
      <div className="glass fixed top-1/2 left-4 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-full px-2 pt-4 pb-2 xl:flex">
        <span
          className={cn(
            "font-display text-sm font-bold tabular-nums transition-colors duration-700",
            warm ? "text-accent" : "text-primary",
          )}
        >
          {temperature}°
        </span>
        <div className="relative h-52 w-2.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-x-0 bottom-0 rounded-full bg-[linear-gradient(to_top,var(--color-primary),var(--color-accent))] bg-[length:100%_13rem] bg-bottom transition-[height] duration-300 ease-out"
            style={{ height: `${level * 100}%` }}
          />
          {[0.25, 0.5, 0.75].map((mark) => (
            <span
              key={mark}
              className="absolute left-0 h-px w-1.5 bg-white/40"
              style={{ bottom: `${mark * 100}%` }}
            />
          ))}
        </div>
        <span
          className={cn(
            "grid size-7 place-items-center rounded-full shadow-[0_0_20px_-2px_currentColor] transition-colors duration-700",
            warm ? "bg-accent text-accent" : "bg-primary text-primary",
          )}
        >
          <span className="size-3 rounded-full bg-white/60" />
        </span>
      </div>

      {/* Smaller screens: compact reading in the bottom-left corner. */}
      <div className="glass fixed right-3 bottom-3 flex items-center gap-2 rounded-full bg-background/70! py-1.5 pr-3 pl-1.5 xl:hidden">
        <span className="relative h-7 w-2 overflow-hidden rounded-full bg-white/10">
          <span
            className="absolute inset-x-0 bottom-0 rounded-full bg-[linear-gradient(to_top,var(--color-primary),var(--color-accent))] transition-[height] duration-300"
            style={{ height: `${level * 100}%` }}
          />
        </span>
        <span
          className={cn(
            "font-display text-sm font-bold tabular-nums transition-colors duration-700",
            warm ? "text-accent" : "text-primary",
          )}
        >
          {temperature}°
        </span>
      </div>
    </div>
  );
}
