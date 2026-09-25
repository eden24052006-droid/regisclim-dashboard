/**
 * Photos of completed jobs shown on the home page. The section stays hidden
 * while this list is empty. To add one, put the photo in
 * src/assets/realisations/ and add an entry, for example:
 *
 *   import pac from "@/assets/realisations/pac-nimes.jpg";
 *   { image: pac, title: "Pompe à chaleur air-eau", place: "Nîmes", alt: "Unité extérieure de pompe à chaleur posée contre une façade" },
 */
export type Realisation = {
  image: string;
  title: string;
  place?: string;
  alt: string;
};

export const realisations: Realisation[] = [];
