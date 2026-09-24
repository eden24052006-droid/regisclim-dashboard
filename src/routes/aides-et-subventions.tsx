import { createFileRoute } from "@tanstack/react-router";
import { BadgeEuro, ExternalLink, Info, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand, PageHero } from "@/components/site-layout";

export const Route = createFileRoute("/aides-et-subventions")({
  head: () => ({
    meta: [
      { title: "Aides pour pompe à chaleur — RegisClim Nîmes" },
      {
        name: "description",
        content:
          "Informations sur les aides et subventions pour la pose d’une pompe à chaleur et la rénovation énergétique.",
      },
      { property: "og:title", content: "Aides et subventions — RegisClim" },
      {
        property: "og:description",
        content: "Les dispositifs d’aide pour votre projet de rénovation énergétique.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/aides-et-subventions" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/aides-et-subventions" }],
  }),
  component: AidesPage,
});
function AidesPage() {
  return (
    <>
      <PageHero eyebrow="Financer vos travaux" title="Aides et subventions">
        Des dispositifs peuvent accompagner la pose d’une pompe à chaleur et vos travaux de
        rénovation énergétique.
      </PageHero>
      <section className="content-shell">
        <div className="surface-card relative flex flex-col items-start justify-between gap-6 overflow-hidden p-7 sm:p-9 md:flex-row md:items-center">
          <span className="bg-gradient-warm absolute inset-y-0 left-0 w-1.5" />
          <div className="flex gap-4">
            <Info className="mt-1 size-5 shrink-0 text-accent" />
            <p className="max-w-3xl font-semibold leading-7">
              Les conditions et montants évoluent régulièrement. Vérifiez votre éligibilité auprès
              des organismes officiels avant de signer un devis.
            </p>
          </div>
          <Button asChild variant="warm" size="lg" className="shrink-0">
            <a
              href="https://france-renov.gouv.fr/aides/simulation"
              target="_blank"
              rel="noreferrer"
            >
              Simuler mes aides <ExternalLink />
            </a>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="surface-card surface-card-hover p-8 sm:p-10">
            <div className="icon-badge">
              <BadgeEuro className="size-6" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold">La prime Énergie</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Cette aide repose sur les Certificats d’Économie d’Énergie (CEE). Elle concerne les
              particuliers qui souhaitent améliorer la performance énergétique de leur habitation.
              Le montant varie selon le lieu de résidence, les revenus, les caractéristiques de
              l’équipement et le coût des travaux.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              La demande doit généralement être engagée avant la signature du devis, et les travaux
              confiés à un professionnel qualifié.
            </p>
          </article>
          <article className="surface-card surface-card-hover p-8 sm:p-10">
            <div className="icon-badge icon-badge-warm">
              <Leaf className="size-6" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold">MaPrimeRénov’</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              MaPrimeRénov’ accompagne certains travaux de chauffage, d’isolation ou de ventilation.
              Elle est ouverte, sous conditions, aux propriétaires occupants, bailleurs et
              copropriétés.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              Le montant dépend notamment des revenus du foyer et du gain énergétique apporté par
              les travaux. Les équipements air/air ne bénéficient pas nécessairement des mêmes
              dispositifs que les pompes à chaleur air/eau.
            </p>
          </article>
        </div>
      </section>
      <ContactBand title="Préparer votre projet" />
    </>
  );
}
