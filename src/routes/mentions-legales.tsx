import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-layout";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — RegisClim" },
      {
        name: "description",
        content: "Informations légales et conditions d’utilisation du site RegisClim.",
      },
      { property: "og:title", content: "Mentions légales — RegisClim" },
      { property: "og:description", content: "Informations légales de RegisClim à Nîmes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mentions-legales" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: LegalPage,
});
const sections = [
  "Identité",
  "Activités",
  "Conditions d’utilisation",
  "Informations",
  "Propriété intellectuelle",
  "Liens et confidentialité",
];

function LegalPage() {
  const id = (label: string) => `section-${sections.indexOf(label) + 1}`;
  return (
    <>
      <PageHero variant="minimal" eyebrow="Informations" title="Mentions légales">
        Identité, activités et conditions d’utilisation du site RegisClim.
      </PageHero>
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[13rem_1fr] md:gap-16">
        <nav aria-label="Sommaire" className="self-start md:sticky md:top-40">
          <ol className="space-y-2 border-l border-border text-sm">
            {sections.map((label) => (
              <li key={label}>
                <a
                  href={`#${id(label)}`}
                  className="-ml-px block border-l-2 border-transparent pl-4 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="prose-copy max-w-none [&>h2]:scroll-mt-40 [&>h2:first-child]:mt-0">
          <h2 id={id("Identité")}>Identité</h2>
          <p>
            Nom du site web : Régis.CLIM
            <br />
            Propriétaire et responsable de publication : M. Régis Garnier
            <br />
            Adresse : 2 Impasse des Caprices, 30900 Nîmes
            <br />
            Hébergement : OVH, 2 rue Kellermann, 59100 Roubaix, France
          </p>
          <h2 id={id("Activités")}>Activités</h2>
          <p>
            <strong>REGIS.CLIM</strong>
            <br />
            Numéro Siret : 89451064300014
            <br />
            Assurance décennale n°30160628 MAAF
          </p>
          <p>
            <strong>REGIS.ENTRETIEN</strong>
            <br />
            Numéro Siret : 89451035300010
            <br />
            Assurance décennale n°30160628 MAAF
          </p>
          <h2 id={id("Conditions d’utilisation")}>Conditions d’utilisation</h2>
          <p>
            L’utilisation du présent site implique l’acceptation pleine et entière des conditions
            générales d’utilisation. Ces conditions sont susceptibles d’être modifiées ou complétées
            à tout moment.
          </p>
          <h2 id={id("Informations")}>Informations</h2>
          <p>
            Les informations et documents du site sont présentés à titre indicatif, ne revêtent pas
            un caractère exhaustif et ne peuvent engager la responsabilité du propriétaire. Celui-ci
            ne peut être tenu responsable des dommages directs ou indirects consécutifs à l’accès au
            site.
          </p>
          <h2 id={id("Propriété intellectuelle")}>Propriété intellectuelle</h2>
          <p>
            Sauf mention contraire, les éléments accessibles sur ce site restent la propriété
            exclusive de leurs auteurs. Toute reproduction, représentation, modification,
            publication ou adaptation, totale ou partielle, est interdite sans autorisation écrite
            préalable.
          </p>
          <h2 id={id("Liens et confidentialité")}>Liens et confidentialité</h2>
          <p>
            Le propriétaire décline toute responsabilité concernant les ressources externes
            accessibles par des liens. Les informations personnelles éventuellement transmises ne
            sont pas cédées à des tiers et peuvent faire l’objet d’un droit d’accès, de
            rectification ou de suppression.
          </p>
        </article>
      </div>
    </>
  );
}
