import { Hand } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const BRUSH = 46; // wipe radius in CSS pixels
const REFOG_DELAY = 2500; // ms without wiping before the glass fogs up again

/**
 * Condensation layer laid over an image: the visitor wipes it off with the
 * pointer, and it slowly fogs up again after a while.
 */
export function FoggedGlass({ src, className }: { src: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wiped, setWiped] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const image = new Image();
    image.src = src;

    // The fog texture (blurred, frosted picture) is rendered once per size.
    const fog = document.createElement("canvas");
    const fogCtx = fog.getContext("2d");
    if (!fogCtx) return;

    let width = 0;
    let height = 0;
    let lastWipe = 0;
    let lastPoint: { x: number; y: number } | null = null;
    let frame = 0;

    const drawCover = (target: CanvasRenderingContext2D) => {
      if (!image.complete || !image.naturalWidth) return;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      target.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
    };

    const buildFog = () => {
      fog.width = canvas.width;
      fog.height = canvas.height;
      const dpr = canvas.width / width;
      fogCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fogCtx.clearRect(0, 0, width, height);
      fogCtx.save();
      fogCtx.filter = "blur(14px) saturate(0.75)";
      drawCover(fogCtx);
      fogCtx.restore();
      fogCtx.fillStyle = "rgba(214, 232, 244, 0.5)";
      fogCtx.fillRect(0, 0, width, height);
      // Fine grain so it reads as condensation rather than a flat tint.
      for (let i = 0; i < (width * height) / 90; i++) {
        fogCtx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.18})`;
        fogCtx.fillRect(Math.random() * width, Math.random() * height, 1.4, 1.4);
      }
    };

    const paintFog = (alpha = 1) => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = alpha;
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(fog, 0, 0);
      ctx.restore();
    };

    const addDroplets = () => {
      ctx.save();
      for (let i = 0; i < 12; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.8;
        const r = 1.5 + Math.random() * 3;
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        // A faint trickle under some drops.
        if (Math.random() < 0.35) {
          const length = 18 + Math.random() * 40;
          const trickle = ctx.createLinearGradient(x, y, x, y + length);
          trickle.addColorStop(0, "rgba(0,0,0,0.55)");
          trickle.addColorStop(1, "rgba(0,0,0,0)");
          ctx.strokeStyle = trickle;
          ctx.lineWidth = Math.max(1, r * 0.45);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + (Math.random() - 0.5) * 4, y + length);
          ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
        ctx.beginPath();
        ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildFog();
      paintFog();
      addDroplets();
    };

    const wipe = (x: number, y: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      const from = lastPoint ?? { x, y };
      const steps = Math.max(1, Math.ceil(Math.hypot(x - from.x, y - from.y) / (BRUSH / 3)));
      for (let i = 1; i <= steps; i++) {
        const px = from.x + ((x - from.x) * i) / steps;
        const py = from.y + ((y - from.y) * i) / steps;
        const brush = ctx.createRadialGradient(px, py, 0, px, py, BRUSH);
        brush.addColorStop(0, "rgba(0,0,0,1)");
        brush.addColorStop(0.6, "rgba(0,0,0,0.85)");
        brush.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = brush;
        ctx.beginPath();
        ctx.arc(px, py, BRUSH, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      lastPoint = { x, y };
      lastWipe = performance.now();
      setWiped(true);
      if (!frame) frame = requestAnimationFrame(refog);
    };

    // Slowly layer the fog back once the visitor stops wiping.
    const refog = (now: number) => {
      if (now - lastWipe > REFOG_DELAY) paintFog(0.012);
      frame = now - lastWipe > REFOG_DELAY + 9000 ? 0 : requestAnimationFrame(refog);
      if (!frame) {
        paintFog();
        addDroplets();
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      wipe(event.clientX - rect.left, event.clientY - rect.top);
    };
    const onLeave = () => {
      lastPoint = null;
    };

    image.onload = resize;
    if (image.complete) resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerup", onLeave);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerup", onLeave);
    };
  }, [src]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn("absolute inset-0 size-full cursor-grab touch-pan-y", className)}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full whitespace-nowrap bg-background/75 px-4 py-2 text-sm font-semibold text-foreground shadow-lg backdrop-blur-md transition-opacity duration-700",
          wiped ? "opacity-0" : "opacity-100",
        )}
      >
        <Hand className="size-4 animate-[wiggle_1.6s_ease-in-out_infinite]" />
        Essuyez la buée
      </span>
    </>
  );
}
