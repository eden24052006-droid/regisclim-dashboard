import { MapPin, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion";
import { realisations, type Realisation } from "@/data/realisations";
import { cn } from "@/lib/utils";

export function Realisations() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Realisation | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  if (realisations.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="max-w-2xl">
        <p className="eyebrow text-accent">Nos réalisations</p>
        <h2 className="mt-4 font-display text-4xl leading-tight font-bold sm:text-5xl">
          Des chantiers <span className="text-gradient-cool">soignés</span>, près de chez vous.
        </h2>
      </Reveal>
      <div className="mt-12 grid auto-rows-[15rem] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {realisations.map((item, i) => (
          <Reveal
            key={`${item.title}-${i}`}
            delay={(i % 4) * 90}
            className={cn(i % 5 === 0 && "col-span-2 row-span-2")}
          >
            <button
              type="button"
              onClick={() => setOpen(item)}
              className="group relative block size-full overflow-hidden rounded-[1.5rem] text-left focus-visible:outline-2 focus-visible:outline-primary"
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <span className="block font-display text-base font-bold sm:text-lg">
                  {item.title}
                </span>
                {item.place && (
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                    <MapPin className="size-3.5 text-accent" /> {item.place}
                  </span>
                )}
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(event) => event.target === dialogRef.current && setOpen(null)}
        className="m-auto max-h-[90vh] max-w-5xl overflow-visible bg-transparent p-0 backdrop:bg-background/85 backdrop:backdrop-blur-md"
      >
        {open && (
          <figure className="relative">
            <img
              src={open.image}
              alt={open.alt}
              className="max-h-[80vh] w-auto rounded-[1.5rem] object-contain shadow-[var(--shadow-lift)]"
            />
            <figcaption className="mt-3 text-center text-sm text-foreground">
              {open.title}
              {open.place && <span className="text-muted-foreground"> · {open.place}</span>}
            </figcaption>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Fermer"
              className="glass absolute -top-4 -right-4 grid size-10 place-items-center rounded-full text-foreground"
            >
              <X className="size-5" />
            </button>
          </figure>
        )}
      </dialog>
    </section>
  );
}
