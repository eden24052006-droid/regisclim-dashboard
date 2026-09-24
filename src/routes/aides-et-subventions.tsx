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
      <PageHero variant="warm" eyebrow="Financer vos travaux" title="Aides et subventions">
        Des dispositifs peuvent accompagner la pose d’une pompe à chaleur et vos travaux de
        rénovation énergétique.
      </PageHero>
      <section className="border-b border-border bg-muted">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center">
          <p className="flex max-w-3xl gap-3 font-semibold leading-7">
            <Info className="mt-1 size-5 shrink-0 text-accent" />
            Les conditions et montants évoluent régulièrement. Vérifiez votre éligibilité auprès des
            organismes officiels avant de signer un devis.
          </p>
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
      </section>
      <section className="mx-auto grid max-w-7xl md:grid-cols-2 md:divide-x md:divide-border">
        <article className="px-5 py-16 sm:px-8 md:py-24 md:pr-14">
          <div className="flex items-center gap-4">
            <span className="font-display text-7xl font-bold text-primary/15">A</span>
            <BadgeEuro className="size-9 text-primary" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">La prime Énergie</h2>
          <p className="mt-6 leading-8 text-muted-foreground">
            Cette aide repose sur les Certificats d’Économie d’Énergie (CEE). Elle concerne les
            particuliers qui souhaitent améliorer la performance énergétique de leur habitation. Le
            montant varie selon le lieu de résidence, les revenus, les caractéristiques de
            l’équipement et le coût des travaux.
          </p>
          <p className="mt-6 border-l-2 border-primary pl-5 leading-8 font-medium text-foreground">
            La demande doit généralement être engagée avant la signature du devis, et les travaux
            confiés à un professionnel qualifié.
          </p>
        </article>
        <article className="border-t border-border px-5 py-16 sm:px-8 md:border-t-0 md:py-24 md:pl-14">
          <div className="flex items-center gap-4">
            <span className="font-display text-7xl font-bold text-accent/20">B</span>
            <Leaf className="size-9 text-accent" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">MaPrimeRénov’</h2>
          <p className="mt-6 leading-8 text-muted-foreground">
            MaPrimeRénov’ accompagne certains travaux de chauffage, d’isolation ou de ventilation.
            Elle est ouverte, sous conditions, aux propriétaires occupants, bailleurs et
            copropriétés.
          </p>
          <p className="mt-6 border-l-2 border-accent pl-5 leading-8 font-medium text-foreground">
            Le montant dépend notamment des revenus du foyer et du gain énergétique apporté par les
            travaux. Les équipements air/air ne bénéficient pas nécessairement des mêmes dispositifs
            que les pompes à chaleur air/eau.
          </p>
        </article>
      </section>
      <ContactBand variant="dark" title="Préparer votre projet" />
    </>
  );
}
