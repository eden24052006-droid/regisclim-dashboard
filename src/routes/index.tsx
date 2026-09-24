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
import { ContactBand, SectionHeading } from "@/components/site-layout";
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

      <section id="solutions" className="content-shell scroll-mt-32">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="surface-card surface-card-hover group relative overflow-hidden p-8 sm:p-10">
            <div className="glow-blob -top-16 -right-16 size-48 bg-primary/15" />
            <div className="icon-badge relative">
              <Home className="size-6" />
            </div>
            <p className="eyebrow relative mt-8 text-primary">Habitat</p>
            <h2 className="relative mt-2 font-display text-3xl font-bold">Climatisation</h2>
            <p className="relative mt-4 leading-7 text-muted-foreground">
              Profitez de l’avis d’un professionnel pour une climatisation adaptée à votre espace de
              vie sur Nîmes et ses environs.
            </p>
          </article>
          <article className="surface-card surface-card-hover group relative overflow-hidden p-8 sm:p-10">
            <div className="glow-blob -top-16 -right-16 size-48 bg-accent/15" />
            <div className="icon-badge icon-badge-warm relative">
              <Building2 className="size-6" />
            </div>
            <p className="eyebrow relative mt-8 text-accent">Entreprise</p>
            <h2 className="relative mt-2 font-display text-3xl font-bold">Climatisation</h2>
            <p className="relative mt-4 leading-7 text-muted-foreground">
              Des conditions de travail adaptées grâce à une solution d’air conditionné conçue pour
              vos locaux professionnels.
            </p>
          </article>
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-muted">
          <div className="content-shell">
            <SectionHeading
              eyebrow="Nos engagements"
              tone="accent"
              align="center"
              title="Du conseil juste, du matériel fiable."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {commitments.map(({ icon: Icon, title, text }) => (
                <article key={title} className="surface-card surface-card-hover p-8">
                  <div className="icon-badge">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="bg-gradient-cool absolute -inset-3 -rotate-2 rounded-[2rem] opacity-15" />
          <img
            src={technicianImage}
            loading="lazy"
            width={1200}
            height={900}
            alt="Technicien entretenant une climatisation"
            className="relative aspect-[4/3] size-full rounded-[1.75rem] object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Savoir-faire complet"
            title="Installation, entretien et solutions thermiques."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {expertise.map(({ icon: Icon, title, text }) => (
              <div key={title} className="surface-card surface-card-hover p-5">
                <div className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="hero" size="hero" className="mt-8">
            <a href="/installation-de-climatisation-a-nimes">
              Voir les installations <ArrowRight />
            </a>
          </Button>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
