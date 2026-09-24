import { createFileRoute } from "@tanstack/react-router";
import { BedDouble, BriefcaseBusiness, House, Store } from "lucide-react";
import { ContactBand, PageHero, SectionHeading } from "@/components/site-layout";
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
function UsagePage() {
  return (
    <>
      <PageHero eyebrow="Votre besoin" title="Quelle climatisation pour quel usage ?">
        Monosplit, multisplit ou gainable : étudions ensemble la solution qui correspond à votre
        habitation ou à vos locaux.
      </PageHero>
      <section className="content-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="relative">
            <div className="bg-gradient-warm absolute -inset-3 rotate-2 rounded-[2rem] opacity-15" />
            <img
              src={heroImage}
              loading="lazy"
              width={1600}
              height={1000}
              alt="Pièce de vie climatisée"
              className="relative aspect-[4/3] size-full rounded-[1.75rem] object-cover shadow-[var(--shadow-lift)]"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Confort sur mesure"
              title="De la chambre au local professionnel."
            />
            <p className="mt-6 leading-8 text-muted-foreground">
              L’équipement est choisi selon le volume, le nombre de pièces, l’usage du lieu et vos
              attentes en matière de discrétion et de consommation.
            </p>
          </div>
        </div>
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {uses.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="surface-card surface-card-hover p-8 sm:p-10">
              <div className={i % 2 ? "icon-badge" : "icon-badge icon-badge-warm"}>
                <Icon className="size-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactBand title="Étudions votre espace" />
    </>
  );
}
