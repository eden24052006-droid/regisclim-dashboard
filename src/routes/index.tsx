import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Building2, Gauge, Home, Leaf, Phone, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand } from "@/components/site-layout";
import heroImage from "@/assets/regisclim-hero.jpg";
import technicianImage from "@/assets/regisclim-technician.jpg";

const commitments = [
  { icon: BadgeCheck, title: "Qualité", text: "Des équipements choisis pour leur fiabilité et leur adéquation à vos besoins." },
  { icon: ShieldCheck, title: "Efficacité", text: "Le respect des normes et une solution dimensionnée pour votre lieu de vie ou de travail." },
  { icon: Leaf, title: "Économie & écologie", text: "Des appareils nouvelle génération, de classe énergétique A+, A++ ou A+++." },
];

const expertise = [
  { icon: Wrench, title: "Installation", text: "Mono-split ou multi-split pour obtenir la température souhaitée et un air purifié." },
  { icon: Gauge, title: "Entretien", text: "Un suivi régulier évite la surconsommation et l’usure prématurée." },
  { icon: Home, title: "Gainable", text: "Une unité discrète dans les combles distribue l’air par un réseau de gaines." },
  { icon: Leaf, title: "Chauffe-eau thermodynamique", text: "Un ballon associé à une pompe à chaleur pour réduire la consommation énergétique." },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Climatisation à Nîmes — RegisClim" }, { name: "description", content: "Installation et entretien de climatisation, pompes à chaleur et chauffe-eau thermodynamiques à Nîmes." }, { property: "og:title", content: "Climatisation à Nîmes — RegisClim" }, { property: "og:description", content: "Votre spécialiste climatisation pour particuliers et professionnels à Nîmes." }, { property: "og:type", content: "website" }, { property: "og:url", content: "/" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "/" }] }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <>
      <section className="relative min-h-[76vh] overflow-hidden bg-secondary text-secondary-foreground">
        <img src={heroImage} width={1600} height={1000} alt="Salon lumineux équipé d’une climatisation à Nîmes" className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="relative mx-auto flex min-h-[76vh] max-w-7xl items-center px-5 py-16 sm:px-8">
          <div className="max-w-3xl"><p className="eyebrow text-accent">Artisan climaticien à Nîmes</p><h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] sm:text-7xl">Votre confort,<br />été comme hiver.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-secondary-foreground/85">Installation et entretien de climatisation pour particuliers et professionnels à Nîmes et ses environs.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="hero" variant="warm"><a href="tel:0767875716"><Phone /> 07 67 87 57 16</a></Button><Button asChild size="hero" variant="heroOutline"><a href="#solutions">Découvrir nos solutions <ArrowRight /></a></Button></div></div>
        </div>
      </section>

      <section id="solutions" className="content-shell">
        <div className="grid gap-6 md:grid-cols-2"><article className="group border-t-4 border-primary bg-card p-8 shadow-sm"><Home className="size-9 text-primary" /><p className="eyebrow mt-8 text-primary">Habitat</p><h2 className="mt-2 font-display text-3xl font-extrabold">Climatisation</h2><p className="mt-4 leading-7 text-muted-foreground">Profitez de l’avis d’un professionnel pour une climatisation adaptée à votre espace de vie sur Nîmes et ses environs.</p></article><article className="group border-t-4 border-accent bg-card p-8 shadow-sm"><Building2 className="size-9 text-accent" /><p className="eyebrow mt-8 text-accent">Entreprise</p><h2 className="mt-2 font-display text-3xl font-extrabold">Climatisation</h2><p className="mt-4 leading-7 text-muted-foreground">Des conditions de travail adaptées grâce à une solution d’air conditionné conçue pour vos locaux professionnels.</p></article></div>
      </section>

      <section className="bg-muted"><div className="content-shell"><div className="max-w-2xl"><p className="eyebrow text-accent">Nos engagements</p><h2 className="mt-3 font-display text-4xl font-extrabold">Du conseil juste, du matériel fiable.</h2></div><div className="mt-10 grid gap-px bg-border md:grid-cols-3">{commitments.map(({ icon: Icon, title, text }) => <article key={title} className="bg-background p-8"><Icon className="size-8 text-primary" /><h3 className="mt-6 font-display text-xl font-extrabold">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div></div></section>

      <section className="content-shell grid items-center gap-12 lg:grid-cols-2"><div className="overflow-hidden"><img src={technicianImage} loading="lazy" width={1200} height={900} alt="Technicien entretenant une climatisation" className="aspect-[4/3] size-full object-cover" /></div><div><p className="eyebrow text-primary">Savoir-faire complet</p><h2 className="mt-3 font-display text-4xl font-extrabold">Installation, entretien et solutions thermiques.</h2><div className="mt-8 grid gap-5">{expertise.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4"><Icon className="mt-1 size-6 shrink-0 text-accent"/><div><h3 className="font-display text-lg font-extrabold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div></div>)}</div><Button asChild variant="hero" size="hero" className="mt-8"><a href="/installation-de-climatisation-a-nimes">Voir les installations <ArrowRight /></a></Button></div></section>
      <ContactBand />
    </>
  );
}
