import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, BriefcaseBusiness, House, Store } from "lucide-react";
import { ContactBand, PageHero } from "@/components/site-layout";
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
const tileStyles = [
  "bg-gradient-cool text-primary-foreground",
  "bg-accent/10 text-foreground",
  "bg-muted text-foreground",
  "bg-secondary text-secondary-foreground",
];
const tileText = [
  "text-primary-foreground/85",
  "text-muted-foreground",
  "text-muted-foreground",
  "text-secondary-muted",
];
const tileIcon = ["text-primary-foreground", "text-accent", "text-primary", "text-accent"];

function UsagePage() {
  return (
    <>
      <PageHero
        variant="image"
        image={heroImage}
        imageAlt="Pièce de vie climatisée"
        eyebrow="Votre besoin"
        title="Quelle climatisation pour quel usage ?"
      >
        Monosplit, multisplit ou gainable : étudions ensemble la solution qui correspond à votre
        habitation ou à vos locaux.
      </PageHero>
      <section className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="eyebrow text-primary">Confort sur mesure</p>
        <h2 className="mt-5 font-display text-4xl leading-tight font-bold sm:text-6xl">
          De la chambre au <span className="text-gradient-cool">local professionnel.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-muted-foreground">
          L’équipement est choisi selon le volume, le nombre de pièces, l’usage du lieu et vos
          attentes en matière de discrétion et de consommation.
        </p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-3 px-3 pb-16 sm:px-5 sm:pb-24 md:grid-cols-5">
        {uses.map(({ icon: Icon, title, text }, i) => (
          <article
            key={title}
            className={`${tileStyles[i]} ${i === 0 || i === 3 ? "md:col-span-3" : "md:col-span-2"} relative flex min-h-72 flex-col justify-between overflow-hidden rounded-lg p-8 sm:p-10`}
          >
            <Icon className={`${tileIcon[i]} size-10`} />
            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
              <p className={`${tileText[i]} mt-3 max-w-lg leading-7`}>{text}</p>
            </div>
          </article>
        ))}
      </section>
      <ContactBand variant="light" title="Étudions votre espace" />
    </>
  );
}
