import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand, PageHero } from "@/components/site-layout";
import { CountUp, Reveal } from "@/components/motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";
import technicianImage from "@/assets/regisclim-technician.jpg";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/pose-et-entretien-de-climatisation")({
  head: () =>
    pageHead({
      title: "Entretien de climatisation à Nîmes dès 105 € | Régis Clim",
      description:
        "Entretien de climatisation à Nîmes : mono split 105 €, gainable 130 €, pompe à chaleur 180 €, ballon thermodynamique 130 € TTC. RDV au 07 67 87 57 16.",
      path: "/pose-et-entretien-de-climatisation",
    }),
  component: EntretienPage,
});

const prices: [string, string][] = [
  ["Mono Split", "105 € TTC"],
  ["Gainable", "130 € TTC"],
  ["Pompe à chaleur", "180 € TTC"],
  ["Ballon thermodynamique", "130 € TTC"],
];
const benefits = [
  "Prévention des fuites",
  "Limitation des contaminations bactériennes ou fongiques",
  "Réduction de la surconsommation",
  "Durée de vie prolongée",
];

function BenefitsTimeline() {
  const [ref, progress] = useScrollProgress<HTMLOListElement>();
  return (
    <ol ref={ref} className="relative mt-10 space-y-3 pl-14">
      <span className="absolute top-2 bottom-2 left-[1.2rem] w-0.5 rounded-full bg-white/10" />
      <span
        className="absolute top-2 left-[1.2rem] w-0.5 origin-top rounded-full bg-[linear-gradient(var(--color-primary),var(--color-accent))] transition-[height] duration-200"
        style={{ height: `calc((100% - 1rem) * ${progress})` }}
      />
      {benefits.map((x, i) => {
        const reached = progress >= (i + 0.5) / benefits.length;
        return (
          <li key={x} className="relative">
            <span
              className={cn(
                "absolute top-3 -left-14 grid size-10 place-items-center rounded-full border transition-all duration-500",
                reached
                  ? "bg-gradient-warm scale-110 border-transparent text-white shadow-[0_0_30px_-4px_var(--color-accent)]"
                  : "border-white/15 bg-background text-muted-foreground",
              )}
            >
              {reached ? (
                <Check className="size-4" />
              ) : (
                <span className="text-sm font-bold">{i + 1}</span>
              )}
            </span>
            <p
              className={cn(
                "rounded-2xl border px-5 py-4 font-display text-lg font-semibold transition-all duration-500",
                reached
                  ? "border-white/15 bg-white/[0.06] text-foreground"
                  : "border-transparent text-muted-foreground",
              )}
            >
              {x}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

function EntretienPage() {
  return (
    <>
      <PageHero
        icon={<Wrench className="size-6 animate-[spin_8s_linear_infinite]" />}
        eyebrow="Maintenance"
        title="Entretien de climatisation"
      >
        Régis Garnier entretient vos climatisations à Nîmes et ses environs, pour les particuliers
        comme les professionnels.
      </PageHero>
      <section className="content-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-44">
            <Reveal>
              <div className="group relative overflow-hidden rounded-[1rem_3rem_1rem_3rem]">
                <img
                  src={technicianImage}
                  loading="lazy"
                  width={1200}
                  height={900}
                  alt="Entretien d’une unité de climatisation"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/20 mix-blend-overlay" />
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal className="prose-copy">
              <p className="eyebrow text-primary">Prévenir plutôt que réparer</p>
              <h2 className="mt-3! text-4xl! sm:text-5xl!">Fiabilité, économie et air sain</h2>
              <p className="mt-6! text-lg">
                Un entretien régulier est nécessaire au bon fonctionnement de votre climatisation.
                Il prépare l’équipement à une utilisation intensive pendant les épisodes de canicule
                et garantit aussi votre confort en mode chauffage.
              </p>
            </Reveal>
            <BenefitsTimeline />
            <Reveal className="prose-copy mt-10">
              <p>
                Confier cette tâche à un spécialiste vous assure un travail rigoureux et un système
                fiable, économique et durable.
              </p>
              <Button asChild variant="warm" size="hero" className="btn-shine mt-7">
                <a href="tel:0767875716">
                  <Phone />
                  Prendre rendez-vous
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className="eyebrow text-accent">Tarifs TTC</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Entretien selon votre équipement
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {prices.map(([name, price], i) => {
            const amount = Number.parseInt(price, 10);
            return (
              <Reveal key={name} delay={i * 120}>
                <article className="spotlight group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
                  <div className="glow-blob -right-10 -bottom-16 size-40 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/30" />
                  <h3 className="relative font-display text-lg font-semibold text-muted-foreground">
                    {name}
                  </h3>
                  <p className="relative mt-12 font-display font-bold">
                    <span className="text-gradient-cool text-6xl">
                      <CountUp value={amount} />
                    </span>{" "}
                    <span className="ml-1 text-xl text-foreground/80">
                      {price.replace(String(amount), "").trim()}
                    </span>
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 pt-24 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Envie de nouveauté ?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nous installons aussi des systèmes neufs adaptés à vos besoins de confort, de
            performance et d’économies d’énergie.
          </p>
          <Link
            to="/installation-de-climatisation-a-nimes"
            className="group mt-7 inline-flex items-center gap-3 font-semibold text-primary"
          >
            Nos solutions sur mesure
            <span className="grid size-9 place-items-center rounded-full border border-primary/40 transition-all duration-500 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </Reveal>
      </section>
      <ContactBand title="Planifier votre entretien" />
    </>
  );
}
