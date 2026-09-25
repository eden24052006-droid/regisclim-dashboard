import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AirVent, ArrowRight, Droplets, HousePlug, Scale, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand, PageHero } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import technicianImage from "@/assets/regisclim-technician.jpg";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/installation-de-climatisation-a-nimes")({
  head: () =>
    pageHead({
      title: "Installation de climatisation à Nîmes | Régis Clim",
      description:
        "Pose de climatisation, pompe à chaleur réversible ou air-eau, gainable et chauffe-eau thermodynamique à Nîmes et environs, par un professionnel habilité.",
      path: "/installation-de-climatisation-a-nimes",
    }),
  component: InstallationPage,
});

const equipment = [
  {
    icon: AirVent,
    title: "Pompe à chaleur réversible",
    text: "Un système ingénieux qui transfère les calories de l’extérieur vers l’intérieur. Il rafraîchit en été et chauffe en hiver tout en limitant la consommation d’énergie.",
  },
  {
    icon: HousePlug,
    title: "Pompe à chaleur air-eau",
    text: "Elle peut assurer le chauffage et l’eau chaude sanitaire. Adaptée au neuf comme à la rénovation, elle réinjecte l’énergie captée dans le circuit du logement.",
  },
  {
    icon: Scale,
    title: "Climatisation gainable",
    text: "Une solution réversible, discrète et centralisée. L’unité et les gaines sont dissimulées dans les combles ou un faux-plafond ; seules les grilles restent visibles.",
  },
  {
    icon: Droplets,
    title: "Chauffe-eau thermodynamique",
    text: "Un ballon d’eau chaude associé à une pompe à chaleur qui capte les calories de l’air pour réduire votre consommation énergétique.",
  },
];

const TAB_DURATION = 6000;

function EquipmentTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setActive((i) => (i + 1) % equipment.length),
      TAB_DURATION,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return (
    <div
      className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div role="tablist" aria-label="Équipements" className="grid gap-2">
        {equipment.map(({ icon: Icon, title }, i) => (
          <button
            key={title}
            role="tab"
            type="button"
            id={`tab-${i}`}
            aria-selected={active === i}
            aria-controls={`panel-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              "group relative flex items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-500",
              active === i
                ? "border-white/15 bg-white/[0.07]"
                : "border-transparent hover:bg-white/[0.03]",
            )}
          >
            <span
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-xl transition-all duration-500",
                active === i ? "bg-gradient-warm text-white" : "bg-white/5 text-muted-foreground",
              )}
            >
              <Icon className="size-5" />
            </span>
            <span
              className={cn(
                "font-display text-lg font-semibold transition-colors",
                active === i ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {title}
            </span>
            {active === i && (
              <span
                key={`${active}-${paused}`}
                className="bg-gradient-cool absolute inset-x-0 bottom-0 h-0.5 origin-left"
                style={{
                  animation: paused ? "none" : `fill-bar ${TAB_DURATION}ms linear forwards`,
                  transform: paused ? "scaleX(1)" : undefined,
                }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="glow-border spotlight relative grid overflow-hidden rounded-[2rem] bg-white/[0.03] [grid-template-areas:'stack']">
        {equipment.map(({ icon: Icon, title, text }, i) => (
          <article
            key={title}
            id={`panel-${i}`}
            role="tabpanel"
            aria-labelledby={`tab-${i}`}
            aria-hidden={active !== i}
            className={cn(
              "relative flex flex-col justify-between p-8 transition-all duration-700 [grid-area:stack] sm:p-12",
              active === i
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-6 opacity-0",
            )}
          >
            <Icon className="absolute -right-6 -bottom-6 size-56 text-primary/10" />
            <span className="font-display text-7xl font-bold text-white/10">0{i + 1}</span>
            <div className="relative mt-10">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">{text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function InstallationPage() {
  return (
    <>
      <PageHero
        image={technicianImage}
        imageAlt="Installation professionnelle d’une climatisation"
        icon={<AirVent className="size-9" />}
        eyebrow="Étude & pose"
        title="Installation de climatisation à Nîmes"
      >
        Régis Garnier installe des climatisations chez les particuliers et les professionnels à
        Nîmes et ses environs.
      </PageHero>
      <section className="content-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal className="prose-copy">
            <p className="eyebrow text-primary">Réglementation</p>
            <h2 className="mt-3! text-4xl! sm:text-5xl!">Une solution adaptée à chaque lieu</h2>
            <p className="mt-6! text-lg">
              L’installation d’une climatisation exige un spécialiste qualifié. À la maison ou au
              bureau, l’objectif est d’apporter confort et bien-être en respectant les contraintes
              techniques, l’esthétique et le bon dimensionnement.
            </p>
            <p className="text-lg">
              Après une expertise technique de votre logement ou local, Régis Garnier vous propose
              la solution la plus adaptée. Il reste votre interlocuteur unique pour simplifier tous
              les échanges.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <aside className="relative rotate-[-2deg] rounded-[1.75rem] border border-accent/30 bg-accent/10 p-8 transition-transform duration-500 hover:rotate-0 sm:p-10">
              <ShieldCheck className="size-10 text-accent" />
              <p className="mt-6 font-display text-xl leading-9 font-semibold">
                Le Code de l’environnement prévoit que seul un professionnel habilité peut mettre
                une climatisation en service.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <EquipmentTabs />
        </Reveal>
      </section>
      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <Reveal>
          <div className="glass flex flex-col items-start justify-between gap-6 rounded-full px-8 py-6 max-md:rounded-[2rem] md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                C’est un de vos futurs projets ?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Découvrez les aides disponibles pour concrétiser votre installation.
              </p>
            </div>
            <Button asChild size="hero" className="btn-shine shrink-0">
              <Link to="/aides-et-subventions">
                Je découvre mes aides <ArrowRight />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
      <ContactBand />
    </>
  );
}
