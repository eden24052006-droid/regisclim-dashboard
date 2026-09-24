import { createFileRoute, Link } from "@tanstack/react-router";
import { AirVent, ArrowRight, Droplets, HousePlug, Scale, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand, PageHero } from "@/components/site-layout";
import technicianImage from "@/assets/regisclim-technician.jpg";

export const Route = createFileRoute("/installation-de-climatisation-a-nimes")({
  head: () => ({
    meta: [
      { title: "Installation de climatisation à Nîmes — RegisClim" },
      {
        name: "description",
        content:
          "Installation de climatisation, pompe à chaleur, gainable et chauffe-eau thermodynamique à Nîmes.",
      },
      { property: "og:title", content: "Installation de climatisation à Nîmes — RegisClim" },
      {
        property: "og:description",
        content: "Une installation étudiée et réalisée par un professionnel qualifié.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/installation-de-climatisation-a-nimes" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/installation-de-climatisation-a-nimes" }],
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

function InstallationPage() {
  return (
    <>
      <PageHero
        variant="split"
        image={technicianImage}
        imageAlt="Installation professionnelle d’une climatisation"
        eyebrow="Étude & pose"
        title="Installation de climatisation à Nîmes"
      >
        Régis Garnier installe des climatisations chez les particuliers et les professionnels à
        Nîmes et ses environs.
      </PageHero>
      <section className="content-shell">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="prose-copy">
            <p className="eyebrow text-primary">Réglementation</p>
            <h2 className="mt-3! text-4xl!">Une solution adaptée à chaque lieu</h2>
            <p className="mt-6! text-lg">
              L’installation d’une climatisation exige un spécialiste qualifié. À la maison, au
              bureau ou dans un magasin, l’objectif est d’apporter confort et bien-être en
              respectant les contraintes techniques, l’esthétique et le bon dimensionnement.
            </p>
            <p className="text-lg">
              Après une expertise technique de votre logement ou local, Régis Garnier vous propose
              la solution la plus adaptée. Il reste votre interlocuteur unique pour simplifier tous
              les échanges.
            </p>
          </div>
          <aside className="self-start bg-secondary p-8 text-secondary-foreground sm:p-10">
            <ShieldCheck className="size-10 text-accent" />
            <p className="mt-6 font-display text-xl leading-9 font-semibold">
              Le Code de l’environnement prévoit que seul un professionnel habilité peut mettre une
              climatisation en service.
            </p>
          </aside>
        </div>
      </section>
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {equipment.map(({ icon: Icon, title, text }, i) => (
            <article
              key={title}
              className="group grid gap-4 border-b border-border py-10 transition-colors sm:grid-cols-[6rem_1fr] lg:grid-cols-[8rem_1fr_1.3fr] lg:items-center lg:gap-10"
            >
              <span className="font-display text-6xl font-bold text-border transition-colors group-hover:text-primary">
                0{i + 1}
              </span>
              <h2 className="flex items-center gap-3 font-display text-2xl font-bold">
                <Icon className="size-6 shrink-0 text-accent" />
                {title}
              </h2>
              <p className="leading-7 text-muted-foreground sm:col-start-2 lg:col-start-3">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            C’est un de vos futurs projets ?
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Découvrez les aides disponibles pour concrétiser votre installation.
          </p>
        </div>
        <Button asChild size="hero" className="shrink-0">
          <Link to="/aides-et-subventions">
            Je découvre mes aides <ArrowRight />
          </Link>
        </Button>
      </section>
      <ContactBand variant="dark" />
    </>
  );
}
