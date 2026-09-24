import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand, PageHero, SectionHeading } from "@/components/site-layout";
import technicianImage from "@/assets/regisclim-technician.jpg";

export const Route = createFileRoute("/pose-et-entretien-de-climatisation")({
  head: () => ({
    meta: [
      { title: "Entretien de climatisation à Nîmes — RegisClim" },
      {
        name: "description",
        content:
          "Entretien professionnel de climatisation, gainable, pompe à chaleur et ballon thermodynamique à Nîmes.",
      },
      { property: "og:title", content: "Entretien de climatisation à Nîmes — RegisClim" },
      {
        property: "og:description",
        content: "Tarifs d’entretien transparents pour un équipement fiable et durable.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pose-et-entretien-de-climatisation" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pose-et-entretien-de-climatisation" }],
  }),
  component: EntretienPage,
});

const prices = [
  ["Mono Split", "105 € TTC"],
  ["Gainable", "130 € TTC"],
  ["Pompe à chaleur", "180 € TTC"],
  ["Ballon thermodynamique", "130 € TTC"],
];
function EntretienPage() {
  return (
    <>
      <PageHero eyebrow="Maintenance" title="Entretien de climatisation">
        Régis Garnier entretient vos climatisations à Nîmes et ses environs, pour les particuliers
        comme les professionnels.
      </PageHero>
      <section className="content-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="prose-copy">
            <SectionHeading
              eyebrow="Prévenir plutôt que réparer"
              title="Fiabilité, économie et air sain"
            />
            <p className="mt-6!">
              Un entretien régulier est nécessaire au bon fonctionnement de votre climatisation. Il
              prépare l’équipement à une utilisation intensive pendant les épisodes de canicule et
              garantit aussi votre confort en mode chauffage.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Prévention des fuites",
                "Limitation des contaminations bactériennes ou fongiques",
                "Réduction de la surconsommation",
                "Durée de vie prolongée",
              ].map((x) => (
                <p
                  key={x}
                  className="surface-card mt-0! flex items-start gap-3 rounded-2xl! p-4 text-sm leading-6! font-semibold text-foreground!"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                  {x}
                </p>
              ))}
            </div>
            <p>
              Confier cette tâche à un spécialiste vous assure un travail rigoureux et un système
              fiable, économique et durable.
            </p>
            <Button asChild variant="warm" size="hero" className="mt-7">
              <a href="tel:0767875716">
                <Phone />
                Prendre rendez-vous
              </a>
            </Button>
          </div>
          <img
            src={technicianImage}
            loading="lazy"
            width={1200}
            height={900}
            alt="Entretien d’une unité de climatisation"
            className="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
        <div className="mt-24">
          <SectionHeading
            eyebrow="Tarifs TTC"
            tone="accent"
            align="center"
            title="Entretien selon votre équipement"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {prices.map(([name, price]) => (
              <article
                key={name}
                className="surface-card surface-card-hover relative flex flex-col justify-between overflow-hidden p-7"
              >
                <span className="bg-gradient-cool absolute inset-x-0 top-0 h-1" />
                <h3 className="font-display text-lg font-semibold">{name}</h3>
                <p className="text-gradient-cool mt-10 font-display text-3xl font-bold">{price}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="surface-card mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Envie de nouveauté ?</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Nous installons aussi des systèmes neufs adaptés à vos besoins de confort, de
              performance et d’économies d’énergie.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/installation-de-climatisation-a-nimes">
              Nos solutions sur mesure <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
      <ContactBand title="Planifier votre entretien" />
    </>
  );
}
