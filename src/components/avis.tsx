import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/motion";
import { avis, avisLink } from "@/data/avis";
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

export function AvisClients() {
  if (avis.length === 0) return null;
  const average = avis.reduce((sum, a) => sum + a.rating, 0) / avis.length;

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
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {avis.map((review, i) => (
          <Reveal key={`${review.name}-${i}`} delay={(i % 3) * 120}>
            <figure className="spotlight relative flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7">
              <Quote className="absolute top-6 right-6 size-10 text-primary/15" />
              <Stars rating={review.rating} />
              <blockquote className="mt-5 flex-1 leading-7 text-foreground/90">
                “{review.text}”
              </blockquote>
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
          </Reveal>
        ))}
      </div>
      {avisLink && (
        <Reveal className="mt-8">
          <a
            href={avisLink}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-semibold text-primary"
          >
            Voir tous les avis
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      )}
    </section>
  );
}
