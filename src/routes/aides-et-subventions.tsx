import { createFileRoute } from "@tanstack/react-router";
import { BadgeEuro, ExternalLink, Info, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand, PageHero } from "@/components/site-layout";
import { Reveal } from "@/components/motion";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/aides-et-subventions")({
  head: () =>
    pageHead({
      title: "Aides pompe à chaleur : MaPrimeRénov’, CEE | Régis Clim",
      description:
        "Prime Énergie (CEE) et MaPrimeRénov’ : les aides pour financer votre pompe à chaleur et vos travaux de rénovation énergétique à Nîmes. Simulez vos aides.",
      path: "/aides-et-subventions",
    }),
  component: AidesPage,
});
function AidesPage() {
  return (
    <>
      <PageHero
        icon={<BadgeEuro className="size-6" />}
        eyebrow="Financer vos travaux"
        title="Aides et subventions"
      >
        Des dispositifs peuvent accompagner la pose d’une pompe à chaleur et vos travaux de
        rénovation énergétique.
      </PageHero>
      <section className="mx-auto max-w-5xl px-5 pt-12 sm:px-8">
        <Reveal>
          <div className="glass flex flex-col items-start justify-between gap-5 rounded-[2rem] border-accent/30! px-6 py-6 sm:px-8 md:flex-row md:items-center md:rounded-full">
            <p className="flex max-w-2xl gap-3 font-semibold leading-7">
              <Info className="mt-1 size-5 shrink-0 animate-pulse text-accent" />
              Les conditions et montants évoluent régulièrement. Vérifiez votre éligibilité auprès
              des organismes officiels avant de signer un devis.
            </p>
            <Button asChild variant="warm" size="lg" className="btn-shine shrink-0">
              <a
                href="https://france-renov.gouv.fr/aides/simulation"
                target="_blank"
                rel="noreferrer"
              >
                Simuler mes aides <ExternalLink />
              </a>
            </Button>
          </div>
        </Reveal>
      </section>
      <section className="mx-auto grid max-w-7xl items-start gap-6 px-5 pt-16 sm:px-8 md:grid-cols-2">
        <Reveal>
          <article className="glow-border spotlight group relative overflow-hidden rounded-[2rem] bg-white/[0.03] p-8 sm:p-12">
            <BadgeEuro className="absolute -top-8 -right-8 size-44 text-primary/10 transition-transform duration-1000 group-hover:rotate-12 group-hover:scale-110" />
            <div className="icon-badge">
              <BadgeEuro className="size-6" />
            </div>
            <h2 className="mt-8 font-display text-3xl font-bold sm:text-4xl">La prime Énergie</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Cette aide repose sur les Certificats d’Économie d’Énergie (CEE). Elle concerne les
              particuliers qui souhaitent améliorer la performance énergétique de leur habitation.
              Le montant varie selon le lieu de résidence, les revenus, les caractéristiques de
              l’équipement et le coût des travaux.
            </p>
            <p className="mt-6 rounded-2xl bg-primary/10 p-5 leading-8 text-foreground">
              La demande doit généralement être engagée avant la signature du devis, et les travaux
              confiés à un professionnel qualifié.
            </p>
          </article>
        </Reveal>
        <Reveal delay={200} className="md:mt-24">
          <article className="glow-border spotlight group relative overflow-hidden rounded-[2rem] bg-white/[0.03] p-8 sm:p-12">
            <Leaf className="absolute -top-8 -right-8 size-44 text-accent/10 transition-transform duration-1000 group-hover:-rotate-12 group-hover:scale-110" />
            <div className="icon-badge icon-badge-warm">
              <Leaf className="size-6" />
            </div>
            <h2 className="mt-8 font-display text-3xl font-bold sm:text-4xl">MaPrimeRénov’</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              MaPrimeRénov’ accompagne certains travaux de chauffage, d’isolation ou de ventilation.
              Elle est ouverte, sous conditions, aux propriétaires occupants, bailleurs et
              copropriétés.
            </p>
            <p className="mt-6 rounded-2xl bg-accent/10 p-5 leading-8 text-foreground">
              Le montant dépend notamment des revenus du foyer et du gain énergétique apporté par
              les travaux. Les équipements air/air ne bénéficient pas nécessairement des mêmes
              dispositifs que les pompes à chaleur air/eau.
            </p>
          </article>
        </Reveal>
      </section>
      <ContactBand title="Préparer votre projet" />
    </>
  );
}
