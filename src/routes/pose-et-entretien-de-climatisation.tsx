import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand, PageHero } from "@/components/site-layout";
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
const benefits = [
  "Prévention des fuites",
  "Limitation des contaminations bactériennes ou fongiques",
  "Réduction de la surconsommation",
  "Durée de vie prolongée",
];

function EntretienPage() {
  return (
    <>
      <PageHero variant="light" eyebrow="Maintenance" title="Entretien de climatisation">
        Régis Garnier entretient vos climatisations à Nîmes et ses environs, pour les particuliers
        comme les professionnels.
      </PageHero>
      <section className="content-shell pt-12!">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-40">
            <img
              src={technicianImage}
              loading="lazy"
              width={1200}
              height={900}
              alt="Entretien d’une unité de climatisation"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="prose-copy">
            <p className="eyebrow text-primary">Prévenir plutôt que réparer</p>
            <h2 className="mt-3! text-4xl!">Fiabilité, économie et air sain</h2>
            <p className="mt-6! text-lg">
              Un entretien régulier est nécessaire au bon fonctionnement de votre climatisation. Il
              prépare l’équipement à une utilisation intensive pendant les épisodes de canicule et
              garantit aussi votre confort en mode chauffage.
            </p>
            <ol className="relative mt-10 ml-4 border-l-2 border-dashed border-primary/30">
              {benefits.map((x, i) => (
                <li key={x} className="relative pb-8 pl-10 last:pb-0">
                  <span className="bg-gradient-cool absolute top-0 -left-[1.1rem] grid size-8 place-items-center rounded-full font-display text-sm font-bold text-primary-foreground ring-4 ring-background">
                    {i + 1}
                  </span>
                  <p className="mt-0! pt-1 font-display text-lg leading-7! font-semibold text-foreground!">
                    {x}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-10!">
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
        </div>
      </section>
      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.6fr] lg:py-28">
          <div>
            <p className="eyebrow text-accent">Tarifs TTC</p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-bold sm:text-5xl">
              Entretien selon votre équipement
            </h2>
          </div>
          <ul>
            {prices.map(([name, price]) => (
              <li
                key={name}
                className="flex items-baseline gap-4 border-b border-secondary-border py-6 first:pt-0"
              >
                <h3 className="min-w-0 font-display text-lg font-semibold sm:text-2xl">{name}</h3>
                <span className="flex-1 translate-y-[-0.3rem] border-b border-dotted border-secondary-muted/50" />
                <p className="text-gradient-warm font-display text-xl font-bold whitespace-nowrap sm:text-3xl">
                  {price}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Envie de nouveauté ?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Nous installons aussi des systèmes neufs adaptés à vos besoins de confort, de performance
          et d’économies d’énergie.
        </p>
        <Button asChild variant="link" className="mt-4 text-base">
          <Link to="/installation-de-climatisation-a-nimes">
            Nos solutions sur mesure <ArrowRight />
          </Link>
        </Button>
      </section>
      <ContactBand variant="gradient" title="Planifier votre entretien" />
    </>
  );
}
