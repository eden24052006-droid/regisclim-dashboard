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
  Snowflake,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand } from "@/components/site-layout";
import { Marquee, Reveal, SplitWords } from "@/components/motion";
import heroImage from "@/assets/regisclim-hero.jpg";
import technicianImage from "@/assets/regisclim-technician.jpg";
import { localBusinessJsonLd, pageHead } from "@/lib/seo";

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
  head: () =>
    pageHead({
      title: "Climaticien à Nîmes : installation et entretien | Régis Clim",
      description:
        "Régis Clim, artisan climaticien à Nîmes : installation et entretien de climatisation, pompes à chaleur et chauffe-eau thermodynamiques. Tél. 07 67 87 57 16.",
      path: "/",
      extra: [{ "script:ld+json": localBusinessJsonLd }],
    }),
  component: Index,
});

const marqueeItems = [
  "Installation",
  "Entretien",
  "Gainable",
  "Chauffe-eau thermodynamique",
  "Pompe à chaleur",
  "RGE QualiPAC · Artisan CMA",
];

function Index() {
  return (
    <>
      <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pt-12 pb-16 sm:px-8 sm:pt-16 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h1>
            <span className="eyebrow-pill animate-rise text-foreground/90">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Artisan climaticien à Nîmes
            </span>
            <span className="mt-7 block font-display text-5xl leading-[1.02] font-bold sm:text-7xl xl:text-8xl">
              <SplitWords text="Votre confort," delay={100} />
              <br />
              <SplitWords text="été comme hiver." delay={300} className="text-shimmer pb-2" />
            </span>
          </h1>
          <p className="animate-rise mt-7 max-w-xl text-lg leading-8 text-muted-foreground [animation-delay:600ms]">
            Installation et entretien de climatisation pour particuliers et professionnels à Nîmes
            et ses environs.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3 [animation-delay:750ms]">
            <Button asChild size="hero" variant="warm" className="btn-shine">
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
        <div className="animate-rise relative [animation-delay:400ms]">
          <div className="absolute -inset-3 rounded-[3rem] sm:-inset-6 bg-[conic-gradient(from_180deg,var(--color-primary),var(--color-accent),var(--color-primary))] opacity-25 blur-3xl" />
          <div className="float-slow glow-border relative overflow-hidden rounded-[3rem_1rem_3rem_1rem]">
            <img
              src={heroImage}
              width={1600}
              height={1000}
              alt="Salon lumineux équipé d’une climatisation à Nîmes"
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          <div className="float-slower glass absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold sm:-left-10">
            <span className="icon-badge size-10! rounded-xl!">
              <BadgeCheck className="size-5" />
            </span>
            RGE QualiPAC · Artisan CMA
          </div>
          <div className="float-slow glass absolute -top-5 -right-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold sm:-right-6">
            <span className="icon-badge icon-badge-warm size-10! rounded-xl!">
              <Clock3 className="size-5" />
            </span>
            Lun–Ven · 8h–17h
          </div>
          <Snowflake className="absolute top-1/2 -right-4 hidden size-10 animate-[spin_14s_linear_infinite] text-primary/60 sm:block" />
        </div>
      </section>

      <Marquee
        items={marqueeItems}
        className="border-y border-white/10 bg-white/[0.02] py-5 font-display text-xl font-semibold text-foreground/70 sm:text-2xl"
      />

      <section
        id="solutions"
        className="mx-auto max-w-7xl scroll-mt-40 px-5 py-20 sm:px-8 sm:py-28"
      >
        <div className="flex flex-col gap-4 lg:h-[26rem] lg:flex-row">
          {[
            {
              icon: Home,
              eyebrow: "Habitat",
              text: "Profitez de l’avis d’un professionnel pour une climatisation adaptée à votre espace de vie sur Nîmes et ses environs.",
              tone: "cool",
            },
            {
              icon: Building2,
              eyebrow: "Entreprise",
              text: "Des conditions de travail adaptées grâce à une solution d’air conditionné conçue pour vos locaux professionnels.",
              tone: "warm",
            },
          ].map(({ icon: Icon, eyebrow, text, tone }, i) => (
            <Reveal
              key={eyebrow}
              delay={i * 150}
              className="group flex-1 transition-[flex-grow] duration-700 ease-out lg:hover:grow-[1.7]"
            >
              <article className="spotlight relative flex h-full flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <div
                  className={`glow-blob -top-20 -right-20 size-72 transition-transform duration-700 group-hover:scale-150 ${tone === "cool" ? "bg-primary/30" : "bg-accent/25"}`}
                />
                <Icon
                  className={`absolute top-8 right-8 size-24 opacity-20 transition-all duration-700 group-hover:rotate-6 group-hover:opacity-40 ${tone === "cool" ? "text-primary" : "text-accent"}`}
                />
                <div
                  className={
                    tone === "cool" ? "icon-badge relative" : "icon-badge icon-badge-warm relative"
                  }
                >
                  <Icon className="size-6" />
                </div>
                <p
                  className={`eyebrow relative mt-8 ${tone === "cool" ? "text-primary" : "text-accent"}`}
                >
                  {eyebrow}
                </p>
                <h2 className="relative mt-2 font-display text-3xl font-bold sm:text-4xl">
                  Climatisation
                </h2>
                <p className="relative mt-4 max-w-md leading-7 text-muted-foreground">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-44 lg:self-start">
          <Reveal>
            <p className="eyebrow text-accent">Nos engagements</p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-bold sm:text-6xl">
              Du conseil juste, du matériel <span className="text-gradient-cool">fiable.</span>
            </h2>
          </Reveal>
        </div>
        <div className="space-y-6">
          {commitments.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="lg:sticky" style={{ top: `calc(11rem + ${i * 1.75}rem)` }}>
              <Reveal>
                <article className="spotlight glass flex min-h-56 flex-col justify-between rounded-[1.75rem] bg-background/80 p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <div className="icon-badge">
                      <Icon className="size-6" />
                    </div>
                    <span className="font-display text-6xl font-bold text-white/10">0{i + 1}</span>
                  </div>
                  <div className="mt-8">
                    <h3 className="font-display text-2xl font-bold">{title}</h3>
                    <p className="mt-2 leading-7 text-muted-foreground">{text}</p>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid auto-rows-[minmax(11rem,auto)] gap-4 md:grid-cols-4">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="group relative h-full min-h-80 overflow-hidden rounded-[2rem]">
              <img
                src={technicianImage}
                loading="lazy"
                width={1200}
                height={900}
                alt="Technicien entretenant une climatisation"
                className="absolute inset-0 size-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="eyebrow text-primary">Savoir-faire complet</p>
                <h2 className="mt-3 font-display text-3xl leading-tight font-bold sm:text-4xl">
                  Installation, entretien et solutions thermiques.
                </h2>
              </div>
            </div>
          </Reveal>
          {expertise.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="spotlight group h-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20">
                <Icon className="size-7 text-accent transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            </Reveal>
          ))}
          <Reveal className="md:col-span-4">
            <a
              href="/installation-de-climatisation-a-nimes"
              className="bg-gradient-cool group flex items-center justify-between rounded-[1.5rem] px-8 py-6 font-display text-xl font-semibold text-primary-foreground transition-shadow hover:shadow-[0_20px_60px_-15px_var(--color-primary)]"
            >
              Voir les installations
              <span className="grid size-12 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:translate-x-2 group-hover:-rotate-45">
                <ArrowRight />
              </span>
            </a>
          </Reveal>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
