export const SITE_NAME = "Régis Clim";

type HeadMeta = Record<string, unknown>;

/** Title, description, social previews and canonical link for a page. */
export function pageHead({
  title,
  description,
  path,
  extra = [],
}: {
  title: string;
  description: string;
  path: string;
  extra?: HeadMeta[];
}) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...extra,
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

/** Structured data describing the business, for Google's local results. */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: SITE_NAME,
  alternateName: "REGIS.CLIM",
  description:
    "Artisan climaticien à Nîmes : installation et entretien de climatisation, pompes à chaleur et chauffe-eau thermodynamiques pour particuliers et professionnels.",
  telephone: "+33767875716",
  founder: { "@type": "Person", name: "Régis Garnier" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "2 Impasse des Caprices",
    postalCode: "30900",
    addressLocality: "Nîmes",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "City", name: "Nîmes" },
    { "@type": "AdministrativeArea", name: "Gard" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: ["https://www.facebook.com/regis.clim30/", "https://www.instagram.com/regis_clim/"],
  knowsAbout: [
    "Climatisation",
    "Pompe à chaleur réversible",
    "Pompe à chaleur air-eau",
    "Climatisation gainable",
    "Chauffe-eau thermodynamique",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Entretien de climatisation",
    itemListElement: [
      ["Entretien climatisation mono split", 105],
      ["Entretien climatisation gainable", 130],
      ["Entretien pompe à chaleur", 180],
      ["Entretien ballon thermodynamique", 130],
    ].map(([name, price]) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
      price,
      priceCurrency: "EUR",
    })),
  },
};
