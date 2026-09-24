import { useEffect, useRef, useState } from "react";

/** Returns 0→1 as the element scrolls through the middle of the viewport. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      setProgress(Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return [ref, progress] as const;
}
