import { createFileRoute, Link } from "@tanstack/react-router";
import { AirVent, ArrowRight, Droplets, HousePlug, Scale, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand, PageHero, SectionHeading } from "@/components/site-layout";
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
      <PageHero eyebrow="Étude & pose" title="Installation de climatisation à Nîmes">
        Régis Garnier installe des climatisations chez les particuliers et les professionnels à
        Nîmes et ses environs.
      </PageHero>
      <section className="content-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <img
              src={technicianImage}
              loading="lazy"
              width={1200}
              height={900}
              alt="Installation professionnelle d’une climatisation"
              className="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-[var(--shadow-lift)]"
            />
            <aside className="surface-card relative mt-5 flex gap-4 overflow-hidden p-6 text-sm leading-7 text-muted-foreground">
              <span className="bg-gradient-warm absolute inset-y-0 left-0 w-1.5" />
              <ShieldCheck className="mt-1 size-5 shrink-0 text-accent" />
              Le Code de l’environnement prévoit que seul un professionnel habilité peut mettre une
              climatisation en service.
            </aside>
          </div>
          <div className="prose-copy">
            <SectionHeading eyebrow="Réglementation" title="Une solution adaptée à chaque lieu" />
            <p className="mt-6!">
              L’installation d’une climatisation exige un spécialiste qualifié. À la maison, au
              bureau ou dans un magasin, l’objectif est d’apporter confort et bien-être en
              respectant les contraintes techniques, l’esthétique et le bon dimensionnement.
            </p>
            <p>
              Après une expertise technique de votre logement ou local, Régis Garnier vous propose
              la solution la plus adaptée. Il reste votre interlocuteur unique pour simplifier tous
              les échanges.
            </p>
          </div>
        </div>
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {equipment.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="surface-card surface-card-hover p-8 sm:p-10">
              <div className={i % 2 ? "icon-badge icon-badge-warm" : "icon-badge"}>
                <Icon className="size-6" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
        <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-muted px-6 py-14 text-center sm:px-12">
          <div className="glow-blob -top-24 left-1/2 size-72 -translate-x-1/2 bg-primary/15" />
          <h2 className="relative font-display text-3xl font-bold sm:text-4xl">
            C’est un de vos futurs projets ?
          </h2>
          <p className="relative mx-auto mt-3 max-w-2xl text-muted-foreground">
            Découvrez les aides disponibles pour concrétiser votre installation.
          </p>
          <Button asChild size="hero" className="relative mt-7">
            <Link to="/aides-et-subventions">
              Je découvre mes aides <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
