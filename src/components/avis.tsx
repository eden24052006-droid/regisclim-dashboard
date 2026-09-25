import { ArrowUpRight, ChevronDown, Quote, Star } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/motion";
import { avis, avisLink, type Avis } from "@/data/avis";
import { cn } from "@/lib/utils";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden
          className={cn("size-4", n <= rating ? "fill-accent text-accent" : "text-white/20")}
        />
      ))}
    </span>
  );
}

const VISIBLE_COUNT = 3;
const LONG_REVIEW = 240; // characters before a review gets a "Lire la suite" toggle

function ReviewCard({ review }: { review: Avis }) {
  const [open, setOpen] = useState(false);
  const long = review.text.length > LONG_REVIEW;
  return (
    <figure className="spotlight relative flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7">
      <Quote className="absolute top-6 right-6 size-10 text-primary/15" />
      <Stars rating={review.rating} />
      <div className="flex-1">
        <blockquote
          className={cn("mt-5 leading-7 text-foreground/90", long && !open && "line-clamp-5")}
        >
          “{review.text}”
        </blockquote>
        {long && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="mt-2 self-start text-sm font-semibold text-primary hover:underline"
          >
            {open ? "Réduire" : "Lire la suite"}
          </button>
        )}
      </div>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="bg-gradient-cool grid size-10 shrink-0 place-items-center rounded-full font-display font-bold text-white">
          {review.name.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-semibold">{review.name}</span>
          <span className="block text-xs text-muted-foreground">
            Avis {review.source}
            {review.date && ` · ${review.date}`}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function AvisClients() {
  const [showAll, setShowAll] = useState(false);
  if (avis.length === 0) return null;
  const average = avis.reduce((sum, a) => sum + a.rating, 0) / avis.length;
  const hidden = avis.length - VISIBLE_COUNT;
  const shown = showAll ? avis : avis.slice(0, VISIBLE_COUNT);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Avis clients</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-bold sm:text-5xl">
            Ils nous ont fait <span className="text-gradient-cool">confiance.</span>
          </h2>
        </div>
        <div className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
          <span className="font-display text-4xl font-bold">
            {average.toFixed(1).replace(".", ",")}
          </span>
          <span>
            <Stars rating={Math.round(average)} />
            <span className="mt-1 block text-xs text-muted-foreground">{avis.length} avis</span>
          </span>
        </div>
      </Reveal>
      <div
        className={cn(
          "mt-12 grid gap-4",
          avis.length === 1 && "max-w-xl",
          avis.length >= 2 && "md:grid-cols-2",
          avis.length >= 3 && "lg:grid-cols-3",
        )}
      >
        {shown.map((review, i) =>
          i < VISIBLE_COUNT ? (
            <Reveal key={`${review.name}-${i}`} delay={i * 120} className="h-full">
              <ReviewCard review={review} />
            </Reveal>
          ) : (
            <div key={`${review.name}-${i}`} className="animate-rise h-full">
              <ReviewCard review={review} />
            </div>
          ),
        )}
      </div>
      {(hidden > 0 || avisLink) && (
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {hidden > 0 && (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:border-white/20"
            >
              {showAll ? "Voir moins d’avis" : `Voir ${hidden} avis de plus`}
              <ChevronDown className={cn("size-4 transition-transform", showAll && "rotate-180")} />
            </button>
          )}
          {avisLink && (
            <a
              href={avisLink}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-semibold text-primary"
            >
              Voir tous les avis
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      )}
    </section>
  );
}
