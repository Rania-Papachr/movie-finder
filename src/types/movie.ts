export const genres = ["comedy", "horror", "drama"] as const;

export type GenreTypes = (typeof genres)[number];

export type Movie = {
  id: number;
  title: string;
  year: string;
  description: string;
  rating: number;
  genre: string;
  imageUrl: string;
  favorite: boolean;
};
