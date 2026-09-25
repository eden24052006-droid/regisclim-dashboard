import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Flame, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export function Reveal({
  children,
  className,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

export function SplitWords({
  text,
  delay = 0,
  step = 70,
  className,
}: {
  text: string;
  delay?: number;
  step?: number;
  className?: string;
}) {
  // French typography: keep "?", "!", ":" and ";" glued to the previous word
  // (non-breaking space) so they never wrap onto a line of their own.
  const words = text.split(" ").reduce<string[]>((acc, word) => {
    if (acc.length > 0 && /^[?!:;»]+$/.test(word)) acc[acc.length - 1] += `\u00a0${word}`;
    else acc.push(word);
    return acc;
  }, []);
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span
            className={cn("word", className)}
            style={{ animationDelay: `${delay + i * step}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => {
        // Alternate cold and warm separators, like the logo's blue and orange arrows.
        const Icon = i % 2 === 0 ? Snowflake : Flame;
        return (
          <li key={item} className="flex items-center gap-8 pr-8 whitespace-nowrap">
            <span>{item}</span>
            <Icon
              aria-hidden
              className={cn("size-5 shrink-0", i % 2 === 0 ? "text-primary" : "text-accent")}
            />
          </li>
        );
      })}
    </ul>
  );
  return (
    <div
      className={cn(
        "marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.6);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

/** Tracks the pointer so `.spotlight` elements can draw a glow under the cursor. */
export function PointerSpotlight() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.(".spotlight");
      if (!(target instanceof HTMLElement)) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora-blob -top-40 -left-40 size-[38rem] bg-primary/50" />
      <div
        className="aurora-blob top-1/3 -right-40 size-[34rem] bg-accent/35"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="aurora-blob -bottom-60 left-1/4 size-[40rem] bg-[oklch(0.5_0.18_265)]/40"
        style={{ animationDelay: "-14s" }}
      />
      <div className="noise absolute inset-0" />
    </div>
  );
}
