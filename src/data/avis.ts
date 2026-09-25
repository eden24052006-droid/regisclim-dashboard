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
    name: "Josée C.",
    text: "REGIS.CLIM nous a été recommandé par une amie et franchement nous n’avons pas été déçus. Bravo à lui et à sa co-équipière qui nous ont fait un travail remarquable de qualité. 2 vrais artisans comme on en rencontre peu aujourd’hui dans ce monde où le «\u00a0fric\u00a0» est roi et l’incompétence devient une norme. Très professionnel et de bon conseil, toujours à l’heure même à 6h30 du matin, poli, soigneux, rigoureux et très agréable à côtoyer. Enfin bref une très belle surprise.",
    rating: 5,
    source: "Google",
    date: "juin 2026",
  },
  {
    name: "Chantal R.",
    text: "Merci Monsieur Regis Clim, qui n’avez pas choisi la facilité pour l’installation au meilleur endroit alors qu’il aurait été plus simple de la poser à la place de l’ancienne… Merci pour votre professionnalisme, votre rigueur et l’envie que les clients trouvent le confort recherché, que ce soit chaleur, fraîcheur et silence de l’appareil. Merci mille fois.",
    rating: 5,
    source: "Google",
    date: "avril 2026",
  },
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
