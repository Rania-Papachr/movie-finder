type GenreTypes = "comedy" | "horror" | "drama";

export type Movie = {
  id: string;
  title: string;
  year: number;
  description: string;
  rating: number;
  genre: GenreTypes;
  imageUrl: string;
};
