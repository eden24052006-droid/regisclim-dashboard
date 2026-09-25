import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Scale } from "lucide-react";
import { PageHero } from "@/components/site-layout";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/mentions-legales")({
  head: () =>
    pageHead({
      title: "Mentions légales | Régis Clim",
      description:
        "Mentions légales du site Régis Clim, climaticien à Nîmes : identité, activités, assurance décennale et conditions d’utilisation.",
      path: "/mentions-legales",
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

const id = (label: string) => `section-${sections.indexOf(label) + 1}`;

function useActiveSection() {
  const [active, setActive] = useState(id("Identité"));
  useEffect(() => {
    const headings = sections
      .map((label) => document.getElementById(id(label)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-160px 0px -60% 0px" },
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

function LegalPage() {
  const active = useActiveSection();
  return (
    <>
      <PageHero icon={<Scale className="size-6" />} eyebrow="Informations" title="Mentions légales">
        Identité, activités et conditions d’utilisation du site RegisClim.
      </PageHero>
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[14rem_1fr] md:gap-16">
        <nav aria-label="Sommaire" className="self-start md:sticky md:top-40">
          <ol className="glass space-y-1 rounded-2xl p-3 text-sm">
            {sections.map((label) => (
              <li key={label}>
                <a
                  href={`#${id(label)}`}
                  className={cn(
                    "block rounded-xl px-3 py-2 transition-all duration-300",
                    active === id(label)
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="prose-copy glass max-w-none rounded-[2rem] p-8 sm:p-12 [&>h2]:scroll-mt-40 [&>h2:first-child]:mt-0">
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
