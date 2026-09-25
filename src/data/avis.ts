/**
 * Genuine customer reviews shown on the home page (copied from Google,
 * Facebook…). The section stays hidden while this list is empty.
 */
export type Avis = {
  name: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: "Google" | "Facebook";
  date?: string;
};

export const avis: Avis[] = [];

/** Optional link to the full list of reviews (e.g. the Google Business page). */
export const avisLink = "";
