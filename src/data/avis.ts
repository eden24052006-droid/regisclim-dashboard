/**
 * Genuine customer reviews shown on the home page (copied from Google,
 * Facebook…). The section stays hidden while this list is empty.
 */
export type Avis = {
  name: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: "Google" | "Facebook" | "Pages Jaunes";
  date?: string;
};

export const avis: Avis[] = [
  {
    name: "Client Pages Jaunes",
    text: "Une personne très agréable et très professionnelle. À l’écoute des clients, et si aimable. Il est venu installer une clim dans une chambre, tout a été fait dans les normes. Je vous le conseille, sans soucis.",
    rating: 5,
    source: "Pages Jaunes",
    date: "2026",
  },
];

/** Optional link to the full list of reviews (e.g. the Google Business page). */
export const avisLink = "";
