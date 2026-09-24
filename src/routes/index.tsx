import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Clock3,
  Gauge,
  Home,
  Leaf,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand } from "@/components/site-layout";
import heroImage from "@/assets/regisclim-hero.jpg";
import technicianImage from "@/assets/regisclim-technician.jpg";

const commitments = [
  {
    icon: BadgeCheck,
    title: "Qualité",
    text: "Des équipements choisis pour leur fiabilité et leur adéquation à vos besoins.",
  },
  {
    icon: ShieldCheck,
    title: "Efficacité",
    text: "Le respect des normes et une solution dimensionnée pour votre lieu de vie ou de travail.",
  },
  {
    icon: Leaf,
    title: "Économie & écologie",
    text: "Des appareils nouvelle génération, de classe énergétique A+, A++ ou A+++.",
  },
];

const expertise = [
  {
    icon: Wrench,
    title: "Installation",
    text: "Mono-split ou multi-split pour obtenir la température souhaitée et un air purifié.",
  },
  {
    icon: Gauge,
    title: "Entretien",
    text: "Un suivi régulier évite la surconsommation et l’usure prématurée.",
  },
  {
    icon: Home,
    title: "Gainable",
    text: "Une unité discrète dans les combles distribue l’air par un réseau de gaines.",
  },
  {
    icon: Leaf,
    title: "Chauffe-eau thermodynamique",
    text: "Un ballon associé à une pompe à chaleur pour réduire la consommation énergétique.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Climatisation à Nîmes — RegisClim" },
      {
        name: "description",
        content:
          "Installation et entretien de climatisation, pompes à chaleur et chauffe-eau thermodynamiques à Nîmes.",
      },
      { property: "og:title", content: "Climatisation à Nîmes — RegisClim" },
      {
        property: "og:description",
        content: "Votre spécialiste climatisation pour particuliers et professionnels à Nîmes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="px-3 sm:px-5">
        <div className="relative mx-auto min-h-[82vh] max-w-7xl overflow-hidden rounded-[2rem] bg-secondary text-secondary-foreground">
          <img
            src={heroImage}
            width={1600}
            height={1000}
            alt="Salon lumineux équipé d’une climatisation à Nîmes"
            className="absolute inset-0 size-full scale-105 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-secondary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent" />
          <div className="glow-blob -bottom-32 -left-20 size-96 bg-primary/40" />
          <div className="relative flex min-h-[82vh] flex-col justify-between gap-12 px-6 py-12 sm:px-12 sm:py-16">
            <div className="animate-rise my-auto max-w-3xl">
              <p className="eyebrow-pill border border-white/15 bg-white/10 text-secondary-foreground backdrop-blur">
                <span className="size-1.5 rounded-full bg-accent" />
                Artisan climaticien à Nîmes
              </p>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] font-bold sm:text-7xl">
                Votre confort,
                <br />
                <span className="text-gradient-warm">été comme hiver.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-secondary-foreground/80">
                Installation et entretien de climatisation pour particuliers et professionnels à
                Nîmes et ses environs.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="hero" variant="warm">
                  <a href="tel:0767875716">
                    <Phone /> 07 67 87 57 16
                  </a>
                </Button>
                <Button asChild size="hero" variant="heroOutline">
                  <a href="#solutions">
                    Découvrir nos solutions <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
            <div className="animate-rise flex flex-wrap gap-3 [animation-delay:200ms]">
              <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                <BadgeCheck className="size-4 text-accent" /> RGE QualiPAC · Artisan CMA
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                <Clock3 className="size-4 text-accent" /> Lun–Ven · 8h–17h
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="mt-12 grid scroll-mt-32 md:grid-cols-2">
        <article className="bg-gradient-cool group relative overflow-hidden px-6 py-16 text-primary-foreground sm:px-12 sm:py-20 lg:pl-[max(3rem,calc((100vw-80rem)/2+2rem))]">
          <Home className="absolute -right-8 -bottom-10 size-64 opacity-10 transition-transform duration-700 group-hover:scale-110" />
          <p className="eyebrow relative text-primary-foreground/75">Habitat</p>
          <h2 className="relative mt-3 font-display text-4xl font-bold sm:text-5xl">
            Climatisation
          </h2>
          <p className="relative mt-5 max-w-md text-lg leading-8 text-primary-foreground/90">
            Profitez de l’avis d’un professionnel pour une climatisation adaptée à votre espace de
            vie sur Nîmes et ses environs.
          </p>
        </article>
        <article className="group relative overflow-hidden bg-secondary px-6 py-16 text-secondary-foreground sm:px-12 sm:py-20">
          <Building2 className="absolute -right-8 -bottom-10 size-64 text-accent opacity-15 transition-transform duration-700 group-hover:scale-110" />
          <p className="eyebrow relative text-accent">Entreprise</p>
          <h2 className="relative mt-3 font-display text-4xl font-bold sm:text-5xl">
            Climatisation
          </h2>
          <p className="relative mt-5 max-w-md text-lg leading-8 text-secondary-muted">
            Des conditions de travail adaptées grâce à une solution d’air conditionné conçue pour
            vos locaux professionnels.
          </p>
        </article>
      </section>

      <section className="content-shell">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-accent">Nos engagements</p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-bold sm:text-5xl">
              Du conseil juste, du matériel fiable.
            </h2>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {commitments.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="group grid grid-cols-[auto_1fr] items-start gap-6 py-8 sm:grid-cols-[5rem_12rem_1fr] sm:items-center"
              >
                <span className="text-gradient-warm font-display text-5xl font-bold">0{i + 1}</span>
                <h3 className="flex items-center gap-3 font-display text-xl font-bold">
                  <Icon className="size-5 text-primary" />
                  {title}
                </h3>
                <p className="col-span-2 leading-7 text-muted-foreground sm:col-span-1">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
          <img
            src={technicianImage}
            loading="lazy"
            width={1200}
            height={900}
            alt="Technicien entretenant une climatisation"
            className="aspect-[4/3] size-full object-cover lg:aspect-auto"
          />
          <div className="px-5 py-16 sm:px-12 lg:py-20">
            <p className="eyebrow text-primary">Savoir-faire complet</p>
            <h2 className="mt-4 font-display text-3xl leading-tight font-bold sm:text-4xl">
              Installation, entretien et solutions thermiques.
            </h2>
            <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {expertise.map(({ icon: Icon, title, text }) => (
                <div key={title} className="border-t-2 border-accent pt-4">
                  <dt className="flex items-center gap-2 font-display text-base font-bold">
                    <Icon className="size-4 text-accent" />
                    {title}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-muted-foreground">{text}</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="hero" size="hero" className="mt-10">
              <a href="/installation-de-climatisation-a-nimes">
                Voir les installations <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </section>
      <div className="h-16 sm:h-24" />
      <ContactBand />
    </>
  );
}
