import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BedDouble, BriefcaseBusiness, House, Store } from "lucide-react";
import { ContactBand, PageHero } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/regisclim-hero.jpg";

export const Route = createFileRoute("/climatisation-pour-votre-maison")({
  head: () => ({
    meta: [
      { title: "Quelle climatisation choisir ? — RegisClim Nîmes" },
      {
        name: "description",
        content:
          "Climatisation monosplit, multisplit ou gainable pour maison, chambre, bureau et magasin à Nîmes.",
      },
      { property: "og:title", content: "Quelle climatisation choisir ? — RegisClim" },
      {
        property: "og:description",
        content: "Une solution adaptée à chaque pièce et à chaque usage.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/climatisation-pour-votre-maison" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/climatisation-pour-votre-maison" }],
  }),
  component: UsagePage,
});
const uses = [
  {
    icon: House,
    title: "Une ou plusieurs pièces",
    text: "Pour une seule pièce, le monosplit convient parfaitement. Pour plusieurs pièces, un système multisplit permet une gestion adaptée à chaque espace.",
  },
  {
    icon: BedDouble,
    title: "Pièces de vie et chambres",
    text: "Une console discrète ou un climatiseur mural associe confort, simplicité d’utilisation, design et économies d’énergie.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Bureaux",
    text: "Bureau, open space, salle de réunion, accueil ou local technique : chaque espace demande une installation performante et simple à utiliser.",
  },
  {
    icon: Store,
    title: "Magasins",
    text: "Une température maîtrisée améliore le confort de vos clients et de vos salariés, quelle que soit la saison.",
  },
];
const panelTones = [
  "from-primary/40 to-[oklch(0.5_0.18_265)]/30",
  "from-accent/35 to-accent/5",
  "from-[oklch(0.6_0.14_190)]/35 to-primary/10",
  "from-[oklch(0.5_0.18_265)]/40 to-accent/20",
];

function UsagePanels() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 lg:h-[30rem] lg:flex-row">
      {uses.map(({ icon: Icon, title, text }, i) => {
        const open = active === i;
        return (
          <article
            key={title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
            className={cn(
              "group relative flex min-h-64 cursor-pointer flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br p-8 outline-none transition-[flex-grow,border-color] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] focus-visible:border-primary lg:min-h-0",
              panelTones[i],
              open ? "lg:grow-[3.2]" : "lg:grow",
              "lg:basis-0",
            )}
          >
            <span className="absolute top-7 left-8 font-display text-sm font-bold text-foreground/50">
              0{i + 1}
            </span>
            <Icon
              className={cn(
                "absolute top-6 right-6 size-12 text-foreground transition-all duration-700",
                open ? "rotate-0 opacity-90" : "lg:-rotate-12 lg:opacity-50",
              )}
            />
            <div
              className={cn(
                "transition-all duration-700",
                open ? "lg:translate-y-0" : "lg:translate-y-4",
              )}
            >
              <h2
                className={cn(
                  "font-display text-2xl font-bold transition-all duration-700 sm:text-3xl",
                  !open && "lg:text-xl",
                )}
              >
                {title}
              </h2>
              <p
                className={cn(
                  "mt-3 max-w-md leading-7 text-foreground/80 transition-all duration-700",
                  open ? "opacity-100" : "lg:max-h-0 lg:opacity-0",
                )}
              >
                {text}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function UsagePage() {
  return (
    <>
      <PageHero
        image={heroImage}
        imageAlt="Pièce de vie climatisée"
        icon={<House className="size-9" />}
        eyebrow="Votre besoin"
        title="Quelle climatisation pour quel usage ?"
      >
        Monosplit, multisplit ou gainable : étudions ensemble la solution qui correspond à votre
        habitation ou à vos locaux.
      </PageHero>
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <Reveal>
          <p className="eyebrow text-primary">Confort sur mesure</p>
          <h2 className="mt-5 font-display text-4xl leading-tight font-bold sm:text-6xl">
            De la chambre au <span className="text-shimmer">local professionnel.</span>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-muted-foreground">
            L’équipement est choisi selon le volume, le nombre de pièces, l’usage du lieu et vos
            attentes en matière de discrétion et de consommation.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <UsagePanels />
        </Reveal>
      </section>
      <ContactBand title="Étudions votre espace" />
    </>
  );
}
